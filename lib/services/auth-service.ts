import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.id) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: self.id },
  });

  if (!user) {
    throw new Error("Not found");
  }

  return user;
};
