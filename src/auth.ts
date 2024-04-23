import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import Google from "next-auth/providers/google";
import { db } from "@/server/db";

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [Google],
  adapter: DrizzleAdapter(db),
});
