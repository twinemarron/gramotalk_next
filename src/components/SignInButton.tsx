import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignIn({ className }: { className?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button type="submit" className={className}>
        Sign In
      </Button>
    </form>
  );
}
