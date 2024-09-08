import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";
import { ExtendedUser } from "@/next-auth";
import { Website } from "@/src/entities/models/website";


export async function updateWebsiteUseCase(input: {
  id: string,
  websiteName: string,
  domainUrl: string,
  gscUrl?: string | null,
},
  user: ExtendedUser
): Promise<Website> {
  return startSpan({ name: "updateWebsite Use Case", op: "function" }, async () => {
    const websiteRepository = getInjection("IWebsiteRepository");

    // TODO: check if the user is the owner of the website/ allowed to update the website

    const website = await websiteRepository.update({
      id: input.id,
      websiteName: input.websiteName,
      domainUrl: input.domainUrl,
      gscUrl: input.gscUrl ?? null,
    });

    return  website ;
  });
}