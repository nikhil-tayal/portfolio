export function SectionLabel({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
      <span className="marker shrink-0">{index}</span>
      <span className="h-px flex-1 bg-rule" aria-hidden />
      <span className="shrink-0">{title}</span>
    </div>
  );
}
