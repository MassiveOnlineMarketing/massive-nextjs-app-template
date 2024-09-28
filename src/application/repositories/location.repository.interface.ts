import { Location, LocationInsert, LocationUpdate } from "@/src/entities/models/location";

/**
 * Represents a location repository.
 */
export interface ILocationRepository {
  insert(location: LocationInsert): Promise<Location>;
  update(location: LocationUpdate): Promise<Location>;
  delete(id: string): Promise<Location>;
  getById(id: string): Promise<Location | null>;

  removeGoogleKeywordTrackerConnection(id: string): Promise<void>;
}