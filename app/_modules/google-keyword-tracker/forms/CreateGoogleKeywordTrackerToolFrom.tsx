'use client'

import React, { useState, useTransition } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { DAYS_OF_WEEK, formInputCreateGoogleKeywordTrackerSchema } from '@/src/entities/models/google-keyword-tracker'

import { Form, FormField, FormItem, FormLabel, FormControl, TextareaApp, FormMessage, FormInputField, FormDescription } from '@/app/_modules/settings/components/form'
import { Card, CardContent, CardHeader } from "@/app/_modules/settings/components/SettingsCard"
import { Button } from '@/app/_components/ui/button'
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { createGoogleKeywordTracker } from '../../actions/google-keyword-tracker.actions'
import { useToast } from '@/app/_components/ui/toast/use-toast'
import { useKeywordOpperations } from '../hooks/useKeywordOpperations'
import { useRouter } from 'next/navigation'
import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore'

const CreateGoogleKeywordTrackerToolFrom = ({ locationId, websiteId }: { locationId: string, websiteId: string }) => {
  const [isPending, startTransition] = useTransition();
  const [competitorDomain, setCompetitorDomain] = useState<string>("");
  const [competitors, setCompetitors] = useState<string[]>([]);

  const router = useRouter();
  const { toast } = useToast();
  const { addNewGoogleKeyword } = useKeywordOpperations();
  const addGoogleKeywordTrackerToStore = useWebsiteDetailsStore(state => state.addKeywordTracker);
  const form = useForm<z.infer<typeof formInputCreateGoogleKeywordTrackerSchema>>({
    resolver: zodResolver(formInputCreateGoogleKeywordTrackerSchema),
    defaultValues: {
      locationId: locationId,
      websiteId: websiteId,
      refresh: DAYS_OF_WEEK.map((day) => day.value),
    }
  });

  const addCompetitor = () => {
    if (competitorDomain && !competitors.includes(competitorDomain)) {
      setCompetitors([...competitors, competitorDomain]);
      setCompetitorDomain("");
      form.setValue('addCompetitors', [...competitors, competitorDomain]);
    }
  };

  const removeCompetitor = (domain: string) => {
    const updatedCompetitors = competitors.filter((comp) => comp !== domain);
    setCompetitors(updatedCompetitors);
    form.setValue('addCompetitors', updatedCompetitors);
  };

  const onSubmit = async (values: z.infer<typeof formInputCreateGoogleKeywordTrackerSchema>) => {
    router.refresh();
    startTransition(async () => {
      const res = await createGoogleKeywordTracker(values);

      if (res.error) {
        toast({
          title: res.error,
          variant: 'destructive',
        });
        return;
      }

      if (res.googleKeywordTracker) {
        toast({
          title: 'Google Keyword Tracker created',
          variant: 'success',
        })
        addGoogleKeywordTrackerToStore(res.googleKeywordTracker);

        if (values.keywords && res.googleKeywordTracker?.id) {
          addNewGoogleKeyword(values.keywords, res.googleKeywordTracker.id)
            .then((res) => {
              if (res?.success) {
                form.setValue('keywords', '');
              }
            })
        }
      }
    })
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='mx-6 mb-6'>
          <CardHeader>
            Setup Google Keyword Tracker
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-3'>
            <div>
              <FormField
                control={form.control}
                name='refresh'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Refresh</FormLabel>
                    <FormControl>
                    <div className='flex items-center justify-between gap-1.5'>
                    {DAYS_OF_WEEK.map((day) => (
                      <label key={day.value} className="relative flex items-center cursor-pointer w-full min-w-8 aspect-square">
                        <input
                          disabled={isPending}
                          type='checkbox'
                          className='hidden'
                          checked={field.value?.includes(day.value) || false}
                          onChange={(e) => {
                            const newValue = e.target.checked
                              ? [...(field.value || []), day.value]
                              : (field.value || []).filter((v) => v !== day.value);
                            form.setValue('refresh', newValue);
                          }}
                        />
                        <span className={`w-full h-full grid place-items-center border rounded-[8px] ${field.value?.includes(day.value) ? 'border-base-500 text-base-500' : 'border-base-100 theme-t-t'}`}>
                          {day.label.slice(0, 2)}
                        </span>
                      </label>
                    ))}
                  </div>
                    </FormControl>
                    <FormDescription>
                  <span className='font-bold italic'>Warning:</span> leaving out a day will leave gaps in your historical data and may affect the accuracy of your reports.
                </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='addCompetitors'
                render={() => (
                  <FormItem
                    className='mt-3'
                  >
                    <FormLabel>Competitors</FormLabel>
                    <FormControl>
                    <>
                    <div className='flex items-center gap-2 relative'>
                      <FormInputField
                        className='mt-0 text-sm'
                        type='text'
                        value={competitorDomain}
                        onChange={(e) => setCompetitorDomain(e.target.value)}
                        placeholder='Enter competitor domain'
                        disabled={isPending}
                      />
                      <Button
                        className='absolute right-0 top-1/2 -translate-y-1/2'
                        type='button'
                        onClick={addCompetitor}
                        variant='ghost'
                        disabled={isPending}
                      >
                        <PlusIcon className='w-5 h-5 theme-t-s' />
                      </Button>
                    </div>
                    {competitors.length > 0 && (
                      <div className='flex gap-3 pt-2 flex-wrap'>
                        {competitors.map((domain) => (
                          <div key={domain} className='theme-bg-p w-fit pl-2.5 py-1.5 pr-4 rounded-full flex items-center gap-2 text-sm'>
                            <button type='button' onClick={() => removeCompetitor(domain)}
                              disabled={isPending}
                            >
                              <XMarkIcon className='w-5 h-5 theme-t-t' />
                            </button>
                            <span className='theme-t-s'>{domain}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Add competitors to compare your keyword ranking with.
                </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div>
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
                    disabled={isPending}
                    rows={8}
                    placeholder='Enter keywords you want to track separated by enter'
                  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        <div className='flex mx-6 mb-6'>
          <Button
            type="submit"
            disabled={isPending}
            className="ml-auto"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateGoogleKeywordTrackerToolFrom