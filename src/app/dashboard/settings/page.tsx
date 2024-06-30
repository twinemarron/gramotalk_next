import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import UserNameEditor from "@/components/UserNameEditor";
import BioEditor from "@/components/BioEditor";
import { auth } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className="container mx-auto px-2 flex flex-col gap-4">
      <div className="flex items-center justify-center gap-4 py-8">
        <UserAvatar
          src={session?.user?.image || ""}
          avatarStyle={{ width: "80px", height: "80px" }}
        />
        <Button variant="outline">Change image</Button>
      </div>
      <UserNameEditor session={session} />
      <BioEditor session={session} />
    </div>
  );
}
