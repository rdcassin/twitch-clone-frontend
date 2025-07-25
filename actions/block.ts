"use server";

import { revalidatePath } from "next/cache";
import { blockUser, unblockUser } from "@/lib/services/block-service";

export const banishAdventurer = async (id: string) => {
  try {
    const blockedUser = await blockUser(id);
    
    revalidatePath("/");
    
    if (blockedUser.success && blockedUser.data) {
      revalidatePath(`/${blockedUser.data.blocked.username}`);
    }
    
    return blockedUser;
  } catch {
    return { success: false, message: "⚠️ Something went wrong" };
  }
};

export const welcomeBackAdventurer = async (id: string) => {
  try {
    const unblockedUser = await unblockUser(id);
    
    revalidatePath("/");
    
    if (unblockedUser.success && unblockedUser.data) {
      revalidatePath(`/${unblockedUser.data.blocked.username}`);
    }
    
    return unblockedUser;
  } catch {
    return { success: false, message: "⚠️ Something went wrong" };
  }
};