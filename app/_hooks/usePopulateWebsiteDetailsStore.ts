"use client";

import { useEffect } from "react";
import { useCurrentUser } from "../_modules/auth/hooks/user-current-user";
import { useWebsiteDetailsStore } from "../_stores/useWebsiteDetailsStore";
import { getWebsiteWithLocationByUser } from "../_actions/website.actions";

export const usePopulateWebsiteDetailsStore = () => {
  const setInitialWebsiteDetails = useWebsiteDetailsStore(
    (state) => state.initialteWebsiteDetails
  );
  const selectedWebsite = useWebsiteDetailsStore(
    (state) => state.selectedWebsite
  );
  const resetSelectedStore = useWebsiteDetailsStore(
    (state) => state.resetSelectedStore
  );

  
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
        if (selectedWebsite?.userId !== user.id) {
            console.log("reset selected store");
            resetSelectedStore();
        }
        setInitialWebsiteDetails(res.website || []);
      }
    };

    fetchWebsites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
