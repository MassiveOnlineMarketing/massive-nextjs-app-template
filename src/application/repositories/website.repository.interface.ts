import { Website, WebsiteInsert } from "@/src/entities/models/website";

export interface IWebsiteRepository {
  create(website: WebsiteInsert): Promise<Website>;
}