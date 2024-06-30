"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { updateBio } from "@/app/actions";
import { FormButton } from "@/components/FormButton";
import { FormTextarea } from "@/components/FormTextarea";

export default function BioEditor({ session }: { session: Session | null }) {
  const { update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const status = useFormStatus();

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">bio</div>
      {isEditing ? (
        <form
          action={async (formData) => {
            try {
              await updateBio(formData);
              await update();
              setIsEditing(false);
            } catch (error) {
              console.error("Error in updateBio:", error);
            }
          }}
          className="flex flex-col gap-2"
        >
          <FormTextarea
            defaultValue={session?.user?.bio || ""}
            name="bio"
            rows={10}
          />
          <div className="flex justify-end gap-2">
            <FormButton
              label="Cancel"
              variant="outline"
              onClick={() => setIsEditing(false)}
            />
            {<FormButton type="submit" label="Save" />}
          </div>
        </form>
      ) : (
        <div>
          <div className="px-3 whitespace-pre">{session?.user?.bio || "-"}</div>
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
