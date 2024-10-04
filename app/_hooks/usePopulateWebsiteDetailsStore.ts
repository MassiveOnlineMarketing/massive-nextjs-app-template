"use client";

import { useEffect } from "react";
import { useCurrentUser } from "../_modules/auth/hooks/user-current-user";
import { useWebsiteDetailsStore } from "../_stores/useWebsiteDetailsStore";
import { getWebsiteWithLocationByUser } from "../_actions/website.actions";

export const usePopulateWebsiteDetailsStore = () => {
  const { setLoaded, setInitialWebsiteDetails, selectedWebsite, resetSelectedStore } =
    useWebsiteDetailsStore((state) => ({
      setLoaded: state.setLoaded,
      setInitialWebsiteDetails: state.initialteWebsiteDetails,
      selectedWebsite: state.selectedWebsite,
      resetSelectedStore: state.resetSelectedStore,
    }));

  const user = useCurrentUser();

  useEffect(() => {
    const fetchWebsites = async () => {
      if (!user) return;

      const res = await getWebsiteWithLocationByUser(user.id);
    
      console.log("fetch initial websiteStore");
      if (res.error) {
        console.log("error", res.error);
      }

      if (res.website || res.error === "Must be logged in to get a website") {
        console.log("settings initial websites details", res.website);
        if (res.website?.length === 0) {
          console.log("no website found");
          resetSelectedStore();
        }

        setInitialWebsiteDetails(res.website || []);
      }

      setLoaded(true);
    };

    fetchWebsites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!user || !selectedWebsite?.userId) return;
    if (selectedWebsite.userId !== user.id) {
      console.log("reset selected store");
      resetSelectedStore();
    }
  }, [selectedWebsite]);
};
