import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Poppins } from "next/font/google";
import { Mantine_Provider } from "./providers/MantineProvider.jsx";
import { SupabaseProvider } from "./providers/SupabaseProvider";
import { headers, cookies } from "next/headers";
import { Notifications } from "@mantine/notifications";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import NextTopLoader from "nextjs-toploader";

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
      <body
        className={`${poppins.className} bg-white overflow-y-scroll	 text-slate-900  user-not-tabbing flex flex-col grow-0`}
      >
        <NextTopLoader color="#06B6D4" showSpinner={false} />
        <SupabaseProvider session={session}>
          <Header />
          <Mantine_Provider>
            <Notifications position="top-center" />
            {children}
          </Mantine_Provider>
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  );
}
