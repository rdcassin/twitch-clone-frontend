import { getPresignedUploadUrl, deleteS3Object } from "@/actions/upload";

export async function deleteBannerIfNeeded(
  markedForDeletion: boolean,
  key: string | null,
): Promise<{ url: string | null; key: string | null }> {
  if (markedForDeletion && key) {
    const result = await deleteS3Object(key);
    if (!result.success)
      throw new Error(result.message || "Failed to delete quest banner.");
    return { url: null, key: null };
  }
  return { url: null, key };
}

export async function uploadBannerIfPresent(
  file: File | null,
  current: { url: string | null; key: string | null },
): Promise<{ url: string | null; key: string | null }> {
  if (file) {
    const presign = await getPresignedUploadUrl(file.name, file.type);
    if (
      !(presign.success && presign.uploadUrl && presign.fileUrl && presign.key)
    ) {
      throw new Error(presign.message || "Failed to generate upload URL");
    }
    const uploadResponse = await fetch(presign.uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });
    if (!uploadResponse.ok) {
      throw new Error("Failed to upload quest banner.");
    }
    return { url: presign.fileUrl, key: presign.key };
  }
  return { url: current.url, key: current.key };
}
