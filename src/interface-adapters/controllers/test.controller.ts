import { getInjection } from "@/di/container";

export const testController = () => {
  const googleAdsApi = getInjection("IGoogleAdsApi");

  console.log("testController");

  googleAdsApi
    .generateHistoricalMetrics("1010318", "1010", ["eureka mignon", "eureka mignon specialita"])
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
