import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { db } from "@/prisma";
import authConfig from "@/auth.config";
import { User } from "@prisma/client";


// * get the session object
// Use Auth() in server side code te
// Use GetSession() in client code to

// * get the session data with the session object
// Use useSession() for client sessions

// Bottom of the file has more examples

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
  adapter: PrismaAdapter(db),
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
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        // Store the refresh token
        console.log('SIGN IN CALLBACK')
        console.log("account", account);
        console.log("user", user);
        if (
          account?.provider === "google" &&
          account.refresh_token &&
          account.scope
        ) {
          console.log("google account");
          await updateGoogleAccount(
            user.id as string,
            account.refresh_token,
            account.scope,
          );
        }

        return true;
      }

      // * only triggers when email has been used to create an account
      if (user.id) {
        const existingUser = await getById(user.id);

        // Prevent sign in without email verification
        if (!existingUser?.emailVerified) return false;

        // Update login provider for showing correct setting in the UI
        await updateLoginProvider(user.id as string, account.provider);
      }

      return true;
    },
    async jwt({ token, account, trigger, session }) {
      // console.log('jwt callback', token, account, trigger, session)

      if (!token.sub) return token;

      const existingUser = await getById(token.sub);
      if (!existingUser) return token;

      // * here we can set custom fields (dependent on the databse user) in the token, als needs to be added to the session. 
      // When adding new fields to the token/ session. Als add them the the extendedUser type in the root of the project.
      token.role = existingUser.role;
      token.loginProvider = existingUser.loginProvider;
      token.credits = existingUser.credits;

      // * here we can update the token with the user name, also update in the database
      if (trigger === "update") {
        console.log('jwt update session')

        // Example () => update({ user: { name: "John Doe" }}) --> { update } from useSession()
        if (session.user.name) {
          token.name = session.user.name;
        }
        if (session.user.email) {
          token.email = session.user.email
        }
      }

      return token;
    },
    async session({ session, token }: any) {

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }

      if (token.loginProvider && session.user) {
        session.user.loginProvider = token.loginProvider
      }

      if (token.credits && session.user) {
        session.user.credits = token.credits
      }

      // * here we can set custom fields in the session
      // session.user.customField = "customField";

      return session;
    },
  },
  ...authConfig,
});


async function getById(id: string): Promise<User | null> {
  const user = await db.user.findUnique({
    where: { id },
  });

  return user;
}

// * Example of using the unstable_update function Server side
// <form
//   action={
//   async () => {
//     'use server';
//     await unstable_update({ user: { name: 'Serverserver-man' } });
//   }
// }
// >
//   <button>
//   Server Side Update
//     </button>
//     </form>


// * Example of using the signOut function Server side
//     <form
//   action={
//   async () => {
//     'use server';
//     await signOut();
//   }
// }
// >
//   <button>
//   Log Out
//     </button>
//     </form>


// * Example of using update function client side 
// const { update } = useSession()

// <button onClick={() => update({ user: { name: "John Doe" }})}>update session</button>


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
