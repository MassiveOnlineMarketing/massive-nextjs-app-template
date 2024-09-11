'use server'

import { auth } from "@/app/api/auth/[...nextauth]/_nextAuth"

import { getLocation } from "@/app/_actions/location.actions"
import { getWebsitesByUser } from "@/app/_actions/website.actions"

import { capitalizeFirstLetter } from "@/app/_utils/stringUtils"

import UpdateGoogleKeywordTrackerToolFrom from "@/app/_modules/google-keyword-tracker/forms/UpdateGoogleKeywordTrackerToolFrom"
import LocationDetails from "./LocationDetails"
import { MapPinIcon } from "@heroicons/react/20/solid"
import Tiers from "../../../../ui/Tiers"

const page = async ({
  params: { id }
}: {
  params: { id: string }
}) => {

  const session = await auth();
  if (!session?.user.id) return <>No user id</>

  const res = await getLocation(id)

  if (!res.location) {
    return <div>not found</div>
  }

  const websiteRes = await getWebsitesByUser(session.user.id)


  const website = websiteRes.websites?.find(website => website.id === res.location?.websiteId)

  const websiteName = website?.websiteName
  const country = res.location.country
  const location = res.location.location


  return (
    <>
      <div className='max-w-[918px] theme-bg-w border theme-b-p rounded-xl'>
        <div className='px-6 pt-6 pb-3 flex flex-col gap-[6px]'>
          <p className='text-xl font-medium theme-t-p'>Location settings</p>
          <div className="text-base-500 flex items-center gap-[6px]">
            <MapPinIcon className='w-4 h-4 text-p-500' />
            <p>{capitalizeFirstLetter(websiteName!)} {country} {location?.replace(/,/g, ', ')}</p>
          </div>
        </div>

        <div>
          <LocationDetails defaultLocation={res.location} usersWebsites={websiteRes.websites} />
          <UpdateGoogleKeywordTrackerToolFrom />
        </div>
      </div>
    </>
  )
}

export default page