"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInfo } from "./chat-info";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowing: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isChatSlowMode: boolean;
  isChatLinksAllowed: boolean;
  isChatProfanityFilter: boolean;
}

export const ChatForm = ({
  onSubmit,
  value,
  onChange,
  isHidden,
  isFollowing,
  isChatDelayed,
  isChatFollowersOnly,
  isChatSlowMode,
  isChatLinksAllowed,
  isChatProfanityFilter,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);
  const isChatFollowersOnlyAndNotFollowing =
    isChatFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isDelayBlocked || isChatFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isChatDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <form
      className="flex flex-col gap-y-2 sm:gap-y-4 p-2 sm:p-3"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <ChatInfo
          isChatDelayed={isChatDelayed}
          isChatFollowersOnly={isChatFollowersOnly}
          isChatSlowMode={isChatSlowMode}
          isChatLinksAllowed={isChatLinksAllowed}
          isChatProfanityFilter={isChatProfanityFilter}
        />
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder={
            isChatFollowersOnly && !isFollowing
              ? "Join the party to chat..."
              : "Share your quest thoughts..."
          }
          className={cn(
            "border-white/10 text-sm",
            isChatFollowersOnly && "rounded-t-none border-t-0",
          )}
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="blue"
          size="sm"
          disabled={isDisabled}
          className="px-4 py-2 text-sm"
        >
          {isDelayBlocked ? "⏱️ Sending..." : "💬 Chat"}
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};
