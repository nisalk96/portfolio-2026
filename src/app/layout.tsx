import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DesignTokensStyle } from "@/components/providers/DesignTokensStyle";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { seo } from "@/constants/seo";
import { jsonLdScript, personJsonLd, websiteJsonLd } from "@/lib/seo";
import "lenis/dist/lenis.css";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.defaultTitle,
    template: seo.titleTemplate,
  },
  description: seo.defaultDescription,
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  keywords: [...seo.keywords],
  authors: [{ name: seo.person.name, url: seo.siteUrl }],
  creator: seo.person.name,
  publisher: seo.person.name,
  openGraph: {
    type: "website",
    locale: seo.locale,
    url: seo.siteUrl,
    siteName: seo.siteName,
    title: "Nisal Keerthisinghe | Software Engineer & Full-Stack Web Developer",
    description:
      "Software engineer and full-stack web developer (Nisal / NisalK) based in Sri Lanka. React, Next.js, TypeScript, Node.js, GraphQL.",
    images: [
      {
        url: seo.ogImage,
        width: seo.ogImageWidth,
        height: seo.ogImageHeight,
        alt: "Nisal Keerthisinghe — software engineer and web developer, nisalk.dev",
      },
    ],
  },
  twitter: {
    card: seo.twitterCard,
    title: "Nisal Keerthisinghe | Software Engineer & Full-Stack Web Developer",
    description:
      "Software engineer & full-stack web developer in Sri Lanka. React, Next.js, TypeScript, Node.js, GraphQL.",
    images: [seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <DesignTokensStyle />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript({
              "@context": "https://schema.org",
              "@graph": [personJsonLd(), websiteJsonLd()],
            }),
          }}
        />
        <ThemeProvider>
          <MotionProvider>
            {children}
            <CustomCursor />
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
