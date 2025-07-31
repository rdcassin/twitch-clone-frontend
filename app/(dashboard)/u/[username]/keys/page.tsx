import { getSelf } from "@/lib/services/auth-service";
import { getStreamByUserId } from "@/lib/services/stream-service";
import { redirect } from "next/navigation";
import { UrlCard } from "./_components/url-card";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";

const KeysPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    redirect("/");
  }

  return (
    <div className="p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold">🔑 Stream Keys</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage your quest streaming credentials and setup
          </p>
        </div>
        <div className="flex-shrink-0">
          <ConnectModal />
        </div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <UrlCard value={stream.serverUrl} icon="🌐" label="Quest Server URL" />
        <KeyCard value={stream.streamKey} icon="🔑" label="Secret Quest Key" />
      </div>
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-muted/50 rounded-lg sm:rounded-xl">
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
          🎥 OBS Studio Setup
        </h3>
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
          <div className="space-y-1 sm:space-y-2">
            <p>
              <span className="font-medium">1.</span> Open OBS Studio and go to{" "}
              <strong className="text-foreground">Settings → Stream</strong>
            </p>
            <p>
              <span className="font-medium">2.</span> Select{" "}
              <strong className="text-foreground">Custom</strong> as your
              service
            </p>
            <p>
              <span className="font-medium">3.</span> Copy your{" "}
              <strong className="text-foreground">Quest Server URL</strong> to
              the Server field
            </p>
            <p>
              <span className="font-medium">4.</span> Copy your{" "}
              <strong className="text-foreground">Secret Quest Key</strong> to
              the Stream Key field
            </p>
            <p>
              <span className="font-medium">5.</span> Click{" "}
              <strong className="text-foreground">OK</strong> and start your
              quest! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeysPage;
