"use server";

import { revalidatePath } from "next/cache";
import { followUser, unfollowUser } from "@/lib/services/follow-service";

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/");

    if (followedUser.success && followedUser.data) {
      revalidatePath(`/${followedUser.data.following.username}`);
    }

    return followedUser;
  } catch {
    return { success: false, message: "⚠️ Something went wrong" };
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/");

    if (unfollowedUser.success && unfollowedUser.data) {
      revalidatePath(`/${unfollowedUser.data.following.username}`);
    }

    return unfollowedUser;
  } catch {
    return { success: false, message: "⚠️ Something went wrong" };
  }
};
