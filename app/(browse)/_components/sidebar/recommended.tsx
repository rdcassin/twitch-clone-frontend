"use client";

import { useSidebar } from "@/lib/store/sidebar";
import { User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

interface RecommendedProps {
  data: (User & {
    stream: { isLive: boolean } | null;
  })[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { isCollapsed } = useSidebar();

  const showLabel = !isCollapsed && data.length > 0;

  if (!data.length) {
    return (
      <div className="text-center text-muted-foreground p-4 italic">
        🗺️ All known realms explored.
        <br />⏳ Check back soon for new adventures!
      </div>
    );
  }

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">🗺️ New Adventures</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <>
      <div className="text-xs text-center text-muted-foreground mb-2">
        🌌 Scanning the skies for new adventures...
      </div>
      <ul className="px-2">
        {[...Array(3)].map((_, i) => (
          <UserItemSkeleton key={i} />
        ))}
      </ul>
    </>
  );
};
