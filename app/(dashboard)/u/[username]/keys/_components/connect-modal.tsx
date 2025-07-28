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

export const ConnectModal = () => {
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
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="🎥 Select Streaming Protocol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RTMP">📡 RTMP (Recommended for OBS)</SelectItem>
            <SelectItem value="WHIP">🌐 WHIP (WebRTC)</SelectItem>
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
          <DialogClose>
            <Button variant="ghost">❌ Cancel</Button>
          </DialogClose>
          <Button onClick={() => {}} variant="blue">
            ⚡ Generate New Keys
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
