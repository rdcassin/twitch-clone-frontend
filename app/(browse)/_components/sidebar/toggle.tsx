"use client";

import { useSidebar } from "@/lib/store/sidebar";

export const Toggle = () => {
  const {
    isCollapsed,
    isMobileOpen,
    toggleCollapse,
    toggleMobile,
    setCollapsed,
    setMobileOpen,
  } = useSidebar();

  return <div>Toggle!</div>;
};
