"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Play } from "lucide-react";
import type { ShowcaseMedia, ShowcaseWithContext } from "@/lib/data";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DeviceFrame } from "@/components/DeviceFrame";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";
import { Reveal, StaggerGroup, fadeChild, motion } from "@/components/motion-primitives";

type Props = {
  showcase: ShowcaseWithContext;
  prev: ShowcaseWithContext | null;
  next: ShowcaseWithContext | null;
};

export function ShowcaseDetail({ showcase, prev, next }: Props) {
  const { item, company, role, period } = showcase;

  const hasWorkflow = !!item.workflow;
  const hasScreenshots = !!item.screenshots && item.screenshots.length > 0;
  const hasLoom = !!item.loomUrl;
  const hasAnyMedia = hasWorkflow || hasScreenshots || hasLoom;

  const lightboxItems: LightboxItem[] = useMemo(() => {
    const out: LightboxItem[] = [];
    if (item.workflow) {
      out.push({
        src: item.workflow.src,
        caption: item.workflow.caption,
        alt: item.workflow.alt ?? `${item.name} workflow diagram`,
      });
    }
    item.screenshots?.forEach((shot, i) => {
      out.push({
        src: shot.src,
        caption: shot.caption,
        alt: shot.alt ?? `${item.name} screenshot ${i + 1}`,
      });
    });
    return out;
  }, [item]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const workflowLightboxIndex = 0;
  const screenshotsOffset = item.workflow ? 1 : 0;

  return (
    <main className="relative min-h-dvh">
      <Nav />

      <article className="px-6 pt-32 pb-20 md:px-16 md:pt-40 md:pb-28">
        <div className="mx-auto w-full max-w-[1320px]">
          <Reveal>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3 w-3" strokeWidth={2} />
              Back to work
            </Link>
          </Reveal>

          <Reveal>
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              {company} · {role} · {period}
            </p>
          </Reveal>

          <Reveal>
            <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.02] tracking-[-0.025em] text-ink">
              {item.name}
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-2xl text-[clamp(1.05rem,1.7vw,1.2rem)] leading-relaxed text-ink-soft">
              {item.brief}
            </p>
          </Reveal>

          {(item.liveUrl || item.loomUrl) && (
            <Reveal>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-paper"
                  >
                    Live product
                    <ArrowUpRight
                      className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </a>
                )}
                {item.loomUrl && (
                  <a
                    href={item.loomUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-rule px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted transition-colors hover:text-ink"
                  >
                    <Play className="h-2.5 w-2.5" fill="currentColor" strokeWidth={0} />
                    Loom walkthrough
                  </a>
                )}
              </div>
            </Reveal>
          )}

          {item.overview && (
            <Reveal>
              <div className="mt-16 border-t border-rule pt-10">
                <SectionHeading label="Overview" />
                <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-ink-soft md:text-[16px]">
                  {item.overview}
                </p>
              </div>
            </Reveal>
          )}

          {hasWorkflow && item.workflow && (
            <section className="mt-20 border-t border-rule pt-10">
              <Reveal>
                <SectionHeading label="Workflow" />
                <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-ink-muted">
                  Architecture and data-flow diagram. Click to zoom.
                </p>
              </Reveal>

              <Reveal>
                <button
                  type="button"
                  onClick={() => openLightbox(workflowLightboxIndex)}
                  aria-label="Open workflow diagram"
                  className="group mt-8 block w-full cursor-zoom-in overflow-hidden rounded-xl border border-rule bg-paper-deep text-left transition-colors hover:border-ink-soft"
                >
                  <figure>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.workflow.src}
                      alt={item.workflow.alt ?? `${item.name} workflow diagram`}
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                    {item.workflow.caption && (
                      <figcaption className="border-t border-rule px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                        {item.workflow.caption}
                      </figcaption>
                    )}
                  </figure>
                </button>
              </Reveal>
            </section>
          )}

          {hasScreenshots && item.screenshots && (
            <section className="mt-20 border-t border-rule pt-10">
              <Reveal>
                <SectionHeading label="Screenshots" />
              </Reveal>

              <StaggerGroup
                amount={0.05}
                className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2"
              >
                {item.screenshots.map((shot, i) => (
                  <motion.div key={i} variants={fadeChild}>
                    <ScreenshotCard
                      shot={shot}
                      index={i}
                      itemName={item.name}
                      onOpen={() => openLightbox(screenshotsOffset + i)}
                    />
                  </motion.div>
                ))}
              </StaggerGroup>
            </section>
          )}

          {hasLoom && item.loomUrl && (
            <section className="mt-20 border-t border-rule pt-10">
              <Reveal>
                <SectionHeading label="Walkthrough" />
              </Reveal>
              <Reveal>
                <div className="mt-8">
                  <LoomEmbed url={item.loomUrl} title={item.name} />
                </div>
              </Reveal>
            </section>
          )}

          {!hasAnyMedia && (
            <Reveal>
              <div className="mt-16 rounded-xl border border-dashed border-rule bg-paper-deep/40 px-8 py-12 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                  Media coming soon
                </p>
                <p className="mt-3 text-[13px] text-ink-soft">
                  Workflow diagrams, screenshots and walkthrough videos will be
                  added here.
                </p>
              </div>
            </Reveal>
          )}

          <nav className="mt-24 grid grid-cols-1 gap-4 border-t border-rule pt-8 md:grid-cols-2">
            {prev ? (
              <Link
                href={`/showcase/${prev.item.slug}`}
                className="group rounded-xl border border-rule bg-paper p-5 transition-colors hover:border-ink-soft"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-muted">
                  ← Previous
                </p>
                <p className="mt-2 text-[15px] font-medium text-ink">
                  {prev.item.name}
                </p>
                <p className="mt-1 text-[12px] text-ink-muted">
                  {prev.company}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/showcase/${next.item.slug}`}
                className="group rounded-xl border border-rule bg-paper p-5 transition-colors hover:border-ink-soft md:text-right"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-muted">
                  Next →
                </p>
                <p className="mt-2 text-[15px] font-medium text-ink">
                  {next.item.name}
                </p>
                <p className="mt-1 text-[12px] text-ink-muted">
                  {next.company}
                </p>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </article>

      <Footer />

      <Lightbox
        open={lightboxOpen}
        items={lightboxItems}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  );
}

function ScreenshotCard({
  shot,
  index,
  itemName,
  onOpen,
}: {
  shot: ShowcaseMedia;
  index: number;
  itemName: string;
  onOpen: () => void;
}) {
  const alt = shot.alt ?? shot.caption ?? `${itemName} screenshot ${index + 1}`;
  const width = shot.width ?? 1600;
  const height = shot.height ?? 1000;
  const frame = shot.frame && shot.frame !== "none" ? shot.frame : null;

  const media = (
    <Image
      src={shot.src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, 50vw"
      className="h-auto w-full"
    />
  );

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${alt}`}
      className="group block w-full cursor-zoom-in text-left"
    >
      <figure className="overflow-hidden rounded-xl border border-rule bg-paper-deep transition-colors group-hover:border-ink-soft">
        <div className="overflow-hidden">
          <div className="transition-transform duration-500 group-hover:scale-[1.02]">
            {frame ? <DeviceFrame frame={frame}>{media}</DeviceFrame> : media}
          </div>
        </div>
        {shot.caption && (
          <figcaption className="border-t border-rule px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            {shot.caption}
          </figcaption>
        )}
      </figure>
    </button>
  );
}

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
        {label}
      </span>
      <span className="h-px flex-1 bg-rule" aria-hidden />
    </div>
  );
}

function LoomEmbed({ url, title }: { url: string; title: string }) {
  const match = url.match(/loom\.com\/share\/([a-z0-9]+)/i);
  const embedUrl = match ? `https://www.loom.com/embed/${match[1]}` : url;

  return (
    <div className="overflow-hidden rounded-xl border border-rule bg-paper-deep">
      <div className="relative aspect-video w-full">
        <iframe
          src={embedUrl}
          title={`${title} — Loom walkthrough`}
          allow="fullscreen; clipboard-write"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="flex items-center justify-between border-t border-rule px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          Loom walkthrough
        </span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-accent"
        >
          Open <ExternalLink className="h-2.5 w-2.5" strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}
