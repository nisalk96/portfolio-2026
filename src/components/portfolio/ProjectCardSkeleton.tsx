import { cn } from "@/lib/utils";

function Skeleton({ className }: { className: string }) {
  return <div aria-hidden className={cn("skeleton-shimmer", className)} />;
}

export function ProjectCardSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div className="glass overflow-hidden rounded-2xl border border-border">
      <Skeleton className="aspect-[16/10] w-full" />

      <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-4">
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3 rounded-sm" />
          <Skeleton className="h-3 w-1/3 rounded-sm" />
        </div>
        <Skeleton className="size-9 shrink-0 rounded-full" />
      </div>

      {compact ? null : (
        <div className="space-y-3 px-3 pb-3">
          <div className="space-y-2">
            <Skeleton className="h-3 w-full rounded-sm" />
            <Skeleton className="h-3 w-[92%] rounded-sm" />
            <Skeleton className="h-3 w-3/5 rounded-sm" />
          </div>
          <div className="flex items-center gap-1.5">
            {["w-14", "w-16", "w-12"].map((width) => (
              <Skeleton key={width} className={cn("h-5 rounded-full", width)} />
            ))}
            <Skeleton className="ml-auto h-3 w-12 rounded-sm" />
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectGridSkeleton({
  count,
  compact = false,
  className,
}: {
  count: number;
  compact?: boolean;
  className: string;
}) {
  return (
    <div className={className} aria-busy="true">
      <span className="sr-only" role="status">
        Loading projects…
      </span>
      {Array.from({ length: count }, (_, index) => (
        <ProjectCardSkeleton key={index} compact={compact} />
      ))}
    </div>
  );
}
