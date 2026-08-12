import { ImageResponse } from "next/og";

export const alt = "Kirkland Calc: Is Costco Executive Membership worth it?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0a4f8c",
          color: "white",
          fontFamily: "sans-serif",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#e8a93c",
            marginBottom: 24,
          }}
        >
          Kirkland Calc
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.15,
            textTransform: "uppercase",
          }}
        >
          Is Costco Executive Membership worth it?
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            marginTop: 32,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
          }}
        >
          Get your answer, and the exact math, in 30 seconds.
        </div>
      </div>
    ),
    { ...size },
  );
}
