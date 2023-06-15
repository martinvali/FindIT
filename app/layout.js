import "./globals.css";
import "@mantine/core/styles.css";
import { Header } from "./components/Header";
import { Poppins } from "next/font/google";
import { Mantine_Provider } from "./providers/MantineProvider.jsx";
import { SupabaseProvider } from "./providers/SupabaseProvider";
import { headers, cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import NextTopLoader from "nextjs-toploader";

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
          <Mantine_Provider> {children}</Mantine_Provider>
          <footer>footer here</footer>
        </SupabaseProvider>
      </body>
    </html>
  );
}
