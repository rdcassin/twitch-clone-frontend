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
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">🔑 Stream Keys</h1>
          <p className="text-muted-foreground">
            Manage your quest streaming credentials and setup
          </p>
        </div>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} icon="🌐" label="Quest Server URL" />
        <KeyCard value={stream.streamKey} icon="🔑" label="Secret Quest Key" />
        {/* Copy to Clipboard Actions */}
        {/* Setup Instructions */}
      </div>
      <div className="mt-8 p-6 bg-muted/50 rounded-xl">
        <h3 className="text-lg font-semibold mb-3">🎥 OBS Studio Setup</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            1. Open OBS Studio and go to <strong>Settings → Stream</strong>
          </p>
          <p>
            2. Select <strong>Custom</strong> as your service
          </p>
          <p>
            3. Copy your <strong>Quest Server URL</strong> to the Server field
          </p>
          <p>
            4. Copy your <strong>Secret Quest Key</strong> to the Stream Key
            field
          </p>
          <p>
            5. Click <strong>OK</strong> and start your quest! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeysPage;
