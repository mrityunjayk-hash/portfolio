import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Offensive Security Researcher`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const dots = Array.from({ length: 46 }, (_, i) => ({
    x: 640 + ((i * 137) % 520),
    y: 60 + ((i * 89) % 500),
    hub: i % 7 === 0,
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0b0d",
          color: "#e6e8eb",
          position: "relative",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        {dots.map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: d.hub ? 10 : 5,
              height: d.hub ? 10 : 5,
              borderRadius: 999,
              background: d.hub ? "#c6f432" : "rgba(230,232,235,0.35)",
            }}
          />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 3, color: "#8a9099" }}>
          <div style={{ width: 10, height: 10, background: "#c6f432", borderRadius: 999 }} />
          OFFENSIVE SECURITY RESEARCHER
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 128, fontWeight: 600, letterSpacing: -6, lineHeight: 0.95 }}>{site.firstName}</div>
          <div style={{ display: "flex", fontSize: 128, fontWeight: 600, letterSpacing: -6, lineHeight: 0.95, color: "#8a9099" }}>
            {site.lastName}
            <span style={{ color: "#c6f432" }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#e6e8eb", gap: 18 }}>
          {site.headline.map((h, i) => (
            <span key={h} style={{ display: "flex", gap: 18 }}>
              {i > 0 && <span style={{ color: "#5c636d" }}>/</span>}
              {h}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
