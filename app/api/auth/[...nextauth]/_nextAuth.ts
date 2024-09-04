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
  unstable_update,
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
    async jwt({ token, account, trigger, session }) {

      if (!token.sub) return token;

      const existingUser = await getById(token.sub);
      if (!existingUser) return token;

      // * here we can set custom fields (dependent on the databse user) in the token, als needs to be added to the session. 
      // When adding new fields to the token/ session. Als add them the the extendedUser type in the root of the project.
      token.role = existingUser.role;

      // * here we can update the token with the user name, also update in the database
      if (trigger === "update") {
        console.log('jwt update session')

        // Example () => update({ user: { name: "John Doe" }}) --> { update } from useSession()
        if (session.user.name) {
          token.name = session.user.name;
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