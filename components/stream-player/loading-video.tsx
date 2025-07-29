interface LoadingVideoProps {
  label: string;
}

export const LoadingVideo = ({ label }: LoadingVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center bg-gradient-to-b from-muted to-muted/50">
      <div className="text-8xl animate-spin">⚔️</div>
      <div className="text-center space-y-3 max-w-md">
        <h3 className="text-xl font-bold">🎮 Preparing Quest Connection</h3>
        <p className="text-muted-foreground">
          Establishing connection to the adventure realm...
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="animate-pulse">🔗</div>
          <span>Status: {label}</span>
        </div>
      </div>
    </div>
  );
};
