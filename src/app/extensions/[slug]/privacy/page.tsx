import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { MarkdownPolicy } from "@/components/legal/MarkdownPolicy";
import { jsonLdScript, pageMetadata } from "@/lib/seo";
import {
  getAppPortfolioBySlug,
  getAppsWithPrivacyPolicy,
} from "@/server/hygraph-apps";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const apps = await getAppsWithPrivacyPolicy();
    return apps.map((app) => ({ slug: app.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppPortfolioBySlug(slug).catch(() => null);
  if (!app?.privacyPolicy) {
    return pageMetadata(
      "Privacy Policy",
      "Privacy policy for a nisalk extension or app.",
      `/extensions/${slug}/privacy`,
    );
  }

  return pageMetadata(
    `Privacy Policy — ${app.name}`,
    `Privacy policy for ${app.name}.`,
    `/extensions/${slug}/privacy`,
  );
}

export default async function ExtensionPrivacyPage({ params }: PageProps) {
  await connection();
  const { slug } = await params;
  const app = await getAppPortfolioBySlug(slug).catch(() => null);

  if (!app?.privacyPolicy?.trim()) {
    notFound();
  }

  const path = `/extensions/${app.slug}/privacy`;
  const updatedLabel = app.updatedAt
    ? new Date(app.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <SiteChrome>
      <main className="py-10 md:py-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": `https://nisalk.dev${path}#webpage`,
              url: `https://nisalk.dev${path}`,
              name: `Privacy Policy — ${app.name}`,
              isPartOf: { "@id": "https://nisalk.dev/#website" },
              about: { "@id": "https://nisalk.dev/#person" },
            }),
          }}
        />

        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-muted-foreground">
              nisalk.dev · Extensions · Legal
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Privacy Policy — {app.name}
            </h1>
            {updatedLabel ? (
              <p className="mt-1 text-sm text-muted-foreground">
                Last updated in CMS: {updatedLabel}
              </p>
            ) : null}
          </div>
          <Link
            href="/"
            className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted"
          >
            Back to portfolio
          </Link>
        </div>

        <MarkdownPolicy content={app.privacyPolicy} />
      </main>
    </SiteChrome>
  );
}
