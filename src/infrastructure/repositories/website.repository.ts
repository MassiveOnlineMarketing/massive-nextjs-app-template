import { db } from "@/prisma";
import { IWebsiteRepository } from "@/src/application/repositories/website.repository.interface";
import { Website, WebsiteInsert } from "@/src/entities/models/website";
import { captureException, startSpan } from "@sentry/nextjs";
import { injectable } from "inversify";

@injectable()
export class WebsiteRepository implements IWebsiteRepository {
  async create(website: WebsiteInsert): Promise<Website> {
    return await startSpan(
      { name: "WebsiteRepository > create" },
      async () => {
        try {
          const created = await db.website.create({
            data: {
              ...website
            },
          });

          if (created) {
            return created;
          } else {
            throw new Error("Website not created");
          }
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    )
  }
}
