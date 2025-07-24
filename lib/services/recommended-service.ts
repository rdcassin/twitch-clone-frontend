import { prisma } from "@/lib/prisma";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
