"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { DEFAULT_LOGIN_REDIRECT } from "../../../../routes";
import { Button } from "@/presentation/components/ui/button";

// TODO: Implement GoogleIconSvg
// import { GoogleIconSvg } from "@/app/(protected)/app/search/google-search/_assets";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      // callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="md"
        className="w-full gap-2 font-medium"
        variant="secondary"
        onClick={() => onClick("google")}
      >
        {/* <GoogleIconSvg className="w-5 h-5" /> */}
        Sign in with Google
      </Button>
      {/* <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        Github
      </Button> */}
    </div>
  );
};
