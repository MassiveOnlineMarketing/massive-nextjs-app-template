import { IWebsiteRepository } from "@/src/application/repositories/website.repository.interface";
import { DatabaseOperationError } from "@/src/entities/errors/common";
import { Website, WebsiteInsert, WebsiteUpdate, WebsiteWithLocation } from "@/src/entities/models/website";
import { injectable } from "inversify";


@injectable()
export class MockWebsiteRepository implements IWebsiteRepository {
    private _websites: WebsiteWithLocation[]

    constructor() {
      this._websites = [
        {
          id: '1',
          userId: '1',
          websiteName: 'Test website 1',
          domainUrl: 'test1.com',
          gscUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          location: null
        }
      ];
    }

    async create(website: WebsiteInsert): Promise<WebsiteWithLocation> {
      const newWebsite: WebsiteWithLocation = {
        id: (this._websites.length + 1).toString(),
        userId: website.userId,
        websiteName: website.websiteName,
        domainUrl: website.domainUrl,
        gscUrl: website.gscUrl ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),

        location: null,
      };

      this._websites.push(newWebsite);

      return newWebsite;
    }

    async update(website: WebsiteUpdate): Promise<WebsiteWithLocation> {
      const index = this._websites.findIndex((w) => w.id === website.id);
      if (index === -1) {
        throw new DatabaseOperationError('Website not found');
      }

      const updatedWebsite = {
        ...this._websites[index],
        websiteName: website.websiteName,
        domainUrl: website.domainUrl,
        gscUrl: website.gscUrl ?? null,
        updatedAt: new Date(),
      };

      this._websites[index] = updatedWebsite;

      return updatedWebsite;
    }

    async delete(id: string): Promise<WebsiteWithLocation> {
      const index = this._websites.findIndex((w) => w.id === id);
      if (index === -1) {
        throw new Error('Website not found');
      }

      const website = this._websites[index];
      this._websites.splice(index, 1);

      return website;
    }

    async getById(id: string): Promise<Website | null> {
      return this._websites.find((w) => w.id === id) ?? null;
    }

    async getByIdWithLocation(id: string): Promise<WebsiteWithLocation | null> {
      if (!id) {
        return null;
      }
      return this._websites.find((w) => w.location?.some(loc => loc.id === id)) ?? null;
    }
}
