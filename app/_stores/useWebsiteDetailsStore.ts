'use client';

import { Location } from "@/src/entities/models/location";
import { WebsiteWithLocation } from "@/src/entities/models/website";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WebsiteDetailsActions = {
  initialteWebsiteDetails: (website: WebsiteWithLocation[]) => void;
  addWebsite: (website: WebsiteWithLocation) => void;
  deleteWebsite: (id: string) => void;
  updateWebsite: (website: WebsiteWithLocation) => void;
  addLocation: (location: Location) => void;
  deleteLocation: (id: string) => void;
};

export type WebsiteDetailsState = {
  websites: WebsiteWithLocation[] | undefined;
  selectedWebsite: WebsiteWithLocation | undefined;
};

export type WebsiteDetailsStore = WebsiteDetailsState & WebsiteDetailsActions;

export const useWebsiteDetailsStore = create<WebsiteDetailsStore>() (
  persist(
    (set) => ({
      websites: undefined,
      selectedWebsite: undefined,
    
      initialteWebsiteDetails: (website: WebsiteWithLocation[]) => {
        set({ websites: website });
      },
      addWebsite(website) {
        set((state) => {
          if (state.websites) {
            return {
              websites: [...state.websites, website],
            };
          }
          return {
            websites: [website],
          };
        });
      },
      deleteWebsite(id) {
        set((state) => {
          if (state.websites) {
            return {
              websites: state.websites.filter((website) => website.id !== id),
            };
          }
          return state;
        });
      },
      updateWebsite(website) {
        set((state) => {
          if (state.websites) {
            return {
              websites: state.websites.map((w) => {
                if (w.id === website.id) {
                  return website;
                }
                return w;
              }),
            };
          }
          return state;
        });
      },
      addLocation(location) {
        set((state) => {
          if (state.websites) {
            return {
              websites: state.websites.map((website) => {
                if (website.id === location.websiteId) {
                  return {
                    ...website,
                    location: website.location ? [...website.location, location] : [location],
                  };
                }
                return website;
              }),
            };
          }
          return state;
        });
      },
      deleteLocation(id) {
        set((state) => {
          if (state.websites) {
            return {
              websites: state.websites.map((website) => {
                if (website.location) {
                  return {
                    ...website,
                    location: website.location.filter((loc) => loc.id !== id),
                  };
                }
                return website;
              }),
            };
          }
          return state;
        });
      }
    }),
    {
      name: "website-details-store",
    }
  )
);