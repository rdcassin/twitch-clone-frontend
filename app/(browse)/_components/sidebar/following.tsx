"use client";

import { useSidebar } from "@/lib/store/sidebar";
import { Follow, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null;
    };
  })[];
}

export const Following = ({ data }: FollowingProps) => {
  const { isCollapsed } = useSidebar();

  if (!data.length) {
    return (
      <div className="text-center text-muted-foreground p-4 italic">
        👥 No party members assemble yet.
        <br />
        🎯 Seek out new adventurers to start your quest!
      </div>
    );
  }

  return (
    <div>
      {!isCollapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">👥 Your Party</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <>
      <div className="text-xs text-center text-muted-foreground mb-2">
        🧙‍♂️ Consulting the ancient scrolls...
        <br />
        Please wait while party members are summoned!
      </div>
      <ul className="px-2 pt-2 lg:pt-0">
        {[...Array(3)].map((_, i) => (
          <UserItemSkeleton key={i} />
        ))}
      </ul>
    </>
  );
};
