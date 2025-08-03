"use client";

import { useParticipants } from "@livekit/components-react";
import { useMemo } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdventurerItem } from "./adventurer-item";
import { useState } from "react";

interface ChatAllProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
}

export const ChatAll = ({
  hostName,
  hostIdentity,
  viewerName,
}: ChatAllProps) => {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounceValue(value, 500);
  const participants = useParticipants();

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce(
      (acc, participant) => {
        const hostAsViewer = `host-${participant.identity}`;
        if (!acc.some((p) => p.identity === hostAsViewer)) {
          acc.push(participant);
        }
        return acc;
      },
      [] as typeof participants,
    );

    return deduped.filter((participant) => {
      return participant.name
        ?.toLowerCase()
        .includes(debouncedValue.toLowerCase());
    });
  }, [participants, debouncedValue]);

  if (participants.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          🎯 No adventurers have joined the quest yet
        </p>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-3">
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder="🔍 Search adventurers..."
        className="border-white/10 text-sm mb-4"
      />
      <ScrollArea className="gap-y-2 px-2">
        <AdventurerItem
          key={hostIdentity}
          hostName={hostName}
          viewerName={viewerName}
          participantName={hostName}
          participantIdentity={hostIdentity}
        />

        {filteredParticipants
          .filter(
            (p) =>
              p.identity !== hostIdentity &&
              p.identity !== `host-${hostIdentity}` &&
              p.name !== hostName,
          )
          .map((participant) => (
            <AdventurerItem
              key={participant.identity}
              hostName={hostName}
              viewerName={viewerName}
              participantName={participant.name}
              participantIdentity={participant.identity}
            />
          ))}
      </ScrollArea>
    </div>
  );
};
