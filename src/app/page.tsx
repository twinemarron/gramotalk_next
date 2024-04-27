import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return <main>{session ? "ログイン中" : "ログアウト"}</main>;
}
