'use client';

import { WebsiteWithLocation } from "@/src/entities/models/website";
import { create } from "zustand";

export type WebsiteDetailsActions = {
  initialteWebsiteDetails: (website: WebsiteWithLocation[]) => void;
  addWebsite: (website: WebsiteWithLocation) => void;
  deleteWebsite: (id: string) => void;
  updateWebsite: (website: WebsiteWithLocation) => void;
};

export type WebsiteDetailsState = {
  websites: WebsiteWithLocation[] | undefined;
};

export type WebsiteDetailsStore = WebsiteDetailsState & WebsiteDetailsActions;

export const useWebsiteDetailsStore = create<WebsiteDetailsStore>((set) => ({
  websites: undefined,

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
  }
}));