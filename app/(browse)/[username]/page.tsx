import { isFollowingUser } from "@/lib/services/follow-service";
import { getUserByUsername } from "@/lib/services/user-service";
import { notFound } from "next/navigation";
import { Follow } from "./_components/actions/follow";

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

  return (
    <div className="flex flex-col gap-y-4">
      <p>Adventurer Name: {user.username}</p>
      <p>Adventurer ID: {user.id}</p>
      <p>Is in Party: {`${isFollowing}`}</p>
      <Follow isFollowing={isFollowing} userId={user.id} />
    </div>
  );
};

export default UserPage;
