import { Website, WebsiteInsert, WebsiteUpdate } from "@/src/entities/models/website";

export interface IWebsiteRepository {
  create(website: WebsiteInsert): Promise<Website>;
  update(website: WebsiteUpdate): Promise<Website>;
}