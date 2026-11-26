import type { Metadata } from "next";
import { DM_Sans, Noto_Serif } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const serif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xiteon.com"),
  title: {
    default: "Xiteon | Human expertise that makes frontier AI work",
    template: "%s | Xiteon",
  },
  description:
    "Xiteon recruits, trains and manages expert talent to build the data, environments and evaluations behind frontier and enterprise AI.",
  openGraph: { siteName: "Xiteon", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
