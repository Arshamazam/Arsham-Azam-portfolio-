// Prints the /cv page of the static export to public/cv.pdf (and out/cv.pdf).
// Usage: npm run cv   (builds the site first, then runs this script)
// Uses your installed Google Chrome; set CHROME_PATH if it lives somewhere else.
import { createServer } from "node:http";
import { copyFile, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import puppeteer from "puppeteer-core";

const root = resolve("out");
const types = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2",
  ".txt": "text/plain", ".pdf": "application/pdf", ".ico": "image/x-icon",
};

const chromeCandidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);
const executablePath = chromeCandidates.find((p) => existsSync(p));
if (!executablePath) {
  console.error("Could not find Chrome. Set CHROME_PATH to your Chrome/Chromium executable.");
  process.exit(1);
}
if (!existsSync(join(root, "cv", "index.html"))) {
  console.error("out/cv/index.html not found. Run `next build` first (npm run cv does this).");
  process.exit(1);
}

// Minimal static server for ./out
const server = createServer(async (req, res) => {
  let path = join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!path.startsWith(root)) return res.writeHead(403).end();
  try {
    if ((await stat(path)).isDirectory()) path = join(path, "index.html");
    res.writeHead(200, { "Content-Type": types[extname(path)] ?? "application/octet-stream" });
    res.end(await readFile(path));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const { port } = server.address();

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: process.env.CI ? ["--no-sandbox"] : [],
});
try {
  const page = await browser.newPage();
  await page.emulateMediaType("print");
  await page.goto(`http://127.0.0.1:${port}/cv/`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  const footerText = await page.$eval("[data-cv-footer]", (el) => el.textContent ?? "").catch(() => "");
  const target = resolve("public", "cv.pdf");
  await page.pdf({
    path: target,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true, // page size & margins come from @page rules in app/cv/page.tsx
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: `
      <div style="width:100%;padding:0 9mm;display:flex;justify-content:space-between;align-items:center;
                  font-family:Helvetica,Arial,sans-serif;font-size:7.5px;color:#64748b;">
        <span>${footerText.replace(/</g, "&lt;")}</span>
        <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
      </div>`,
  });
  await copyFile(target, join(root, "cv.pdf"));
  console.log(`✓ CV written to public/cv.pdf`);
} finally {
  await browser.close();
  server.close();
}
