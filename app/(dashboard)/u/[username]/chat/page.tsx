import { getSelf } from "@/lib/services/auth-service";
import { getStreamByUserId } from "@/lib/services/stream-service";
import { redirect } from "next/navigation";
import { ToggleCard } from "./_components/toggle-card";

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    redirect("/");
  }

  return (
    <div className="p-3 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">
          💬 Party Chat Settings
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Configure how fellow adventurers communicate during your quest
        </p>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="🗣️ Enable Party Chat"
          value={stream.isChatEnabled}
          description="Allow adventurers to communicate during your quest"
        />
        <ToggleCard
          field="isChatDelayed"
          label="⏱️ Chat Moderation Delay"
          value={stream.isChatDelayed}
          description="Delay messages by 3 seconds for moderation"
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="👥 Party Members Only"
          value={stream.isChatFollowersOnly}
          description="Only followers can participate in chat"
        />
        <ToggleCard
          label="🐌 Slow Mode"
          field="isChatSlowMode"
          value={stream.isChatSlowMode}
          description="Limit message frequency to prevent spam"
        />
        <ToggleCard
          label="🔗 Allow Quest Links"
          field="isChatLinksAllowed"
          value={stream.isChatLinksAllowed}
          description="Permit adventurers to share links in chat"
        />
        <ToggleCard
          label="🛡️ Profanity Shield"
          field="isChatProfanityFilter"
          value={stream.isChatProfanityFilter}
          description="Filter inappropriate language automatically"
        />
      </div>
    </div>
  );
};

export default ChatPage;
