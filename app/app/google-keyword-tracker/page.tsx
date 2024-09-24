'use server';

import { isAuthenticated } from "@/app/_modules/auth/actions";
import ClientPage from "./ClientPage";

const page = async () => {
  await isAuthenticated();

  return (
    <ClientPage />
  )
}

export default page