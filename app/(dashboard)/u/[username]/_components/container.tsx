"use client";

import { useQuestCommandSidebar } from "@/lib/store/quest-command-sidebar";
import { cn } from "@/lib/utils/utils";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const { isCollapsed } = useQuestCommandSidebar();

  return (
    <div
      className={cn(
        "flex-1 transition-all duration-300",
        "ml-[70px]",
        !isCollapsed && "lg:ml-60",
      )}
    >
      {children}
    </div>
  );
};
