"use client";

import { MessageSquare, Users } from "lucide-react";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ChatVariant, useChatSidebar } from "@/lib/store/chat-sidebar";

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar();

  const isChat = variant === ChatVariant.PARTY_CHAT;

  const Icon = isChat ? Users : MessageSquare;

  const onToggle = () => {
    const newVariant = isChat
      ? ChatVariant.ADVENTURERS
      : ChatVariant.PARTY_CHAT;
    onChangeVariant(newVariant);
  };

  const label = isChat ? "All Adventurers" : "Party Only";

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};
