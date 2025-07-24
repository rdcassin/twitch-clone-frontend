"use client";

import { useSidebar } from "@/lib/store/sidebar";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const { isCollapsed } = useSidebar();

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
