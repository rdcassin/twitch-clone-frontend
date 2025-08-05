"use client";

import { restoreAdventurer } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
  userId: string;
}

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleResult = (result?: { success: boolean; message: string }) => {
    if (result && result.success) {
      toast.success(result.message);
    } else if (result && result.message) {
      toast.error(result.message);
    } else {
      toast.error("🚫 Failed to restore adventurer");
    }
  };

  const onClick = () => {
    startTransition(() => {
      restoreAdventurer(userId).then(handleResult);
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="w-full text-xs sm:text-sm py-1 sm:py-2 text-emerald-600"
    >
      🕊️ Restore
    </Button>
  );
};
