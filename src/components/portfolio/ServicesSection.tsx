"use client";

import {
  IconArrowUpRight,
  IconCloud,
  IconCode,
  IconLayoutDashboard,
  IconStack2,
  type Icon,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TintIcon, tintOrder } from "@/components/portfolio/TintIcon";
import { services, type ServiceIcon } from "@/data/services";

const serviceIcons: Record<ServiceIcon, Icon> = {
  code: IconCode,
  stack: IconStack2,
  dashboard: IconLayoutDashboard,
  cloud: IconCloud,
};

export function ServicesSection() {
  return (
    <Section id="services" eyebrow="What I do" title="Services I Offer">
      <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {services.map((service, index) => (
          <RevealItem
            key={service.id}
            className="glass group flex flex-col rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
          >
            <TintIcon
              icon={serviceIcons[service.icon]}
              tint={tintOrder[index % tintOrder.length]}
            />
            <h3 className="mt-5 text-[15px] font-semibold text-foreground">
              {service.title}
            </h3>
            <p className="mt-2 flex-1 text-[13px] leading-relaxed text-body">
              {service.description}
            </p>
            <a
              href="#contact"
              aria-label={`Talk about ${service.title}`}
              className="glass mt-5 inline-flex size-8 items-center justify-center self-end rounded-full text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
            >
              <IconArrowUpRight className="size-4" />
            </a>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
