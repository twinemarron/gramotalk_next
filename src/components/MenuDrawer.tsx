import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import UserAvatar from "@/components/UserAvatar";
import { auth, signOut } from "@/auth";

export default async function MenuDrawer() {
  const session = await auth();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <UserAvatar src={session?.user?.image || ""} />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Accounts</DrawerTitle>
            <DrawerDescription className="flex flex-col gap-2">
              <DrawerClose asChild>
                {session ? (
                  <Link href={"/dashboard/settings"}>
                    <span className="flex gap-2 items-center">
                      <UserAvatar src={session?.user?.image || ""} />
                      <span className="flex flex-col">
                        <span className="text-left">
                          {(session && session.user?.displayName) || ""}
                        </span>
                        <span className="text-left">
                          {(session && session.user?.email) || ""}
                        </span>
                      </span>
                    </span>
                  </Link>
                ) : (
                  <></>
                )}
              </DrawerClose>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              {session ? (
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <Button type="submit" className="w-full">
                    Sign Out
                  </Button>
                </form>
              ) : (
                <Link href={"/signin"}>
                  <Button className="w-full">Sign In</Button>
                </Link>
              )}
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
