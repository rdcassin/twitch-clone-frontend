"use client";

import { useQuestCommandSidebar } from "@/lib/store/quest-command-sidebar";
import { cn } from "@/lib/utils";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import { ToggleSkeleton } from "./toggle";
import { useEffect } from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const isClient = useIsClient();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const { isCollapsed, setCollapsed } = useQuestCommandSidebar();

  useEffect(() => {
    if (isClient && isMobile) {
      setCollapsed(true);
    }
  }, [isClient, isMobile, setCollapsed]);

  if (!isClient)
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50 transition-all duration-300">
        <ToggleSkeleton />
      </aside>
    );

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50 transition-all duration-300",
        isCollapsed && "w-[70px]",
      )}
    >
      {children}
    </aside>
  );
};
