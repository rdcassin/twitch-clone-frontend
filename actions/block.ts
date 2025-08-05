"use server";

import { revalidatePath } from "next/cache";
import { blockUser, unblockUser } from "@/lib/services/block-service";
import { getSelf } from "@/lib/services/auth-service";
import { RoomServiceClient } from "livekit-server-sdk";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export const banishAdventurer = async (id: string) => {
  const self = await getSelf();
  let result = { success: false, message: "Unknown error" };
  try {
    result = await blockUser(id);
  } catch {
    // Target Adventurer is not logged in
  }

  try {
    await roomService.removeParticipant(self.id, id);
  } catch {
    // Target Adventurer is not in the room
  }

  revalidatePath(`/u/${self.username}/adventurers`);

  return result;
};

export const restoreAdventurer = async (id: string) => {
  const self = await getSelf();
  let result = { success: false, message: "Unknown error" };
  try {
    result = await unblockUser(id);
  } catch {}

  revalidatePath(`/u/${self.username}/adventurers`);

  return result;
};
