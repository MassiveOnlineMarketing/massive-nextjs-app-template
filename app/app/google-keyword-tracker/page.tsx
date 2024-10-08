'use server';

import { isAuthenticated } from "@/app/_modules/auth/actions";
import ClientPage from "./ClientPage";

export async function generateMetadata(){
  return {
    title: "Massive | Keyword Tracker",
  }
}


const page = async () => {
  await isAuthenticated();

  return (
    <ClientPage />
  )
}

export default page