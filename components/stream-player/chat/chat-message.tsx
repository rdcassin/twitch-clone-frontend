"use client";

import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { format } from "date-fns";

interface ChatMessageProps {
  data: ReceivedChatMessage;
}

export const ChatMessage = ({ data }: ChatMessageProps) => {
  const color = stringToColor(data.from?.name || "");

  return (
    <div className="flex gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-md hover:bg-white/5 transition-colors">
      <div className="mt-0.5 flex-shrink-0">
        <div
          className="h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center text-xs font-bold text-white border border-white/20"
          style={{ backgroundColor: color }}
        >
          🎯
        </div>
      </div>
      <div className="flex flex-col w-full min-w-0">
        <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
          <p
            className="text-xs sm:text-sm font-semibold truncate"
            style={{ color }}
          >
            {data.from?.name || data.from?.identity || "Anonymous Adventurer"}
          </p>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {format(new Date(data.timestamp), "HH:mm")}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-white break-words leading-relaxed">
          {data.message}
        </p>
      </div>
    </div>
  );
};
