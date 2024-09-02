'use server';

import { AuthService } from "@/application/services/AuthService";

export default async function currentUser(){
  const authService = new AuthService()
  const user = await authService.currentUser()

  return user
}