"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/lib/store/chat-sidebar";

export const ChatToggle = () => {
  const { isCollapsed, toggleCollapse } = useChatSidebar();

  const Icon = isCollapsed ? ChevronLeft : ChevronRight;
  const label = isCollapsed ? "Show Party Chat" : "Hide Party Chat";
  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={toggleCollapse}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};
