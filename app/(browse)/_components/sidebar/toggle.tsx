"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/lib/store/sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";

export const Toggle = () => {
  const { isCollapsed, toggleCollapse } = useSidebar();

  const label = isCollapsed ? "Expand" : "Collapse";

  return (
    <>
      {isCollapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button
              className="h-auto p-2"
              variant="ghost"
              onClick={toggleCollapse}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!isCollapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">⚔️ Your Quest</p>
          <Hint label={label} side="right" asChild>
            <Button
              className="h-auto p-2 ml-auto"
              variant="ghost"
              onClick={toggleCollapse}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};
