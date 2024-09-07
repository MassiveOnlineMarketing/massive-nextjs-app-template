import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";
import { ExtendedUser } from "@/next-auth";
import { Website } from "@/src/entities/models/website";


export async function createWebsiteUseCase(input: {
  websiteName: string,
  domainUrl: string,
  gscUrl?: string | undefined,
},
  user: ExtendedUser
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