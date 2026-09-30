export function PageBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-page"
    >
      <div className="animate-orb-drift absolute -top-[18rem] -left-[12rem] size-[42rem] rounded-full bg-orb-a/30 blur-3xl dark:bg-orb-a/35" />
      <div className="animate-orb-drift absolute top-[30%] -right-[14rem] size-[38rem] rounded-full bg-orb-b/35 blur-3xl [animation-delay:-6s] dark:bg-orb-b/30" />
      <div className="animate-orb-drift absolute -bottom-[16rem] left-[20%] size-[44rem] rounded-full bg-orb-c/60 blur-3xl [animation-delay:-12s] dark:bg-orb-c/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(255_255_255/0.55),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgb(142_134_238/0.10),transparent_60%)]" />
    </div>
  );
}
