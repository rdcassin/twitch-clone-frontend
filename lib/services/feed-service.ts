import { prisma } from "@/lib/prisma";
import { getSelf } from "@/lib/services/auth-service";

export const getStreams = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await prisma.stream.findMany({
      where: {
        user: {
          NOT: {
            userBlocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
      },
      select: {
        id: true,
        user: true,
        thumbnailUrl: true,
        name: true,
        isLive: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await prisma.stream.findMany({
      select: {
        id: true,
        user: true,
        thumbnailUrl: true,
        name: true,
        isLive: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
};
