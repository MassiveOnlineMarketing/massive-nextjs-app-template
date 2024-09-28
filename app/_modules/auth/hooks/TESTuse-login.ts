"use client";

import { auth } from "../_nextAuth";

function useLogin() {

  const handleAfterLogin = async () => {
    // Do something after login
    await new Promise(resolve => setTimeout(resolve, 10000));
    console.log('After login');


    return { success: "Login successful" };
  };

  return { handleAfterLogin };
}

export default useLogin;
