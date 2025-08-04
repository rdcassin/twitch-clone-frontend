import { Suspense } from "react";
import { redirect } from "next/navigation";
import {
  QuestSearchResults,
  QuestSearchResultsSkeleton,
} from "./_components/quest-search-results";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { q } = await searchParams;
  
  if (!q) {
    redirect("/");
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<QuestSearchResultsSkeleton />}>
        <QuestSearchResults term={q} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
