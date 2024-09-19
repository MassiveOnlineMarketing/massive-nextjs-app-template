import { injectable } from "inversify";

import { ILocationRepository } from "@/src/application/repositories/location.repository.interface";
import { Location, LocationInsert, LocationUpdate } from "@/src/entities/models/location";
import { captureException, startSpan } from "@sentry/nextjs";
import { db } from "@/prisma";
import { DatabaseOperationError } from "@/src/entities/errors/common";

@injectable()
export class LocationRepository implements ILocationRepository {
  async create(location: LocationInsert): Promise<Location> {
    return await startSpan(
      { name: "LocationRepository > create" },
      async () => {
        try {
          const created = await db.location.create({
            data: {
              ...location
            },
          });

          if (created) {
            return created;
          } else {
            throw new DatabaseOperationError("Location not created");
          }
        } catch (error) {
          captureException(error);
          throw error;
        }
      } 
    ) 
  }

  async update(location: LocationUpdate): Promise<Location> {
    return await startSpan(
      { name: "LocationRepository > update" },
      async () => {
        try {
          const updated = await db.location.update({
            where: {
              id: location.id,
            },
            data: {
              ...location,
            },
          });

          if (updated) {
            return updated;
          } else {
            throw new DatabaseOperationError("Location not updated");
          }
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    )
  }

  async delete(id: string): Promise<Location> {
    return await startSpan(
      { name: "LocationRepository > delete" },
      async () => {
        try {
          const deleted = await db.location.delete({
            where: {
              id,
            },
          });

          if (deleted) {
            return deleted;
          } else {
            throw new DatabaseOperationError("Location not deleted");
          }
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    )
  }

  async getById(id: string): Promise<Location | null> {
    return await startSpan(
      { name: "LocationRepository > getById" },
      async () => {
        try {
          const location = await db.location.findUnique({
            where: {
              id,
            },
          });

          return location;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    )
  };

  async removeGoogleKeywordTrackerConnection(id: string): Promise<void> {
    return await startSpan(
      { name: "LocationRepository > removeGoogleKeywordTrackerConnection" },
      async () => {
        try {
          await db.location.update({
            where: {
              id,
            },
            data: {
              keywordTrackerToolId: null,
            },
          });
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    )
  }
}