import sharp from "sharp";
import opentype from "opentype.js";
import { readFileSync, writeFileSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "src", "app");
const assetsDir =
  "C:/Users/Nirvan/.cursor/projects/g-Projects-portfolio-2026/assets";
const fontPath = join(root, "scripts", "Geist-Black.ttf");

// Match Header: font-black + tracking-[-0.08em], brand period.
const TRACKING_EM = -0.08;
const BRAND = "#F56A14";
const INK = "#141414";
/** Equal padding around ink box (fraction of canvas on the limiting axis). */
const PAD_RATIO = 0.1;
/** Master render size — downsampled for crisp small icons. */
const MASTER = 2048;

const fontBuf = readFileSync(fontPath);
const font = opentype.parse(
  fontBuf.buffer.slice(fontBuf.byteOffset, fontBuf.byteOffset + fontBuf.byteLength),
);

/**
 * Build "NK." as crisp vector paths, then scale+translate so the ink
 * bounding box is perfectly centered in a square with equal padding.
 */
function makeSvg(size) {
  const glyphs = font.stringToGlyphs("NK.");
  // Work in a large design space so path precision stays high.
  const designSize = 1000;
  const scale = designSize / font.unitsPerEm;
  const tracking = designSize * TRACKING_EM;

  let x = 0;
  const paths = [];

  glyphs.forEach((glyph, i) => {
    const char = "NK."[i];
    const path = glyph.getPath(x, 0, designSize);
    paths.push({
      path,
      d: path.toPathData(3),
      fill: char === "." ? BRAND : INK,
    });
    const adv = glyph.advanceWidth * scale;
    x += i < glyphs.length - 1 ? adv + tracking : adv;
  });

  // Tight ink bounds (ignores font side bearings / ascender padding).
  let x1 = Infinity;
  let y1 = Infinity;
  let x2 = -Infinity;
  let y2 = -Infinity;
  for (const { path } of paths) {
    const b = path.getBoundingBox();
    x1 = Math.min(x1, b.x1);
    y1 = Math.min(y1, b.y1);
    x2 = Math.max(x2, b.x2);
    y2 = Math.max(y2, b.y2);
  }

  const inkW = x2 - x1;
  const inkH = y2 - y1;
  const inner = size * (1 - PAD_RATIO * 2);
  const fit = Math.min(inner / inkW, inner / inkH);

  const drawW = inkW * fit;
  const drawH = inkH * fit;
  // True geometric center of the ink box → canvas center.
  const tx = (size - drawW) / 2 - x1 * fit;
  const ty = (size - drawH) / 2 - y1 * fit;

  const pathEls = paths
    .map(({ d, fill }) => `<path d="${d}" fill="${fill}"/>`)
    .join("\n    ");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#FFFFFF"/>
  <g transform="matrix(${fit.toFixed(6)} 0 0 ${fit.toFixed(6)} ${tx.toFixed(3)} ${ty.toFixed(3)})">
    ${pathEls}
  </g>
</svg>`;
}

async function renderMaster() {
  const svg = Buffer.from(makeSvg(MASTER));
  return sharp(svg, { density: 300 })
    .resize(MASTER, MASTER, {
      kernel: sharp.kernel.lanczos3,
      fit: "fill",
    })
    .png({ compressionLevel: 9, quality: 100 })
    .toBuffer();
}

async function downscale(master, size) {
  return sharp(master)
    .resize(size, size, {
      kernel: sharp.kernel.lanczos3,
      fit: "fill",
    })
    .png({ compressionLevel: 9, quality: 100 })
    .toBuffer();
}

function createIco(buffersWithSizes) {
  const count = buffersWithSizes.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];
  for (const { size, data } of buffersWithSizes) {
    entries.push({ size, data, offset });
    offset += data.length;
  }
  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(count, 4);
  let entryOffset = 6;
  for (const e of entries) {
    buf.writeUInt8(e.size >= 256 ? 0 : e.size, entryOffset);
    buf.writeUInt8(e.size >= 256 ? 0 : e.size, entryOffset + 1);
    buf.writeUInt8(0, entryOffset + 2);
    buf.writeUInt8(0, entryOffset + 3);
    buf.writeUInt16LE(1, entryOffset + 4);
    buf.writeUInt16LE(32, entryOffset + 6);
    buf.writeUInt32LE(e.data.length, entryOffset + 8);
    buf.writeUInt32LE(e.offset, entryOffset + 12);
    e.data.copy(buf, e.offset);
    entryOffset += 16;
  }
  return buf;
}

/** Verify ink is centered: measure non-white bounds in the PNG. */
async function assertCentered(png, label, tolerancePx = 2) {
  const { data, info } = await sharp(png)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      // Non-white ink (black letters or orange period).
      const isInk = a > 8 && (r < 250 || g < 250 || b < 250);
      if (!isInk) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  const padL = minX;
  const padR = width - 1 - maxX;
  const padT = minY;
  const padB = height - 1 - maxY;
  const dx = Math.abs(padL - padR);
  const dy = Math.abs(padT - padB);

  console.log(
    `${label}: ${width}x${height} pads L/R/T/B=${padL}/${padR}/${padT}/${padB} Δh=${dx} Δv=${dy}`,
  );

  if (dx > tolerancePx || dy > tolerancePx) {
    throw new Error(
      `${label} not centered within ${tolerancePx}px (Δh=${dx}, Δv=${dy})`,
    );
  }
}

const master = await renderMaster();
writeFileSync(join(assetsDir, "nk-favicon.svg"), makeSvg(512));
writeFileSync(join(assetsDir, "nk-favicon-512.png"), await downscale(master, 512));

// App icons: keep square, high-quality downscales from master.
const apple = await downscale(master, 180);
const icon = await downscale(master, 64); // sharper than 32 for modern browsers
const icon32 = await downscale(master, 32);

writeFileSync(join(outDir, "apple-icon.png"), apple);
writeFileSync(join(outDir, "icon.png"), icon);

const ico = createIco([
  { size: 16, data: await downscale(master, 16) },
  { size: 32, data: icon32 },
  { size: 48, data: await downscale(master, 48) },
]);
writeFileSync(join(outDir, "favicon.ico"), ico);

await assertCentered(await downscale(master, 512), "512", 3);
await assertCentered(icon, "icon64", 2);
await assertCentered(apple, "apple180", 2);

console.log("Wrote centered favicon.ico, icon.png (64), apple-icon.png (180)");
console.log({
  favicon: statSync(join(outDir, "favicon.ico")).size,
  icon: statSync(join(outDir, "icon.png")).size,
  apple: statSync(join(outDir, "apple-icon.png")).size,
});
