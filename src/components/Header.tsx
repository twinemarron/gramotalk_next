import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import MenuDrawer from "@/components/MenuDrawer";
import { ModeToggle } from "@/components/ModeToggle";

export default async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container mx-auto px-2 flex justify-between h-14 items-center">
        <h1 className="font-bold">Gramotalk</h1>
        <MenuDrawer
          button={
            <Avatar>
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback className="font-sans bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                <span className="material-symbols-sharp">person</span>
              </AvatarFallback>
            </Avatar>
          }
        >
          <ModeToggle />
        </MenuDrawer>
      </div>
    </header>
  );
}
