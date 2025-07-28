import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Actions = () => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground hover:text-primary"
        asChild
      >
        <Link href="/">
          <span className="h-4 w-4 flex items-center mr-2">🏠</span>
          <span className="hidden lg:block">Return to Quest</span>
        </Link>
      </Button>
      <UserButton />
    </div>
  );
};
