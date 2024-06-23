import { providerMap } from "@/auth";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import Image from "next/image";

export default async function SignInPage() {
  return (
    <div className="flex flex-col items-center gap-2 h-screen w-screen flex justify-center items-center">
      {Object.values(providerMap).map((provider) => {
        return (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              await signIn(provider.id, { redirectTo: "/" });
            }}
          >
            <Button type="submit" className="flex gap-2">
              <Image
                alt="provider-logo"
                loading="lazy"
                height="24"
                width="24"
                id="provider-logo"
                src="https://authjs.dev/img/providers/google.svg"
              />
              Sign in with {provider.name}
            </Button>
          </form>
        );
      })}
    </div>
  );
}
