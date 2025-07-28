"use client";

import { Switch } from "@/components/ui/switch";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface StreamResult {
  success: boolean;
  message: string;
}

type FieldTypes =
  | "isChatEnabled"
  | "isChatDelayed"
  | "isChatFollowersOnly"
  | "isChatSlowMode"
  | "isChatLinksAllowed"
  | "isChatProfanityFilter";

interface ToggleCardProps {
  field: FieldTypes;
  label: string;
  value: boolean;
}

export const ToggleCard = ({
  field,
  label,
  value = false,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const handleResult = ({ success, message }: StreamResult) => {
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value }).then(handleResult);
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <Switch
          checked={value}
          onCheckedChange={onChange}
          disabled={isPending}
        />
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};
