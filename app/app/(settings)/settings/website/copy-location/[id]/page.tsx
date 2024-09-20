'use server'

import { auth } from "@/app/_modules/auth/_nextAuth"

import { getLocation } from "@/app/_actions/location.actions"
import { getWebsitesByUser } from "@/app/_actions/website.actions"

import CreateLocationForm from "@/app/_modules/settings/forms/CreateLocationForm"

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

    <div className='max-w-[918px] theme-bg-w border theme-b-p rounded-xl'>
      <div className='px-6 pt-6 pb-3 flex flex-col gap-1.5'>
        <p className='text-xl font-medium theme-t-p'>Copy a location</p>
        <p className='text-sm theme-t-t'>What location will you be using to power up your website?</p>
      </div>

      <CreateLocationForm location={res.location} usersWebsites={websiteRes.websites} />
    </div>
  )
}

export default page