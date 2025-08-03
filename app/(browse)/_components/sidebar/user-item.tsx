"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/lib/store/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";
import { LiveBadge } from "@/components/live-badges";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

export const UserItem = ({ username, imageUrl, isLive }: UserItemProps) => {
  const pathname = usePathname();

  const { isCollapsed } = useSidebar();

  const href = `/${username}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        isCollapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent",
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4",
            isCollapsed && "justify-center",
          )}
        >
          <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />
          {!isCollapsed && <p className="truncate">{username}</p>}
          {!isCollapsed && isLive && <LiveBadge className="ml-auto" />}
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
