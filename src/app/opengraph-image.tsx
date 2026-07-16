import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "IBÉRICO — Tapas y Vino, Ho Chi Minh City";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoBuffer = await readFile(
    join(process.cwd(), "public/brand/logo-mark.png")
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#17120d",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: "1px solid rgba(250,202,60,0.35)",
            borderRadius: 4,
          }}
        />
        <img
          src={logoSrc}
          alt=""
          width={140}
          height={181}
          style={{ marginBottom: 20 }}
        />
        <div
          style={{
            display: "flex",
            color: "#fefcf8",
            fontSize: 96,
            letterSpacing: 6,
            fontWeight: 700,
          }}
        >
          IB&Eacute;RICO
        </div>
        <div
          style={{
            display: "flex",
            color: "#faca3c",
            fontSize: 30,
            letterSpacing: 10,
            marginTop: 14,
          }}
        >
          TAPAS Y VINO
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(254,252,248,0.55)",
            fontSize: 24,
            marginTop: 40,
          }}
        >
          Ho Chi Minh City &middot; Hoi An
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#faca3c",
            fontSize: 18,
            letterSpacing: 2,
            marginTop: 22,
            border: "1px solid rgba(250,202,60,0.4)",
            borderRadius: 999,
            padding: "8px 22px",
          }}
        >
          Best Spanish Restaurant &middot; Gourmet Vietnam Awards 2025
        </div>
      </div>
    ),
    { ...size }
  );
}
