"use client";

import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoProps {
  hostName: string;
  hostIdentity: string;
}

export const Video = ({ hostName, hostIdentity }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  if (connectionState === ConnectionState.Connected && !participant) {
    content = <OfflineVideo username={hostName} />;
  } else if (
    connectionState === ConnectionState.Connected &&
    participant &&
    tracks.length === 0
  ) {
    content = <LoadingVideo label="Preparing stream..." />;
  } else if (
    connectionState === ConnectionState.Connected &&
    participant &&
    tracks.length > 0
  ) {
    content = <LiveVideo participant={participant} />;
  } else {
    content = <LoadingVideo label={connectionState} />;
  }

  return <div className="aspect-video border-b group relative">{content}</div>;
};

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-b group relative bg-muted">
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-pulse">🎮</div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-48 mx-auto" />
            <Skeleton className="h-3 w-32 mx-auto" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-14 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
        <div className="flex items-center justify-between h-full px-2 sm:px-4">
          <div className="flex items-center gap-1 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-2">
              <Skeleton className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" />
              <Skeleton className="h-3 w-12 sm:w-16" />
            </div>
            <Skeleton className="h-3 w-20 sm:w-24" />
          </div>
          <div className="flex items-center gap-1 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="w-16 h-1" />
            </div>
            <Skeleton className="sm:hidden w-4 h-4" />
            <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
