"use client";

import { ChatVariant, useChatSidebar } from "@/lib/store/chat-sidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useMemo, useState } from "react";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { validateChatMessage } from "@/actions/chat-validation";
import { toast } from "sonner";
import { ChatAll } from "./chat-all";

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
  const { variant } = useChatSidebar();
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState("");
  const { chatMessages: messages, send } = useChat();
  const [isValidating, setIsValidating] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const sortedMessages = useMemo(() => {
    return messages.sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);

  const onSubmit = async () => {
    if (!send || isValidating) return;

    setIsValidating(true);

    try {
      const validation = await validateChatMessage(value, hostIdentity);

      if (!validation.valid) {
        toast.error(validation.reason);
        return;
      }

      const messageToSend = validation.cleanedMessage || value;

      if (validation.cleanedMessage && validation.cleanedMessage !== value) {
        toast.info("🛡️ Message was filtered for quest safety");
      }

      send(messageToSend);
      setValue("");
      setIsTyping(false);
    } catch (error) {
      console.error("Chat validation failed:", error);
      toast.error("⚠️ Failed to send message. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  const onChange = (value: string) => {
    setValue(value);
    if (value.length > 0 && !isTyping) {
      setIsTyping(true);
    } else if (value.length === 0 && isTyping) {
      setIsTyping(false);
    }
  };

  if (!isChatEnabled) {
    return (
      <div className="flex flex-col justify-center items-center h-full space-y-3 sm:space-y-4 p-4 sm:p-6">
        <div className="text-4xl sm:text-6xl animate-pulse">⚔️</div>
        <div className="text-center space-y-2 max-w-xs sm:max-w-none px-2">
          <h3 className="text-base sm:text-lg font-semibold">
            🤫 Silent Quest Mode
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm">
            This adventure requires focus - party chat has been disabled
          </p>
          <p className="text-xs text-muted-foreground italic hidden lg:block">
            {"Sometimes the greatest quests are undertaken in silence..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader hostIdentity={hostIdentity} hostName={hostName} />
      {variant === ChatVariant.PARTY_CHAT && (
        <>
          <ChatList messages={sortedMessages} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowing={isFollowing}
            isValidating={isValidating}
            isChatDelayed={isChatDelayed}
            isChatFollowersOnly={isChatFollowersOnly}
            isChatSlowMode={isChatSlowMode}
            isChatLinksAllowed={isChatLinksAllowed}
            isChatProfanityFilter={isChatProfanityFilter}
          />
        </>
      )}
      {variant === ChatVariant.ADVENTURERS && (
        <ChatAll
          viewerName={viewerName}
          hostName={hostName}
          hostIdentity={hostIdentity}
        />
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
