interface OfflineVideoProps {
  username: string;
}

export const OfflineVideo = ({ username }: OfflineVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-2 sm:space-y-4 justify-center items-center bg-gradient-to-b from-muted to-muted/50 p-4">
      <div className="text-4xl sm:text-6xl lg:text-8xl animate-pulse">⚫</div>
      <div className="text-center space-y-2 sm:space-y-3 max-w-xs sm:max-w-md px-2">
        <h3 className="text-sm sm:text-lg lg:text-xl font-bold">
          🎯 {username} is not currently on a quest
        </h3>
        <p className="hidden sm:inline sm:text-sm text-muted-foreground">
          The adventurer is taking a break. Check back later for their next epic
          journey!
        </p>
        <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
          <span>🔔 Follow to get notified when they go live</span>
        </div>
      </div>
    </div>
  );
};
