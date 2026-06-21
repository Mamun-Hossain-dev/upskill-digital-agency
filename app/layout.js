import { Poppins } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import WhatsAppButton from "@/components/Whatsapp";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "UpSkill Digital Agency | Digital Services",
  description:
    "Professional web development, digital marketing, SEO, and digital solutions to grow your business online.",
  keywords:
    "web development, digital marketing, SEO, digital agency, Bangladesh",
  authors: [{ name: "UpSkill Digital Agency" }],
  openGraph: {
    title: "UpSkill Digital Agency | Digital Services",
    description:
      "Professional web development, digital marketing, SEO, and digital solutions to grow your business online.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "UpSkill Digital Agency",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className={poppins.variable}>
      <body className={`${poppins.className} bg-slate-200 antialiased`}>
        <ClientLayout>{children}</ClientLayout>
        <WhatsAppButton />
      </body>
    </html>
  );
}
