import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data/site";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? siteConfig.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0e10",
          padding: "72px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f3f1ea",
              color: "#0c0e10",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            S3
          </div>
          <span style={{ color: "#f3f1ea", fontSize: 22, letterSpacing: 2 }}>
            SPEEDHOST360
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 980 }}>
          <span style={{ color: "#ff7a3d", fontSize: 20, letterSpacing: 2 }}>
            BUILD · HOST · GROW
          </span>
          <span style={{ color: "#f3f1ea", fontSize: 56, fontWeight: 700, lineHeight: 1.15 }}>
            {title}
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
