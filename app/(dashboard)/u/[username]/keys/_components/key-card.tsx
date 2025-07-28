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
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <div className="flex items-center gap-x-2">
          <p>{icon}</p>
          <p className="font-semibold shrink-0">{label}</p>
        </div>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={show ? "text" : "password"}
              disabled
              placeholder="Your secret streaming key"
            />
            <CopyButton value={value || ""} />
          </div>
          <Button size="sm" variant="link" onClick={() => setShow(!show)}>
            {show ? "🙈 Hide Key" : "👁️ Show Key"}
          </Button>
        </div>
      </div>
    </div>
  );
};
