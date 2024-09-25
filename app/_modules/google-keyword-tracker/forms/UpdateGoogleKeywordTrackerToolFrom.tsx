'use client';

import React, { useEffect, useState, useTransition } from 'react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DAYS_OF_WEEK, formInputUpdateGoogleKeywordTrackerSchema, GoogleKeywordTrackerWithCompetitors } from '@/src/entities/models/google-keyword-tracker';

import { Form, FormField, FormItem, FormLabel, FormControl, TextareaApp, FormMessage, FormInputField } from '@/app/_modules/settings/components/form';
import { Card, CardContent, CardHeader } from "@/app/_modules/settings/components/SettingsCard";
import { Button } from '@/app/_components/ui/button';

import { PauseIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { updateGoogleKeywordsTracker } from '../../actions/google-keyword-tracker.actions';
import { useToast } from '@/app/_components/ui/toast/use-toast';
import { useKeywordOpperations } from '../hooks/useKeywordOpperations';
import DeleteKeywordTrackerButton from '../components/DeleteKeywordTrackerButton';
import ChangeKeywordTrackerStatusButton from '../components/ChangeKeywordTrackerStatusButton';

const CreateGoogleKeywordTrackerToolFrom = ({ keywordTracker }: { keywordTracker: GoogleKeywordTrackerWithCompetitors }) => {
  const [isPending, startTransition] = useTransition();
  const [competitorDomain, setCompetitorDomain] = useState<string>("");
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const { toast } = useToast();
  const { addNewGoogleKeyword } = useKeywordOpperations();
  const form = useForm<z.infer<typeof formInputUpdateGoogleKeywordTrackerSchema>>({
    resolver: zodResolver(formInputUpdateGoogleKeywordTrackerSchema),
    defaultValues: {
      id: keywordTracker.id,
      refresh: keywordTracker.refresh,
      addCompetitors: [],
      removeCompetitors: [],
    }
  });

  useEffect(() => {
    setCompetitors(keywordTracker.competitors.map((comp) => comp.domainUrl));
  }, [keywordTracker, form]);

  const addCompetitor = () => {
    const addCompetitors = form.getValues('addCompetitors') ?? [];
    const removeCompetitors = form.getValues('removeCompetitors') ?? [];

    if (competitorDomain && !addCompetitors.includes(competitorDomain) && !competitors.includes(competitorDomain)) {
      form.setValue('addCompetitors', [...addCompetitors, competitorDomain]);
      form.setValue('removeCompetitors', removeCompetitors.filter((comp) => comp.domainUrl !== competitorDomain));
      setCompetitors([...competitors, competitorDomain]);
      setCompetitorDomain("");
    }
  };


  const removeCompetitor = (domain: string) => {
    const addCompetitors = form.getValues('addCompetitors') ?? [];
    const removeCompetitors = form.getValues('removeCompetitors') ?? [];
    const existingCompetitors = keywordTracker.competitors

    const competitorToRemove = existingCompetitors.find((comp) => comp.domainUrl === domain);

    if (competitorToRemove) {
      form.setValue('removeCompetitors', [...removeCompetitors, competitorToRemove]);
      setCompetitors(competitors.filter((comp) => comp !== domain));
    } else {
      form.setValue('addCompetitors', addCompetitors.filter((comp) => comp !== domain));
      setCompetitors(competitors.filter((comp) => comp !== domain));
    }
  };

  const onSubmit = async (values: z.infer<typeof formInputUpdateGoogleKeywordTrackerSchema>) => {
    startTransition(async () => {
      console.log('formValues ', values)
      const res = await updateGoogleKeywordsTracker(values);

      if (res.error) {
        toast({
          title: res.error,
          variant: "destructive",
        })
        return;
      }

      toast({
        title: "Google Keyword Tracker updated successfully",
        variant: "success",
      })

      if (values.keywords) {
        addNewGoogleKeyword(values.keywords, keywordTracker.id)
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
          <CardHeader className='flex justify-between items-center py-3'>
            Setup Google Keyword Tracker

            <div className='flex gap-2.5'>
              <ChangeKeywordTrackerStatusButton id={keywordTracker.id} status={keywordTracker.status} />
              <DeleteKeywordTrackerButton KeywordTrackerId={keywordTracker.id} />
            </div>
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
                            <div key={domain} className='theme-bg-p w-fit pl-2.5 py-1.5 pr-4 rounded-full flex items-center gap-2 text-xs'>
                              <button type='button' onClick={() => removeCompetitor(domain)} disabled={isPending}>
                                <XMarkIcon className='w-4 h-4 theme-t-t' />
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
                    {/* @ts-ignore  no problem, _count is added in the GoogleKeywordTrackerRepository.findByIdWithCompetitors() but could not be bothered to update the type*/}
                    <FormLabel>Keywords <span className='text-xs'>{keywordTracker._count.keywords && `(${keywordTracker._count.keywords})`}</span></FormLabel>
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
            type="reset"
            onClick={() => {
              form.reset({
                id: keywordTracker.id,
                refresh: keywordTracker.refresh,
                addCompetitors: [],
                removeCompetitors: [],
              }),
                setCompetitors(keywordTracker.competitors.map((comp) => comp.domainUrl))
            }}
            disabled={isPending}
            className="ml-auto"
            variant="outline"
            size="default"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="ml-2"
            variant="outline"
            size="default"
          >
            {isPending ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateGoogleKeywordTrackerToolFrom