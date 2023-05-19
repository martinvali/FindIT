import Link from "next/link";

export function DesktopNav() {
  return (
    <nav className="hidden md:flex">
      <ul className="flex flex-row gap-7 text-slate-900 font-medium text-xl lg:text-2xl lg:gap-8">
        <li>
          <Link href="/" className="hover:text-cyan-700 transition-colors">
            Jobs
          </Link>
        </li>
        <li>
          <Link href="/blog" className="hover:text-cyan-700 transition-colors">
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:text-cyan-700 transition-colors"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link href="/login" className="hover:text-cyan-700 transition-colors">
            Log in
          </Link>
        </li>
        <li>
          <Link
            href="/post"
            className="bg-cyan-500 hover:bg-cyan-600 transition-colors text-white py-1.5 px-3 rounded-md text-xl lg:py-2 lg:px-5"
          >
            Post a job
          </Link>
        </li>
      </ul>
    </nav>
  );
}
