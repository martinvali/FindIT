"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../providers/SupabaseProvider";
import Link from "next/link";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { supabase, session } = useSupabase();
  const router = useRouter();

  const clickedLogOut = () => {
    supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <img
        src="/mobilenav.svg"
        alt="Mobile menu icon"
        className="w-8 cursor-pointer md:hidden"
        onClick={() => setIsOpen(true)}
      />

      {/* Mobile nav */}
      <nav
        className={`absolute md:hidden ${
          isOpen ? "animate-openMobileNav" : "animate-closeMobileNav"
        } origin-[0%_0%] flex justify-center text-center text-slate-900 font-medium left-1/2 top-12 -translate-x-1/2 bg-white w-11/12 z-20 shadow py-12 rounded-md`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-5 top-5"
        >
          <img src="/close.svg" alt="Close mobile nav" className="w-5" />
        </button>
        <ul className="flex flex-col gap-6 text-2xl">
          <li>
            <Link href="/">Jobs</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {session ? (
            <li>
              <button onClick={clickedLogOut}>Log out</button>
            </li>
          ) : (
            <li>
              <Link href="/login">Log in</Link>
            </li>
          )}
          <li>
            <Link href={session ? "/dashboard" : "/login"}>
              {session ? "Dashboard" : "Post a job"}
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
