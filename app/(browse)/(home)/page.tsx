import { Suspense } from "react";
import { AllQuests, AllQuestsSkeleton } from "./_components/all-quests";

export default function Home() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      {/* The themed welcome, bold and centered */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
        🏰 Welcome to QuestHub
      </h1>
      {/* Tagline to engage the adventure vibe */}
      <p className="text-muted-foreground text-center mb-8 text-base">
        Discover live quests, join legendary adventurers, and carve your story!
      </p>
      <Suspense fallback={<AllQuestsSkeleton />}>
        <AllQuests />
      </Suspense>
    </div>
  );
}
