import { prisma } from "@/lib/prisma";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("⚔️ Adventurer not found");
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });

    return !!existingBlock;
  } catch {
    return false;
  }
};

export const isBlockingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("⚔️ Adventurer not found");
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });

    return !!existingBlock;
  } catch {
    return false;
  }
};

export const blockUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (self.id === id) {
      return {
        success: false,
        message: "🚫 Cannot banish yourself from your own party",
      };
    }

    const otherUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      return { success: false, message: "⚔️ Adventurer not found" };
    }

    const existingBlock = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });

    if (existingBlock) {
      return {
        success: false,
        message: `✋ ${otherUser.username} was already banished from your party!`,
      };
    }

    const block = await prisma.block.create({
      data: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
      include: {
        blocker: true,
        blocked: true,
      },
    });

    return {
      success: true,
      data: block,
      message: `🛡️ ${otherUser.username} banished from your party!`,
    };
  } catch {
    return {
      success: false,
      message: "⚠️ Something went wrong while banishing adventurer",
    };
  }
};

export const unblockUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (self.id === id) {
      return {
        success: false,
        message: "🚫 Cannot restore peace with yourself back to your own party",
      };
    }

    const otherUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      return { success: false, message: "⚔️ Adventurer not found" };
    }

    const existingBlock = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });

    if (!existingBlock) {
      return {
        success: false,
        message: `✋ Peace already restored with ${otherUser.username}!`,
      };
    }

    const unblock = await prisma.block.delete({
      where: {
        id: existingBlock.id,
      },
      include: {
        blocker: true,
        blocked: true,
      },
    });

    return {
      success: true,
      data: unblock,
      message: `🕊️ Peace restored with ${otherUser.username}!`,
    };
  } catch {
    return {
      success: false,
      message: "⚠️ Something went wrong while restoring peace with adventurer",
    };
  }
};

export const getBlockedUsers = async () => {
  const self = await getSelf();

  const blockedUsers = await prisma.block.findMany({
    where: {
      blockerId: self.id,
    },
    include: {
      blocked: true,
    },
  });

  return blockedUsers;
};
