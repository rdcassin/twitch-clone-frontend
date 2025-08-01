"use client";

import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { VerifiedMark } from "@/components/verified-mark";
import { Actions, ActionsSkeleton } from "./actions";
import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
  isVerified?: boolean;
  questName: string;
}

export const Header = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  imageUrl,
  isFollowing,
  isVerified,
  questName,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between px-3 sm:px-4 py-3 sm:py-4 bg-background border-b">
      <div className="flex items-center gap-x-3 min-w-0 flex-1">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          altBadge={true}
          isLive={isLive}
        />
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-base sm:text-lg font-semibold truncate">
              {hostName}
            </h2>
            {isVerified && <VerifiedMark />}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
            <span>🎯</span>
            <span className="truncate">{questName}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center w-full sm:w-auto">
        {isLive ? (
          <div className="font-semibold flex gap-x-2 items-center text-rose-400">
            <UserIcon className="h-4 w-4" />
            <p className="text-sm">{participantCount}</p>
            <p className="hidden lg:block text-xs">
              {participantCount === 1 ? "Adventurer" : "Adventurers"}
            </p>
          </div>
        ) : (
          <div className="font-semibold text-muted-foreground flex items-center gap-1">
            <span>⚫</span>
            <span className="text-sm">Quest Offline</span>
          </div>
        )}
        <Actions
          isFollowing={isFollowing}
          hostIdentity={hostIdentity}
          isHost={isHost}
        />
      </div>
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between px-3 sm:px-4 py-3 sm:py-4 bg-background border-b">
      <div className="flex items-center gap-x-3 min-w-0 flex-1">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center w-full sm:w-auto">
        <Skeleton className="h-4 w-16" />
        <ActionsSkeleton />
      </div>
    </div>
  );
};
