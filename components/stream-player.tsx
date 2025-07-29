"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            🎮 Preparing to join the quest...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <LiveKitRoom token={token} serverUrl={process.env.LIVEKIT_URL}>
        {`🎯 Ready to watch ${user.username}'s quest as ${name}!`}
      </LiveKitRoom>
    </>
  );
};
