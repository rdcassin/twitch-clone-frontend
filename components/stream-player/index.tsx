"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "@/components/stream-player/video/video";
import { useChatSidebar } from "@/lib/store/chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat, ChatSkeleton } from "@/components/stream-player/chat/chat";
import { ChatToggle } from "@/components/stream-player/chat/chat-toggle";
import {
  Header,
  HeaderSkeleton,
} from "@/components/stream-player/header/header";
import { QuestCard } from "@/components/stream-player/quest-card/quest-card";
import { AboutCard } from "@/components/stream-player/about-card/about-card";

interface StreamPlayerProps {
  user: User & {
    stream: Stream | null;
    _count: { userFollowers: number };
  };
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
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            questName={stream.name}
          />
          <QuestCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            questName={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            partySize={user._count.userFollowers}
          />
        </div>
        <div className={cn("col-span-1 mt-4", isCollapsed && "hidden")}>
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
          <HeaderSkeleton />
        </div>
        <div className={cn("col-span-1", isCollapsed && "hidden")}>
          <ChatSkeleton />
        </div>
      </div>
    </>
  );
};
