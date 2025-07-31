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
  description?: string;
}

export const ToggleCard = ({
  field,
  label,
  value = false,
  description,
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
    <div className="rounded-lg sm:rounded-xl bg-muted p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm sm:text-base mb-1 sm:mb-0">
            {label}
          </p>
          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 self-start sm:self-center">
          <Switch
            checked={value}
            onCheckedChange={onChange}
            disabled={isPending}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return (
    <div className="rounded-lg sm:rounded-xl bg-muted p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32 sm:w-40" />
          <Skeleton className="h-3 w-48 sm:w-64" />
        </div>
        <Skeleton className="h-6 w-11 rounded-full" />
      </div>
    </div>
  );
};
