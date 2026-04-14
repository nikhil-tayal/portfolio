export function SectionLabel({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
      <span className="marker">{index}</span>
      <span className="h-px flex-1 bg-rule" aria-hidden />
      <span>{title}</span>
    </div>
  );
}
