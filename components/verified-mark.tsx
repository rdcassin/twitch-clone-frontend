import { Check } from "lucide-react";

export const VerifiedMark = () => {
  return (
    <div
      className="p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-blue-600"
      title="Verified Quest Leader"
    >
      <Check className="h-2.5 w-2.5 text-white stroke-[4px]" />
    </div>
  );
};
