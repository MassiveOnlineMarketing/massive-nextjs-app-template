'use server'

import { auth } from "@/app/_modules/auth/_nextAuth"

import { getLocation } from "@/app/_actions/location.actions"
import { getWebsitesByUser } from "@/app/_actions/website.actions"
import { getGoogleKeywordTrackerWithCompetitors } from "@/app/_modules/actions/google-keyword-tracker.actions"

import { capitalizeFirstLetter } from "@/app/_utils/stringUtils"

import UpdateGoogleKeywordTrackerToolFrom from "@/app/_modules/google-keyword-tracker/forms/UpdateGoogleKeywordTrackerToolFrom"
import CreateGoogleKeywordTrackerToolFrom from "@/app/_modules/google-keyword-tracker/forms/CreateGoogleKeywordTrackerToolFrom"
import LocationDetails from "./LocationDetails"

import { MapPinIcon } from "@heroicons/react/20/solid"


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

  const keywordTrackerToolRes = await getGoogleKeywordTrackerWithCompetitors(res.location.keywordTrackerToolId) 
  
  
  // display data 
  const websiteRes = await getWebsitesByUser(session.user.id)
  const website = websiteRes.websites?.find(website => website.id === res.location?.websiteId)

  const websiteName = website?.websiteName
  const country = res.location.country
  const location = res.location.location


  return (
    <>
      <div className='max-w-[918px] theme-bg-w border theme-b-p rounded-xl'>
        <div className='px-6 pt-6 pb-3 flex flex-col gap-1.5'>
          <p className='text-xl font-medium theme-t-p'>Location settings</p>
          <div className="text-base-500 flex items-center gap-1.5">
            <MapPinIcon className='w-4 h-4 text-p-500' />
            <p>{capitalizeFirstLetter(websiteName!)} {country} {location?.replace(/,/g, ', ')}</p>
          </div>
        </div>

        <div>
          <LocationDetails defaultLocation={res.location} usersWebsites={websiteRes.websites} />


          {
            keywordTrackerToolRes.googleKeywordTracker ? (
              <UpdateGoogleKeywordTrackerToolFrom keywordTracker={keywordTrackerToolRes.googleKeywordTracker}/>
            ) : (
              <CreateGoogleKeywordTrackerToolFrom locationId={res.location.id} websiteId={res.location.websiteId} />
            )
          }

        </div>
      </div>
    </>
  )
}

export default page