"use client";

import Link from "next/link";
import { useSupabase } from "../providers/SupabaseProvider";
import { useRouter } from "next/navigation";

export function DesktopNav() {
  const { supabase, session } = useSupabase();

  const router = useRouter();

  const clickedLogOut = () => {
    supabase.auth.signOut().then(() => {
      router.refresh();
    });
  };

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

        {session ? (
          <li>
            <button
              className="hover:text-cyan-700 transition-colors"
              onClick={clickedLogOut}
            >
              Log out
            </button>
          </li>
        ) : (
          <li>
            <Link
              href="/login"
              className="hover:text-cyan-700 transition-colors"
            >
              Log in
            </Link>
          </li>
        )}
        <li>
          <Link
            href={session ? "/dashboard" : "/signup"}
            className="bg-cyan-500 hover:bg-cyan-600 transition-colors text-white py-1.5 px-3 rounded-md text-xl lg:py-2 lg:px-5"
          >
            {session ? "Dashboard" : "Post a job"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
