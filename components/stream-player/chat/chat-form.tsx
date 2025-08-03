"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/utils";
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
  isValidating: boolean;
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
  isValidating,
  isChatDelayed,
  isChatFollowersOnly,
  isChatSlowMode,
  isChatLinksAllowed,
  isChatProfanityFilter,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);
  const [isSlowModeBlocked, setIsSlowModeBlocked] = useState(false);
  const isChatFollowersOnlyAndNotFollowing =
    isChatFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden ||
    isDelayBlocked ||
    isSlowModeBlocked ||
    isValidating ||
    isChatFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isChatSlowMode && !isSlowModeBlocked) {
      setIsSlowModeBlocked(true);
      setTimeout(() => {
        setIsSlowModeBlocked(false);
      }, 5000);

      if (isChatDelayed && !isDelayBlocked) {
        setIsDelayBlocked(true);
        setTimeout(() => {
          setIsDelayBlocked(false);
          onSubmit();
        }, 3000);
      } else {
        onSubmit();
      }
    } else if (isChatDelayed && !isDelayBlocked && !isChatSlowMode) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else if (!isChatSlowMode && !isChatDelayed) {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }

  const getButtonText = () => {
    if (isValidating) return "🔍 Checking...";
    if (isSlowModeBlocked) return "🐌 Slow Mode...";
    if (isDelayBlocked) return "⏱️ Sending...";
    return "💬 Chat";
  };

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
            (isChatFollowersOnly || isChatDelayed) &&
              "rounded-t-none border-t-0",
          )}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" variant="blue" size="sm" disabled={isDisabled}>
          {getButtonText()}
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
