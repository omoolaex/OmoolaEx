/* 
  File: /app/api/og/route.js
  Generates OG images with OmoolaEx branding using @vercel/og
*/

import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Default brand colors
const BG_COLOR = "#0a1f44"; // Deep navy
const ACCENT = "#1e90ff";   // Electric blue

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || "OmoolaEx Insights";
    const author = searchParams.get("author") || "OmoolaEx Team";
    const img = searchParams.get("img") || null;

    // Fonts (optional, but looks cleaner)
    const poppinsBold = await fetch(
      new URL("../../../public/fonts/Poppins-Bold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const poppinsRegular = await fetch(
      new URL("../../../public/fonts/Poppins-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: BG_COLOR,
            flexDirection: "column",
            padding: "60px",
            justifyContent: "space-between",
            fontFamily: "Poppins",
          }}
        >
          {/* Top Image */}
          <div
            style={{
              width: "100%",
              height: "55%",
              overflow: "hidden",
              borderRadius: "20px",
              background: "#111828",
            }}
          >
            {img ? (
              <img
                src={img}
                alt="OG image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  color: "#ffffff44",
                }}
              >
                OmoolaEx
              </div>
            )}
          </div>

          {/* Title */}
          <h1
            style={{
              marginTop: "30px",
              fontSize: "52px",
              fontWeight: "bold",
              color: "white",
              lineHeight: 1.2,
              maxWidth: "90%",
              display: "flex",
            }}
          >
            {title}
          </h1>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                color: "#dbeafe",
              }}
            >
              {author}
            </div>

            <div
              style={{
                fontSize: "22px",
                padding: "10px 22px",
                borderRadius: "14px",
                background: ACCENT,
                color: "white",
                fontWeight: "bold",
              }}
            >
              OmoolaEx
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: "Poppins", data: poppinsRegular, style: "normal", weight: 400 },
          { name: "Poppins", data: poppinsBold, style: "normal", weight: 700 },
        ],
      }
    );
  } catch (err) {
    console.error("OG Image Error:", err);
    return new Response("Failed to generate image", { status: 500 });
  }
}
