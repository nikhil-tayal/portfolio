"use client";

import { useState } from "react";

export function VideoReveal({ youtubeId }: { youtubeId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-border">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-5 py-3 text-xs text-muted hover:text-text transition-colors duration-200 w-full text-left"
        >
          <span>Watch demo ▶</span>
        </button>
      )}
      {open && (
        <div
          style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1`}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            title="Project demo"
          />
        </div>
      )}
    </div>
  );
}
