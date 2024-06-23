import { providerMap } from "@/auth";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";

export default async function SignInPage() {
  return (
    <div className="flex flex-col items-center gap-2 h-screen w-screen flex justify-center items-center">
      {Object.values(providerMap).map((provider) => {
        return (
          <form
            action={async () => {
              "use server";
              await signIn(provider.id, { redirectTo: "/" });
            }}
          >
            <Button type="submit" className="flex gap-2">
              <img
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
