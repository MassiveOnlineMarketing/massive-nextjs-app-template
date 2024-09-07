import { getInjection } from "@/di/container";
import { ExtendedUser } from "@/next-auth";
import { Website } from "@/src/entities/models/website";
import { startSpan } from "@sentry/nextjs";


export async function createWebsiteUseCase(input: {
  websiteName: string,
  domainUrl: string,
  gscUrl?: string | undefined,
},
  user: ExtendedUser
): Promise<Website> {
  return startSpan({ name: "createWebsite Use Case", op: "function" }, async () => {
    const websiteRepository = getInjection("IWebsiteRepository");

    // TODO: rm as string after fixing the ExtendedUser type
    const website = await websiteRepository.create({
      userId: user.id as string,
      websiteName: input.websiteName,
      domainUrl: input.domainUrl,
      gscUrl: input.gscUrl ?? null,
    });

    return  website ;
  });
}