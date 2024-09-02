"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { LoginSchema } from "@/application/schemas/authSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { CardWrapper } from "./card-wrapper";
import { Button } from "@/presentation/components/ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

import { InputFieldAppWithIcon } from "@/presentation/components/ui/inputFields";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { login } from "@/application/useCases/auth/login";
import { LoadingSpinnerSmall } from "@/presentation/components/ui/loading-spinner";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        // @ts-ignore
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <InputFieldAppWithIcon
                        className="bg-transparent"
                        Icon={EnvelopeIcon}
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputFieldAppWithIcon
                        className="bg-transparent"
                        Icon={LockClosedIcon}
                        {...field}
                        disabled={isPending}
                        placeholder="●●●●●●"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                    <Button
                      size="sm"
                      variant="secondary"
                      asChild
                      className="px-0 font-normal"
                    >
                      <Link href="/auth/reset">Forgot password?</Link>
                    </Button>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
          <Button disabled={isPending} type="submit" className="mt-20 w-full text-violet-50 relative gradient-mask primary-button hover:text-white bg-primary-500 font-medium" size='md'>
            {isPending ? <LoadingSpinnerSmall /> : 'Login' } 
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
