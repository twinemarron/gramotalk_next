import UserAvatar from "@/components/UserAvatar";
import { auth } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();
  return (
    <div>
      <div>
        <UserAvatar src={session?.user?.image || ""} />
      </div>
    </div>
  );
}
