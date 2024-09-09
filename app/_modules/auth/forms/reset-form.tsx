"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { reset } from "@/app/_modules/auth/actions";

import { formInputResetAccountSchema } from "@/src/entities/models/user";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { CardWrapper } from "./card-wrapper";

import { Button } from "@/app/_components/ui/button";
import { InputFieldAppWithIcon } from "@/app/_components/ui/inputFields";
import { LoadingSpinnerSmall } from "@/app/_components/ui/loading-spinner";

import { EnvelopeIcon } from "@heroicons/react/24/outline";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formInputResetAccountSchema>>({
    resolver: zodResolver(formInputResetAccountSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formInputResetAccountSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        // @ts-ignore
        setError(data?.error);
        // @ts-ignore
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <InputFieldAppWithIcon
                        Icon={EnvelopeIcon}
                        className="bg-transparent"
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
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
          <Button disabled={isPending} type="submit" className="mt-20 w-full text-violet-50 relative gradient-mask primary-button hover:text-white bg-primary-500 font-medium" size='default'>
            {isPending ? <LoadingSpinnerSmall /> : 'Send reset email'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
