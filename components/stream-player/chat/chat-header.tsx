"use client";

import { useParticipants } from "@livekit/components-react";
import { ChatToggle } from "./chat-toggle";
import { VariantToggle } from "./variant-toggle";
import { ChatVariant, useChatSidebar } from "@/lib/store/chat-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatHeaderProps {
  hostIdentity: string;
  hostName: string;
}

export const ChatHeader = ({ hostIdentity, hostName }: ChatHeaderProps) => {
  const { variant } = useChatSidebar();
  const participants = useParticipants();

  const countUniqueAdventurers = (
    participants: { identity: string; name?: string }[],
    hostIdentity: string,
    hostName: string,
  ) => {
    const ids = new Set<string>();
    participants.forEach((participant) => {
      let idKey = participant.identity.replace(/^host-/, "");
      if (idKey === hostIdentity || participant.name === hostName) {
        idKey = hostIdentity;
      }
      ids.add(idKey);
    });
    return ids.size;
  };

  const participantCount = countUniqueAdventurers(
    participants,
    hostIdentity,
    hostName,
  );

  return (
    <div className="relative flex items-center h-12 border-b">
      <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden lg:block">
        <ChatToggle />
      </div>
      <p className="font-semibold text-primary text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {variant === ChatVariant.PARTY_CHAT
          ? "💬 Party Chat"
          : `👥 Adventurers (${participantCount})`}
      </p>
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <VariantToggle />
      </div>
    </div>
  );
};

export const ChatHeaderSkeleton = () => {
  return (
    <div className="relative p-3 border-b hidden md:block">
      <Skeleton className="absolute h-6 w-6 left-3 top-3" />
      <Skeleton className="w-28 h-6 mx-auto" />
    </div>
  );
};
