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
