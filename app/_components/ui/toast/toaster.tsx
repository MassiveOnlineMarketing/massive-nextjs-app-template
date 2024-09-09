"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { useToast } from "./use-toast";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { AlertCircle } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        icon,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-[6px]">
              {icon === "success" && (
                <>
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">Success! </span>
                </>
              )}
              {icon === "destructive" && (
                <>
                  <XCircleIcon className="h-5 w-5 text-red-600" />
                  <span className="font-semibold">Error! </span>
                </>
              )}
              {icon === "warning" && (
                <>
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold">Warning! </span>
                </>
              )}

              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </div>
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
