import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import Google from "next-auth/providers/google";
import { db } from "@/server/db";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from "@/server/db/schema";

const providers: Provider[] = [Google];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
  // users table に追加したカラムを使用するため、第二引数に独自スキーマを渡す
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  events: {
    // 新規ユーザー登録時に displayName を更新する
    createUser: async (message) => {
      try {
        if (!message.user.id) throw new Error("User ID not found");
        const result = await db
          .update(users)
          .set({ displayName: message.user.name })
          .where(eq(users.id, message.user.id))
          .returning({ updatedId: users.id, displayName: users.displayName });
      } catch (error) {
        console.error("Error in createUser event:", error);
      }
    },
  },
  callbacks: {
    session({ session, user }) {
      console.log("log...session: ", session);
      console.log("log...user: ", user);
      return {
        ...session,
        user: {
          ...session.user,
          displayName: user.displayName,
        },
      };
    },
    authorized({ request, auth }) {
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        return !!auth;
      }
      return true;
    },
  },
});
