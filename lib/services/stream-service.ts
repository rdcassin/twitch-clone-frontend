import { prisma } from "@/lib/prisma";

export const getStreamByUserId = async (userId: string) => {
  try {
    const stream = await prisma.stream.findUnique({
      where: { userId },
    });

    if (!stream) {
      throw new Error("⚔️ Quest not found - adventurer has no active quest");
    }

    return stream;
  } catch (error) {
    throw error;
  }
};
