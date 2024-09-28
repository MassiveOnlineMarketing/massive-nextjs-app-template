import { injectable } from "inversify";

import { ILocationRepository } from "@/src/application/repositories/location.repository.interface";
import { Location, LocationInsert, LocationUpdate } from "@/src/entities/models/location";
import { DatabaseOperationError } from "@/src/entities/errors/common";

@injectable()
export class MockLocationRepository implements ILocationRepository {
  private _locations: Location[];

  constructor() {
    this._locations = [
      {
        id: "1",
        websiteId: "1",
        keywordTrackerToolId: null,
        language: "en",
        languageCode: "1000",
        country: "DE",
        location: "Berlin,Berlin,Germany",
        locationCode: "1003854",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        websiteId: "1",
        keywordTrackerToolId: null,
        language: "nl",
        languageCode: "1010",
        country: "NL",
        location: null,
        locationCode: "2528",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  async insert(location: LocationInsert): Promise<Location> {
    const newLocation: Location = {
      id: (this._locations.length + 1).toString(),
      ...location,
      keywordTrackerToolId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this._locations.push(newLocation);

    return newLocation;
  }

  async update(location: LocationUpdate): Promise<Location> {
    const index = this._locations.findIndex((l) => l.id === location.id);

    if (index === -1) {
      throw new DatabaseOperationError("Location not found");
    }

    this._locations[index] = {
      ...this._locations[index],
      ...location,
      updatedAt: new Date(),
    };

    return this._locations[index];
  }

  async delete(id: string): Promise<Location> {
    const index = this._locations.findIndex((l) => l.id === id);

    if (index === -1) {
      throw new Error("Location not found");
    }

    const deleted = this._locations.splice(index, 1);

    return deleted[0];
  }

  async getById(id: string): Promise<Location | null> {
    return this._locations.find((l) => l.id === id) || null;
  }

  async removeGoogleKeywordTrackerConnection(id: string): Promise<void> {
    const index = this._locations.findIndex((l) => l.id === id);

    this._locations[index].keywordTrackerToolId = null;
  }
}
