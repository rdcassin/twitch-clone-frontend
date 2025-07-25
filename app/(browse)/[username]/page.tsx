import { isFollowingUser } from "@/lib/services/follow-service";
import { getUserByUsername } from "@/lib/services/user-service";
import { notFound } from "next/navigation";
import { Follow } from "./_components/actions/follow";
import { isBlockedByUser, isBlockingUser } from "@/lib/services/block-service";
import { Block } from "./_components/actions/block";

interface UserPageProps {
  params: Promise<{ username: string }>;
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;

  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await isBlockingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p>Adventurer Name: {user.username}</p>
      <p>Adventurer ID: {user.id}</p>
      <p>Is in Party: {`${isFollowing}`}</p>
      <Follow isFollowing={isFollowing} userId={user.id} />
      <Block isBlocking={isBlocking} userId={user.id} />
    </div>
  );
};

export default UserPage;
