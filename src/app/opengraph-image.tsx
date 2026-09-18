import { ImageResponse } from "next/og";
import { profile } from "@content";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.headline}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #0b0f14 0%, #111821 100%)",
          color: "#e6edf3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#8b98a5" }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#22c55e" }} />
          <span>main</span>
          <span style={{ color: "#38bdf8" }}>·</span>
          <span style={{ color: "#38bdf8" }}>novabyte</span>
          <span style={{ color: "#f59e0b" }}>·</span>
          <span style={{ color: "#f59e0b" }}>sabana</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 34, color: "#8b98a5", lineHeight: 1.3 }}>{profile.headline}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8b98a5" }}>
          <span>kianooshsoleimani.ir</span>
          <span>{profile.location}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
