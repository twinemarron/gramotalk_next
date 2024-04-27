import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="container mx-auto px-2">
      {session ? "ログイン中" : "ログアウト"}
    </main>
  );
}
