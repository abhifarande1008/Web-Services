import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export const alt = `${siteConfig.brand.name}: websites and business software`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#EAE1D2",
          color: "#1F1F1C",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#1F1F1C",
              color: "#F7F2EA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            {siteConfig.brand.monogram}
          </div>
          <div style={{ fontSize: 32, fontWeight: 600 }}>{siteConfig.brand.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, lineHeight: 1.1, maxWidth: 900 }}>
            {siteConfig.hero.headline}
          </div>
          <div style={{ fontSize: 28, color: "#6B655C", maxWidth: 900 }}>
            Websites, landing pages, CRMs, ERPs and booking systems for small and growing companies.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#C8643C" }}>
          {siteConfig.brand.email}
        </div>
      </div>
    ),
    size
  );
}
