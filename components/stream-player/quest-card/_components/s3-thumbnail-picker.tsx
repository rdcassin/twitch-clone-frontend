import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Hint } from "@/components/hint";

interface S3ThumbnailPickerProps {
  previewUrl: string | null;
  onFileSelect: (file: File) => void;
  onDelete: () => void;
  disabled?: boolean;
}

export const S3ThumbnailPicker = ({
  previewUrl,
  onFileSelect,
  onDelete,
  disabled = false,
}: S3ThumbnailPickerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onFileSelect(file);
  };

  // New: open the file dialog manually
  const handleButtonClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-2 flex flex-col items-center">
      {previewUrl && (
        <div className="relative aspect-video w-full max-w-[200px] mx-auto rounded-md overflow-hidden border">
          <Image
            fill
            src={previewUrl}
            alt="Quest Banner preview"
            className="object-cover"
          />
          <Hint label="Remove Quest Banner" asChild>
            <button
              type="button"
              onClick={onDelete}
              className="absolute top-2 right-2 z-10 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer"
              disabled={disabled}
            >
              🗑️
            </button>
          </Hint>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInput}
        disabled={disabled}
        className="hidden"
      />
      <Button
        type="button"
        variant="blue"
        className="w-full sm:w-auto flex justify-center"
        disabled={disabled}
        onClick={handleButtonClick}
      >
        {previewUrl ? <>✨ Change Quest Banner</> : <>📜 Upload Quest Banner</>}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        PNG, JPG up to 5MB. Recommended: 1280x720px
      </p>
    </div>
  );
};
