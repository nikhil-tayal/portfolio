import { profile } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="px-6 md:px-8 py-8"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div
        className="mx-auto w-full flex items-center justify-between"
        style={{ maxWidth: "960px" }}
      >
        <p className="text-dim" style={{ fontSize: "0.75rem" }}>
          © {year} {profile.name}
        </p>
        <p className="text-dim" style={{ fontSize: "0.75rem" }}>
          Delhi, India
        </p>
      </div>
    </footer>
  );
}
