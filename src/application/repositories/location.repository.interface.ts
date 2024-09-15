import { Location, LocationInsert, LocationUpdate } from "@/src/entities/models/location";

/**
 * Represents a location repository.
 */
export interface ILocationRepository {
  create(location: LocationInsert): Promise<Location>;
  update(location: LocationUpdate): Promise<Location>;
  delete(id: string): Promise<Location>;
  getById(id: string): Promise<Location | null>;
}