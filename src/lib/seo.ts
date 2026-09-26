import type { Metadata } from "next";
import { seo } from "@/constants/seo";

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, seo.siteUrl).toString();
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string,
): Metadata {
  const ogImage = image || seo.ogImage;
  const ogTitle = `${title} | NisalK`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: seo.locale,
      siteName: seo.person.name,
      title: ogTitle,
      description,
      url: path,
      images: [
        {
          url: ogImage,
          width: seo.ogImageWidth,
          height: seo.ogImageHeight,
          alt: title,
        },
      ],
    },
    twitter: {
      card: seo.twitterCard,
      title: ogTitle,
      description,
      images: [ogImage],
    },
  };
}

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": `${seo.siteUrl}/#person`,
    name: seo.person.name,
    alternateName: [...seo.person.alternateName],
    url: seo.siteUrl,
    jobTitle: seo.person.jobTitle,
    address: { "@type": "PostalAddress", addressCountry: "LK" },
    knowsAbout: [...seo.person.knowsAbout],
    sameAs: [...seo.person.sameAs],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${seo.siteUrl}/#website`,
    url: `${seo.siteUrl}/`,
    name: seo.person.name,
    alternateName: ["NisalK", seo.siteName],
    inLanguage: "en",
    author: { "@id": `${seo.siteUrl}/#person` },
  };
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
