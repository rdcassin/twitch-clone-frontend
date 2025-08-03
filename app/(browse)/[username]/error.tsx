"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <div className="text-5xl animate-pulse">💥</div>
      <p className="text-center max-w-md text-lg font-semibold">
        A magical mishap has occurred!
        <br />
        The fates have intervened in your quest.
      </p>
      <Button variant="secondary" asChild>
        <Link href="/">🏠 Return to Tavern</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
