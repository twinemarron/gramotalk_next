"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserName } from "@/app/actions";

export default function UserNameEditor() {
  const { data: session, update, status } = useSession();
  const [isEditingName, setIsEditingName] = useState(false);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">display name</div>
      {isEditingName ? (
        <form
          action={async (formData) => {
            await updateUserName(formData);
            await update();
            setIsEditingName(false);
          }}
          className="flex flex-col gap-2"
        >
          <Input
            defaultValue={session?.user?.displayName || ""}
            type="text"
            name="displayName"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditingName(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      ) : (
        <div>
          <div className="leading-10 px-3">
            {session?.user?.displayName || "-"}
          </div>
          <div className="flex flex-col items-end">
            <Button variant="outline" onClick={() => setIsEditingName(true)}>
              Change
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
