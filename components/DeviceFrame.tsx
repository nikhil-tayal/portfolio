import type { ReactNode } from "react";
import type { DeviceFrame as DeviceFrameKind } from "@/lib/data";

type Props = {
  frame: Exclude<DeviceFrameKind, "none">;
  children: ReactNode;
  url?: string;
};

export function DeviceFrame({ frame, children, url }: Props) {
  if (frame === "mobile") return <MobileFrame>{children}</MobileFrame>;
  return <BrowserFrame url={url}>{children}</BrowserFrame>;
}

function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[280px]">
      <div className="relative rounded-[2.4rem] border border-rule bg-ink/5 p-2 shadow-[0_18px_60px_-20px_rgba(18,18,30,0.25)] dark:bg-ink/20">
        <div className="relative overflow-hidden rounded-[1.9rem] bg-paper">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-2 z-10 h-1 w-14 -translate-x-1/2 rounded-full bg-ink/40"
          />
          {children}
        </div>
      </div>
    </div>
  );
}

function BrowserFrame({ children, url }: { children: ReactNode; url?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-rule bg-paper-deep shadow-[0_18px_60px_-20px_rgba(18,18,30,0.18)]">
      <div className="flex items-center gap-3 border-b border-rule px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-muted/40" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-muted/40" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-muted/40" />
        </div>
        <div className="flex-1 truncate rounded-md border border-rule bg-paper px-3 py-1 text-center font-mono text-[9px] tracking-[0.12em] text-ink-muted">
          {url ?? "preview"}
        </div>
        <span className="w-[42px]" aria-hidden />
      </div>
      <div className="bg-paper">{children}</div>
    </div>
  );
}
