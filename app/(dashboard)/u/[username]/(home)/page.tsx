import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/services/user-service";

interface QuestCommandPageProps {
  params: Promise<{ username: string }>;
}

const QuestCommandPage = async ({ params }: QuestCommandPageProps) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user?.stream) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">🎯 Quest not configured</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
    </div>
  );
};

export default QuestCommandPage;
