"use client";

import { banishAdventurer, welcomeBackAdventurer } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface BlockProps {
  isBlocking: boolean;
  userId: string;
}

export const Block = ({ isBlocking, userId }: BlockProps) => {
  const [isPending, startTransition] = useTransition();

  const handleResult = (result: { success: boolean; message?: string }) => {
    if (result.success) {
      toast.success(result.message || "⚔️ Adventurer banished from the quest!");
    } else {
      toast.error(result.message || "🚫 Failed to banish adventurer");
    }
  };

  const onClick = async () => {
    startTransition(() => {
      if (isBlocking) {
        welcomeBackAdventurer(userId).then(handleResult);
      } else {
        banishAdventurer(userId).then(handleResult);
      }
    });
  };

  return (
    <Button variant="banish" onClick={onClick} disabled={isPending}>
      {isBlocking ? "🕊️ Restore Adventurer" : "🛡️ Banish Adventurer"}
    </Button>
  );
};
