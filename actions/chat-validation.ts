"use server";

import { Filter } from "bad-words";
import { prisma } from "@/lib/prisma";

const createChatFilter = () => {
  const filter = new Filter();

  // Add multiple words. Who's knows what future words needs to be added.
  //   const wordsToAdd = ['noob', 'scrub', 'trash'];
  //   wordsToAdd.forEach(word => filter.addWords(word));

  // Remove multiple words
  const wordsToRemove = ["damn", "hell"];
  wordsToRemove.forEach((word) => filter.removeWords(word));

  return filter;
};

const filter = createChatFilter();

export const validateChatMessage = async (
  message: string,
  hostIdentity: string,
) => {
  try {
    const stream = await prisma.stream.findUnique({
      where: { userId: hostIdentity },
      select: {
        isChatLinksAllowed: true,
        isChatProfanityFilter: true,
      },
    });

    if (!stream) {
      return { valid: false, reason: "⚔️ Quest not found" };
    }

    if (!stream.isChatLinksAllowed && containsLinks(message)) {
      return {
        valid: false,
        reason: "🔗 Quest links are not allowed in party chat",
      };
    }

    if (stream.isChatProfanityFilter && filter.isProfane(message)) {
      // Option 1: Block the message completely
      //   return {
      //     valid: false,
      //     reason: "🛡️ Message blocked by profanity shield",
      //   };

      // Option 2: Clean the message and allow it (uncomment below, comment above)
      const cleanMessage = filter.clean(message);
      return { valid: true, cleanedMessage: cleanMessage };
    }

    return { valid: true };
  } catch (error) {
    console.error("Chat validation error:", error);
    return { valid: false, reason: "⚠️ Message validation failed" };
  }
};

const containsLinks = (message: string): boolean => {
  const linkRegex =
    /(https?:\/\/[^\s]+|www\.[^\s]+|\b[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\b)/gi;
  return linkRegex.test(message);
};
