import { prisma } from "@/lib/prisma";
import { getSelf } from "@/lib/services/auth-service";

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf();

    const followedUsers = await prisma.follow.findMany({
      where: {
        followerId: self.id,
      },
      include: {
        following: true,
      },
    });

    return followedUsers;
  } catch {
    return [];
  }
};

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("Adventurer not found");
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    return { success: false, message: "⚔️ Adventurer not found" };
  }

  if (otherUser.id === self.id) {
    return { success: false, message: "🚫 Cannot join your own party" };
  }

  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    return { success: false, message: "✋ You're already in this party" };
  }

  const follow = await prisma.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return {
    success: true,
    data: follow,
    message: "🎮 Joined the adventure party!",
  };
};

export const unfollowUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    return { success: false, message: "⚔️ Adventurer not found" };
  }

  if (otherUser.id === self.id) {
    return { success: false, message: "🚫 Cannot leave your own party" };
  }

  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    return { success: false, message: "✋ You've already left this party" };
  }

  const follow = await prisma.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return {
    success: true,
    data: follow,
    message: "👋 Left the party",
  };
};
