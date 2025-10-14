import fs from 'fs/promises'
import path from 'path'
import { exec } from 'child_process'
import { fileURLToPath } from 'url'
import { tmpdir } from 'os'
import fetch from 'node-fetch'
import { BlendMode, BmpCompression, HorizontalAlign, Jimp, JimpMime, PNGColorType, PNGFilterType, ResizeStrategy, VerticalAlign, colorDiff, compareHashes, cssColorToHex, defaultFormats, defaultPlugins, diff, distance, intToRGBA, limit255, loadFont, measureText, measureTextHeight, rgbaToInt } from 'jimp';
import { SANS_10_BLACK, SANS_128_BLACK, SANS_128_WHITE,SANS_12_BLACK, SANS_14_BLACK, SANS_16_BLACK, SANS_16_WHITE, SANS_32_BLACK, SANS_32_WHITE, SANS_64_BLACK, SANS_64_WHITE, SANS_8_BLACK, SANS_8_WHITE,} from "jimp/fonts";
import {Edge, JimpClassSchema} from "@jimp/types";
import {methods} from "@jimp/plugin-rotate";
//* as print
/**
 * Aplica las instrucciones recibidas desde ChatGPT a una imagen.
 * @param {Buffer|string} imageInput - Puede ser Buffer de la imagen o URL.
 * @param {string} rawResponse - Texto recibido (posible JSON con ruido).
 * @returns {Promise<Buffer>} - Imagen procesada en buffer (PNG por default).
 */
export async function processImageWithInstructions(imageInput, rawResponse) {
try {
const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
console.log('processImageWithInstructions: ', jsonMatch, rawResponse)
if (!jsonMatch) throw new Error("No se encontró JSON válido en la respuesta.");
const instructions = JSON.parse(jsonMatch[0]);

const image = await Jimp.read(imageInput);

if (instructions.action === "remove_background" && instructions.method === "chroma") {
const { color = "#ffffff", tolerance = 32 } = instructions.params || {};
const target = cssColorToHex(color);

image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
const r = this.bitmap.data[idx + 0];
const g = this.bitmap.data[idx + 1];
const b = this.bitmap.data[idx + 2];
const pixel = rgbaToInt(r, g, b, 255);

if (colorDistance(pixel, target) <= tolerance) {
this.bitmap.data[idx + 3] = 0;
}
});
}

return await image.getBufferAsync(JimpMime.png);

} catch (err) {
throw new Error(`Error al procesar instrucciones: ${err.message}`);
}
}

/**
 * Calcula la distancia entre dos colores (RGB int).
 */
function colorDistance(c1, c2) {
const r1 = (c1 >> 24) & 0xff, g1 = (c1 >> 16) & 0xff, b1 = (c1 >> 8) & 0xff;
const r2 = (c2 >> 24) & 0xff, g2 = (c2 >> 16) & 0xff, b2 = (c2 >> 8) & 0xff;
return Math.sqrt((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2);
}

export async function delBG(img) {
const {tempFile, execAsync} = await import('./functions.js')
let inputPath

if (Buffer.isBuffer(img)) {
inputPath = tempFile('.bin')
await fs.writeFile(inputPath, img)
} else if (typeof img === 'string' && /^https?:\/\//.test(img)) {
const res = await fetch(img)
if (!res.ok) throw new Error(`Error al descargar: ${res.status}`)
const ext = path.extname(new URL(img).pathname) || '.bin'
inputPath = tempFile(ext)
await fs.writeFile(inputPath, Buffer.from(await res.arrayBuffer()))
} else if (typeof img === 'string') {
inputPath = img
} else {
throw new Error('Formato de entrada no soportado')
}

let pngPath = inputPath
const ext = path.extname(inputPath).toLowerCase();
if (ext !== '.png') {
pngPath = tempFile('.png')
await execAsync(`ffmpeg -y -i "${inputPath}" "${pngPath}"`)
}

const { Jimp } = await import('jimp')
const image = await Jimp.read(pngPath)

const targetColor = { r: 255, g: 255, b: 255 } // blanco
const tolerance = 30

image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
const r = this.bitmap.data[idx + 0]
const g = this.bitmap.data[idx + 1]
const b = this.bitmap.data[idx + 2]

if (
Math.abs(r - targetColor.r) < tolerance &&
Math.abs(g - targetColor.g) < tolerance &&
Math.abs(b - targetColor.b) < tolerance
) {
this.bitmap.data[idx + 3] = 0
}
})

return await image.getBufferAsync(JimpMime.png)
}

function rgbToHsv(r, g, b) {
r /= 255; g /= 255; b /= 255;
const max = Math.max(r, g, b), min = Math.min(r, g, b);
const d = max - min;
let h = 0;
if (d !== 0) {
switch (max) {
case r: h = ((g - b) / d) % 6; break;
case g: h = (b - r) / d + 2; break;
case b: h = (r - g) / d + 4; break;
}
h *= 60; if (h < 0) h += 360;
}
const s = max === 0 ? 0 : d / max;
const v = max;
return { h, s, v };
}
function hexToRgb(hex) {
const m = hex.replace('#','').trim();
const s = m.length === 3 ? m.split('').map(x => x + x).join('') : m;
const n = parseInt(s, 16);
return { r: (n>>16)&255, g: (n>>8)&255, b: n&255 };
}
function parseColor(c) {
if (typeof c === 'string') return hexToRgb(c);
if (Array.isArray(c)) return { r: c[0], g: c[1], b: c[2] };
return c; 
}
function hsvDistance(a, b, w={h:1, s:0.5, v:0.5}) {
const dh = Math.min(Math.abs(a.h - b.h), 360 - Math.abs(a.h - b.h)) / 180;
const ds = Math.abs(a.s - b.s);
const dv = Math.abs(a.v - b.v); 
return w.h*dh + w.s*ds + w.v*dv;
}

function sampleBorderColors(image, step = 10, max = 3) {
const w = image.bitmap.width, h = image.bitmap.height;
const samples = [];
for (let x = 0; x < w; x += step) {
samples.push(intToRGBA(image.getPixelColor(x, 0)));
samples.push(intToRGBA(image.getPixelColor(x, h - 1)));
}
for (let y = 0; y < h; y += step) {
samples.push(intToRGBA(image.getPixelColor(0, y)));
samples.push(intToRGBA(image.getPixelColor(w - 1, y)));
}
const bucket = new Map();
for (const {r,g,b} of samples) {
const key = `${r>>4}-${g>>4}-${b>>4}`; 
bucket.set(key, (bucket.get(key) || 0) + 1);
}
const top = [...bucket.entries()].sort((a,b)=>b[1]-a[1]).slice(0, max);
return top.map(([key])=>{
const [R,G,B] = key.split('-').map(n => (parseInt(n,10)<<4)+8);
return { r:R, g:G, b:B };
});
}

/**
 * Aplica máscara de fondo por varios colores objetivo en HSV con feather.
 * @param {Jimp} imageInstancia Jimp ya cargada (PNG).
 * @param {Object} opts
 *- colors: array de colores (hex "#00ff00", [r,g,b], {r,g,b})
 *- tolerance: número 0..1 (qué tan parecido al color objetivo para ser transparente)
 *- feather: número 0..1 (suavizado del borde alrededor del umbral)
 *- weights: {h,s,v} pesos para la distancia HSV
 *- autoSample: boolean (si true, ignora colors y toma del borde)
 */
export function applyChromaMask(image, {
colors = ['#ffffff'],
tolerance = 0.18,
feather = 0.08,
weights = { h: 1, s: 0.5, v: 0.5 },
autoSample = false
} = {}) {
let targets = autoSample ? sampleBorderColors(image, 12, 3) : colors.map(parseColor);
const targetsHSV = targets.map(c => rgbToHsv(c.r, c.g, c.b));

const tol = Math.max(0, Math.min(1, tolerance));
const fea = Math.max(0, Math.min(1, feather));
const featherHi = tol + fea;

image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
const r = this.bitmap.data[idx + 0];
const g = this.bitmap.data[idx + 1];
const b = this.bitmap.data[idx + 2];

const px = rgbToHsv(r, g, b);
let dmin = Infinity;
for (const t of targetsHSV) {
const d = hsvDistance(px, t, weights);
if (d < dmin) dmin = d;
}

let alpha;
if (dmin <= tol) {
alpha = 0;
} else if (dmin >= featherHi) {
alpha = 255;
} else {
const t = (dmin - tol) / (featherHi - tol); // 0..1
alpha = Math.round(t * 255);
}
this.bitmap.data[idx + 3] = alpha;
});

return image;
}

export async function createImageWithText(text) {
const font = await loadFont(SANS_8_WHITE);

const lines = text.split("\n");

const charWidth = measureText(font, "Ｍ");
const lineHeight = measureTextHeight(font, "A", 1000);

const maxLineWidth = Math.max(...lines.map(line => measureText(font, line)));
const totalHeight = lines.length * lineHeight + 20; 
const totalWidth = maxLineWidth + 20;

const image = new Jimp(totalWidth, totalHeight, 0x000000ff);

let y = 10;
for (const line of lines) {
image.print({font, x: 10, y, line});
y += (lineHeight || measureTextHeight(font, line, maxLineWidth));
}

return await image.getBufferAsync(JimpMime.png);
}

export async function cellBordImageCreate(array, LADO) {
const cellSize = 40;
const font = await loadFont(SANS_32_WHITE);
const offsetX = 50;
const offsetY = 40;
const width = LADO * cellSize + offsetX;
const height = LADO * cellSize + offsetY;

const image = new Jimp({ width, height, background: 0x000000FF });

for (let j = 0; j < LADO; j++) {
const text = String(j);
const textWidth = measureText(font, text);
const textHeight = measureTextHeight(font, text, cellSize);

const xPos = offsetX + j * cellSize + (cellSize - textWidth) / 2;
const yPos = (offsetY - textHeight) / 2;

image.print({ font, x: xPos, y: yPos, text });
}

for (let i = 0; i < LADO; i++) {
const rowText = String(i);
const rowWidth = measureText(font, rowText);
const rowHeight = measureTextHeight(font, rowText, cellSize);
const rowX = (offsetX - rowWidth) / 2; // centrado horizontal
const rowY = offsetY + i * cellSize + (cellSize - rowHeight) / 2;

image.print({ font, x: rowX, y: rowY, text: rowText });

for (let j = 0; j < LADO; j++) {
const letter = array[i][j] || '';
const letterWidth = measureText(font, letter);
const letterHeight = measureTextHeight(font, letter, cellSize);

const xPos = offsetX + j * cellSize + (cellSize - letterWidth) / 2;
const yPos = offsetY + i * cellSize + (cellSize - letterHeight) / 2;

image.print({ font, x: xPos, y: yPos, text: letter });

image.scan(offsetX + j * cellSize, offsetY + i * cellSize, cellSize, 1, (x, y, idx) => {
image.bitmap.data[idx] = 255;
image.bitmap.data[idx + 1] = 255;
image.bitmap.data[idx + 2] = 255;
image.bitmap.data[idx + 3] = 255;
});
image.scan(offsetX + j * cellSize, offsetY + i * cellSize, 1, cellSize, (x, y, idx) => {
image.bitmap.data[idx] = 255;
image.bitmap.data[idx + 1] = 255;
image.bitmap.data[idx + 2] = 255;
image.bitmap.data[idx + 3] = 255;
});
}
}

image.scan(offsetX + LADO * cellSize - 1, offsetY, 1, LADO * cellSize, (x, y, idx) => {
image.bitmap.data[idx] = 255;
image.bitmap.data[idx + 1] = 255;
image.bitmap.data[idx + 2] = 255;
image.bitmap.data[idx + 3] = 255;
});

image.scan(offsetX, offsetY + LADO * cellSize - 1, LADO * cellSize, 1, (x, y, idx) => {
image.bitmap.data[idx] = 255;
image.bitmap.data[idx + 1] = 255;
image.bitmap.data[idx + 2] = 255;
image.bitmap.data[idx + 3] = 255;
});

return await image.getBuffer(JimpMime.png);
}

export async function bordImageCreate(array, LADO) {

const cellSize = 40;
const padding = 10;
const width = LADO * cellSize + padding * 2;
const height = LADO * cellSize + padding * 2;

const image = new Jimp(width, height, 0x000000ff); 
const font = await loadFont(SANS_32_WHITE);

for (let i = 0; i < LADO; i++) {
for (let j = 0; j < LADO; j++) {
const letra = array[i][j] || " ";

const x = padding + j * cellSize;
const y = padding + i * cellSize;
image.print(font, x + 5, y + 5, letra);

image.scan(x, y, cellSize, 1, (px, py, idx) => {
image.bitmap.data[idx] = 0;
image.bitmap.data[idx + 1] = 0;
image.bitmap.data[idx + 2] = 0;
image.bitmap.data[idx + 3] = 255;
});
image.scan(x, y, 1, cellSize, (px, py, idx) => {
image.bitmap.data[idx] = 0;
image.bitmap.data[idx + 1] = 0;
image.bitmap.data[idx + 2] = 0;
image.bitmap.data[idx + 3] = 255;
});
}
}

image.scan(width - padding - 1, padding, 1, height - padding * 2, (px, py, idx) => {
image.bitmap.data[idx] = 0;
image.bitmap.data[idx + 1] = 0;
image.bitmap.data[idx + 2] = 0;
image.bitmap.data[idx + 3] = 255;
});
image.scan(padding, height - padding - 1, width - padding * 2, 1, (px, py, idx) => {
image.bitmap.data[idx] = 0;
image.bitmap.data[idx + 1] = 0;
image.bitmap.data[idx + 2] = 0;
image.bitmap.data[idx + 3] = 255;
});

return await image.getBufferAsync(JimpMime.png);
}