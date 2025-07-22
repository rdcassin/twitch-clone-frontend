"use client";

import { useSidebar } from "@/lib/store/sidebar";
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const {
    isCollapsed,
    isMobileOpen,
    toggleCollapse,
    toggleMobile,
    setCollapsed,
    setMobileOpen,
  } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        isCollapsed && "w-[70px]",
      )}
    >
      {children}
    </aside>
  );
};
