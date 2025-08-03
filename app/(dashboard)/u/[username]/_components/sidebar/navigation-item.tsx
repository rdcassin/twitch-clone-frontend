"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuestCommandSidebar } from "@/lib/store/quest-command-sidebar";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";

interface NavigationItemProps {
  icon: string;
  label: string;
  href: string;
  isActive: boolean;
}

export const NavigationItem = ({
  icon,
  label,
  href,
  isActive,
}: NavigationItemProps) => {
  const { isCollapsed } = useQuestCommandSidebar();

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
        <div className="flex items-center gap-x-4">
          <span
            className={cn(
              "h-4 w-4 flex items-center",
              isCollapsed ? "mr-0" : "mr-2",
            )}
          >
            {icon}
          </span>
          {!isCollapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export const NavigationItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
