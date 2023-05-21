import "./globals.css";
import { Header } from "./Header";
import { Poppins } from "next/font/google";
import { Providers } from "./Providers.jsx";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white">
      <body className={`${poppins.className} bg-white text-slate-900`}>
        <Header />
        <Providers> {children}</Providers>
        <footer>footer here</footer>
      </body>
    </html>
  );
}
