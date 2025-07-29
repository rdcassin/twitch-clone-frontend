import { prisma } from "@/lib/prisma";
import { getSelf } from "@/lib/services/auth-service";

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await prisma.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              userFollowers: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              userBlocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
          {
            NOT: {
              userBlocked: {
                some: {
                  blockerId: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true,
            name: true,
            thumbnailUrl: true,
          },
        },
      },
      orderBy: [{ stream: { isLive: "desc" } }, { createdAt: "desc" }],
    });
  } else {
    users = await prisma.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true,
            name: true,
            thumbnailUrl: true,
          },
        },
      },
      orderBy: [{ stream: { isLive: "desc" } }, { createdAt: "desc" }],
    });
  }

  return users;
};
