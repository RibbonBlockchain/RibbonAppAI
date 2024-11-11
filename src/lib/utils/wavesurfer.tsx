import React, { useEffect, useRef } from "react";
import { Pause, PauseCircle, Play } from "iconsax-react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";

interface AudioWithWaveformProps {
  audioUrl: string;
}

export const AudioWithWaveform: React.FC<AudioWithWaveformProps> = ({
  audioUrl,
}) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (audioUrl && waveformRef.current) {
      const options: WaveSurferOptions = {
        container: waveformRef.current,
        waveColor: "#fff",
        progressColor: "#1e7bfa",
        barWidth: 2,
        height: 40,
        normalize: true,
      };

      const wavesurfer = WaveSurfer.create(options);

      wavesurfer.load(audioUrl);

      wavesurferRef.current = wavesurfer;

      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
        }
      };
    }
  }, [audioUrl]);

  return (
    <div className="w-full flex flex-row items-center mt-2 relative">
      <button
        className="relative left-0 top-1/2 transform -translate-y-1/2"
        onClick={() => wavesurferRef.current?.playPause()}
      >
        {wavesurferRef.current?.isPlaying() ? (
          <PauseCircle size="24" color="#FFF" />
        ) : (
          <Play size="24" color="#FFF" />
        )}
      </button>

      <div ref={waveformRef} className="w-full"></div>
    </div>
  );
};
