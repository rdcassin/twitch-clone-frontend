// import { getSearch } from "@/lib/search-service";
import { Skeleton } from "@/components/ui/skeleton";

import { QuestCard, QuestCardSkeleton } from "./quest-card";
import { getSearch } from "@/lib/services/search-service";

interface QuestSearchResultsProps {
  term?: string;
}

export const QuestSearchResults = async ({ term }: QuestSearchResultsProps) => {
  const data = await getSearch(term);

  return (
    <div>
      <h2 className="text-base sm:text-lg font-semibold mb-4">
        {`🔍 Results for "${term}"`}
      </h2>
      {data.length === 0 && (
        <p className="text-muted-foreground text-xs sm:text-sm italic text-center">
          No matching quests found. Search for a party, streamer, or adventure!
        </p>
      )}
      <div className="flex flex-col gap-y-4">
        {data.map((stream) => (
          <QuestCard data={stream} key={stream.id} />
        ))}
      </div>
    </div>
  );
};

export const QuestSearchResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, i) => (
          <QuestCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
