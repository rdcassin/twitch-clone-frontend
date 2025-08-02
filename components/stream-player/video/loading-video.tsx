interface LoadingVideoProps {
  label: string;
}

export const LoadingVideo = ({ label }: LoadingVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-2 sm:space-y-4 justify-center items-center bg-gradient-to-b from-muted to-muted/50 p-3 sm:p-4">
      <div className="text-3xl sm:text-6xl lg:text-8xl animate-spin">⚔️</div>
      <div className="text-center space-y-1 sm:space-y-3 max-w-xs sm:max-w-md">
        <h3 className="text-xs sm:text-lg lg:text-xl font-bold">
          🎮 Connecting...
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">
          Establishing connection to the adventure realm...
        </p>
        <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs text-muted-foreground">
          <div className="animate-pulse">🔗</div>
          <span className="truncate">{label}</span>
        </div>
      </div>
    </div>
  );
};
