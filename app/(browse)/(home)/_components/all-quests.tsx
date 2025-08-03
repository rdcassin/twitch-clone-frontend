import { getStreams } from "@/lib/services/feed-service";
import { QuestCard, QuestCardSkeleton } from "./quest-card";
import { Skeleton } from "@/components/ui/skeleton";

export const AllQuests = async () => {
  const data = await getStreams();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">
        🌌 Quests Gathering Adventurers
      </h2>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm italic text-center mb-8">
          No quests are currently being undertaken.
          <br />
          Check back soon, or start your own legend!
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((stream) => (
          <QuestCard key={stream.id} data={stream} />
        ))}
      </div>
    </div>
  );
};

export const AllQuestsSkeleton = () => {
  return (
    <div>
      <div className="flex items-center mb-4 gap-x-3">
        <span className="animate-bounce text-2xl">🧭</span>
        <Skeleton className="h-8 w-[220px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(4)].map((_, i) => (
          <QuestCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
