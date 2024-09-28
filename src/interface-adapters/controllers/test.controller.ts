'use server'

import { getInjection } from "@/di/container";

export const testController = () => {
  const searchConsoleApi = getInjection("ISearchConsoleApi");

  console.log("testController");

  searchConsoleApi
    .fetchTopQueriesByCountry(
      "1//05RrSrqDcLoqUCgYIARAAGAUSNwF-L9IrCtKpNa8XCg_vayjD5GiIghZqfSw8QynLZrRdfDq5Asvxz3jkUmYgccfzfNFxmfSI1R4",
      "https://baristart.nl",
      '100',
      'NL'
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
