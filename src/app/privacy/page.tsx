import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { profile } from "@/data/profile";
import { jsonLdScript, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Privacy Policy — NK Currency",
  "Privacy policy for the NK Currency Chrome extension by nisalk. Local settings only, Frankfurter exchange rates, no malware or data selling.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <SiteChrome>
      <main className="py-10 md:py-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://nisalk.dev/privacy#webpage",
              url: "https://nisalk.dev/privacy",
              name: "Privacy Policy — NK Currency",
              isPartOf: { "@id": "https://nisalk.dev/#website" },
              about: { "@id": "https://nisalk.dev/#person" },
            }),
          }}
        />

        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-muted-foreground">
              nisalk.dev · Legal
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Privacy Policy — NK Currency
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Last updated: October 18, 2026
            </p>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted"
          >
            Back to portfolio
          </Link>
        </div>

        <div className="prose-like max-w-2xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-2">
            <p>
              <span className="font-medium text-foreground">Developer:</span>{" "}
              {profile.name} (
              <a className="underline hover:text-foreground" href="https://nisalk.dev">
                nisalk.dev
              </a>
              )
            </p>
            <p>
              <span className="font-medium text-foreground">Source code:</span>{" "}
              <a
                className="underline hover:text-foreground"
                href="https://github.com/nisalk96/chrome-reltime-converter"
                target="_blank"
                rel="noreferrer"
              >
                github.com/nisalk96/chrome-reltime-converter
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Summary</h2>
            <p className="mt-2">
              NK Currency is a Chrome extension that detects prices on web pages
              and converts them to your preferred currency. It is designed to be
              privacy-friendly: no accounts, no ads, no malware/spyware, and no
              selling of user data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Data we store on your device
            </h2>
            <p className="mt-2">
              The extension may store locally in Chrome storage:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Preferred currency and display settings</li>
              <li>Conversion mode (full realtime vs click-triggered)</li>
              <li>Temporary cached exchange rates (to reduce API calls)</li>
            </ul>
            <p className="mt-2">
              This data stays on your device unless you sync Chrome settings
              across your own devices via your Google account (controlled by
              Chrome, not by NK Currency servers).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Data we do not collect
            </h2>
            <p className="mt-2">
              We do not operate a backend that collects:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Browsing history</li>
              <li>Personal identity for NK Currency accounts (there are none)</li>
              <li>Payment card data</li>
              <li>Keystrokes, passwords, or clipboard contents for upload</li>
              <li>Advertising or tracking identifiers for sale</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Network requests
            </h2>
            <p className="mt-2">
              When converting currencies, the extension requests public
              exchange-rate JSON from:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                  https://api.frankfurter.dev
                </code>{" "}
                (
                <a
                  className="underline hover:text-foreground"
                  href="https://frankfurter.dev"
                  target="_blank"
                  rel="noreferrer"
                >
                  frankfurter.dev
                </a>
                )
              </li>
            </ul>
            <p className="mt-2">
              Those requests are for rate data only. The response is not executed
              as remote code.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Permissions
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <span className="font-medium text-foreground">storage</span> —
                save settings and rate cache locally
              </li>
              <li>
                <span className="font-medium text-foreground">
                  activeTab / scripting / content scripts
                </span>{" "}
                — read page text to find prices and show conversions when enabled
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Host access to api.frankfurter.dev
                </span>{" "}
                — fetch exchange rates
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Children&apos;s privacy
            </h2>
            <p className="mt-2">
              NK Currency is a general utility and does not knowingly collect
              personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Changes</h2>
            <p className="mt-2">
              We may update this policy when the extension changes. The latest
              version will be posted at{" "}
              <a className="underline hover:text-foreground" href="https://nisalk.dev/privacy">
                https://nisalk.dev/privacy
              </a>{" "}
              and/or in the GitHub repository.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              Questions: email{" "}
              <a
                className="underline hover:text-foreground"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>
              , use the contact email on the Chrome Web Store listing, or open an
              issue on GitHub:{" "}
              <a
                className="underline hover:text-foreground"
                href="https://github.com/nisalk96/chrome-reltime-converter"
                target="_blank"
                rel="noreferrer"
              >
                github.com/nisalk96/chrome-reltime-converter
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </SiteChrome>
  );
}
