"use client";

import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface KeyCardProps {
  value: string | null;
  icon?: string;
  label?: string;
}

export const KeyCard = ({ value, icon, label }: KeyCardProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-lg sm:rounded-xl bg-muted p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-x-10">
        <div className="flex items-center gap-x-2 flex-shrink-0">
          <span className="text-lg sm:text-xl">{icon}</span>
          <p className="font-semibold text-sm sm:text-base">{label}</p>
        </div>
        <div className="space-y-2 sm:space-y-3 w-full min-w-0">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={show ? "text" : "password"}
              disabled
              placeholder="Your secret streaming key"
              className="text-xs sm:text-sm font-mono"
            />
            <CopyButton value={value || ""} />
          </div>
          <Button
            size="sm"
            variant="link"
            onClick={() => setShow(!show)}
            className="h-auto p-0 text-xs sm:text-sm"
          >
            {show ? "🙈 Hide Key" : "👁️ Show Key"}
          </Button>
        </div>
      </div>
    </div>
  );
};
