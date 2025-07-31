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
        <Button variant="blue" className="text-sm sm:text-base">
          <span className="hidden sm:inline">⚡ Generate Quest Connection</span>
          <span className="sm:hidden">⚡ Generate</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-md mx-auto">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-lg sm:text-xl">
            🔗 Generate Quest Connection
          </DialogTitle>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Create new streaming credentials for your adventure
          </p>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          <Select
            value={ingressType}
            onValueChange={(value) => {
              if (value === RTMP || value === WHIP) {
                setIngressType(value);
              }
            }}
            disabled={isPending}
          >
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="🎥 Select Protocol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={RTMP} className="text-sm">
                <span className="hidden sm:inline">
                  📡 RTMP (Recommended for OBS)
                </span>
                <span className="sm:hidden">📡 RTMP</span>
              </SelectItem>
              <SelectItem value={WHIP} className="text-sm">
                <span className="hidden sm:inline">🌐 WHIP (WebRTC)</span>
                <span className="sm:hidden">🌐 WHIP</span>
              </SelectItem>
            </SelectContent>
          </Select>

          <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="text-sm sm:text-base">
              ⚠️ Quest Warning!
            </AlertTitle>
            <AlertDescription className="text-xs sm:text-sm">
              This will reset your current streaming connection and end any
              active quest streams
            </AlertDescription>
          </Alert>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button
                variant="ghost"
                disabled={isPending}
                className="order-2 sm:order-1 text-sm"
              >
                ❌ Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={onSubmit}
              variant="blue"
              disabled={isPending}
              className="order-1 sm:order-2 text-sm"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin">⚡</div>
                  <span className="hidden sm:inline">Generating...</span>
                  <span className="sm:hidden">Loading...</span>
                </span>
              ) : (
                <>
                  <span className="hidden sm:inline">⚡ Generate New Keys</span>
                  <span className="sm:hidden">⚡ Generate</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
