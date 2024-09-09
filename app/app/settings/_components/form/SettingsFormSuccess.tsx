
import { cn } from "@/app/_components/utils";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

interface FormSuccessProps {
  className?: string;
  message?: string;
}

export const FormSuccess = ({ className, message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        "bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500",
        className,
      )}
    >
      <CheckBadgeIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
