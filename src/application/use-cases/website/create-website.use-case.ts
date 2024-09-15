import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";

import { ExtendedUser } from "@/next-auth";
import { Website } from "@/src/entities/models/website";
import { User } from "@/src/entities/models/user";

export async function createWebsiteUseCase(input: {
  websiteName: string,
  domainUrl: string,
  gscUrl?: string | null,
},
  user: User
): Promise<Website> {
  return startSpan({ name: "createWebsite Use Case", op: "function" }, async () => {
    const websiteRepository = getInjection("IWebsiteRepository");


    const website = await websiteRepository.create({
      userId: user.id,
      websiteName: input.websiteName,
      domainUrl: input.domainUrl,
      gscUrl: input.gscUrl ?? null,
    });

    return  website ;
  });
}