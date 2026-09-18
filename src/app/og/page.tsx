import type { Metadata } from "next";
import { branches, profile } from "@content";

/**
 * 1200×630 social card. Not linked from anywhere: scripts/og.mts screenshots
 * it after `next build` into out/og.png, which the site metadata references.
 */
export const metadata: Metadata = {
  title: "Social card",
  robots: { index: false, follow: false },
};

export default function OgPage() {
  const shown = branches.filter((b) => ["main", "novabyte", "sabana", "freelance", "oss"].includes(b.id));
  return (
    <div
      id="og"
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: "linear-gradient(135deg, #0b0f14 0%, #111821 100%)",
        color: "#e6edf3",
        fontFamily: "var(--font-inter), sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "var(--font-jetbrains), monospace", fontSize: 24, color: "#8b98a5" }}>
        <span style={{ color: "#22c55e" }}>$</span>
        <span>git log --graph</span>
        <span style={{ display: "flex", gap: 14, marginLeft: 12 }}>
          {shown.map((b) => (
            <span key={b.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 12, height: 12, borderRadius: 6, background: b.color, display: "inline-block" }} />
              <span style={{ color: b.color }}>{b.label}</span>
            </span>
          ))}
        </span>
      </div>
      <div>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{profile.name}</div>
        <div style={{ marginTop: 24, fontSize: 34, color: "#b6c2cf", lineHeight: 1.3, maxWidth: 1000 }}>{profile.headline}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-jetbrains), monospace", fontSize: 24, color: "#8b98a5" }}>
        <span>kianooshsoleimani.ir</span>
        <span>{profile.location}</span>
      </div>
    </div>
  );
}
