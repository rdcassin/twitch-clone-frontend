import { Hint } from "@/components/hint";

interface FullscreenControlProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export const FullscreenControl = ({
  isFullscreen,
  onToggle,
}: FullscreenControlProps) => {
  const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white hover:text-white/80 transition-colors p-2 rounded bg-black/20 hover:bg-black/40"
          title={
            isFullscreen ? "Exit Full Quest View" : "Enter Full Quest View"
          }
        >
          {isFullscreen ? "🗗" : "🔍"}
        </button>
      </Hint>
    </div>
  );
};
