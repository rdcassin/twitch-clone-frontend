import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateStream } from "@/actions/stream";
import { S3ThumbnailPicker } from "@/components/stream-player/quest-card/_components/s3-thumbnail-picker";
import {
  deleteBannerIfNeeded,
  uploadBannerIfPresent,
} from "./quest-card-helpers";
import {
  Dialog,
  DialogContent,
  DialogClose,
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
  defaultThumbnailKey?: string | null;
}

export const QuestCardModal = ({
  defaultName,
  defaultThumbnailUrl,
  defaultThumbnailKey = null,
}: QuestCardModalProps) => {
  const [name, setName] = useState(defaultName);

  const [thumbnail, setThumbnail] = useState<{
    url: string | null;
    key: string | null;
    file: File | null;
    markedForDeletion: boolean;
  }>({
    url: defaultThumbnailUrl,
    key: defaultThumbnailKey,
    file: null,
    markedForDeletion: false,
  });

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleFileSelect = (file: File) => {
    setThumbnail({
      url: URL.createObjectURL(file),
      file,
      key: null,
      markedForDeletion: false,
    });
  };

  const handleThumbnailDelete = () => {
    setThumbnail((t) => ({
      ...t,
      url: null,
      file: null,
      markedForDeletion: true,
    }));
  };

  const handleClose = () => {
    setThumbnail({
      url: defaultThumbnailUrl,
      key: defaultThumbnailKey,
      file: null,
      markedForDeletion: false,
    });
    setOpen(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        // 1. Delete from S3 if needed
        let { url, key } = await deleteBannerIfNeeded(
          thumbnail.markedForDeletion,
          thumbnail.key,
        );

        // 2. Upload if new file staged
        ({ url, key } = await uploadBannerIfPresent(thumbnail.file, {
          url,
          key,
        }));

        // 3. Update quest info
        const streamResult = await updateStream({
          name,
          thumbnailUrl: url ?? null,
          thumbnailKey: key ?? null,
        });

        if (streamResult.success) {
          toast.success("🎯 Quest info updated successfully!");
          handleClose();
        } else {
          toast.error(streamResult.message);
        }
      } catch {
        toast.error("⚠️ Quest update failed! The fates intervened.");
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="w-full sm:w-auto block ml-0 sm:ml-auto"
          variant="blue"
        >
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
              previewUrl={thumbnail.url}
              onFileSelect={handleFileSelect}
              onDelete={handleThumbnailDelete}
              disabled={isPending}
            />
          </div>
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button
                type="button"
                variant="primary"
                disabled={isPending}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending || !name} variant="blue">
              {isPending ? "⚡ Updating..." : "🎯 Update Quest"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
