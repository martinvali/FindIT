import Link from "next/link";

export function DesktopNav() {
  return (
    <nav className="hidden md:flex">
      <ul className="flex flex-row gap-6">
        <li>
          <Link href="/">Jobs</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/login">Log in</Link>
        </li>
        <li>
          <Link href="/post">Post a job</Link>
        </li>
      </ul>
    </nav>
  );
}
