import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Header } from "./components/Header";
import { Poppins } from "next/font/google";
import { Mantine_Provider } from "./providers/MantineProvider.jsx";
import { SupabaseProvider } from "./providers/SupabaseProvider";
import { headers, cookies } from "next/headers";
import { Notifications } from "@mantine/notifications";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import NextTopLoader from "nextjs-toploader";
import Link from "next/link";
export const dynamic = "force-dynamic";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "FindIT: Browse remote and Estonian-based IT jobs & positions.",
  description:
    "Looking for a job in the technology sector in Estonia? Browse a wide variety of remote and Estonian-based IT-positions.",
  colorScheme: "light only",
};

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <html className="bg-white">
      <body className={`${poppins.className} bg-white text-slate-900`}>
        <NextTopLoader color="#06B6D4" showSpinner={false} />
        <SupabaseProvider session={session}>
          <Header />
          <Mantine_Provider>
            <Notifications position="top-center" />
            {children}
          </Mantine_Provider>
          <footer className="outer-container pt-20 md:pt-24 pb-10 md:pb-14">
            <Link href="/" className="inline-block mb-4">
              <img src="/logo.svg" alt="FindIT logo" className="w-20 lg:w-24" />
            </Link>
            <section className="md:flex flex-row items-end gap-8 lg:gap-12">
              <div>
                <div className="flex flex-row gap-2 mb-2">
                  <img src="/email.svg" alt="Email icon" />
                  <a href="mailto:info@findit.ee" className="text-lg ">
                    info@findit.ee
                  </a>
                </div>
                <div className="flex flex-row gap-2 mb-4 md:mb-0">
                  <img src="/phone.svg" alt="Phone icon" />
                  <a href="tel:+37256843090" className="text-lg">
                    +372 5684 3090
                  </a>
                </div>
              </div>
              <p className="text-lg">
                Copyright © 2023 FindIT. All rights reserved.
              </p>
            </section>
          </footer>
        </SupabaseProvider>
      </body>
    </html>
  );
}
