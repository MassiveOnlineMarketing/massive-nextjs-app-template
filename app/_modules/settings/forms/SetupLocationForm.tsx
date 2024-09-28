'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';

import { formSetupLocationSchema } from '@/src/entities/models/location';
import { Website } from '@/src/entities/models/website';

import { Form, FormControl, FormDescription, FormField, FormInputField, FormItem, FormLabel, FormMessage, TextareaApp } from '../components/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/_components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/app/_components/ui/command'
import { Label } from '@/app/_components/ui/label'

import { Card, CardContent, CardHeader } from '../components/SettingsCard'
import { Button } from '@/app/_components/ui/button';

import { ChevronDownIcon, MapPinIcon, PlusIcon, ViewfinderCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

import { cn } from '@/app/_components/utils';

// Location
import { LOCATION_LANGUAGE_OPTIONS } from '@/src/constants/locationLanguages';
import { loadLocationOptions } from '@/app/app/(settings)/settings/website/location/[id]/utils';
import { LocationLocationOptions } from '@/src/constants/locationLocations';
import GoogleLocationsDropdown from '../components/form/GoogleLocationsDropdown';
import { LOCATION_COUNTRY_OPTIONS } from '@/src/constants/locationCountries';

// Google Keyword Tracker
import { DAYS_OF_WEEK } from '@/src/entities/models/google-keyword-tracker';
import { setupLocation } from '@/app/_actions/location.actions';
import { useToast } from '@/app/_components/ui/toast/use-toast';
import { useKeywordOpperations } from '../../google-keyword-tracker/hooks/useKeywordOpperations';
import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';


type FormValues = z.infer<typeof formSetupLocationSchema>;

type SetupLocationProps = {
  usersWebsites: Website[] | undefined
}
const SetupLocationForm = ({ usersWebsites }: SetupLocationProps) => {
  const { toast } = useToast();
  const { addNewGoogleKeyword } = useKeywordOpperations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const websiteId = searchParams.get('websiteId');
  const form = useForm<FormValues>({
    resolver: zodResolver(formSetupLocationSchema),
    defaultValues: {
      websiteId: websiteId ?? undefined,
      refresh: DAYS_OF_WEEK.map((day) => day.value)
    }
  })


  const [isPending, startTransition] = useTransition();
  const addLocation = useWebsiteDetailsStore(state => state.addLocation);

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      console.log('form values', values);
      const res = await setupLocation(values);

      if (res.error) {
        toast({
          title: 'Error setting up location',
          description: res.error,
          variant: 'destructive',
          icon: 'destructive',
        });
        return;
      }

      if (res.createdLocation) {
        toast({
          title: 'Location setup successfully',
          variant: 'success',
          icon: 'success',
        });
        addLocation(res.createdLocation);
        router.push(`/app/settings/website/location/${res.createdLocation.id}`);
        form.reset();

        if (values.keywords && res.createdLocation.keywordTrackerToolId) {
          addNewGoogleKeyword(values.keywords, res.createdLocation.keywordTrackerToolId)
            .then((res) => {
              if (res.success) {

              }
            })
        }

      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        {/* Location  */}
        <LocationForm form={form} isPending={isPending} usersWebsites={usersWebsites} />

        {/* Google Keyword Tracker */}
        <GoogleKeywordTrackerForm form={form} isPending={isPending} />

        {/* Submit */}
        <div className='flex mx-6 mb-6'>
          <Button
            type="submit"
            disabled={isPending}
            className="ml-auto"
            variant="default"
            size="default"
          >
            Create
          </Button>
        </div>

      </form>
    </Form>
  );
};


type LocationFromProps = {
  form: UseFormReturn<FormValues>
  isPending: boolean
  usersWebsites: Website[] | undefined
}

const LocationForm = ({ form, isPending, usersWebsites }: LocationFromProps) => {

  const languages = useMemo(() => LOCATION_LANGUAGE_OPTIONS, []);
  const countries = useMemo(() => LOCATION_COUNTRY_OPTIONS, []);
  const [locations, setLocations] = useState<LocationLocationOptions[]>([]);
  const [displayLocations, setDisplayLocations] = useState<LocationLocationOptions[]>([]);
  const [selectedLocationDisplayTitle, setSelectedLocationDisplayTitle] = useState<LocationLocationOptions | null>(null);


  useEffect(() => {
    loadLocationOptions().then((options) => {
      setLocations(options);
      setDisplayLocations(options.filter((location) => location.targetType !== 'Country'));
    });
  }, []);


  return (
    <Card className='mx-6 mb-12'>
      <CardHeader className='theme-t-p flex flex-row items-center gap-1.5'>
        <MapPinIcon className='w-4 h-4' />
        <p>Location Details</p>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-3'>

        {usersWebsites ? (
          <FormField
            control={form.control}
            name="websiteId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Website</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <button
                        disabled={isPending}
                        role="combobox"
                        className={cn(
                          "w-[412px] justify-between items-center text-sm outline-none theme-t-p",
                          "inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                          "ring-base-500 focus:ring-1 focus:ring-ring focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-base-950 ",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? usersWebsites.find(
                            (website) => website.id === field.value
                          )?.websiteName
                          : "Select website"}
                        <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[412px] p-0 theme-bg-w">
                    <Command>
                      <CommandInput placeholder="Search website..." />
                      <CommandList>
                        <CommandEmpty>No website found.</CommandEmpty>
                        <CommandGroup>
                          {usersWebsites.map((website) => (
                            <CommandItem
                              value={website.websiteName.toLocaleString()}
                              key={website.id}
                              onSelect={() => {
                                form.setValue("websiteId", website.id); // Set the name as the value
                              }}
                            >
                              {website.websiteName}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the website that the location will be associated with.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <p>First setup a website</p>
        )}

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <button
                      disabled={isPending}
                      role="combobox"
                      className={cn(
                        "w-[412px] justify-between items-center text-sm theme-t-p",
                        "inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                        "ring-base-500 focus:ring-1 focus:ring-ring focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-base-950 ", !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? languages.find((language) => language.name === field.value.name)?.name : "Select language"}
                      <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[412px] p-0 theme-bg-w">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            // Officcialy you can only set the value as a string
                            // @ts-ignore
                            value={language}
                            key={language.googleId}
                            onSelect={() => {
                              form.setValue("language", language);
                            }}
                          >
                            {language.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used to gather the data.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col'>
          <Label className={cn('font-normal text-sm theme-t-t ',)}>Location <span className='text-xs'>(optional)</span></Label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                disabled={isPending}
                role="combobox"
                className={cn("w-[412px] flex justify-between items-baseline mt-1 text-sm theme-t-p",
                  "inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                  "ring-base-500 focus:ring-1 focus:ring-ring focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-base-950 ",
                )}
              >
                {selectedLocationDisplayTitle ? (
                  <>
                    <p className='text-xs font-bold'>{selectedLocationDisplayTitle?.countryCode}</p>
                    <p className='text-sm pl-1'>{selectedLocationDisplayTitle?.name}</p>

                    <p className='ml-auto'>{selectedLocationDisplayTitle?.targetType}</p>
                  </>
                ) : (
                  <p>Select location</p>
                )}
                <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[412px] p-0 theme-bg-w">
              <GoogleLocationsDropdown
                setLocationDisplayValue={setSelectedLocationDisplayTitle}
                items={displayLocations}
                displayField='name'
                setValue={form.setValue}
              />
            </PopoverContent>
          </Popover>
          <FormDescription className='mt-1'>
            Use a location to track your information for a specific geographic area.
          </FormDescription>
          {form.formState.errors.location && <p className="text-sm font-medium text-red-500 dark:text-red-900">{form.formState.errors.location.message}</p>}
        </div>

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Country</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <button
                      role="combobox"
                      disabled={isPending ? isPending : selectedLocationDisplayTitle ? true : false}
                      className={cn(
                        "w-[412px] justify-between items-center text-sm theme-t-p",
                        "inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                        "ring-base-500 focus:ring-1 focus:ring-ring focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-base-950 ",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {
                        selectedLocationDisplayTitle ? (
                          countries.find(
                            (country) => country.countryCode === selectedLocationDisplayTitle.countryCode
                          )?.name
                        ) : (field.value ? countries.find((country) => country.name === field.value.name)?.name : "Select country"
                        )
                      }
                      <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[412px] p-0 theme-bg-w">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((country) => (
                          <CommandItem
                            // Officcialy you can only set the value as a string
                            // @ts-ignore
                            value={country}
                            key={country.googleId}
                            onSelect={() => {
                              form.setValue("country", country);
                            }}
                          >
                            {country.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Specify the country where the location is based.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

      </CardContent>
    </Card>
  )
}

type GoogleKeywordTrackerFormProps = {
  form: UseFormReturn<FormValues>;
  isPending: boolean;
}

const GoogleKeywordTrackerForm = ({ form, isPending }: GoogleKeywordTrackerFormProps) => {

  const [competitorDomain, setCompetitorDomain] = useState<string>("");
  const [competitors, setCompetitors] = useState<string[]>([]);

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

  return (
    <Card className='mx-6 mb-6'>
      <CardHeader className='theme-t-p flex flex-row items-center gap-1.5'>
        <ViewfinderCircleIcon className='w-4 h-4' />
        <p>Keyword Tracker Settings</p>
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
  )
}


export default SetupLocationForm;