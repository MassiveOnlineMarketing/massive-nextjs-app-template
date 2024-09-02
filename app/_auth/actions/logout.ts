"use server";

import { signOut } from "@/application/services/AuthService";


export const logout = async () => {
  await signOut();
};
