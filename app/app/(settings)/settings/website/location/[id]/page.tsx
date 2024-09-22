'use server'

import { auth } from "@/app/_modules/auth/_nextAuth"
import dynamic from "next/dynamic"

import { getLocation } from "@/app/_actions/location.actions"
import { getWebsitesByUser } from "@/app/_actions/website.actions"
import { getGoogleKeywordTrackerWithCompetitors } from "@/app/_modules/actions/google-keyword-tracker.actions"

import { capitalizeFirstLetter } from "@/app/_utils/stringUtils"

const LocationDetails = dynamic(() => import(/* webpackChunkName: "location-details" */ './LocationDetails'), {ssr: false});
const UpdateGoogleKeywordTrackerToolFrom = dynamic(() => import(/* webpackChunkName: "update-keyword-form" */ '@/app/_modules/google-keyword-tracker/forms/UpdateGoogleKeywordTrackerToolFrom'), {ssr: false});
const CreateGoogleKeywordTrackerToolFrom = dynamic(() => import(/* webpackChunkName: "create-keyword-form" */ '@/app/_modules/google-keyword-tracker/forms/CreateGoogleKeywordTrackerToolFrom'), {ssr: false});


import { MapPinIcon } from "@heroicons/react/20/solid"


const page = async ({
  params: { id }
}: {
  params: { id: string }
}) => {

  const session = await auth();
  if (!session?.user.id) return <>No user id</>

  const [locationRes, websiteRes] = await Promise.all([
    getLocation(id),
    getWebsitesByUser(session.user.id)
  ]);
  

  const res = await getLocation(id)

  if (!locationRes.location) {
    return <div>not found</div>
  }

  const keywordTrackerToolRes = await getGoogleKeywordTrackerWithCompetitors(locationRes.location.keywordTrackerToolId) 

  
  // display data 
  const website = websiteRes.websites?.find(website => website.id === res.location?.websiteId)

  const websiteName = website?.websiteName
  const country = locationRes.location.country
  const location = locationRes.location.location


  return (
    <>
      <div className='max-w-[918px] theme-bg-w border theme-b-p rounded-xl'>
        <div className='px-6 pt-6 pb-3 flex flex-col gap-1.5'>
          <p className='text-xl font-medium theme-t-p'>Location settings</p>
          <div className="text-base-500 flex items-center gap-1.5">
            <MapPinIcon className='w-4 h-4' />
            <p>{capitalizeFirstLetter(websiteName!)} {country} {location?.replace(/,/g, ', ')}</p>
          </div>
        </div>

        <div>
          <LocationDetails defaultLocation={locationRes.location} usersWebsites={websiteRes.websites} />


          {
            keywordTrackerToolRes.googleKeywordTracker ? (
              <UpdateGoogleKeywordTrackerToolFrom keywordTracker={keywordTrackerToolRes.googleKeywordTracker}/>
            ) : (
              <CreateGoogleKeywordTrackerToolFrom locationId={locationRes.location.id} websiteId={locationRes.location.websiteId} />
            )
          }

        </div>
      </div>
    </>
  )
}

export default page