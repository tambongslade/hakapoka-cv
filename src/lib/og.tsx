import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const NAVY = "#111827";
const IVORY = "#F4F0E8";
const BRASS = "#D4AF72";

// Newsreader subset for the given text, from Google Fonts; falls back to the default font offline.
async function serif(text: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Newsreader:wght@400&text=${encodeURIComponent(text)}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function ogCard({ eyebrow, title, footer = "Intelligence économique & stratégie" }: { eyebrow: string; title: string; footer?: string }) {
  const font = await serif(eyebrow + title + footer + "Hermann Hakapoka");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: NAVY, color: IVORY, padding: "72px 80px", fontFamily: font ? "Newsreader" : "serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 1, background: BRASS }} />
          <div style={{ fontSize: 24, letterSpacing: 5, textTransform: "uppercase", color: BRASS }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", fontSize: title.length > 70 ? 56 : 68, lineHeight: 1.12, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid rgba(212,175,114,0.35)", paddingTop: 28 }}>
          <div style={{ fontSize: 34 }}>Hermann Hakapoka</div>
          <div style={{ fontSize: 22, color: "rgba(244,240,232,0.6)" }}>Intelligence économique & stratégie</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: font ? [{ name: "Newsreader", data: font, style: "normal", weight: 400 }] : [] },
  );
}
