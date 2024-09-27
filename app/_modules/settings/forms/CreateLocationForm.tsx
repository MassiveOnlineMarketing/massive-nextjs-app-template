'use client'

import React, { useState, useTransition, useMemo, useEffect, use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LOCATION_LANGUAGE_OPTIONS } from '@/src/constants/locationLanguages'
import { LOCATION_COUNTRY_OPTIONS } from '@/src/constants/locationCountries'
import { LocationLocationOptions } from '@/src/constants/locationLocations'

import { createLocation } from '@/app/_actions/location.actions'
import { formInputCreateLocationSchema, Location } from '@/src/entities/models/location'
import { Website } from '@/src/entities/models/website'

import { Label } from '@/app/_components/ui/label'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../components/form'
import GoogleLocationsDropdown from '../components/form/GoogleLocationsDropdown'

import { useToast } from '@/app/_components/ui/toast/use-toast'
import { cn } from '@/app/_components/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/app/_components/ui/command'
import { Card, CardContent, CardHeader } from '../components/SettingsCard'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/_components/ui/popover'
import { Button } from '@/app/_components/ui/button'

import { ChevronDownIcon, MapPinIcon } from '@heroicons/react/20/solid'
import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore'
import { loadLocationOptions } from '@/app/app/(settings)/settings/website/location/[id]/utils'

const CreateLocationForm = ({ location, usersWebsites }: {
  location: Location | undefined, usersWebsites: Website[] | undefined;
}) => {
  const [isPending, startTransition] = useTransition();
  const [selectedLocationDisplayTitle, setSelectedLocationDisplayTitle] = useState<LocationLocationOptions | null>(null);
  const [locations, setLocations] = useState<LocationLocationOptions[]>([]);
  const [displayLocations, setDisplayLocations] = useState<LocationLocationOptions[]>([]);
  console.log('selectedLocationDisplayTitle', selectedLocationDisplayTitle)


  const languages = useMemo(() => LOCATION_LANGUAGE_OPTIONS, []);
  const countries = useMemo(() => LOCATION_COUNTRY_OPTIONS, []);

  useEffect(() => {
    loadLocationOptions().then((options) => {
      setLocations(options);
      setDisplayLocations(options.filter((location) => location.targetType !== 'Country'));
    });
  }, []);

  const addLocation = useWebsiteDetailsStore(state => state.addLocation)


  // Set the websiteId from the query params
  const searchParams = useSearchParams();
  const websiteId = searchParams.get('websiteId');
  useEffect(() => {
    if (websiteId) {
      console.log('setting websiteId', websiteId)
      form.setValue('websiteId', websiteId);
    }
  }, [websiteId]);

  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formInputCreateLocationSchema>>({
    resolver: zodResolver(formInputCreateLocationSchema),
    defaultValues: {
      websiteId: location?.websiteId,
      language: languages.find(language => language.googleId.toString() === location?.languageCode),
      location: location?.location ? locations.find(l => l.canonicalName === location?.location) : undefined,
      country: countries.find(country => country.countryCode === location?.country),
    }
  });

  useEffect(() => {
    setSelectedLocationDisplayTitle(displayLocations.find(l => l.canonicalName.toString() === location?.location) || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (values: z.infer<typeof formInputCreateLocationSchema>) => {
    startTransition(async () => {
      console.log('formValues', values)
      const res = await createLocation(values);

      if (res.error) {
        toast({
          title: 'Error creating location',
          description: res.error,
          variant: 'destructive',
        })
      }

      if (res.createdLocation) {
        addLocation(res.createdLocation);
        form.reset();
        router.push(`/app/settings/website/location/${res.createdLocation.id}`);
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='mx-6 mb-6'>
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
                            role="combobox"
                            className={cn(
                              "w-[412px] justify-between items-center text-sm outline-none",
                              "inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 placeholder-gray-400 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
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
                          role="combobox"
                          className={cn(
                            "w-[412px] justify-between items-center text-sm",
                            "inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 placeholder-gray-400 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
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
                    role="combobox"
                    className={cn("w-[412px] flex justify-between items-baseline mt-1 text-sm",
                      "inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 placeholder-gray-400 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                      "ring-base-500 focus:ring-1 focus:ring-ring focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-base-950 ",
                    )}
                  >
                    {location?.location ? (
                      <>
                        <p className='text-xs font-bold'>{selectedLocationDisplayTitle?.countryCode}</p>
                        <p className='text-sm pl-1'>{selectedLocationDisplayTitle?.name}</p>

                        <p className='ml-auto'>{selectedLocationDisplayTitle?.targetType}</p>
                      </>
                    ) : (
                      selectedLocationDisplayTitle ? (
                        <>
                          <p className='text-xs font-bold'>{selectedLocationDisplayTitle?.countryCode}</p>
                          <p className='text-sm pl-1'>{selectedLocationDisplayTitle?.name}</p>

                          <p className='ml-auto'>{selectedLocationDisplayTitle?.targetType}</p>
                        </>
                      ) : (
                        <p>Select location</p>
                      )
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
                          disabled={selectedLocationDisplayTitle ? true : false}
                          className={cn(
                            "w-[412px] justify-between items-center text-sm",
                            "inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 placeholder-gray-400 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
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

export default CreateLocationForm