import { Website, WebsiteInsert, WebsiteUpdate, WebsiteWithLocation } from "@/src/entities/models/website";

export interface IWebsiteRepository {
  create(website: WebsiteInsert): Promise<Website>;
  update(website: WebsiteUpdate): Promise<Website>;
  delete(id: string): Promise<Website>;
  getById(id: string): Promise<Website | null>;
  getByIdWithLocation(id: string): Promise<WebsiteWithLocation | null>;
  getByUserIdWithLocation(userId: string): Promise<WebsiteWithLocation[] | null>;
}