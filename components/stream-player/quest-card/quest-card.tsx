"use client";

import { QuestCardModal } from "./quest-card-modal";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface QuestCardProps {
  questName: string;
  thumbnailUrl: string | null;
  hostIdentity: string;
  viewerIdentity: string;
}

export const QuestCard = ({
  questName,
  thumbnailUrl,
  hostIdentity,
  viewerIdentity,
}: QuestCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1 sm:mb-2">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            <span className="hidden sm:inline">🎯</span>
            Quest Card
          </div>
          <div className="w-full sm:w-auto">
            <QuestCardModal
              defaultName={questName}
              defaultThumbnailUrl={thumbnailUrl}
            />
          </div>
        </div>
        <div className="flex items-center gap-x-3 text-xs text-muted-foreground mb-1 sm:mb-2">
          <span className="hidden sm:inline">
            📝 Edit your quest’s name and banner below
          </span>
        </div>
        <Separator />
        <div className="pt-4 lg:pt-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Quest Name</h3>
            <p className="text-sm font-semibold">{questName}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Quest Banner</h3>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10 mx-auto">
                <Image fill src={thumbnailUrl} alt={questName} />
              </div>
            ) : (
              <div className="text-xs text-muted-foreground italic">
                No banner set for this quest.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
