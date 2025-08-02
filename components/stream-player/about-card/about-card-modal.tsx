"use client";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef, useState, useTransition } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface AboutCardModalProps {
  initialValue: string | null;
}

export const AboutCardModal = ({ initialValue }: AboutCardModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initialValue || "");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success("🪶 Chronicle updated!");
          closeRef.current?.click();
        })
        .catch(() =>
          toast.error("⚠️ Your quill broke! Please try again later."),
        );
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="w-full sm:w-auto block ml-0 sm:ml-auto"
          variant="blue"
        >
          ✏️ Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"Edit your Adventurer's Chronicle"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="Share your legend, greatest quest, or a call to adventure..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className="resize-none"
            minLength={0}
            maxLength={300}
            aria-label="Adventurer bio"
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="primary">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant="blue">
              💾 Save Chronicle
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
