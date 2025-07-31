"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CopyButtonProps {
  value?: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (!value) return;

    navigator.clipboard.writeText(value);
    setIsCopied(true);

    const isKey = value.includes("sk_") || value.length > 20;
    const message = isKey
      ? "🔑 Secret quest key copied to clipboard!"
      : "🌐 Server URL copied to clipboard!";

    toast.success(message);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant="ghost"
      size="sm"
      className="flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10 p-0"
      aria-label={isCopied ? "Copied!" : "Copy to clipboard"}
    >
      <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
    </Button>
  );
};
