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
    return null; // Not logged in
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return null; // Not a valid user
  }

  if (self.username !== user.username) {
    return null; // Not your own dashboard
  }

  return user;
};
