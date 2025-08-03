"use client";

import { useTransition } from "react";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { MinusCircle } from "lucide-react";
import { toast } from "sonner";
import { banishAdventurer } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";

interface AdventurerItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export const AdventurerItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: AdventurerItemProps) => {
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || "");

  const isSelf = participantName === viewerName;
  const isHost = participantName === hostName;
  const youAreHost = viewerName === hostName;

  const handleBlock = () => {
    if (!participantName || !youAreHost || isSelf || isHost) return;

    startTransition(() => {
      banishAdventurer(participantIdentity)
        .then((result) => {
          if (result.success) {
            toast.success(
              `⚔️ ${participantName} has been banished from the quest`,
            );
          } else {
            toast.error("⚠️ Failed to banish adventurer");
          }
        })
        .catch(() =>
          toast.error("⚠️ Something went wrong banishing the adventurer"),
        );
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none",
      )}
    >
      <div className="flex items-center gap-x-2">
        <div
          className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white border border-white/20"
          style={{ backgroundColor: color }}
        >
          {isHost ? "👑" : "🎯"}
        </div>
        <p className="font-semibold" style={{ color }}>
          {participantName || participantIdentity}
        </p>
        {isHost && (
          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
            Quest Leader
          </span>
        )}
        {isSelf && (
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
            You
          </span>
        )}
      </div>
      {!isSelf && !isHost && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Hint label="Banish adventurer" asChild>
            <Button
              onClick={handleBlock}
              variant="ghost"
              size="sm"
              className="h-auto w-auto p-1 text-muted-foreground hover:text-red-500"
              disabled={isPending}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </div>
  );
};
