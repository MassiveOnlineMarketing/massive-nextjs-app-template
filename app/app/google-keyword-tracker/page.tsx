'use client';

import { isAuthenticated } from "@/app/_modules/auth/actions";
import ClientPage from "./ClientPage";

const Page = async () => {

  await isAuthenticated();

  return (
    <ClientPage />
  )
}

export default Page