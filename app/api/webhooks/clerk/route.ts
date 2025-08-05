import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { prisma } from "@/lib/prisma";
import { resetIngresses } from "@/actions/ingress";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET to your environment variables",
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);

  let evt: {
    type: string;
    data: {
      id: string;
      email_addresses: Array<{ email_address: string }>;
      username?: string;
      image_url?: string;
    };
  };

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as typeof evt;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, username, image_url } = evt.data;

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { clerkId: id },
      });

      if (existingUser) {
        console.log("User already exists:", id);
        return NextResponse.json({ message: "User already exists" });
      }

      // Generate unique username
      const baseUsername = username || `user_${id.slice(-8)}`;
      let finalUsername = baseUsername;
      let counter = 1;

      // Keep trying until we find a unique username
      while (true) {
        const existingUsername = await prisma.user.findUnique({
          where: { username: finalUsername },
        });

        if (!existingUsername) break;

        finalUsername = `${baseUsername}_${counter}`;
        counter++;
      }

      await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0]?.email_address || "",
          username: finalUsername,
          imageUrl: image_url || "",
          stream: {
            create: {
              name: `${finalUsername}'s Quest`,
            },
          },
        },
      });

      console.log("User created:", finalUsername);
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 },
      );
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, username, image_url } = evt.data;

    try {
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: email_addresses[0]?.email_address || "",
          username: username || `user_${id.slice(-8)}`,
          imageUrl: image_url || "",
        },
      });
      console.log("User updated:", id);
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 },
      );
    }
  }

  if (eventType === "user.deleted") {
    await resetIngresses(payload.data.id);

    await prisma.user.delete({
      where: {
        clerkId: payload.data.id,
      },
    });
  }

  return NextResponse.json({ message: "Success" });
}
