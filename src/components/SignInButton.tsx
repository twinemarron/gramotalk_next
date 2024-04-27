"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignInButton({ className }: { className?: string }) {
  return (
    <Button className={className} onClick={() => signIn()}>
      Sign In
    </Button>
  );
}
