import { db } from "@/prisma"
import { MapPinIcon } from "@heroicons/react/20/solid"
import UpdateLocationForm from "./UpdateLocationForm"
import UpdateGoogleKeywordTrackerToolFrom from "./UpdateGoogleKeywordTrackerToolFrom"
import UpdateGoogleLocationTrackerToolForm from "./UpdateGoogleLocationTrackerToolForm"

const page = async ({
  params: { id }
}: {
  params: { id: string }
}) => {

  // TODO: move to actions
  const location = await db.location.findFirst({
    where: {
      id
    },
    include: {
      website: true,
      googleKeywordTrackerTool: true
    }
  })

  if (!location) {
    return <div>not found</div>
  }

  return (
    <>
      <div className='px-6 pt-6 pb-3 flex flex-col gap-[6px]'>
        <p className='text-xl font-medium text-p-800'>Location Settings</p>
        <div className="text-p-500 flex items-center gap-[6px]">
          <MapPinIcon className='w-4 h-4 text-p-500' />
          <p>{location.website.websiteName} {location.country} {location.location}</p>
        </div>
      </div>

      <div className="px-6 pt-3">
        <UpdateLocationForm />
        <UpdateGoogleKeywordTrackerToolFrom />
        <UpdateGoogleLocationTrackerToolForm />
      </div>
    </>
  )
}

export default page