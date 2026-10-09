import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { person, site } from "@/data/content";

export const dynamic = "force-static";

// Served as /og.png (a route handler rather than opengraph-image.tsx so the
// static export gets a real .png extension that every host serves correctly).
const size = { width: 1200, height: 630 };

export async function GET() {
  const photo = await readFile(join(process.cwd(), "public", person.photo))
    .then((buf) => `data:image/jpeg;base64,${buf.toString("base64")}`)
    .catch(() => null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          background: "linear-gradient(180deg, #e9f0ff 0%, #f6f8fc 100%)",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 30, fontWeight: 600, color: "#2563eb" }}>Hi, I&apos;m</div>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -2, marginTop: 4 }}>{person.name}</div>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#2563eb", marginTop: 12 }}>{person.role}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
            {person.focus.map((f) => (
              <div
                key={f}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "rgba(37,99,235,0.1)",
                  color: "#2563eb",
                  fontSize: 22,
                  fontWeight: 600,
                }}
              >
                {f}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 22, color: "#566074", marginTop: 36 }}>
            {`${person.location} · ${site.url.replace(/^https?:\/\//, "")}`}
          </div>
        </div>
        {photo && (
          <div
            style={{
              display: "flex",
              width: 380,
              height: 380,
              borderRadius: 999,
              background: "rgba(37,99,235,0.12)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img
              src={photo}
              width={340}
              height={340}
              style={{ borderRadius: 999, border: "8px solid white", objectFit: "cover" }}
            />
          </div>
        )}
      </div>
    ),
    size,
  );
}
