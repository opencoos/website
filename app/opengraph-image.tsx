import { ImageResponse } from "next/og";
import { founder, site, standard } from "@/lib/site";

export const alt = `${site.name} — ${standard.name} (${standard.shortName})`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "#ffffff",
          color: "#111827",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="96" height="96" viewBox="0 0 32 32">
            <path d="M10 17.5 L2.5 14.2 C2 14 1.7 14.6 2.1 15 L7.5 20.5 Z" fill="#115e59" />
            <path d="M7 18.5 C7 13.2 11.5 10.6 16.5 11.2 L19.5 11.8 C24.6 13 27 17.8 25.2 22.2 C23.5 26.2 18 27.6 13.5 26.3 C9.6 25.2 7 22.4 7 18.5 Z" fill="#0f766e" />
            <circle cx="21.8" cy="9.4" r="4.4" fill="#0f766e" />
            <path d="M18.6 12.8 C20.4 14.3 23.2 14.2 24.9 12.6 C24.6 14.6 22.6 16 20.4 15.6 C19.5 15.4 18.9 14.4 18.6 12.8 Z" fill="#14b8a6" />
            <path d="M25.9 8.6 L29.3 9.8 L25.9 11 Z" fill="#f59e0b" />
            <circle cx="22.9" cy="8.5" r="1.55" fill="#fff" />
            <circle cx="23.3" cy="8.5" r="0.8" fill="#0f172a" />
            <path d="M11.6 15.6 c1.9 0 2.4 0.7 2.4 2 v1.1 c0 1 0.5 1.5 1.7 1.5 c-1.2 0 -1.7 0.5 -1.7 1.5 v1.1 c0 1.3 -0.5 2 -2.4 2" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 26.6 v2.6 M19.2 26.2 v3" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: 1 }}>
              <span>Open</span>
              <span style={{ color: "#0f766e" }}>COOS</span>
            </div>
            <div style={{ fontSize: 22, color: "#4b5563" }}>{site.audience}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1 }}>{standard.name}</div>
          <div style={{ fontSize: 28, color: "#4b5563", maxWidth: 900 }}>
            {`${standard.headline}. ${standard.reach}`}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#0f766e" }}>{`🍁 Proudly Canadian · Early development · Founded by ${founder.name}`}</div>
      </div>
    ),
    size,
  );
}
