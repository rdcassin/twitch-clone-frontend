"use client";

import { VerifiedMark } from "@/components/verified-mark";
import { AboutCardModal } from "./about-card-modal";
import { Separator } from "@/components/ui/separator";

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  partySize: number;
  isVerified?: boolean;
}

export const AboutCard = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  partySize,
  isVerified,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const partySizeLabel = partySize === 1 ? "Adventurer" : "Adventurers";

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3 shadow-lg">
        <div className="flex items-center justify-between mb-1 sm:hidden">
          <div className="flex items-center gap-x-2 font-semibold text-lg">
            {hostName}
            {"'s Chronicles"}
          </div>
          {isVerified && <VerifiedMark />}
        </div>
        <div className="hidden sm:flex items-center justify-between mb-2">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            <span className="inline">🧙</span>
            {hostName}
            {"'s Chronicles"}
            {isVerified && <VerifiedMark />}
          </div>
          {isHost && (
            <div className="w-auto ml-4">
              <AboutCardModal initialValue={bio} />
            </div>
          )}
        </div>
        {isHost && (
          <div className="w-full sm:hidden mb-1">
            <AboutCardModal initialValue={bio} />
          </div>
        )}
        <Separator />
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <span className="font-semibold text-primary">{partySize}</span>{" "}
          <span>{partySizeLabel}</span>
        </div>
        <div className="text-sm italic text-muted-foreground mb-1">
          {bio || "This adventurer keeps their legend secret (for now)."}
        </div>
      </div>
    </div>
  );
};
