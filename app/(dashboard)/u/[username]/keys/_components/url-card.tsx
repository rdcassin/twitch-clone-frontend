"use client";

import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";

interface UrlCardProps {
  value: string | null;
  icon?: string;
  label?: string;
}

export const UrlCard = ({ value, icon, label }: UrlCardProps) => {
  return (
    <div className="rounded-lg sm:rounded-xl bg-muted p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-x-10">
        <div className="flex items-center gap-x-2 flex-shrink-0">
          <span className="text-lg sm:text-xl">{icon}</span>
          <p className="font-semibold text-sm sm:text-base">{label}</p>
        </div>
        <div className="w-full min-w-0">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              disabled
              placeholder="Your quest server URL"
              className="text-xs sm:text-sm font-mono"
            />
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};
