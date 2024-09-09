"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/app/_modules/auth/actions";

import { CardWrapper } from "./card-wrapper";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

import { LoadingSpinner } from "@/app/_components/ui/loading-spinner";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <LoadingSpinner />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
