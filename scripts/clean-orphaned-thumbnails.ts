import { PrismaClient } from "@prisma/client";
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.AWS_S3_BUCKET_NAME!;

function isS3AWSError(
  err: unknown,
): err is { name?: string; $metadata?: { httpStatusCode?: number } } {
  return (
    typeof err === "object" &&
    err !== null &&
    ("name" in err || "$metadata" in err)
  );
}

async function s3ObjectExists(Key: string): Promise<boolean> {
  try {
    await s3Client.send(new HeadObjectCommand({ Bucket: BUCKET, Key }));
    return true;
  } catch (err: unknown) {
    if (
      isS3AWSError(err) &&
      (err.name === "NotFound" || err.$metadata?.httpStatusCode === 404)
    ) {
      return false;
    }
    throw err;
  }
}

async function cleanOrphanedThumbnails() {
  const streams = await prisma.stream.findMany({
    where: {
      OR: [{ thumbnailKey: { not: null } }, { thumbnailUrl: { not: null } }],
    },
    select: { id: true, thumbnailUrl: true, thumbnailKey: true },
  });

  let cleanedCount = 0;
  for (const stream of streams) {
    if (stream.thumbnailKey) {
      console.log("[CHECK]", stream.thumbnailKey);
      const exists = await s3ObjectExists(stream.thumbnailKey);
      if (!exists) {
        await prisma.stream.update({
          where: { id: stream.id },
          data: { thumbnailUrl: null, thumbnailKey: null },
        });
        cleanedCount += 1;
        console.log(
          `[CLEANED] Stream ${stream.id} - orphaned Quest Banner entry cleared.`,
        );
      }
    }
  }

  console.log(
    `Cleanup complete. Orphaned Quest Banners cleaned: ${cleanedCount}.`,
  );
  await prisma.$disconnect();
}

cleanOrphanedThumbnails().catch((e) => {
  console.error(e);
  process.exit(1);
});
