import { WebhookReceiver, type WebhookEvent } from "livekit-server-sdk";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headerPayload = await headers();
    const authorization = headerPayload.get("Authorization");

    if (!authorization) {
      return new Response("Unauthorized", { status: 401 });
    }

    const event = await receiver.receive(body, authorization);
    console.log("🎮 LiveKit webhook received:", event.event);

    switch (event.event) {
      case "ingress_started":
        await handleIngressStarted(event);
        break;
      case "ingress_ended":
        await handleIngressEnded(event);
        break;
      case "room_started":
        await handleRoomStarted(event);
        break;
      case "room_finished":
        await handleRoomFinished(event);
        break;
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("LiveKit webhook error:", error);
    return new Response("Error", { status: 500 });
  }
}

async function handleIngressStarted(event: WebhookEvent) {
  const ingressId = event.ingressInfo?.ingressId;
  if (!ingressId) return;

  await prisma.stream.update({
    where: { ingressId },
    data: { isLive: true },
  });

  console.log("🔴 Stream started:", ingressId);
}

async function handleIngressEnded(event: WebhookEvent) {
  const ingressId = event.ingressInfo?.ingressId;
  if (!ingressId) return;

  await prisma.stream.update({
    where: { ingressId },
    data: { isLive: false },
  });

  console.log("⚫ Stream ended:", ingressId);
}

async function handleRoomStarted(event: WebhookEvent) {
  console.log("🏠 Room started:", event.room?.name);
}

async function handleRoomFinished(event: WebhookEvent) {
  console.log("🏠 Room finished:", event.room?.name);
}
