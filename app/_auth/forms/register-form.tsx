"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/application/schemas/authSchema";
import { register } from "@/application/useCases/auth/register";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { CardWrapper } from "./card-wrapper";
import { Button } from "@/presentation/components/ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { InputFieldAppWithIcon } from "@/presentation/components/ui/inputFields";
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { LoadingSpinnerSmall } from "@/presentation/components/ui/loading-spinner";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        // @ts-ignore
        setError(data.error);
        // @ts-ignore
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
          <div className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <InputFieldAppWithIcon
                        Icon={UserIcon}
                        className="bg-transparent"
                        {...field}
                        disabled={isPending}
                        placeholder="John Doe"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            {isPending ? <LoadingSpinnerSmall /> : 'Create an account'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
