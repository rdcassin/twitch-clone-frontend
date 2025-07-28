"use server";

import { revalidatePath } from "next/cache";
import { Stream } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getSelf } from "@/lib/services/auth-service";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await prisma.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) {
      return {
        success: false,
        message: "⚔️ Quest not found - unable to update settings",
      };
    }

    const validData = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatSlowMode: values.isChatSlowMode,
      isChatLinksAllowed: values.isChatLinksAllowed,
      isChatProfanityFilter: values.isChatProfanityFilter,
    };

    const stream = await prisma.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return {
      success: true,
      data: stream,
      message: "🎮 Quest settings updated successfully!",
    };
  } catch {
    return {
      success: false,
      message: "⚠️ Something went wrong updating quest settings",
    };
  }
};
