"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { updateUserName } from "@/app/actions";
import { FormButton } from "@/components/FormButton";
import { FormInput } from "@/components/FormInput";

export default function UserNameEditor({
  session,
}: {
  session: Session | null;
}) {
  const { update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const status = useFormStatus();

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">display name</div>
      {isEditing ? (
        <form
          action={async (formData) => {
            try {
              await updateUserName(formData);
              await update();
              setIsEditing(false);
            } catch (error) {
              console.error("Error in updateUserName:", error);
            }
          }}
          className="flex flex-col gap-2"
        >
          <FormInput
            defaultValue={session?.user?.displayName || ""}
            type="text"
            name="displayName"
          />
          <div className="flex justify-end gap-2">
            <FormButton
              label="Cancel"
              variant="outline"
              onClick={() => setIsEditing(false)}
            />
            <FormButton type="submit" label="Save" />
          </div>
        </form>
      ) : (
        <div>
          <div className="leading-10 px-3">
            {session?.user?.displayName || "-"}
          </div>
          <div className="flex flex-col items-end">
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Change
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
