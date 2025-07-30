import { useMemo } from "react";
import { Hint } from "@/components/hint";

interface Badge {
  icon: string;
  name: string;
  label: string;
}

interface ChatInfoProps {
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isChatSlowMode: boolean;
  isChatLinksAllowed: boolean;
  isChatProfanityFilter: boolean;
}

export const ChatInfo = ({
  isChatDelayed,
  isChatFollowersOnly,
  isChatSlowMode,
  isChatLinksAllowed,
  isChatProfanityFilter,
}: ChatInfoProps) => {
  const { badges } = useMemo(() => {
    const activeBadges: Badge[] = [];

    // Party Members Only
    if (isChatFollowersOnly) {
      activeBadges.push({
        icon: "👥",
        name: "Party Only",
        label: "Only party members can join the conversation",
      });
    }

    // Chat Delay/Moderation
    if (isChatDelayed) {
      activeBadges.push({
        icon: "⏱️",
        name: "Moderated",
        label: "Messages are delayed by 3 seconds for moderation",
      });
    }

    // Slow Mode
    if (isChatSlowMode) {
      activeBadges.push({
        icon: "🐌",
        name: "Slow Mode",
        label: "Slow mode active - limited message frequency",
      });
    }

    // Links Blocked
    if (!isChatLinksAllowed) {
      activeBadges.push({
        icon: "🔗",
        name: "No Links",
        label: "Quest links are not allowed in chat",
      });
    }

    // Profanity Filter
    if (isChatProfanityFilter) {
      activeBadges.push({
        icon: "🛡️",
        name: "Shield Active",
        label: "Profanity shield is protecting the quest",
      });
    }

    return {
      badges: activeBadges,
    };
  }, [
    isChatDelayed,
    isChatFollowersOnly,
    isChatSlowMode,
    isChatLinksAllowed,
    isChatProfanityFilter,
  ]);

  // Don't show if no restrictions are active
  if (badges.length === 0) {
    return null;
  }

  return (
    <div className="p-1.5 sm:p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md">
      <div className="flex items-center gap-x-1 sm:gap-x-2">
        <div className="flex flex-wrap items-center gap-0.5 sm:gap-1 text-xs font-semibold">
          {badges.map((badge, index) => (
            <Hint key={index} label={badge.label}>
              <div className="bg-white/10 hover:bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs flex items-center gap-0.5 sm:gap-1 cursor-help transition-colors">
                <span className="text-xs">{badge.icon}</span>
                <span className="hidden xs:inline">{badge.name}</span>
              </div>
            </Hint>
          ))}
        </div>
      </div>
    </div>
  );
};
