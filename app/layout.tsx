import { Inter } from "next/font/google";
import "./globals.css";
import "./theme.css";

import { SessionProvider } from "next-auth/react";
import { auth } from "./_modules/auth/_nextAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:  "Massive",
  description:
    "Zet uw zakelijke visie samen met Massive Online Marketing om in tastbare sucessen met strategieën die ondernemerschap en resultaatgerichtheid combineren",
  metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000/"),
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "white",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
