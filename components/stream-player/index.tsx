"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "./video";
import { useChatSidebar } from "@/lib/store/chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat, ChatSkeleton } from "./chat/chat";
import { ChatToggle } from "./chat/chat-toggle";

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
  const { isCollapsed } = useChatSidebar();

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      {isCollapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          isCollapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2",
        )}
      >
        <div
          className={cn(
            "space-y-4 col-span-1 lg:overflow-y-auto hidden-scrollbar",
            isCollapsed
              ? "lg:col-span-2 xl:col-span-2 2xl:col-span-2"
              : "lg:col-span-2 xl:col-span-2 2xl:col-span-5",
          )}
        >
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>

        <div className={cn("col-span-1", isCollapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
            isChatSlowMode={stream.isChatSlowMode}
            isChatLinksAllowed={stream.isChatLinksAllowed}
            isChatProfanityFilter={stream.isChatProfanityFilter}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  const { isCollapsed } = useChatSidebar();

  return (
    <>
      {isCollapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <div
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          isCollapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2",
        )}
      >
        <div
          className={cn(
            "space-y-4 col-span-1 lg:overflow-y-auto hidden-scrollbar",
            isCollapsed
              ? "lg:col-span-2 xl:col-span-2 2xl:col-span-2"
              : "lg:col-span-2 xl:col-span-2 2xl:col-span-5",
          )}
        >
          <VideoSkeleton />
        </div>
        <div className={cn("col-span-1", isCollapsed && "hidden")}>
          <ChatSkeleton />
        </div>
      </div>
    </>
  );
};
