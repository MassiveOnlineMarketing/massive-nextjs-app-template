import { db } from "@/prisma";
import { injectable } from "inversify";
import { captureException, startSpan } from "@sentry/nextjs";

import { Website, WebsiteInsert, WebsiteUpdate } from "@/src/entities/models/website";
import { DatabaseOperationError } from "@/src/entities/errors/common";

import { IWebsiteRepository } from "@/src/application/repositories/website.repository.interface";

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
            throw new DatabaseOperationError("Website not created");
          }
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    )
  }

  async update(website: WebsiteUpdate): Promise<Website> {
    return await startSpan(
      { name: "WebsiteRepository > update" },
      async () => {
        try {
          const updated = await db.website.update({
            where: {
              id: website.id,
            },
            data: {
              ...website,
            },
          });

          if (updated) {
            return updated;
          } else {
            throw new DatabaseOperationError("Website not updated");
          }
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    )
  }
}
