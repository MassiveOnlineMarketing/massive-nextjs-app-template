import { db } from "@/prisma";
import { injectable } from "inversify";
import { captureException, startSpan } from "@sentry/nextjs";

import { Website, WebsiteInsert, WebsiteUpdate, WebsiteWithLocation } from "@/src/entities/models/website";
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

  async delete(id: string): Promise<Website> {
    return await startSpan(
      { name: "WebsiteRepository > delete" },
      async () => {
        try {
          const deleted = await db.website.delete({
            where: {
              id,
            },
          });

          if (deleted) {
            return deleted;
          } else {
            throw new DatabaseOperationError("Website not deleted");
          }
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async getById(id: string): Promise<Website | null> {
    return await startSpan(
      { name: "WebsiteRepository > getById" },
      async () => {
        try {
          const website = await db.website.findUnique({
            where: { id },
          });

          return website;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async getByIdWithLocation(id: string): Promise<WebsiteWithLocation | null> {
    return await startSpan(
      { name: "WebsiteRepository > getByIdWithLocation" },
      async () => {
        try {
          const website = await db.website.findUnique({
            where: { id },
            include: {
              location: true,
            },
          });

          return website;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async getByUserIdWithLocation(userId: string): Promise<WebsiteWithLocation[] | null> {
    return await startSpan(
      { name: "WebsiteRepository > getByUserIdWithLocation" },
      async () => {
        try {
          const user = await db.user.findUnique({
            where: { id: userId },
            include: {
              website: {
                include: {
                  location: true,
                },
              },
            },
          });

          return user?.website ?? null;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }
}
