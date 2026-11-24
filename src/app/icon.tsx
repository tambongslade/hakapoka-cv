import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#111827", color: "#D4AF72", fontSize: 34, fontFamily: "serif", letterSpacing: -2, borderRadius: 8 }}>
        HH
      </div>
    ),
    size,
  );
}
