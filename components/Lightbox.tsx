"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxItem = {
  src: string;
  caption?: string;
  alt?: string;
};

type Props = {
  open: boolean;
  items: LightboxItem[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
};

const MIN_SCALE = 1;
const MAX_SCALE = 6;
const DOUBLE_TAP_SCALE = 2.5;

export function Lightbox({ open, items, index, onIndexChange, onClose }: Props) {
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const pointerStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const activePointers = useRef<Map<number, { x: number; y: number }>>(new Map());

  const reset = useCallback(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  const changeIndex = useCallback(
    (next: number) => {
      reset();
      onIndexChange(next);
    },
    [onIndexChange, reset],
  );

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const go = useCallback(
    (delta: number) => {
      if (items.length < 2) return;
      const next = (index + delta + items.length) % items.length;
      changeIndex(next);
    },
    [index, items.length, changeIndex],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "+" || e.key === "=") setScale((s) => Math.min(s * 1.25, MAX_SCALE));
      else if (e.key === "-") setScale((s) => Math.max(s / 1.25, MIN_SCALE));
      else if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, go, reset]);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    const factor = Math.exp(-e.deltaY * 0.002);
    const newScale = Math.min(Math.max(scale * factor, MIN_SCALE), MAX_SCALE);
    const k = newScale / scale;
    setScale(newScale);
    setTx(cx - (cx - tx) * k);
    setTy(cy - (cy - ty) * k);
    if (newScale === 1) {
      setTx(0);
      setTy(0);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (activePointers.current.size === 2) {
      const [a, b] = Array.from(activePointers.current.values());
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale };
      pointerStart.current = null;
      setInteracting(true);
    } else if (scale > 1) {
      pointerStart.current = { x: e.clientX, y: e.clientY, tx, ty };
      setInteracting(true);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activePointers.current.has(e.pointerId)) return;
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinchStart.current && activePointers.current.size === 2) {
      const [a, b] = Array.from(activePointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const ratio = dist / pinchStart.current.dist;
      const newScale = Math.min(Math.max(pinchStart.current.scale * ratio, MIN_SCALE), MAX_SCALE);
      setScale(newScale);
      if (newScale === 1) {
        setTx(0);
        setTy(0);
      }
    } else if (pointerStart.current) {
      setTx(pointerStart.current.tx + (e.clientX - pointerStart.current.x));
      setTy(pointerStart.current.ty + (e.clientY - pointerStart.current.y));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    activePointers.current.delete(e.pointerId);
    if (activePointers.current.size < 2) pinchStart.current = null;
    if (activePointers.current.size === 0) {
      pointerStart.current = null;
      setInteracting(false);
    }
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    if (scale > 1) {
      reset();
      return;
    }
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    const k = DOUBLE_TAP_SCALE;
    setScale(k);
    setTx(cx - cx * k);
    setTy(cy - cy * k);
  };

  const current = items[index];
  const counter = useMemo(() => `${index + 1} / ${items.length}`, [index, items.length]);

  if (!open || !current || typeof document === "undefined") return null;

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.alt ?? current.caption ?? "Media viewer"}
      className="fixed inset-0 z-[100] flex flex-col bg-paper/95 backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-rule px-4 py-3 md:px-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          {counter}
        </span>
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-paper-deep hover:text-ink"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>

      <div
        ref={viewportRef}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={onDoubleClick}
        className="relative flex flex-1 items-center justify-center overflow-hidden touch-none select-none"
        style={{ cursor: scale > 1 ? "grab" : "zoom-in" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={current.alt ?? current.caption ?? ""}
          draggable={false}
          className="max-h-full max-w-full will-change-transform"
          style={{
            transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
            transition: interacting ? "none" : "transform 180ms ease-out",
          }}
        />

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-rule bg-paper/70 text-ink-muted backdrop-blur-md transition-colors hover:text-ink md:left-6"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-rule bg-paper/70 text-ink-muted backdrop-blur-md transition-colors hover:text-ink md:right-6"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>

      {current.caption && (
        <div className="border-t border-rule px-4 py-3 text-center md:px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            {current.caption}
          </p>
        </div>
      )}
    </div>
  );

  return createPortal(overlay, document.body);
}
