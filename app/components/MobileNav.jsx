"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../providers/SupabaseProvider";
import Link from "next/link";
import { notifications } from "@mantine/notifications";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { supabase, session } = useSupabase();
  const router = useRouter();

  const clickedLogOut = async () => {
    setIsOpen(false);
    notifications.show({
      loading: true,
      title: "Loading...",
    });
    const { error } = await supabase.auth.signOut();

    notifications.clean();

    if (error) {
      notifications.show({
        title: "Something went wrong.",
        message: error.message,
        color: "red",
      });
      return;
    }

    notifications.show({
      title: "We're sad to see you go.",
      color: "green",
    });
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
            <Link href="/" onClick={() => setIsOpen(false)}>
              Jobs
            </Link>
          </li>
          <li>
            <Link href="/blog" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
          </li>

          {session ? (
            <li>
              <button onClick={clickedLogOut}>Log out</button>
            </li>
          ) : (
            <li>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Log in
              </Link>
            </li>
          )}
          <li>
            <Link
              href={session ? "/dashboard" : "/signup"}
              onClick={() => setIsOpen(false)}
            >
              {session ? "Dashboard" : "Post a job"}
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
