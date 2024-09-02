import { cn } from "@/app/_components/utils";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface FormErrorProps {
  className?: string;
  message?: string;
}

export const FormError = ({ className, message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        "bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive border-red-600 bg-red-100 text-red-600 dark:border-red-900 dark:bg-red-900 dark:text-neutral-50",
        className,
      )}
    >
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
