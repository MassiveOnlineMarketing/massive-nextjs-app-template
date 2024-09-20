"use client";

import { useEffect } from "react";
import { useUserAccountStore } from "../_stores/useUserAccountStore";
import { getAccountDetails } from "../_modules/auth/actions";

export const usePopulateAccountStore = () => {
  const setAccountDetails = useUserAccountStore(
    (state) => state.setAccountDetails
  );

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        console.log("Fetching account details");

        const res = await getAccountDetails();

        if (res.error) {
          console.error("Error fetching account details", res.error);
          return;
        }

        if (res.account) {
          setAccountDetails(res.account);
        }
      } catch (error) {
        console.error("Error fetching account details", error);
      }
    };

    fetchAccountDetails();
  }, [setAccountDetails]);
};
