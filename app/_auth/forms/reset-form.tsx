"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetSchema } from "@/application/schemas/authSchema";
import { reset } from "@/application/useCases/auth/reset";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { CardWrapper } from "./card-wrapper";
import { Button } from "@/presentation/components/ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { InputFieldAppWithIcon } from "@/presentation/components/ui/inputFields";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { LoadingSpinnerSmall } from "@/presentation/components/ui/loading-spinner";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
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
          <Button disabled={isPending} type="submit" className="mt-20 w-full text-violet-50 relative gradient-mask primary-button hover:text-white bg-primary-500 font-medium" size='md'>
            {isPending ? <LoadingSpinnerSmall /> : 'Send reset email'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
