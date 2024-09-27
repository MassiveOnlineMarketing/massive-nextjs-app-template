'use client'

import React, { useState, useTransition } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { DAYS_OF_WEEK, formInputCreateGoogleKeywordTrackerSchema } from '@/src/entities/models/google-keyword-tracker'

import { Form, FormField, FormItem, FormLabel, FormControl, TextareaApp, FormMessage, FormInputField } from '@/app/_modules/settings/components/form'
import { Card, CardContent, CardHeader } from "@/app/_modules/settings/components/SettingsCard"
import { Button } from '@/app/_components/ui/button'
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { createGoogleKeywordTracker } from '../../actions/google-keyword-tracker.actions'
import { useToast } from '@/app/_components/ui/toast/use-toast'
import { useKeywordOpperations } from '../hooks/useKeywordOpperations'
import { useRouter } from 'next/navigation'

// import { Form, FormControl, FormField, FormInputField, FormItem, FormLabel, FormMessage } from 
const CreateGoogleKeywordTrackerToolFrom = ({ locationId, websiteId }: { locationId: string, websiteId: string }) => {
  const [isPending, startTransition] = useTransition();
  const [competitorDomain, setCompetitorDomain] = useState<string>("");
  const [competitors, setCompetitors] = useState<string[]>([]);

  const router = useRouter();
  const { toast } = useToast();
  const { addNewGoogleKeyword } = useKeywordOpperations();
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
      console.log('formValues', values)

      const createRes = await createGoogleKeywordTracker(values);

      if (createRes.error) {
        // error checks
        toast({
          title: createRes.error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Google Keyword Tracker created',
        variant: 'success',
      })

      if (values.keywords && createRes.googleKeywordTracker?.id) {
        addNewGoogleKeyword(values.keywords, createRes.googleKeywordTracker.id)
          .then((res) => {
            if (res.success) {
              form.setValue('keywords', '');
            }
          })
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
                      <div className='flex items-center justify-between'>
                        {DAYS_OF_WEEK.map((day) => (
                          <label key={day.value} className="relative flex items-center cursor-pointer">
                            <input
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
                            <span className={`w-[54px] h-[54px] grid place-items-center border rounded-[8px] ${field.value?.includes(day.value) ? 'border-base-500 text-base-500' : 'border-base-100 theme-t-t'}`}>
                              {day.label.slice(0, 2)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </FormControl>
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
                            className='mt-0'
                            type='text'
                            value={competitorDomain}
                            onChange={(e) => setCompetitorDomain(e.target.value)}
                            placeholder='Enter competitor domain'
                            disabled={isPending}
                          />
                          <Button className='absolute right-0 top-1/2 -translate-y-1/2' type='button' onClick={addCompetitor} disabled={isPending}>
                            <PlusIcon className='w-5 h-5 theme-t-s' />
                          </Button>
                        </div>
                        <div className='flex gap-3 pt-2 flex-wrap'>
                          {competitors.map((domain) => (
                            <div key={domain} className='theme-bg-p w-fit pl-2.5 py-1.5 pr-4 rounded-full flex items-center gap-2 text-sm'>
                              <button type='button' onClick={() => removeCompetitor(domain)} disabled={isPending}>
                                <XMarkIcon className='w-5 h-5 theme-t-t' />
                              </button>
                              <span className='theme-t-s'>{domain}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    </FormControl>
                    <FormMessage />
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
                        disabled={isPending}
                        rows={5}
                        placeholder='Enter keywords separated by enter'
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
            variant="outline"
            size="default"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateGoogleKeywordTrackerToolFrom