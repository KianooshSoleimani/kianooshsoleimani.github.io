/**
 * Prints the statically exported /cv/ page to out/Kianoosh-Soleimani-CV.pdf.
 * Run after `next build`. Serves ./out on a random localhost port so the
 * absolute /_next/ asset URLs resolve exactly as they will in production.
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";

const OUT = join(process.cwd(), "out");
const PDF = join(OUT, "Kianoosh-Soleimani-CV.pdf");
const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

if (!existsSync(join(OUT, "cv", "index.html"))) {
  console.error("out/cv/index.html not found — run `next build` first");
  process.exit(1);
}

const server = createServer((req, res) => {
  const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
  let file = normalize(join(OUT, url));
  if (!file.startsWith(OUT)) {
    res.writeHead(403).end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) {
    res.writeHead(404).end("not found");
    return;
  }
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
});

await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const port = typeof address === "object" && address ? address.port : 0;

try {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print", colorScheme: "light" });
  await page.goto(`http://127.0.0.1:${port}/cv/`, { waitUntil: "networkidle" });
  await page.pdf({
    path: PDF,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
  });
  await browser.close();
  console.log(`wrote ${PDF} (${(statSync(PDF).size / 1024).toFixed(0)} KB)`);
} finally {
  server.close();
}
