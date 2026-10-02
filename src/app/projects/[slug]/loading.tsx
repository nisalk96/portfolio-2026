import { SiteChrome } from "@/components/layout/SiteChrome";
import { cn } from "@/lib/utils";

function Skeleton({ className }: { className: string }) {
  return <div aria-hidden className={cn("skeleton-shimmer", className)} />;
}

export default function ProjectLoading() {
  return (
    <SiteChrome>
      <article
        className="py-10 md:py-14"
        aria-busy="true"
        aria-label="Loading project"
      >
        <span className="sr-only" role="status">
          Loading project details and media…
        </span>

        <nav aria-hidden className="mb-6 flex items-center gap-2">
          <Skeleton className="h-3 w-10 rounded-sm" />
          <span className="text-xs text-muted-foreground/40">/</span>
          <Skeleton className="h-3 w-14 rounded-sm" />
          <span className="text-xs text-muted-foreground/40">/</span>
          <Skeleton className="h-3 w-24 rounded-sm" />
        </nav>

        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="w-full max-w-2xl">
            <Skeleton className="mb-3 h-3 w-20 rounded-sm" />
            <Skeleton className="h-10 w-[min(78%,28rem)] rounded-lg" />
            <div className="mt-4 space-y-2.5">
              <Skeleton className="h-3.5 w-full rounded-sm" />
              <Skeleton className="h-3.5 w-[86%] rounded-sm" />
            </div>
          </div>

          <Skeleton className="h-10 w-32 rounded-xl" />
        </header>

        <Skeleton className="aspect-[3/2] w-full rounded-2xl border border-border/70" />

        <div aria-hidden className="mt-8 flex flex-wrap gap-2">
          {["w-16", "w-20", "w-14", "w-24"].map((width) => (
            <Skeleton key={width} className={cn("h-7 rounded-md", width)} />
          ))}
        </div>

        <div className="mt-10 flex items-center gap-4">
          <Skeleton className="h-4 w-32 rounded-sm" />
          <Skeleton className="h-3 w-24 rounded-sm" />
        </div>
      </article>
    </SiteChrome>
  );
}
