import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { profile } from "@/data/profile";

export function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={`About ${profile.shortName}`}
      description="Senior software engineer focused on product-quality interfaces, scalable frontend systems and practical AI-assisted experiences."
    >
      <RevealGroup className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <RevealItem className="space-y-4 rounded-2xl border border-border/70 bg-background/70 p-5 text-sm leading-relaxed text-muted-foreground md:p-6">
          <p>
            I design and build web applications where clarity, performance and
            maintainability matter. My work spans admin platforms, consumer
            products and internal tools — usually as the engineer closest to the
            product surface.
          </p>
          <p>
            I care about typed systems, reusable UI architecture and interfaces
            that feel intentional. Lately I&apos;ve been exploring AI as a
            navigation and knowledge layer for product experiences, without
            turning everything into a chatbot clone.
          </p>
        </RevealItem>
        <RevealItem className="rounded-2xl border border-border/70 bg-background/70 p-5 md:p-6">
          <aside>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                Location
              </dt>
              <dd className="mt-1 text-foreground">{profile.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                Focus
              </dt>
              <dd className="mt-1 text-foreground">{profile.focus}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                Availability
              </dt>
              <dd className="mt-1 text-foreground">{profile.availability}</dd>
            </div>
          </dl>
          </aside>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
