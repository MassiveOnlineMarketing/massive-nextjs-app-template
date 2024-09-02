import { signInController } from "@/interface-adapters/controllers/auth/sign-in.controller";


type FormData = {
  email: string;
  password: string;
  code?: string | undefined;
};

export async function signIn(formData: FormData, callbackUrl?: string | null) {

  try {
    const signIn = await signInController(formData, callbackUrl);

    return signIn;
  } catch (error) {
    console.error(error);
  }

  return { error: "An error occurred" };
}