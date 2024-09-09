"use client";

import { signIn } from "next-auth/react";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button } from "@/app/_components/ui/button";

import { GoogleIconSvg } from "@/assets/logos";

export const Social = () => {

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="default"
        className="w-full gap-2 font-medium"
        variant="secondary"
        onClick={() => onClick("google")}
      >
        <GoogleIconSvg className="w-5 h-5" />
        Sign in with Google
      </Button>
    </div>
  );
};
