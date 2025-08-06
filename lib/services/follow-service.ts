import { prisma } from "@/lib/prisma";
import { getSelf } from "@/lib/services/auth-service";

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf();

    const followedUsers = await prisma.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          userBlocking: {
            none: {
              blockedId: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          following: {
            stream: {
              isLive: "desc",
            },
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return followedUsers;
  } catch {
    return [];
  }
};

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (self.id === id) {
      return true;
    }

    const otherUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("⚔️ Adventurer not found");
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: self.id,
          followingId: otherUser.id,
        },
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (self.id === id) {
      return { success: false, message: "🚫 Cannot join your own party" };
    }

    const otherUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      return { success: false, message: "⚔️ Adventurer not found" };
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: self.id,
          followingId: otherUser.id,
        },
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
  } catch {
    return {
      success: false,
      message: "⚠️ Something went wrong while joining the adventure party",
    };
  }
};

export const unfollowUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (self.id === id) {
      return { success: false, message: "🚫 Cannot leave your own party" };
    }

    const otherUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      return { success: false, message: "⚔️ Adventurer not found" };
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: self.id,
          followingId: otherUser.id,
        },
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
  } catch {
    return {
      success: false,
      message: "⚠️ Something went wrong while leaving the party",
    };
  }
};
