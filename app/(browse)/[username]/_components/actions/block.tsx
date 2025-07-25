"use client";

import { banishAdventurer, welcomeBackAdventurer } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface BlockResult {
  success: boolean;
  message: string;
}

interface BlockProps {
  isBlocking: boolean;
  userId: string;
}

export const Block = ({ isBlocking, userId }: BlockProps) => {
  const [isPending, startTransition] = useTransition();

  const handleResult = ({ success, message }: BlockResult) => {
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
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
    <Button 
      variant="banish" 
      onClick={onClick} 
      disabled={isPending}
    >
      {isBlocking ? "🕊️ Restore Adventurer" : "🛡️ Banish Adventurer"}
    </Button>
  );
};