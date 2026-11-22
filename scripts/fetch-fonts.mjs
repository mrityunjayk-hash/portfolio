/**
 * Downloads the Clash Display font files from Fontshare before dev/build.
 *
 * The ITF Free Font License allows self-hosting the fonts on this website but
 * not redistributing them through a public repository, so the files are
 * git-ignored and fetched from the official source instead.
 */
import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "src/fonts/clash-display");
const CSS_URL = "https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap";
const FILES = {
  500: { woff2: "ClashDisplay-Medium.woff2" },
  600: { woff2: "ClashDisplay-Semibold.woff2", ttf: "ClashDisplay-Semibold.ttf" },
  700: { woff2: "ClashDisplay-Bold.woff2" },
};

const exists = (p) => stat(p).then(() => true, () => false);

async function main() {
  const wanted = Object.values(FILES).flatMap((f) => Object.values(f));
  const missing = [];
  for (const name of wanted) if (!(await exists(path.join(OUT, name)))) missing.push(name);
  if (!missing.length) return;

  const css = await (await fetch(CSS_URL)).text();
  // The response can include other families, so keep only Clash Display faces.
  const faces = css
    .split("@font-face")
    .slice(1)
    .filter((f) => /font-family:\s*'Clash Display'/.test(f) && /font-style:\s*normal/.test(f));
  await mkdir(OUT, { recursive: true });

  for (const face of faces) {
    const weight = face.match(/font-weight:\s*(\d+)/)?.[1];
    const targets = FILES[weight];
    if (!targets) continue;
    for (const [format, name] of Object.entries(targets)) {
      if (!missing.includes(name)) continue;
      const url = face.match(new RegExp(`url\\('(//[^']+\\.${format})'\\)`))?.[1];
      if (!url) throw new Error(`No ${format} URL for weight ${weight} in Fontshare CSS`);
      const res = await fetch(`https:${url}`);
      if (!res.ok) throw new Error(`Failed to download ${name}: HTTP ${res.status}`);
      await writeFile(path.join(OUT, name), Buffer.from(await res.arrayBuffer()));
      console.log(`fetched ${name}`);
    }
  }

  for (const name of wanted) {
    if (!(await exists(path.join(OUT, name)))) throw new Error(`Font ${name} is still missing`);
  }
}

main().catch((err) => {
  console.error(`[fetch-fonts] ${err.message}`);
  process.exit(1);
});
