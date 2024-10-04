"use client";

import { Location } from "@/src/entities/models/location";
import { WebsiteWithLocation } from "@/src/entities/models/website";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getFaviconUrl } from "../_utils/imageUtils";
import { getSession, useSession } from "next-auth/react";
import { GoogleKeywordTracker } from "@/src/entities/models/google-keyword-tracker";

export type WebsiteDetailsActions = {
  setLoaded: (loaded: boolean) => void;

  initialteWebsiteDetails: (website: WebsiteWithLocation[]) => void;
  addWebsite: (website: WebsiteWithLocation) => void;
  deleteWebsite: (id: string) => void;
  updateWebsite: (website: WebsiteWithLocation) => void;
  addLocation: (location: Location) => void;
  deleteLocation: (id: string) => void;
  addKeywordTracker: (keywordTracker: GoogleKeywordTracker) => void;
  removeKeywordTracker: (eywordTracker: GoogleKeywordTracker) => void;

  setSelectedWebsite: (id: string) => void;
  setSelectedLocation: (id: string | undefined) => void;
  resetSelectedStore: () => void;
};

export interface WebsiteWithLocationDisplay extends WebsiteWithLocation {
  faviconUrl: string;
}

export type WebsiteDetailsState = {
  loaded: boolean;
  websites: WebsiteWithLocation[] | undefined;
  selectedWebsite: WebsiteWithLocationDisplay | undefined;
  selectedLocation: Location | undefined;
};

export type WebsiteDetailsStore = WebsiteDetailsState & WebsiteDetailsActions;

export const useWebsiteDetailsStore = create<WebsiteDetailsStore>()(
  persist(
    (set) => ({
      loaded: false,
      websites: undefined,
      selectedWebsite: undefined,
      selectedLocation: undefined,

      setLoaded: (loaded: boolean) => {
        set({ loaded });
      },
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
        set((state) => {
          if (state.selectedWebsite?.id === website.id) {
            return {
              selectedWebsite: {
                ...website,
                faviconUrl: getFaviconUrl(website?.domainUrl),
              },
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
                    location: website.location
                      ? [...website.location, location]
                      : [location],
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
      },
      addKeywordTracker(keywordTracker) {
        set((state) => {
          if (state.websites) {
            return {
              websites: state.websites.map((website) => {
                if (website.location) {
                  return {
                    ...website,
                    location: website.location.map((loc) => {
                      if (loc.id === keywordTracker.locationId) {
                        return {
                          ...loc,
                          keywordTrackerToolId: keywordTracker.id,
                        };
                      }
                      return loc;
                    }),
                  };
                }
                return website;
              }),
            };
          }
          return state;
        });
      },
      removeKeywordTracker(keywordTracker) {
        set((state) => {
          if (state.websites) {
            return {
              websites: state.websites.map((website) => {
                if (website.location) {
                  return {
                    ...website,
                    location: website.location.map((loc) => {
                      if (loc.keywordTrackerToolId === keywordTracker.id) {
                        return {
                          ...loc,
                          keywordTrackerToolId: null,
                        };
                      }
                      return loc;
                    }),
                  };
                }
                return website;
              }),
            };
          }
          return state;
        });
      },

      setSelectedWebsite(id) {
        set((state) => {
          if (state.websites) {
            const web = state.websites.find((website) => website.id === id);
            if (web) {
              return {
                selectedWebsite: {
                  ...web,
                  faviconUrl: getFaviconUrl(web?.domainUrl),
                },
              };
            }
          }
          return state;
        });
      },
      setSelectedLocation(id: string | undefined) {
        set((state) => {
          if (state.websites && state.selectedWebsite) {
            return {
              selectedLocation: state.selectedWebsite.location?.find(
                (loc) => loc.id === id
              ),
            };
          }
          return {
            ...state,
            selectedLocation: undefined,
          };
        });
      },
      resetSelectedStore() {
        set({
          selectedWebsite: undefined,
          selectedLocation: undefined,
        });
      },
    }),
    {
      name: `website-details-store`,
      // partialize: (state) => ({
      //   selectedWebsite: state.selectedWebsite,
      //   selectedLocation: state.selectedLocation,
      // }),
    }
  )
);
