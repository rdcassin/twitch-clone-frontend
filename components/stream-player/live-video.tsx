"use client";

import { Participant, Track } from "livekit-client";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useTracks } from "@livekit/components-react";
import { VolumeControl } from "./volume-control";
import { FullscreenControl } from "./fullscreen-control";

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const onVolumeChange = useCallback((value: number) => {
    setVolume(value);
  }, []);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = volume === 0;
      videoRef.current.volume = volume * 0.01;
    }
  }, [volume]);

  const toggleMute = useCallback(() => {
    const isMuted = volume === 0;
    const newVolume = isMuted ? 50 : 0;
    setVolume(newVolume);
  }, [volume]);

  useEffect(() => {
    setVolume(0);
  }, []);

  const allTracks = useTracks([Track.Source.Camera, Track.Source.Microphone]);

  const tracks = useMemo(() => {
    return allTracks.filter(
      (track) => track.participant.identity === participant.identity,
    );
  }, [allTracks, participant.identity]);

  const videoTrack = useMemo(() => {
    return tracks.find((track) => track.source === Track.Source.Camera);
  }, [tracks]);

  useEffect(() => {
    if (videoTrack && videoRef.current) {
      videoTrack.publication.track?.attach(videoRef.current);
    }

    return () => {
      if (videoTrack) {
        videoTrack?.publication.track?.detach();
      }
    };
  }, [videoTrack]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      wrapperRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        width="100%"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-14 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <div className="flex items-center justify-between h-full px-2 sm:px-4">
            <div className="flex items-center gap-1 sm:gap-3 min-w-0 flex-1">
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white text-xs sm:text-sm font-medium">
                  🔴 Live
                </span>
              </div>
              <span className="text-white/80 text-xs sm:text-sm truncate">
                🎯 {participant.name || participant.identity}
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
              <div className="hidden sm:block">
                <VolumeControl
                  value={volume}
                  onChange={onVolumeChange}
                  onToggle={toggleMute}
                />
              </div>
              <div className="sm:hidden flex items-center gap-1">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-white/80 p-1"
                >
                  {volume === 0 ? "🔇" : "🔊"}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                  className="w-12 h-1 bg-white/20 rounded-lg appearance-none slider-thumb"
                  style={{
                    background: `linear-gradient(to right, #ffffff ${volume}%, #ffffff20 ${volume}%)`,
                  }}
                />
              </div>

              <FullscreenControl
                isFullscreen={isFullscreen}
                onToggle={toggleFullscreen}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
