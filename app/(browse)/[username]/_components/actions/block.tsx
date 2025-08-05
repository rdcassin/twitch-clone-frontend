"use client";

import { banishAdventurer, restoreAdventurer } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface BlockProps {
  isBlocking: boolean;
  userId: string;
}

export const Block = ({ isBlocking, userId }: BlockProps) => {
  const [isPending, startTransition] = useTransition();

  const handleResult = (result?: { success: boolean; message: string }) => {
    if (result && result.success) {
      toast.success(result.message);
    } else if (result && result.message) {
      toast.error(result.message);
    } else {
      toast.error("🚫 Failed to banish adventurer");
    }
  };

  const onClick = async () => {
    startTransition(() => {
      if (isBlocking) {
        restoreAdventurer(userId).then(handleResult);
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
