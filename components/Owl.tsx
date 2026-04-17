import type { SVGProps } from "react";

type BaseProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
};

// OwlGlyph — a tiny single-stroke owl head mark. Used beside the NT monogram.
// Uses currentColor for stroke so it inherits ink colour.
export function OwlGlyph({ size = 14, ...rest }: BaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {/* ear tufts */}
      <path d="M5.5 7.2 L7.2 3.6 L9 6.6" />
      <path d="M18.5 7.2 L16.8 3.6 L15 6.6" />
      {/* head */}
      <path d="M12 4.8 C6.7 4.8 3.8 8.4 3.8 12.6 C3.8 17.1 7.3 20.2 12 20.2 C16.7 20.2 20.2 17.1 20.2 12.6 C20.2 8.4 17.3 4.8 12 4.8 Z" />
      {/* facial disc divider */}
      <path d="M12 10.4 C11 11.3 10.5 12.4 10.5 13.6" opacity="0.55" />
      <path d="M12 10.4 C13 11.3 13.5 12.4 13.5 13.6" opacity="0.55" />
      {/* eyes */}
      <circle cx="8.6" cy="11.6" r="1.3" fill="currentColor" />
      <circle cx="15.4" cy="11.6" r="1.3" fill="currentColor" />
      {/* beak */}
      <path d="M12 13.4 L11.1 15 L12.9 15 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

// OwlEyes — two eyes in a single SVG used inside the theme toggle.
// `closed` draws eyelid arcs (day/sleep); open draws round pupils (night).
export function OwlEyes({
  closed = false,
  size = 14,
  ...rest
}: BaseProps & { closed?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {/* eye sockets (outer rings) */}
      <circle cx="7" cy="7" r="5" />
      <circle cx="17" cy="7" r="5" />
      {closed ? (
        <>
          {/* closed eyelids — small arcs */}
          <path d="M4 7.5 C5.5 9 8.5 9 10 7.5" />
          <path d="M14 7.5 C15.5 9 18.5 9 20 7.5" />
        </>
      ) : (
        <>
          {/* open pupils */}
          <circle cx="7" cy="7" r="1.8" fill="currentColor" />
          <circle cx="17" cy="7" r="1.8" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

// OwlDisc — the owl silhouette used in place of the celestial sun/moon that
// arcs between the two i's of "Nikhil". Takes `awake` to glow its eyes.
// Sized in em so it scales with the parent text.
export function OwlDisc({ awake, tone }: { awake: boolean; tone: "light" | "dark" }) {
  const bodyFill =
    tone === "dark"
      ? "radial-gradient(circle at 35% 30%, #1b2340, #0b0f1d 70%)"
      : "radial-gradient(circle at 35% 30%, #2b303d, #12121e 75%)";
  const eyeColor = awake ? (tone === "dark" ? "#f5b45a" : "#4a9eff") : "transparent";
  const eyeStroke = awake ? "rgba(0,0,0,0.4)" : "currentColor";

  return (
    <span
      aria-hidden
      style={{
        position: "relative",
        display: "block",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Body silhouette */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: bodyFill,
          WebkitMaskImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M5.3 7 L7 3.2 L9 6.4 Z M18.7 7 L17 3.2 L15 6.4 Z M12 4.6 C6.5 4.6 3.4 8.2 3.4 12.6 C3.4 17.3 7.1 20.6 12 20.6 C16.9 20.6 20.6 17.3 20.6 12.6 C20.6 8.2 17.5 4.6 12 4.6 Z' fill='black'/></svg>\")",
          maskImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M5.3 7 L7 3.2 L9 6.4 Z M18.7 7 L17 3.2 L15 6.4 Z M12 4.6 C6.5 4.6 3.4 8.2 3.4 12.6 C3.4 17.3 7.1 20.6 12 20.6 C16.9 20.6 20.6 17.3 20.6 12.6 C20.6 8.2 17.5 4.6 12 4.6 Z' fill='black'/></svg>\")",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      />
      {/* Eyes + beak, drawn on top */}
      <svg
        viewBox="0 0 24 24"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {awake ? (
          <>
            <circle cx="8.6" cy="11.6" r="2.2" fill={eyeColor} />
            <circle cx="15.4" cy="11.6" r="2.2" fill={eyeColor} />
            <circle cx="8.6" cy="11.6" r="0.9" fill={eyeStroke} />
            <circle cx="15.4" cy="11.6" r="0.9" fill={eyeStroke} />
          </>
        ) : (
          <>
            <path
              d="M6.6 11.8 C7.6 13 9.6 13 10.6 11.8"
              stroke="#e8e8e3"
              strokeWidth="0.9"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M13.4 11.8 C14.4 13 16.4 13 17.4 11.8"
              stroke="#e8e8e3"
              strokeWidth="0.9"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </>
        )}
        <path
          d="M12 13.8 L11 15.6 L13 15.6 Z"
          fill={tone === "dark" ? "#d9a15c" : "#d9a15c"}
        />
      </svg>
    </span>
  );
}

// OwlSignature — a wider perched-owl line illustration for the footer.
export function OwlSignature({ size = 22, ...rest }: BaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {/* ear tufts */}
      <path d="M9 8.5 L10.5 5 L12.5 7.8" />
      <path d="M23 8.5 L21.5 5 L19.5 7.8" />
      {/* head + body (one continuous egg shape) */}
      <path d="M16 6.5 C10 6.5 7 10.5 7 15 C7 20.5 11 25 16 25 C21 25 25 20.5 25 15 C25 10.5 22 6.5 16 6.5 Z" />
      {/* facial disc hint */}
      <path d="M16 12 C14.6 13 14 14.4 14 15.8" opacity="0.5" />
      <path d="M16 12 C17.4 13 18 14.4 18 15.8" opacity="0.5" />
      {/* eyes */}
      <circle cx="12.5" cy="13.2" r="1.1" fill="currentColor" />
      <circle cx="19.5" cy="13.2" r="1.1" fill="currentColor" />
      {/* beak */}
      <path d="M16 15 L15 16.6 L17 16.6 Z" fill="currentColor" stroke="none" />
      {/* perch line */}
      <path d="M5 27 L27 27" opacity="0.45" />
      {/* feet */}
      <path d="M13.5 25 L13 27" />
      <path d="M18.5 25 L19 27" />
    </svg>
  );
}
