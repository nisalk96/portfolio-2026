import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nisalk.dev — Senior Software Engineer",
  description:
    "AI-powered interactive developer portfolio for Nisal Keerthisinghe — Senior Software Engineer / Full-Stack Developer.",
  metadataBase: new URL("https://nisalk.dev"),
  openGraph: {
    title: "nisalk.dev — Senior Software Engineer",
    description:
      "Explore projects, experience and technical stack through an AI-assisted developer portfolio.",
    url: "https://nisalk.dev",
    siteName: "nisalk.dev",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
