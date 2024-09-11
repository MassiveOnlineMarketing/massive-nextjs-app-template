'use client'

import React, { useState, useTransition, useMemo, useEffect } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LOCATION_LANGUAGE_OPTIONS } from '@/src/constants/locationLanguages'
import { LOCATION_COUNTRY_OPTIONS } from '@/src/constants/locationCountries'
import { LOCATION_LOCATION_OPTIONS, LocationLocationOptions } from '@/src/constants/locationLocations'

import { createLocation } from '@/app/_actions/location.actions'
import { formInputCreateLocationSchema, Location } from '@/src/entities/models/location'
import { Website } from '@/src/entities/models/website'

import { Label } from '@/app/_components/ui/label'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../components/form'
import GoogleLocationsDropdown from '../components/form/GoogleLocationsDropdown'

import { cn } from '@/app/_components/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/app/_components/ui/command'
import { Card, CardContent, CardHeader } from '../components/SettingsCard'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/_components/ui/popover'
import { Button } from '@/app/_components/ui/button'

import { MapPinIcon } from '@heroicons/react/20/solid'
import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore'

const CreateLocationForm = ({ location, usersWebsites }: {
  location: Location | undefined, usersWebsites: Website[] | undefined;
}) => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [selectedLocationDisplayTitle, setSelectedLocationDisplayTitle] = useState<LocationLocationOptions | null>(null);

  const languages = useMemo(() => LOCATION_LANGUAGE_OPTIONS, []);
  const countries = useMemo(() => LOCATION_COUNTRY_OPTIONS, []);
  const locations = useMemo(() => LOCATION_LOCATION_OPTIONS, []);
  const displayLocations = useMemo(() => LOCATION_LOCATION_OPTIONS.filter((location) => location.targetType !== 'Country'), []);

  const addLocation = useWebsiteDetailsStore(state => state.addLocation)

  const form = useForm<z.infer<typeof formInputCreateLocationSchema>>({
    resolver: zodResolver(formInputCreateLocationSchema),
    defaultValues: {
      websiteId: location?.websiteId,
      language: languages.find(language => language.googleId.toString() === location?.languageCode),
      location: location?.location ? locations.find(l => l.canonicalName === location?.location) : undefined,
      country: countries.find(country => country.countryCode === location?.country),
    }
  });

  console.log('location', location)
  
  useEffect(() => {
    setSelectedLocationDisplayTitle(displayLocations.find(l => l.canonicalName.toString() === location?.location) || null);
  }, [])


  const onSubmit = async (values: z.infer<typeof formInputCreateLocationSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      console.log('values', values)
      const res = await createLocation(values);

      if (res.error) {
        setError(res.error);
      }

      if (res.createdLocation) {
        setSuccess('Location created successfully');
        console.log('created location', res.createdLocation)
        addLocation(res.createdLocation);
        form.reset();
      }
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='mx-6 mb-6'>
          <CardHeader className='flex flex-row items-center gap-[6px]'>
            <MapPinIcon className='w-4 h-4 text-p-800' />
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
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[412px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? usersWebsites.find(
                                (website) => website.id === field.value
                              )?.websiteName
                              : "Select website"}
                            {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[412px] p-0">
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
                      This is the language that will be used in the dashboard.
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
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[412px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? languages.find((language) => language.name === field.value.name)?.name : "Select language"}
                          {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[412px] p-0 bg-white">
                      <Command className='bg-white'>
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
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col'>
              <Label className={cn('font-normal text-sm text-slate-500',)}>Location <span className='text-xs'>(optional)</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn("w-[412px] justify-between items-center mt-1")}
                  >
                    {location?.location ? (
                      <>
                        <p className='text-xs font-bold'>{selectedLocationDisplayTitle?.countryCode}</p>
                        <p className='text-sm pl-1'>{selectedLocationDisplayTitle?.name}</p>

                        <p className='ml-auto'>{selectedLocationDisplayTitle?.targetType}</p>
                      </>
                    ) : (
                      <p>Select location</p>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[412px] p-0">
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
                        <Button
                          variant="outline"
                          role="combobox"
                          disabled={selectedLocationDisplayTitle ? true : false}
                          className={cn(
                            "w-[412px] justify-between",
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
                          {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[412px] p-0">
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
                    This is the country that will be used in the dashboard.
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