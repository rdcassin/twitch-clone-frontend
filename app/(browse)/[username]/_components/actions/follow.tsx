"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface FollowResult {
  success: boolean;
  message: string;
}

interface FollowProps {
  isFollowing: boolean;
  userId: string;
}

export const Follow = ({ isFollowing, userId }: FollowProps) => {
  const [isPending, startTransition] = useTransition();

  const handleResult = ({ success, message }: FollowResult) => {
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const onClick = async () => {
    startTransition(() => {
      if (isFollowing) {
        onUnfollow(userId).then(handleResult);
      } else {
        onFollow(userId).then(handleResult);
      }
    });
  };

  return (
    <Button variant="primary" onClick={onClick} disabled={isPending}>
      {isFollowing ? "👋 Leave Party" : "🎮 Join Party"}
    </Button>
  );
};
