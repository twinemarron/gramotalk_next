"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { PutBlobResult, put } from "@vercel/blob";

export const updateUserName = async (formData: FormData) => {
  "use server";
  const displayNameEntry = formData.get("displayName");
  const displayName =
    typeof displayNameEntry === "string" ? displayNameEntry : "";
  const result = await db.update(users).set({ displayName });

  revalidatePath("/dashboard/settings");
  redirect("/dashboard/settings");
};

export const updateBio = async (formData: FormData) => {
  "use server";
  const bioEntry = formData.get("bio");
  const bio = typeof bioEntry === "string" ? bioEntry : "";
  const result = await db.update(users).set({ bio });

  revalidatePath("/dashboard/settings");
  redirect("/dashboard/settings");
};

export const uploadFile = async (formData: FormData) => {
  "use server";

  try {
    const file = formData.get("file") as File;
    const blob = await put(file.name, file, {
      access: "public",
    });
    // 画像をアップロードする処理
    const result = await db.update(users).set({ image: blob.url });
    revalidatePath("/dashboard/settings");
    redirect("/dashboard/settings");
  } catch (error) {
    console.error(error);
    return;
  }
};
