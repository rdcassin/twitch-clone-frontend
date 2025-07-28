import { ToggleCardSkeleton } from "./_components/toggle-card";

const ChatLoading = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="mb-4">
        <div className="h-8 w-64 bg-muted animate-pulse rounded mb-2" />
        <div className="h-4 w-96 bg-muted animate-pulse rounded" />
      </div>
      <div className="space-y-4">
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  );
};

export default ChatLoading;
