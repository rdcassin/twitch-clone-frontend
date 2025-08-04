import { Suspense } from "react";
import { AllQuests, AllQuestsSkeleton } from "./_components/all-quests";

export default function Home() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-2">
        🏰 Welcome to Quest
      </h1>
      <p className="text-muted-foreground text-center mb-8 text-xs sm:text-base">
        Discover live quests, join legendary adventurers, and carve your story!
      </p>
      <Suspense fallback={<AllQuestsSkeleton />}>
        <AllQuests />
      </Suspense>
    </div>
  );
}
