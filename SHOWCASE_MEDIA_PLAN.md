# Showcase media rendering — implementation plan

Context: the `/showcase/[slug]` detail page (`components/ShowcaseDetail.tsx`) currently renders workflow diagrams, screenshots, and videos with plain `<img>` / `<video>` tags and no zoom. Goal is to make diagrams legible on mobile, screenshots feel more polished, and unify interactions behind one lightbox.

## Decisions (locked in)

1. **Workflow diagram** → export from draw.io as **SVG**, render inline, click-to-zoom lightbox with pan + zoom. No iframe to viewer.diagrams.net.
2. **Screenshots** → Next.js `<Image>` with responsive sizing, optional **device framing** (mobile chrome / browser chrome) as a per-shot opt-in. Shares lightbox with diagrams.
3. **Videos** → **Loom embeds only**. Keep existing `<LoomEmbed>` for the hero walkthrough. Drop local `<LocalVideo>` unless we add MP4 content later.
4. **Lightbox** → custom component, ~150 LOC. No new dependencies. Keyboard nav (← → Esc), scroll/pinch zoom, click backdrop to close, focus trap.

## File-by-file changes

### `lib/data.ts`
Extend the media types so device framing is opt-in per screenshot.

```ts
export type DeviceFrame = "mobile" | "browser" | "none";

export type ShowcaseMedia = {
  src: string;
  caption?: string;
  // new:
  width?: number;       // intrinsic dims (for next/image when not using fill)
  height?: number;
  frame?: DeviceFrame;  // screenshots only; default "none"
  alt?: string;         // override default alt
};
```
Leave `ShowcaseVideo` alone for now (may remove later once local MP4s are confirmed unused).

### `components/Lightbox.tsx` (new, ~150 LOC)
- Props: `{ open: boolean; onClose: () => void; items: {src: string; caption?: string; alt?: string}[]; index: number; onIndexChange: (i: number) => void }`
- Renders a fixed full-viewport overlay (`bg-paper/95 backdrop-blur`).
- Image inside a transform wrapper: translate + scale state driven by wheel (zoom) and pointer drag (pan). Clamp scale between 1 and 6. Double-click toggles between 1× and 2.5×.
- Keyboard: `Esc` closes, `←`/`→` move through items, `+`/`-` zoom, `0` resets.
- Focus: trap inside overlay, restore focus to trigger on close.
- Portal via `createPortal` to `document.body`. Lock `body` scroll while open (`overflow: hidden`).
- Caption bar fixed at bottom, `font-mono text-[10px] uppercase tracking-[0.18em]` to match existing SectionHeading style.
- Works for SVGs and rasters uniformly — pass `src` through to an `<img>` (not `next/image` — lightbox must render arbitrary-size content at 1:1).

### `components/DeviceFrame.tsx` (new, ~60 LOC)
- Props: `{ frame: "mobile" | "browser"; children: ReactNode }`.
- `mobile`: rounded-[2.2rem] border with a subtle notch (just a small black pill at top center), 9:19.5 aspect container, inner content clipped to rounded inset.
- `browser`: thin header bar (border-rule, `paper-deep` bg) with three small circles (no colors — just muted dots) and a fake URL pill. Body clipped rounded-lg.
- Pure Tailwind, no SVG. Goal is "tasteful" not skeuomorphic — fits the editorial tone of the site.

### `components/ShowcaseDetail.tsx`
- Replace the workflow `<img>` with `next/image` (or keep `<img>` — SVG is small enough either way; prefer `<img>` for SVG to avoid next/image wrapper quirks with `<svg>` viewBox). Wrap figure in a `<button>` that opens the lightbox with `items=[workflow]`.
- Screenshots grid: swap `<img>` for `next/image`. If `shot.frame && shot.frame !== "none"`, wrap in `<DeviceFrame>`. Each figure becomes a button opening the lightbox with `items=screenshots` at index `i`.
- Add `useState` for `lightboxOpen` and `lightboxIndex`, plus a `lightboxItems` memo (built once per render from workflow + screenshots).
- Unify keyboard accessibility: each clickable figure is a `<button type="button">` with `aria-label`.
- Remove `hasVideos` / `LocalVideo` code paths only if no `videos` exist in data (check `lib/data.ts` first — if not used, delete). Keep `LoomEmbed` as-is.

### `next.config.*` / `public/`
- Place workflow SVGs at `public/showcases/<slug>/workflow.svg`.
- Place screenshots at `public/showcases/<slug>/screenshot-1.png` etc. PNG or WebP; the loader will emit AVIF/WebP automatically if we move to `next/image`.
- No config changes needed for local paths.

## AGENTS.md compliance

Before writing code, read `node_modules/next/dist/docs/` for the current `next/image` guide and the `useRouter`/metadata conventions. **Do not assume pre-Next-15 APIs.** Confirm whether `next/image` still needs `width`/`height` for non-`fill` images in this version and whether the `Image` component API has drifted.

## Order of work

1. Read `node_modules/next/dist/docs/` → confirm `next/image` and metadata APIs for this Next version.
2. Extend `ShowcaseMedia` types in `lib/data.ts`.
3. Build `components/Lightbox.tsx` standalone (wire it into a throwaway test page if helpful).
4. Build `components/DeviceFrame.tsx`.
5. Refactor `ShowcaseDetail.tsx` to use both + `next/image`.
6. Drop one real diagram + 2–3 screenshots into `public/showcases/helitaxii/` as a live sanity check, wire in via `lib/data.ts`.
7. Browser QA: mobile viewport (diagram readable via pinch), desktop (keyboard nav, wheel zoom), reduced-motion (disable the zoom transition, keep instant).
8. Delete `LocalVideo` if no MP4 data exists after step 6.

## Out of scope / intentionally skipped

- Carousel / gallery on the home page cards.
- Automatic thumbnail generation from video posters.
- Self-hosted video; we're Loom-only for now.
- Diagrams-as-code (Mermaid/D2). SVG export from draw.io is fine.

## Open questions to resolve before implementation

- Which showcase slug should be the first with real media? (Probably HeliTaxii — most mature data.)
- Should the lightbox support **pan via two-finger drag** on mobile while **pinch** zooms? (Recommended yes; same pointer-events handler can read `touches.length`.)
- Font-weight of the device-frame URL pill text — match `font-mono text-[10px]` or a size smaller? (Suggest `text-[9px]` to stay subtle.)
