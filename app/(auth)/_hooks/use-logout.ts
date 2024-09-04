'use client';

import { useRouter } from "next/navigation";
import { logout } from "../actions";


function useLogout() {
  const router = useRouter();

  async function logOut() {
    await logout();
    router.push('/auth/login');
  }

  return logOut;
}

export default useLogout;