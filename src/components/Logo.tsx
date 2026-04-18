export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-md bg-gradient-primary shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M4 18 L12 4 L20 18" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 14 L16 14" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-base font-semibold tracking-tight text-foreground">
          BNP Paribas
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Wealth Intelligence
        </span>
      </div>
    </div>
  );
}
