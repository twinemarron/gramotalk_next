import { api } from "@/trpc/server";
import { SignOut } from "@/app/components/signout-button";
import { SignIn } from "@/app/components/signin-button";
import { auth } from "@/auth";
import UserAvatar from "@/app/components/UserAvatar";

export default async function Home() {
  const session = await auth();
  return (
    <main>
      {session ? <SignOut /> : <SignIn />}
      <UserAvatar />
    </main>
  );
}
