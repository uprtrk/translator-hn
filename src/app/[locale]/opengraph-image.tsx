import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Translator in Herceg Novi · Montenegro";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          padding: "80px",
          background: "linear-gradient(135deg, #ecfeff 0%, #ffffff 45%, #cff8fc 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-110px",
            top: "-90px",
            width: "360px",
            height: "360px",
            borderRadius: "999px",
            background: "#67d9ea",
            opacity: 0.42,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-90px",
            bottom: "-120px",
            width: "330px",
            height: "330px",
            borderRadius: "999px",
            background: "#e56b3a",
            opacity: 0.24,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "54px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "48px",
            padding: "56px",
            background: "linear-gradient(135deg, #0d3546 0%, #06202c 100%)",
            boxShadow: "0 36px 90px rgba(6,32,44,0.28)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "26px",
              letterSpacing: "4px",
              color: "#67d9ea",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            <div style={{ width: "48px", height: "3px", background: "#67d9ea" }} />
            Herceg Novi · Montenegro
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "44px", fontWeight: 600, color: "#a3ecf5" }}>
              Nikolai
            </div>
            <div
              style={{
                fontSize: "82px",
                fontWeight: 800,
                lineHeight: 1.02,
                marginTop: "8px",
                maxWidth: "930px",
              }}
            >
              Translator in Herceg Novi
            </div>
            <div
              style={{
                marginTop: "22px",
                maxWidth: "780px",
                fontSize: "32px",
                lineHeight: 1.25,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              Documents, offices and relocation support in Montenegro
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", fontSize: "30px" }}>
            <div
              style={{
                display: "flex",
                padding: "10px 26px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                fontWeight: 700,
              }}
            >
              RU · EN · SR
            </div>
            <div style={{ display: "flex", color: "rgba(255,255,255,0.8)" }}>
              Interpreting · Documents · Relocation
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
