"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { joinParty, leaveParty } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface ActionsProps {
  hostIdentity: string;
  isHost: boolean;
  isFollowing: boolean;
}

export const Actions = ({
  isHost,
  hostIdentity,
  isFollowing,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  const handleFollow = () => {
    startTransition(() => {
      if (isFollowing) {
        leaveParty(hostIdentity)
          .then((result) => {
            if (result.success) {
              toast.success(result.message);
            } else {
              toast.error(result.message);
            }
          })
          .catch(() => toast.error("⚠️ Quest party action failed"));
      } else {
        joinParty(hostIdentity)
          .then((result) => {
            if (result.success) {
              toast.success(result.message);
            } else {
              toast.error(result.message);
            }
          })
          .catch(() => toast.error("⚠️ Quest party action failed"));
      }
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sign-in");
    }
    if (isHost) return;
    handleFollow();
  };

  return (
    <div className="flex items-center">
      {!isHost && (
        <Button
          variant="primary"
          size="sm"
          className={cn(
            "w-full sm:w-auto",
            isFollowing && "hover:bg-red-500/20 hover:text-red-500",
          )}
          onClick={toggleFollow}
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-x-2">
              <div className="animate-spin">⚡</div>
              <span className="hidden sm:inline">
                {isFollowing ? "Leaving..." : "Joining..."}
              </span>
            </div>
          ) : (
            <span className="lg:inline">
              {isFollowing ? "👋 Leave Party" : "🎮 Join Party"}
            </span>
          )}
        </Button>
      )}
    </div>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
