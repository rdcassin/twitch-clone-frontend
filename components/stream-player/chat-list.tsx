"use client";

import { ReceivedChatMessage } from "@livekit/components-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatMessage } from "./chat-message";

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export const ChatList = ({ messages, isHidden }: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <p className="text-xs sm:text-sm text-muted-foreground text-center">
          {isHidden
            ? "💬 Party chat is disabled"
            : "🎯 Welcome to the quest! Start the conversation..."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-2 sm:p-3 h-full">
      <div className="space-y-2 sm:space-y-3">
        {messages.map((message) => (
          <ChatMessage key={message.timestamp} data={message} />
        ))}
      </div>
    </div>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full p-3 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-start gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
