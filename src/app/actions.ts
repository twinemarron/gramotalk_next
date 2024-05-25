"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export const updateUserName = async (formData: FormData) => {
  "use server";
  const displayNameEntry = formData.get("displayName");
  const displayName =
    typeof displayNameEntry === "string" ? displayNameEntry : "";
  const result = await db.update(users).set({ displayName });

  revalidatePath("/dashboard/settings");
  redirect("/dashboard/settings");
};
