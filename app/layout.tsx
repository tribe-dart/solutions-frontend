import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: "innov8ive Solutions | Accessibility Guides and Updates",
  description:
    "innov8ive Solutions shares accessibility guidance, inclusive design practices, and assistive technology updates.",
  icons: {
    icon: "/globe.svg",
    shortcut: "/globe.svg",
    apple: "/globe.svg",
  },
  openGraph: {
    title: "innov8ive Solutions | Accessibility Guides and Updates",
    description:
      "Accessibility guidance, inclusive design practices, and assistive technology updates.",
    images: ["/globe.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "innov8ive Solutions | Accessibility Guides and Updates",
    description:
      "Accessibility guidance, inclusive design practices, and assistive technology updates.",
    images: ["/globe.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
