"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState, useTransition } from "react";
import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";

const RTMP = "0";
const WHIP = "1";

type IngressTypeString = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressTypeString>(RTMP);

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then((result) => {
          if (result.success) {
            toast.success(result.message);
            closeRef?.current?.click();
          } else {
            toast.error(result.message);
          }
        })
        .catch(() =>
          toast.error("⚠️ Something went wrong generating quest connection"),
        );
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="blue">⚡ Generate Quest Connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🔗 Generate Quest Connection</DialogTitle>
          <p className="text-muted-foreground text-sm">
            Create new streaming credentials for your adventure
          </p>
        </DialogHeader>
        <Select
          value={ingressType}
          onValueChange={(value) => {
            if (value === RTMP || value === WHIP) {
              setIngressType(value);
            }
          }}
          disabled={isPending}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="🎥 Select Streaming Protocol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>📡 RTMP (Recommended for OBS)</SelectItem>
            <SelectItem value={WHIP}>🌐 WHIP (WebRTC)</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>⚠️ Quest Warning!</AlertTitle>
          <AlertDescription>
            This will reset your current streaming connection and end any active
            quest streams
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost" disabled={isPending}>
              ❌ Cancel
            </Button>
          </DialogClose>
          <Button onClick={onSubmit} variant="blue" disabled={isPending}>
            {isPending ? "⚡ Generating..." : "⚡ Generate New Keys"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
