import { auth } from "@/auth";
import MenuDrawer from "@/components/MenuDrawer";

export default async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container mx-auto px-2 flex justify-between h-14 items-center">
        <h1 className="font-bold">Gramotalk</h1>
        <MenuDrawer />
      </div>
    </header>
  );
}
