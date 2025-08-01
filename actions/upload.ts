"use server";

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getSelf } from "@/lib/services/auth-service";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const getPresignedUploadUrl = async (
  fileName: string,
  fileType: string,
) => {
  try {
    const self = await getSelf();

    // Generate unique file name
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "");
    const key = `thumbnails/${self.id}/${timestamp}-${sanitizedFileName}`;

    // Create presigned URL for upload
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
      Metadata: {
        userId: self.id,
        originalName: fileName,
      },
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

    // CloudFront URL for accessing the file
    const fileUrl = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${key}`;

    return {
      success: true,
      uploadUrl,
      fileUrl,
      key,
    };
  } catch (error) {
    console.error("Presigned URL generation failed:", error);
    return {
      success: false,
      message: "⚠️ Failed to generate upload URL",
    };
  }
};

export const deleteS3Object = async (key: string) => {
  try {
    const self = await getSelf();

    // Verify the file belongs to the user (security check)
    if (!key.startsWith(`thumbnails/${self.id}/`)) {
      return {
        success: false,
        message: "⚠️ Unauthorized file deletion",
      };
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
    });

    await s3Client.send(command);

    return {
      success: true,
      message: "🗑️ Quest Banner deleted successfully",
    };
  } catch (error) {
    console.error("S3 deletion failed:", error);
    return {
      success: false,
      message: "⚠️ Failed to delete Quest Banner",
    };
  }
};
