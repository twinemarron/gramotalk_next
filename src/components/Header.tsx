import Link from "next/link";
import MenuDrawer from "@/components/MenuDrawer";
import { ModeToggle } from "@/components/ModeToggle";

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container mx-auto px-2 flex justify-between h-14 items-center">
        <Link href={"/"}>
          <h1 className="font-bold">Gramotalk</h1>
        </Link>
        <div className="flex align-items-center gap-2">
          <ModeToggle />
          <MenuDrawer />
        </div>
      </div>
    </header>
  );
}
