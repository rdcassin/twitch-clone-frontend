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
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">💬 Party Chat Settings</h1>
        <p className="text-muted-foreground">
          Configure how fellow adventurers communicate during your quest
        </p>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="🗣️ Enable Party Chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="⏱️ Chat Moderation Delay"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="👥 Party Members Only"
          value={stream.isChatFollowersOnly}
        />
        <ToggleCard
          label="🐌 Slow Mode (Prevent Spam)"
          field="isChatSlowMode"
          value={stream.isChatSlowMode}
        />
        <ToggleCard
          label="🔗 Allow Quest Links"
          field="isChatLinksAllowed"
          value={stream.isChatLinksAllowed}
        />
        <ToggleCard
          label="🛡️ Profanity Shield"
          field="isChatProfanityFilter"
          value={stream.isChatProfanityFilter}
        />
      </div>
    </div>
  );
};

export default ChatPage;
