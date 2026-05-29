// Generate the app icons with no dependencies (pure Node + zlib).
// Draws a simple "eye" on a warm card — fitting for "Can You See?".
// Outputs maskable-safe PNGs to pwa/icons/. Run: node build/generate-icons.js
"use strict";
const zlib = require("zlib");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "pwa", "icons");

// --- minimal PNG encoder (RGBA, 8-bit) ----------------------------------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}
function encodePNG(size, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // RGBA
  // rows with a leading filter byte (0 = none)
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

// --- drawing -------------------------------------------------------------
function makeIcon(size) {
  const buf = Buffer.alloc(size * size * 4);
  const set = (x, y, r, g, b) => {
    x = x | 0; y = y | 0;
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const i = (y * size + x) * 4;
    buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = 255;
  };
  const fill = (r, g, b) => { for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) set(x, y, r, g, b); };
  const disc = (cx, cy, rad, r, g, b) => {
    for (let y = Math.floor(cy - rad); y <= cy + rad; y++)
      for (let x = Math.floor(cx - rad); x <= cx + rad; x++)
        if ((x - cx) ** 2 + (y - cy) ** 2 <= rad * rad) set(x, y, r, g, b);
  };
  const roundRect = (x0, y0, x1, y1, rad, r, g, b) => {
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      let inside = true;
      const corners = [[x0 + rad, y0 + rad], [x1 - rad, y0 + rad], [x0 + rad, y1 - rad], [x1 - rad, y1 - rad]];
      if (x < x0 + rad && y < y0 + rad) inside = (x - corners[0][0]) ** 2 + (y - corners[0][1]) ** 2 <= rad * rad;
      else if (x >= x1 - rad && y < y0 + rad) inside = (x - corners[1][0]) ** 2 + (y - corners[1][1]) ** 2 <= rad * rad;
      else if (x < x0 + rad && y >= y1 - rad) inside = (x - corners[2][0]) ** 2 + (y - corners[2][1]) ** 2 <= rad * rad;
      else if (x >= x1 - rad && y >= y1 - rad) inside = (x - corners[3][0]) ** 2 + (y - corners[3][1]) ** 2 <= rad * rad;
      if (inside) set(x, y, r, g, b);
    }
  };

  const S = size;
  fill(0xe6, 0x39, 0x46);                                   // red background (maskable full-bleed)
  roundRect(S * 0.16, S * 0.28, S * 0.84, S * 0.72, S * 0.10, 0xff, 0xf8, 0xf0); // cream "eye" card
  disc(S * 0.5, S * 0.5, S * 0.17, 0x45, 0x7b, 0x9d);       // blue iris
  disc(S * 0.5, S * 0.5, 0.09 * S, 0x1d, 0x35, 0x57);       // dark pupil
  disc(S * 0.44, S * 0.44, 0.035 * S, 0xff, 0xff, 0xff);    // highlight
  return encodePNG(size, buf);
}

fs.mkdirSync(OUT, { recursive: true });
[[192, "icon-192.png"], [512, "icon-512.png"], [180, "apple-touch-icon.png"]].forEach(([size, name]) => {
  fs.writeFileSync(path.join(OUT, name), makeIcon(size));
  console.log("wrote", path.join("pwa/icons", name), `(${size}x${size})`);
});
