"use client";

import React from "react";
import { useEffect, useRef, useCallback, useState } from "react";
import { RealtimeClient } from "@openai/realtime-api-beta";
import { ItemType } from "@openai/realtime-api-beta/dist/lib/client.js";
import { WavRecorder, WavStreamPlayer } from "./wavtools/index";
import { instructions } from "./utils/conversation_config.js";
import { WavRenderer } from "./utils/wav_renderer";

import { X, Edit, Zap, ArrowUp, ArrowDown } from "lucide-react";
import AuthLayout from "@/containers/layout/auth/auth.layout";
import Button from "@/components/button";
import Image from "next/image";
import { Toggle } from "./components/toggle";
import { RealtimeButton } from "./components/realtimeButton";

const LOCAL_RELAY_SERVER_URL: string =
  process.env.REACT_APP_LOCAL_RELAY_SERVER_URL || "";

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

const Realtime = () => {
  // const apiKey = LOCAL_RELAY_SERVER_URL
  //   ? ""
  //   : localStorage.getItem("tmp::voice_api_key") ||
  //     prompt("OpenAI API Key") ||
  //     "";
  // if (apiKey !== "") {
  //   localStorage.setItem("tmp::voice_api_key", apiKey);
  // }

  const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;

  const wavRecorderRef = useRef<WavRecorder>(
    new WavRecorder({ sampleRate: 24000 })
  );

  const wavStreamPlayerRef = useRef<WavStreamPlayer>(
    new WavStreamPlayer({ sampleRate: 24000 })
  );

  const clientRef = useRef<RealtimeClient>(
    new RealtimeClient(
      LOCAL_RELAY_SERVER_URL
        ? { url: LOCAL_RELAY_SERVER_URL }
        : {
            apiKey: apiKey,
            dangerouslyAllowAPIKeyInBrowser: true,
          }
    )
  );

  const clientCanvasRef = useRef<HTMLCanvasElement>(null);
  const serverCanvasRef = useRef<HTMLCanvasElement>(null);
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
        if (clientCanvas) {
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
              10,
              0,
              8
            );
          }
        }
        if (serverCanvas) {
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
              "#009900",
              10,
              0,
              8
            );
          }
        }
        window.requestAnimationFrame(render);
      }
    };
    render();

    return () => {
      isLoaded = false;
    };
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
    <AuthLayout>
      <div className="w-full min-h-screen text-white bg-[#0B0228] p-4 sm:p-6 flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-1">
            <Image
              src=""
              alt=""
              width={16}
              height={16}
              className="bg-red-500 w-6 h-6"
            />
            <span>realtime console</span>
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

        {/* Visualization Component */}
        <div className="p-1 rounded-xl z-10 gap-0.5 flex">
          <div className="relative flex items-center h-10 w-24 gap-1 client text-blue-500">
            <canvas
              ref={clientCanvasRef}
              className="w-full h-full text-current"
            />
          </div>
          <div className="relative flex items-center h-10 w-24 gap-1 server text-green-600">
            <canvas
              ref={serverCanvasRef}
              className="w-full h-full text-current"
            />
          </div>
        </div>

        {/* {events component} */}
        {/* <div className="">events</div>
        <div className="" ref={eventsScrollRef}>
          {!realtimeEvents.length && `awaiting connection...`}
          {realtimeEvents.map((realtimeEvent, i) => {
            const count = realtimeEvent.count;
            const event = { ...realtimeEvent.event };
            if (event.type === "input_audio_buffer.append") {
              event.audio = `[trimmed: ${event.audio.length} bytes]`;
            } else if (event.type === "response.audio.delta") {
              event.delta = `[trimmed: ${event.delta.length} bytes]`;
            }
            return (
              <div className="event" key={event.event_id}>
                <div className="event-timestamp">
                  {formatTime(realtimeEvent.time)}
                </div>
                <div className="event-details">
                  <div
                    className="event-summary"
                    onClick={() => {
                      // toggle event details
                      const id = event.event_id;
                      const expanded = { ...expandedEvents };
                      if (expanded[id]) {
                        delete expanded[id];
                      } else {
                        expanded[id] = true;
                      }
                      setExpandedEvents(expanded);
                    }}
                  >
                    <div
                      className={`event-source ${
                        event.type === "error" ? "error" : realtimeEvent.source
                      }`}
                    >
                      {realtimeEvent.source === "client" ? (
                        <ArrowUp />
                      ) : (
                        <ArrowDown />
                      )}
                      <span>
                        {event.type === "error"
                          ? "error!"
                          : realtimeEvent.source}
                      </span>
                    </div>
                    <div className="event-type">
                      {event.type}
                      {count && ` (${count})`}
                    </div>
                  </div>
                  {!!expandedEvents[event.event_id] && (
                    <div className="event-payload">
                      {JSON.stringify(event, null, 2)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div> */}

        {/* Conversation Component */}
        <div
          ref={conversationScrollRef}
          className="flex-1 mt-1 h-[500px] overflow-auto border border-white mb-20"
        >
          <div>conversation</div>
          <div className="h-[300px]">
            {!items.length && `awaiting connection...`}
            {items.map((conversationItem, i) => {
              return (
                <div key={conversationItem.id}>
                  <div className={`${conversationItem.role || ""}`}>
                    <div>
                      {(
                        conversationItem.role || conversationItem.type
                      ).replaceAll("_", " ")}
                    </div>
                    <div
                      onClick={() =>
                        deleteConversationItem(conversationItem.id)
                      }
                    >
                      <X />
                    </div>
                  </div>
                  <div>
                    {/* tool response */}
                    {conversationItem.type === "function_call_output" && (
                      <div>{conversationItem.formatted.output}</div>
                    )}
                    {/* tool call */}
                    {!!conversationItem.formatted.tool && (
                      <div>
                        {conversationItem.formatted.tool.name}(
                        {conversationItem.formatted.tool.arguments})
                      </div>
                    )}
                    {!conversationItem.formatted.tool &&
                      conversationItem.role === "user" && (
                        <div>
                          {conversationItem.formatted.transcript ||
                            (conversationItem.formatted.audio?.length
                              ? "(awaiting transcript)"
                              : conversationItem.formatted.text ||
                                "(item sent)")}
                        </div>
                      )}
                    {!conversationItem.formatted.tool &&
                      conversationItem.role === "assistant" && (
                        <div>
                          {conversationItem.formatted.transcript ||
                            conversationItem.formatted.text ||
                            "(truncated)"}
                        </div>
                      )}
                    {conversationItem.formatted.file && (
                      <audio
                        src={conversationItem.formatted.file.url}
                        controls
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Toolbar */}
      <div className="fixed bottom-2 flex items-center justify-center self-center text-white w-full max-w-[450px]">
        <div className="flex flex-col grow-0 shrink-0 items-center justify-center gap-1">
          <Toggle
            defaultValue={false}
            labels={["manual", "auto"]}
            values={["none", "server_vad"]}
            onChange={(_, value) => changeTurnEndType(value)}
          />

          <div className="flex-1" />

          <div className="flex flex-row items-center justify-center gap-4">
            {isConnected && canPushToTalk && (
              <RealtimeButton
                label={isRecording ? "release to send" : "push to talk"}
                buttonStyle={isRecording ? "alert" : "regular"}
                disabled={!isConnected || !canPushToTalk}
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                className="bg-green-500 px-4 py-2 rounded-full"
              />
            )}

            <div className="flex-1" />

            <RealtimeButton
              label={isConnected ? "disconnect" : "connect"}
              iconPosition={isConnected ? "end" : "start"}
              icon={isConnected ? X : Zap}
              buttonStyle={isConnected ? "regular" : "action"}
              onClick={
                isConnected ? disconnectConversation : connectConversation
              }
              className="bg-red-500 flex flex-row gap-2 px-4 py-2 rounded-full"
            />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Realtime;
