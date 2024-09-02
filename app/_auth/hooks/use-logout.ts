'use client';

import { logout } from "@/presentation/auth/actions/logout";
import { useRouter } from "next/navigation";

function useLogout() {
  const router = useRouter();

  async function logOut() {
    await logout();
    router.push('/auth/login');
  }

  return logOut;
}

export default useLogout;