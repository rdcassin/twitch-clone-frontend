import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateStream } from "@/actions/stream";
import { S3ThumbnailPicker } from "@/components/upload/s3-thumbnail-picker";
import { getPresignedUploadUrl, deleteS3Object } from "@/actions/upload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface QuestCardModalProps {
  defaultName: string;
  defaultThumbnailUrl: string | null;
}

export const QuestCardModal = ({
  defaultName,
  defaultThumbnailUrl,
}: QuestCardModalProps) => {
  const [name, setName] = useState(defaultName);
  const [thumbnailUrl, setThumbnailUrl] = useState(defaultThumbnailUrl);
  const [thumbnailKey, setThumbnailKey] = useState<string | null>(null);
  const [pendingThumbnailFile, setPendingThumbnailFile] = useState<File | null>(
    null,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultThumbnailUrl,
  );
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // Track if user wants to delete old banner!
  const [bannerMarkedForDeletion, setBannerMarkedForDeletion] = useState(false);

  const handleFileSelect = (file: File) => {
    setPendingThumbnailFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setBannerMarkedForDeletion(false);
  };

  const handleThumbnailDelete = () => {
    setPreviewUrl(null);
    setPendingThumbnailFile(null);
    setBannerMarkedForDeletion(true);
  };

  const handleClose = () => {
    setPendingThumbnailFile(null);
    setBannerMarkedForDeletion(false);
    setPreviewUrl(thumbnailUrl ?? null);
    setOpen(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      let finalThumbnailUrl = thumbnailUrl;
      let finalThumbnailKey = thumbnailKey;

      // 1. Delete from S3 if marked for deletion and a previous key exists
      if (bannerMarkedForDeletion && thumbnailKey) {
        const deleteResult = await deleteS3Object(thumbnailKey);
        if (!deleteResult.success) {
          toast.error(
            deleteResult.message || "⚠️ Failed to delete Quest Banner from S3.",
          );
          return;
        }
        finalThumbnailUrl = null;
        finalThumbnailKey = null;
      }

      // 2. Upload new banner only on save
      if (pendingThumbnailFile) {
        const result = await getPresignedUploadUrl(
          pendingThumbnailFile.name,
          pendingThumbnailFile.type,
        );
        if (
          result.success &&
          result.uploadUrl &&
          result.fileUrl &&
          result.key
        ) {
          const uploadResponse = await fetch(result.uploadUrl, {
            method: "PUT",
            body: pendingThumbnailFile,
            headers: {
              "Content-Type": pendingThumbnailFile.type,
            },
          });
          if (!uploadResponse.ok) {
            toast.error("⚠️ Failed to upload Quest Banner");
            return;
          }
          finalThumbnailUrl = result.fileUrl;
          finalThumbnailKey = result.key;
        } else {
          toast.error(result.message || "⚠️ Failed to generate upload URL");
          return;
        }
      }

      const streamResult = await updateStream({
        name,
        thumbnailUrl: finalThumbnailUrl,
        thumbnailKey: finalThumbnailKey,
      });

      if (streamResult.success) {
        toast.success("🎯 Quest info updated successfully!");
        setThumbnailUrl(finalThumbnailUrl);
        setThumbnailKey(finalThumbnailKey);
        setPendingThumbnailFile(null);
        setBannerMarkedForDeletion(false);
        setOpen(false);
      } else {
        toast.error(streamResult.message);
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(properClose) => {
        if (!properClose) {
          handleClose();
        }
        setOpen(properClose);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          ✏️ Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>🎯 Edit Quest Info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Quest Name</Label>
            <Input
              placeholder="Enter your quest name..."
              onChange={(e) => setName(e.target.value)}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label>Quest Banner</Label>
            <S3ThumbnailPicker
              previewUrl={previewUrl}
              onFileSelect={handleFileSelect}
              onDelete={handleThumbnailDelete}
              disabled={isPending}
            />
          </div>
          <div className="flex justify-between">
            <Button
              type="button"
              variant="ghost"
              disabled={isPending}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !name} variant="blue">
              {isPending ? "⚡ Updating..." : "🎯 Update Quest"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
