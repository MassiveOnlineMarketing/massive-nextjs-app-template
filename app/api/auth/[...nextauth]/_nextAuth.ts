import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { db } from "../../../../prisma";
import authConfig from "../../../../auth.config";
import { User } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(db) as any, // TODO: Fix this type
  session: { strategy: "jwt" },
  events: {
    async linkAccount({ user, account }) {

      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // * Triggered when a user signs in or gives permissions using sign in function
    async signIn({ user, account }) {
      // * only triggers when email has been used to create an account
      if (user.id && account?.provider === "credentials") {
        const existingUser = await getById(user.id);

        // Prevent sign in without email verification
        if (!existingUser?.emailVerified) return false;

        // Update login provider for showing correct setting in the UI
        await updateLoginProvider(user.id as string, account.provider);
      }

      return true;
    },
    async jwt({ token, account, trigger, session }) {
      // * Token is accessible in the middleware
      // If there's no user ID in the token, return the token as is
      if (!token.sub) return token;

      // Fetch the existing user
      const existingUser = await getById(token.sub);

      // If the user doesn't exist, return the token as is
      if (!existingUser) return token;

      // Add role, credits, and refreshToken to the token
      token.role = existingUser.role;
      token.email = existingUser.email;
      token.loginProvider = existingUser.loginProvider;
      token.name = existingUser.name;

      return token;
    },
    //* is available in auth()
    async session({ session, token }: any) {
      const latestUserData = await getById(token.sub);

      // If there's a user in the session, add extra data to the user
      if (session.user && latestUserData) {
        session.user.id = latestUserData.id || session.user.id;
        session.user.role = latestUserData.role || session.user.role;
        session.user.name = latestUserData.name; 
        session.user.email = token.email;
        session.user.loginProvider = latestUserData.loginProvider || session.user.loginProvider;
      }

      return session;
    },
  },
  ...authConfig,
});

const updateLoginProvider = async (id: string, provider: string) => {
  try {
    const user = await db.user.update({
      where: { id },
      data: { loginProvider: provider },
    });

    return user;
  } catch {
    return null;
  }
};


export const updateGoogleAccount = async (
  userId: string,
  refresh_token: string,
  scope: string,
) => {
  return await db.$transaction(async (prisma) => {
    const account = await prisma.account.findFirst({
      where: { userId: userId },
    });

    if (!account) {
      return null;
    }

    const updatedAccount = await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        refresh_token,
        scope,
      },
    });

    return updatedAccount;
  });
};

async function getById(id: string): Promise<User | null> {
  const user = await db.user.findUnique({
    where: { id },
  });

  return user;
}