export function PageBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-page"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgb(245_106_20/0.025)_1px,transparent_1px),linear-gradient(90deg,rgb(245_106_20/0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
}
