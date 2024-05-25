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
import { ModeToggle } from "@/components/ModeToggle";
import SignInButton from "@/components/SignInButton";
import SignOutButton from "@/components/SignOutButton";
import UserAvatar from "@/components/UserAvatar";
import { auth } from "@/auth";

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
                    <div className="flex gap-2 items-center">
                      <UserAvatar src={session?.user?.image || ""} />
                      <div>
                        <div>
                          {(session && session.user?.displayName) || ""}
                        </div>
                        <div>{(session && session.user?.email) || ""}</div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <></>
                )}
              </DrawerClose>
              <div className="flex">
                <ModeToggle />
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            {session ? (
              <SignOutButton className="w-full" />
            ) : (
              <SignInButton className="w-full" />
            )}
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
