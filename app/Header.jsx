import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";

export function Header() {
  return (
    <header className="flex justify-between items-center pt-4 px-4">
      <Link href="/">
        <Image src="/logo.svg" width={75} height={100} alt="FindIT logo" />
      </Link>

      <DesktopNav />
      <MobileNav className="lg:hidden" />
    </header>
  );
}
