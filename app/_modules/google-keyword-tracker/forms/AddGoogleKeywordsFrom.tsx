"use client";

import React, { useTransition } from "react";
import { usePathname } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage, TextareaApp } from "@/app/_modules/settings/components/form";

import { useKeywordOpperations } from "../hooks/useKeywordOpperations";

import { Button } from "@/app/_components/ui/button";
import { useGoogleKeywordTrackerStore } from "../stores/useGoogleKeywordTrackerStore";

const schema = z.object({
  keywords: z.string(),
})


/**
 * Component for adding keywords to a Google search campaign.
 *
 * @param children - The children of the component.
 * @param buttonClassName - The class name of the button.
 * @returns The JSX element for adding keywords to a Google search campaign.
 */
const AddKeywordsFrom = ({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) => {
  const pathName = usePathname();
  const googleKeywordTrackerId = pathName.split("/").pop();

  const [isLoading, startTransition] = useTransition();
  const { addNewGoogleKeyword } = useKeywordOpperations();
  const addNewResultsToStore = useGoogleKeywordTrackerStore(state => state.updateLatestResults);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (!googleKeywordTrackerId) return;

    startTransition(async () => {
      setOpen(false)
      addNewGoogleKeyword(data.keywords, googleKeywordTrackerId, true)
    })

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name='keywords'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keywords</FormLabel>
              <FormControl>
                <TextareaApp
                  {...field}
                  className='text-sm'
                  disabled={isLoading}
                  rows={8}
                  placeholder='Enter keywords you want to track separated by enter'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isLoading}
          type="submit"
          className="ml-auto"
        >
          Add
        </Button>
      </form>
    </Form>
  );
};

export default AddKeywordsFrom;
