"use client";

import { ReceivedChatMessage } from "@livekit/components-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatMessage } from "./chat-message";

interface ChatListProps {
  messages: ReceivedChatMessage[];
}

export const ChatList = ({ messages }: ChatListProps) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <p className="text-xs sm:text-sm text-muted-foreground text-center">
          🎯 Welcome to the quest! Start the conversation...
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
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="text-center space-y-3">
        <Skeleton className="h-4 w-48 mx-auto" />
      </div>
    </div>
  );
};
