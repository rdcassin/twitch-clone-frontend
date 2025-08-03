import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AltLiveBadge } from "@/components/live-badges";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  altBadge?: boolean;
}

export const UserAvatar = ({
  username,
  imageUrl,
  isLive,
  altBadge,
  size,
}: UserAvatarProps) => {
  const canShowBadge = altBadge && isLive;

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSizes({ size }),
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <AltLiveBadge />
        </div>
      )}
    </div>
  );
};

export const UserAvatarSkeleton = ({
  size,
}: VariantProps<typeof avatarSizes>) => {
  return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
};
