interface OfflineVideoProps {
  username: string;
}

export const OfflineVideo = ({ username }: OfflineVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center bg-gradient-to-b from-muted to-muted/50">
      <div className="text-8xl animate-pulse">⚫</div>
      <div className="text-center space-y-3 max-w-md">
        <h3 className="text-xl font-bold">
          🎯 {username} is not currently on a quest
        </h3>
        <p className="text-muted-foreground">
          The adventurer is taking a break. Check back later for their next epic
          journey!
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>🔔</span>
          <span>Follow to get notified when they go live</span>
        </div>
      </div>
    </div>
  );
};
