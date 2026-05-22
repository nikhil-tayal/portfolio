import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Nikhil Tayal — Senior Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/nikhil-tayal.png"));
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#08080F",
          color: "#F0F0FA",
          padding: "72px",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingRight: 56,
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#8888A8",
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
            }}
          >
            nikhiltayal.info
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 116,
                lineHeight: 1,
                letterSpacing: -3,
                fontWeight: 300,
                color: "#F0F0FA",
              }}
            >
              Nikhil Tayal
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 32,
                lineHeight: 1.25,
                color: "#B8B8D0",
                maxWidth: 640,
              }}
            >
              Senior Full-Stack Developer · 7+ years shipping React, Next.js &amp; NestJS at scale.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#7BA0FF",
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
            }}
          >
            <span>Delhi</span>
            <span style={{ color: "#44445A" }}>·</span>
            <span>Fintech</span>
            <span style={{ color: "#44445A" }}>·</span>
            <span>Aviation</span>
            <span style={{ color: "#44445A" }}>·</span>
            <span>GenAI</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt={alt}
            width={420}
            height={420}
            style={{
              width: 420,
              height: 420,
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #7BA0FF",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
