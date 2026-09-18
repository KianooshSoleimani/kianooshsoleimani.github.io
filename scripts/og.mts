/**
 * Screenshots the exported /og/ page into out/og.png (1200×630), the image the
 * site metadata references for Open Graph / Twitter cards. Run after `next build`.
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";

const OUT = join(process.cwd(), "out");
const PNG = join(OUT, "og.png");
const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

if (!existsSync(join(OUT, "og", "index.html"))) {
  console.error("out/og/index.html not found — run `next build` first");
  process.exit(1);
}

const server = createServer((req, res) => {
  const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
  let file = normalize(join(OUT, url));
  if (!file.startsWith(OUT)) return void res.writeHead(403).end();
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) return void res.writeHead(404).end();
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
});
await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
const address = server.address();
const port = typeof address === "object" && address ? address.port : 0;

try {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:${port}/og/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.locator("#og").screenshot({ path: PNG, type: "png" });
  await browser.close();
  console.log(`wrote ${PNG} (${(statSync(PNG).size / 1024).toFixed(0)} KB)`);
} finally {
  server.close();
}
