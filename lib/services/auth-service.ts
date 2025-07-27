import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.id) {
    throw new Error("⚔️ Unauthorized - must be logged in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: self.id },
  });

  if (!user) {
    throw new Error("⚔️ Adventurer profile not found");
  }

  return user;
};

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("⚔️ Unauthorized - must be logged in");
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("⚔️ Adventurer not found");
  }

  if (self.username !== user.username) {
    throw new Error("🚫 Cannot access another adventurer's quest command");
  }
  
  return user;
};