'use server';

import { db } from "@/prisma";

const getUserWithWebsite = () => {
  const userWithWebsite = db.user.findFirst({
    where: {
      id: 'cm0lcohs30000almcm9lhywwk'
    },
    include: {
      website: true
    }
  })

  return userWithWebsite;
}

const getWebsiteWithLocation = () => {
  const websiteWithLocation = db.website.findFirst({
    where: {
      id: 'cm0s2it1c0000dnxb86h6dy7r'
    },
    include: {
      location: {
        select: {
          googleKeywordTrackerTool: true,
          website: true
        }
      }
    }
  })

  return websiteWithLocation;
}

const getKeywordTrackerToolWithLocation = () => {
  const keywordTrackerToolWithLocation = db.googleKeywordTrackerTool.findFirst({
    where: {
      id: 'cm0s2lzh90002dnxb0w312yvo'
    },
    include: {
      location: true
    }
  })

  return keywordTrackerToolWithLocation;
}

const getLocation = () => {
  const location = db.location.findFirst({
    where: {
      id: 'cm0s2it1c0000dnxb86h6dy7r'
    },
  })

  return location;
}

const deleteWebsite = () => {
  const deletedWebsite = db.website.delete({
    where: {
      id: 'cm0s2it1c0000dnxb86h6dy7r'
    }
  })

  return deletedWebsite;
}

const isUserAllowedToAccessLocation = () => {
    const userAllowedToAccessLocation = db.user.findFirst({
      where: {
        id: 'cm0lcohs30000almcm9lhywwk'
      },
      include: {
        website: {
          select: {
            location: true
          }
        }
      }
    })

    const user = db.location.findFirst({
      where: {
        id: 'cm0s2it1c0000dnxb86h6dy7r'
      },
      include:{
        website: true
      }
    })

  return userAllowedToAccessLocation;
}


const createWebsite = async () => {
  const createdWebsite = await db.website.create({
    data: {
      websiteName: "test",
      domainUrl: "https://test.com",
      userId: 'cm0lcohs30000almcm9lhywwk'
    }
  })

  return createdWebsite;
}