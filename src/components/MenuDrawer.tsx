import * as React from "react";
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
import SignInButton from "@/components/SignInButton";
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/auth";

export default async function MenuDrawer({
  button,
  children,
}: {
  button: React.ReactNode;
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <Drawer>
      <DrawerTrigger asChild>{button}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Accounts</DrawerTitle>
            <DrawerDescription>Accounts Description</DrawerDescription>
          </DrawerHeader>
          <div>{children}</div>
          <DrawerFooter>
            {session ? <SignOutButton /> : <SignInButton className="w-full" />}
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
