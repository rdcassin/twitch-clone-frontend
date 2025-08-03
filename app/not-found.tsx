"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-center max-w-md">
        {"This Adventurer's Quest could not be found."}
        <br />
        Perhaps the path veered into the unknown realms...
      </p>
      <Button variant="secondary" asChild>
        <Link href="/">🏠 Return to Tavern</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
