"use client";

import {
  useChatLinkage,
  useGetLinkageBySlug,
  useGetLinkageQuestionnaire,
} from "@/api/linkage";
import Image from "next/image";
import { Microphone2, MicrophoneSlash, Send, Sound, User } from "iconsax-react";
import { Toaster } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft2, VolumeHigh } from "iconsax-react";
import { alternatePrompts } from "@/lib/values/prompts";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import { RealtimeButton } from "../../../../components/realtime/components/realtimeButton";
import { Toggle } from "../../../../components/realtime/components/toggle";

import React from "react";
import { useCallback } from "react";
import { RealtimeClient } from "@openai/realtime-api-beta";
import { ItemType } from "@openai/realtime-api-beta/dist/lib/client.js";
import {
  WavRecorder,
  WavStreamPlayer,
} from "../../../../components/realtime/wavtools/index";
import { instructions } from "../../../../components/realtime/utils/conversation_config.js";
import { WavRenderer } from "../../../../components/realtime/utils/wav_renderer";
import { X, Edit, Zap, ArrowUp, ArrowDown } from "lucide-react";
import clsx from "clsx";
import { AudioWithWaveform } from "../../../../lib/utils/wavesurfer";
import WaveSurfer from "wavesurfer.js";
import Button from "@/components/button";

interface Coordinates {
  lat: number;
  lng: number;
  location?: string;
  temperature?: {
    value: number;
    units: string;
  };
  wind_speed?: {
    value: number;
    units: string;
  };
}

interface RealtimeEvent {
  time: string;
  source: "client" | "server";
  count?: number;
  event: { [key: string]: any };
}

const capitalize = (str: string) => {
  return str
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const LOCAL_RELAY_SERVER_URL: string =
  process.env.REACT_APP_LOCAL_RELAY_SERVER_URL || "";

const RealtimeInteraction: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const slug = "harmony-2";

  const apiKey = LOCAL_RELAY_SERVER_URL
    ? ""
    : localStorage.getItem("tmp::voice_api_key") ||
      prompt("OpenAI API Key") ||
      "";
  if (apiKey !== "") {
    localStorage.setItem("tmp::voice_api_key", apiKey);
  }

  // const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;

  const wavRecorderRef = useRef<WavRecorder>(
    new WavRecorder({ sampleRate: 24000 })
  );

  const wavStreamPlayerRef = useRef<WavStreamPlayer>(
    new WavStreamPlayer({ sampleRate: 24000 })
  );

  const clientRef = useRef<RealtimeClient>(
    new RealtimeClient({
      apiKey: apiKey,
      dangerouslyAllowAPIKeyInBrowser: true,
    })
  );

  const clientCanvasRef = useRef<HTMLCanvasElement>(null);
  const serverCanvasRef = useRef<HTMLCanvasElement>(null);
  const [currentSpeaker, setCurrentSpeaker] = useState<"client" | "server">(
    "client"
  ); // State to track the active speaker

  const eventsScrollHeightRef = useRef(0);
  const eventsScrollRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<string>(new Date().toISOString());

  const conversationScrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the bottom whenever the items change

  const [items, setItems] = useState<ItemType[]>([]);
  const [realtimeEvents, setRealtimeEvents] = useState<RealtimeEvent[]>([]);
  const [expandedEvents, setExpandedEvents] = useState<{
    [key: string]: boolean;
  }>({});
  const [isConnected, setIsConnected] = useState(false);
  const [canPushToTalk, setCanPushToTalk] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [memoryKv, setMemoryKv] = useState<{ [key: string]: any }>({});

  const [coords, setCoords] = useState<Coordinates | null>({
    lat: 37.775593,
    lng: -122.418137,
  });
  const [marker, setMarker] = useState<Coordinates | null>(null);

  const formatTime = useCallback((timestamp: string) => {
    const startTime = startTimeRef.current;
    const t0 = new Date(startTime).valueOf();
    const t1 = new Date(timestamp).valueOf();
    const delta = t1 - t0;
    const hs = Math.floor(delta / 10) % 100;
    const s = Math.floor(delta / 1000) % 60;
    const m = Math.floor(delta / 60_000) % 60;
    const pad = (n: number) => {
      let s = n + "";
      while (s.length < 2) {
        s = "0" + s;
      }
      return s;
    };
    return `${pad(m)}:${pad(s)}.${pad(hs)}`;
  }, []);

  const resetAPIKey = useCallback(() => {
    const apiKey = prompt("OpenAI API Key");
    if (apiKey !== null) {
      localStorage.clear();
      localStorage.setItem("tmp::voice_api_key", apiKey);
      window.location.reload();
    }
  }, []);

  const connectConversation = useCallback(async () => {
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;

    // Set state variables
    startTimeRef.current = new Date().toISOString();
    setIsConnected(true);
    setRealtimeEvents([]);
    setItems(client.conversation.getItems());

    // Connect to microphone
    await wavRecorder.begin();

    // Connect to audio output
    await wavStreamPlayer.connect();

    // Connect to realtime API
    await client.connect();
    client.sendUserMessageContent([
      {
        type: `input_text`,
        text: `Hello!`,
        // text: `For testing purposes, I want you to list ten car brands. Number each item, e.g. "one (or whatever number you are one): the item name".`
      },
    ]);

    if (client.getTurnDetectionType() === "server_vad") {
      await wavRecorder.record((data) => client.appendInputAudio(data.mono));
    }
  }, []);

  const disconnectConversation = useCallback(async () => {
    setIsConnected(false);
    setRealtimeEvents([]);
    setItems([]);
    setMemoryKv({});
    setCoords({
      lat: 37.775593,
      lng: -122.418137,
    });
    setMarker(null);

    const client = clientRef.current;
    client.disconnect();

    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.end();

    const wavStreamPlayer = wavStreamPlayerRef.current;
    await wavStreamPlayer.interrupt();
  }, []);

  const deleteConversationItem = useCallback(async (id: string) => {
    const client = clientRef.current;
    client.deleteItem(id);
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;
    const trackSampleOffset = await wavStreamPlayer.interrupt();
    if (trackSampleOffset?.trackId) {
      const { trackId, offset } = trackSampleOffset;
      await client.cancelResponse(trackId, offset);
    }
    await wavRecorder.record((data) => client.appendInputAudio(data.mono));
  };

  const stopRecording = async () => {
    setIsRecording(false);
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.pause();
    client.createResponse();
  };

  const changeTurnEndType = async (value: string) => {
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    if (value === "none" && wavRecorder.getStatus() === "recording") {
      await wavRecorder.pause();
    }
    client.updateSession({
      turn_detection: value === "none" ? null : { type: "server_vad" },
    });
    if (value === "server_vad" && client.isConnected()) {
      await wavRecorder.record((data) => client.appendInputAudio(data.mono));
    }
    setCanPushToTalk(value === "none");
  };

  // autoscroll events
  useEffect(() => {
    if (eventsScrollRef.current) {
      const eventsEl = eventsScrollRef.current;
      const scrollHeight = eventsEl.scrollHeight;
      // Only scroll if height has just changed
      if (scrollHeight !== eventsScrollHeightRef.current) {
        eventsEl.scrollTop = scrollHeight;
        eventsScrollHeightRef.current = scrollHeight;
      }
    }
  }, [realtimeEvents]);

  // autoscroll conversation
  useEffect(() => {
    const conversationEls = [].slice.call(
      document.body.querySelectorAll("[data-conversation-content]")
    );
    for (const el of conversationEls) {
      const conversationEl = el as HTMLDivElement;
      conversationEl.scrollTop = conversationEl.scrollHeight;
    }
  }, [items]);

  useEffect(() => {
    if (conversationScrollRef.current) {
      conversationScrollRef.current.scrollTop =
        conversationScrollRef.current.scrollHeight;
    }
  }, [items]);

  /**
   * Set up render loops for the visualization canvas
   */
  useEffect(() => {
    let isLoaded = true;

    const wavRecorder = wavRecorderRef.current;
    const clientCanvas = clientCanvasRef.current;
    let clientCtx: CanvasRenderingContext2D | null = null;

    const wavStreamPlayer = wavStreamPlayerRef.current;
    const serverCanvas = serverCanvasRef.current;
    let serverCtx: CanvasRenderingContext2D | null = null;

    const render = () => {
      if (isLoaded) {
        // Check which canvas is active and only render that one
        if (clientCanvas && wavRecorder.recording) {
          // Set width and height if not set
          if (!clientCanvas.width || !clientCanvas.height) {
            clientCanvas.width = clientCanvas.offsetWidth;
            clientCanvas.height = clientCanvas.offsetHeight;
          }
          clientCtx = clientCtx || clientCanvas.getContext("2d");
          if (clientCtx) {
            clientCtx.clearRect(0, 0, clientCanvas.width, clientCanvas.height);
            const result = wavRecorder.recording
              ? wavRecorder.getFrequencies("voice")
              : { values: new Float32Array([0]) };
            WavRenderer.drawBars(
              clientCanvas,
              clientCtx,
              result.values,
              "#0099ff",
              24,
              0,
              10
            );
          }

          // Hide server canvas if it's not active
          if (serverCanvas) serverCanvas.style.display = "none";
          if (clientCanvas) clientCanvas.style.display = "block";
        } else if (serverCanvas && wavStreamPlayer.analyser) {
          // Set width and height if not set
          if (!serverCanvas.width || !serverCanvas.height) {
            serverCanvas.width = serverCanvas.offsetWidth;
            serverCanvas.height = serverCanvas.offsetHeight;
          }
          serverCtx = serverCtx || serverCanvas.getContext("2d");
          if (serverCtx) {
            serverCtx.clearRect(0, 0, serverCanvas.width, serverCanvas.height);
            const result = wavStreamPlayer.analyser
              ? wavStreamPlayer.getFrequencies("voice")
              : { values: new Float32Array([0]) };
            WavRenderer.drawBars(
              serverCanvas,
              serverCtx,
              result.values,
              "#009900", // Bar color for server canvas
              24,
              0,
              10
            );
          }

          // Hide client canvas if it's not active
          if (clientCanvas) clientCanvas.style.display = "none";
          if (serverCanvas) serverCanvas.style.display = "block";
        }

        // Recurse the render function using requestAnimationFrame
        window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      isLoaded = false;
    };
  }, []);

  useEffect(() => {
    // Simulating an event that changes the current speaker (this can be replaced with actual logic)
    const switchSpeaker = () => {
      setCurrentSpeaker((prev) => (prev === "client" ? "server" : "client"));
    };

    // Switch speakers every 5 seconds for demonstration purposes
    const speakerSwitchInterval = setInterval(switchSpeaker, 5000);

    // Clean up the interval when component unmounts
    return () => clearInterval(speakerSwitchInterval);
  }, []);

  useEffect(() => {
    // Get refs
    const wavStreamPlayer = wavStreamPlayerRef.current;
    const client = clientRef.current;

    // Set instructions
    client.updateSession({ instructions: instructions });
    // Set transcription, otherwise we don't get user transcriptions back
    client.updateSession({ input_audio_transcription: { model: "whisper-1" } });

    // Add tools
    client.addTool(
      {
        name: "set_memory",
        description: "Saves important data about the user into memory.",
        parameters: {
          type: "object",
          properties: {
            key: {
              type: "string",
              description:
                "The key of the memory value. Always use lowercase and underscores, no other characters.",
            },
            value: {
              type: "string",
              description: "Value can be anything represented as a string",
            },
          },
          required: ["key", "value"],
        },
      },
      async ({ key, value }: { [key: string]: any }) => {
        setMemoryKv((memoryKv) => {
          const newKv = { ...memoryKv };
          newKv[key] = value;
          return newKv;
        });
        return { ok: true };
      }
    );
    client.addTool(
      {
        name: "get_weather",
        description:
          "Retrieves the weather for a given lat, lng coordinate pair. Specify a label for the location.",
        parameters: {
          type: "object",
          properties: {
            lat: {
              type: "number",
              description: "Latitude",
            },
            lng: {
              type: "number",
              description: "Longitude",
            },
            location: {
              type: "string",
              description: "Name of the location",
            },
          },
          required: ["lat", "lng", "location"],
        },
      },
      async ({ lat, lng, location }: { [key: string]: any }) => {
        setMarker({ lat, lng, location });
        setCoords({ lat, lng, location });
        const result = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m`
        );
        const json = await result.json();
        const temperature = {
          value: json.current.temperature_2m as number,
          units: json.current_units.temperature_2m as string,
        };
        const wind_speed = {
          value: json.current.wind_speed_10m as number,
          units: json.current_units.wind_speed_10m as string,
        };
        setMarker({ lat, lng, location, temperature, wind_speed });
        return json;
      }
    );

    // handle realtime events from client + server for event logging
    client.on("realtime.event", (realtimeEvent: RealtimeEvent) => {
      setRealtimeEvents((realtimeEvents) => {
        const lastEvent = realtimeEvents[realtimeEvents.length - 1];
        if (lastEvent?.event.type === realtimeEvent.event.type) {
          // if we receive multiple events in a row, aggregate them for display purposes
          lastEvent.count = (lastEvent.count || 0) + 1;
          return realtimeEvents.slice(0, -1).concat(lastEvent);
        } else {
          return realtimeEvents.concat(realtimeEvent);
        }
      });
    });
    client.on("error", (event: any) => console.error(event));
    client.on("conversation.interrupted", async () => {
      const trackSampleOffset = await wavStreamPlayer.interrupt();
      if (trackSampleOffset?.trackId) {
        const { trackId, offset } = trackSampleOffset;
        await client.cancelResponse(trackId, offset);
      }
    });
    client.on("conversation.updated", async ({ item, delta }: any) => {
      const items = client.conversation.getItems();
      if (delta?.audio) {
        wavStreamPlayer.add16BitPCM(delta.audio, item.id);
      }
      if (item.status === "completed" && item.formatted.audio?.length) {
        const wavFile = await WavRecorder.decode(
          item.formatted.audio,
          24000,
          24000
        );
        item.formatted.file = wavFile;
      }
      setItems(items);
    });

    setItems(client.conversation.getItems());

    return () => {
      // cleanup; resets to defaults
      client.reset();
    };
  }, []);

  return (
    <AuthNavLayout>
      <Toaster />
      <div className="w-full h-screen overflow-hidden text-white bg-[#0B0228] flex flex-col">
        <div className="p-4 sm:p-6 py-6 flex flex-row items-center justify-between border-b border-[#C3B1FF4D]">
          <div className="flex flex-row items-center gap-4">
            <ArrowLeft2 className="w-6 h-6" onClick={() => router.back()} />
            <div className="flex flex-row items-center gap-4">
              <Image
                alt="AI"
                width={44}
                height={44}
                src={"/assets/sample-icon.png"}
              />
              <div>
                <p className="text-lg font-bold">Ribbon AI</p>
              </div>

              <div>
                {!LOCAL_RELAY_SERVER_URL && (
                  <Button
                    className="h-[40px] bg-[inherit]"
                    onClick={() => resetAPIKey()}
                  >
                    <Edit color="white" size={24} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full mt-2 p-4 flex flex-col h-full overflow-auto scroll-hidden mx-auto rounded-lg shadow-lg">
          <div className="bg-[#CBBEF71A] py-4 z-10 gap-0.5 flex flex-row items-center justify-center">
            <div
              className={`relative flex items-center h-20 w-3/4 gap-1 ${
                currentSpeaker === "client" ? "text-blue-600" : "text-gray-400"
              }`}
              style={{
                display: currentSpeaker === "client" ? "block" : "none",
              }} // Hide if not active
            >
              <canvas
                ref={clientCanvasRef}
                className="w-full h-full text-current"
              />
            </div>

            <div
              className={`relative flex items-center h-20 w-3/4 gap-1 ${
                currentSpeaker === "server" ? "text-green-600" : "text-gray-400"
              }`}
              style={{
                display: currentSpeaker === "server" ? "block" : "none",
              }} // Hide if not active
            >
              <canvas
                ref={serverCanvasRef}
                className="w-full h-full text-current"
              />
            </div>
          </div>

          <div
            ref={conversationScrollRef}
            className="flex-1 h-[600px] overflow-auto mb-10 py-2"
          >
            <div className="mb-5 flex flex-col py-2 gap-3">
              {!items.length && `Umute your mic to start a conversation.`}
              {items.map((conversationItem, i) => {
                const isAssistant = conversationItem.role === "assistant";
                const isUser = conversationItem.role === "user";

                return (
                  <div
                    className="flex flex-col gap-2"
                    key={conversationItem.id}
                  >
                    {/* Message content */}
                    <div
                      className={`flex items-start ${
                        isAssistant ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={
                            isAssistant
                              ? "/path/to/assistant-avatar.png"
                              : "/path/to/user-avatar.png"
                          }
                          alt={isAssistant ? "Assistant Avatar" : "User Avatar"}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Message bubble */}
                      <div
                        className={`max-w-[70%] p-2 rounded-lg shadow-sm ${
                          isAssistant
                            ? "text-white  text-sm font-medium" // Assistant message
                            : " text-white text-sm  font-medium" // User message
                        }`}
                      >
                        {/* Tool call */}
                        {conversationItem.type === "function_call_output" && (
                          <div className="text-sm">
                            {conversationItem.formatted.output}
                          </div>
                        )}

                        {/* Tool details */}
                        {!!conversationItem.formatted.tool && (
                          <div className="text-sm text-gray-700">
                            {conversationItem.formatted.tool.name} (
                            {conversationItem.formatted.tool.arguments})
                          </div>
                        )}

                        {/* User message */}
                        {!conversationItem.formatted.tool &&
                          conversationItem.role === "user" && (
                            <div className="text-sm">
                              {conversationItem.formatted.transcript ||
                                (conversationItem.formatted.audio?.length
                                  ? "(awaiting transcript)"
                                  : conversationItem.formatted.text ||
                                    "(item sent)")}
                            </div>
                          )}

                        {/* Assistant message */}
                        {!conversationItem.formatted.tool &&
                          conversationItem.role === "assistant" && (
                            <div className="text-sm">
                              {conversationItem.formatted.transcript ||
                                conversationItem.formatted.text ||
                                "(truncated)"}
                            </div>
                          )}

                        {/* Audio file */}
                        {conversationItem.formatted.file && (
                          <AudioWithWaveform
                            audioUrl={conversationItem.formatted.file.url}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-row grow-0 shrink-0 items-start justify-between gap-1">
            <Toggle
              defaultValue={false}
              labels={["Manual", "Auto"]}
              values={["none", "server_vad"]}
              onChange={(_, value) => changeTurnEndType(value)}
            />

            <div>
              {isConnected && canPushToTalk && (
                <div
                  onClick={() => {}}
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  className="flex flex-col gap-1 items-center justify-center font-bold"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[#D6CBFF4D] rounded-full ">
                    <Sound size="24" color="#FFF" />
                  </div>
                  {isRecording ? "Release to send" : "Push to talk"}
                </div>
              )}
            </div>

            {/* {isConnected && canPushToTalk && (
              <RealtimeButton
                label={isRecording ? "release to send" : "push to talk"}
                buttonStyle={isRecording ? "alert" : "regular"}
                disabled={!isConnected || !canPushToTalk}
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                className="bg-green-500 px-4 py-2 rounded-full"
              />
            )} */}

            <div className="w-16">
              {isConnected ? (
                <div
                  onClick={disconnectConversation}
                  className="flex flex-col gap-1 items-center justify-center font-bold"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[#D6CBFF4D] rounded-full ">
                    <Microphone2 size="24" color="#FFF" />
                  </div>
                  Mute
                </div>
              ) : (
                <div
                  onClick={connectConversation}
                  className="flex flex-col gap-1 items-center justify-center font-bold"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[#D40C0C52] rounded-full ">
                    <MicrophoneSlash size="24" color="#F2B4B4" />
                  </div>
                  Unmute
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthNavLayout>
  );
};

export default RealtimeInteraction;
