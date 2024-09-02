"use server";

import { signOut } from "@/app/api/auth/[...nextauth]/_nextAuth";



export const logout = async () => {
  await signOut();
};
