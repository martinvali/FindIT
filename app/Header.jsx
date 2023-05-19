import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";

export function Header() {
  return (
    <header className="flex justify-between items-center pt-4 sm:pt-6 md:pt-8 outer-container">
      <Link href="/">
        <img src="/logo.svg" alt="FindIT logo" className="w-20 lg:w-24" />
      </Link>

      <DesktopNav />
      <MobileNav />
    </header>
  );
}
