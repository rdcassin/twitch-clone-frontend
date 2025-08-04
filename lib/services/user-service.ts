import { prisma } from "@/lib/prisma";

export const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      bio: true,
      imageUrl: true,
      stream: {
        select: {
          id: true,
          name: true,
          thumbnailUrl: true,
          isLive: true,
          isChatEnabled: true,
          isChatDelayed: true,
          isChatFollowersOnly: true,
          isChatSlowMode: true,
          isChatLinksAllowed: true,
          isChatProfanityFilter: true,
        },
      },
      _count: {
        select: {
          userFollowers: true,
        },
      },
    },
  });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      bio: true,
      imageUrl: true,
      stream: {
        select: {
          id: true,
          name: true,
          thumbnailUrl: true,
          isLive: true,
          isChatEnabled: true,
          isChatDelayed: true,
          isChatFollowersOnly: true,
          isChatSlowMode: true,
          isChatLinksAllowed: true,
          isChatProfanityFilter: true,
        },
      },
    },
  });

  return user;
};
