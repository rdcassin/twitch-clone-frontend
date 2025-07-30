"use client";

import { ChatVariant, useChatSidebar } from "@/lib/store/chat-sidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader } from "./chat-header";
import { ChatForm } from "./chat-form";
import { ChatList } from "./chat-list";

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isChatSlowMode: boolean;
  isChatLinksAllowed: boolean;
  isChatProfanityFilter: boolean;
}

export const Chat = ({
  viewerName,
  hostName,
  hostIdentity,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
  isChatSlowMode,
  isChatLinksAllowed,
  isChatProfanityFilter,
}: ChatProps) => {
  const {
    isCollapsed,
    variant,
    toggleCollapse,
    setCollapsed,
    onChangeVariant,
  } = useChatSidebar();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;
  const isDisabled = !isChatEnabled || (isChatFollowersOnly && !isFollowing);

  const [value, setValue] = useState("");
  const { chatMessages: messages, send } = useChat();

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  if (!isChatEnabled) {
    return (
      <div className="flex flex-col justify-center items-center h-full space-y-3">
        <div className="text-4xl">💬</div>
        <div className="text-center">
          <p className="text-muted-foreground text-sm font-medium">
            Party chat is disabled
          </p>
          <p className="text-muted-foreground text-xs">
            The quest leader has disabled party communication
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.PARTY_CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowing={isFollowing}
            isChatDelayed={isChatDelayed}
            isChatFollowersOnly={isChatFollowersOnly}
            isChatSlowMode={isChatSlowMode}
            isChatLinksAllowed={isChatLinksAllowed}
            isChatProfanityFilter={isChatProfanityFilter}
          />
        </>
      )}
      {variant === ChatVariant.ADVENTURERS && (
        <>
          <p>All Adventurers</p>
        </>
      )}
    </div>
  );
};
