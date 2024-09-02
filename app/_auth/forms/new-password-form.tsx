"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { newPassword } from "@/application/useCases/auth/newPassword";
import { NewPasswordSchema } from "@/application/schemas/authSchema";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { CardWrapper } from "./card-wrapper";
import { Button } from "@/presentation/components/ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { InputFieldAppWithIcon } from "@/presentation/components/ui/inputFields";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { LoadingSpinnerSmall } from "@/presentation/components/ui/loading-spinner";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        // @ts-ignore
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputFieldAppWithIcon
                        Icon={LockClosedIcon}
                        className="bg-transparent"
                        {...field}
                        disabled={isPending}
                        placeholder="●●●●●●"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
          <Button disabled={isPending} type="submit" className="mt-20 w-full text-violet-50 relative gradient-mask primary-button hover:text-white bg-primary-500 font-medium" size='md'>
          {isPending ? <LoadingSpinnerSmall /> : 'Reset password' } 
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
