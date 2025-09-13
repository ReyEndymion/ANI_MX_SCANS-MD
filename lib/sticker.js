/**
* Image/Video to Sticker
* @param {Buffer} img Image/Video Buffer
* @param {String} url Image/Video URL
* @param {...String} 
*/
async function sticker(img, url, ...args) {
const { _quickTest } = await import('./functions.js');
let lastError, stiker;

let support = await _quickTest();
let type = null;

if (img && Buffer.isBuffer(img)) {
const { fileTypeFromBuffer } = await import('file-type');
type = await fileTypeFromBuffer(img);
} else if (url) {
let ext = url.split('.').pop().split('?')[0].toLowerCase();
type = { ext, mime: ext.includes('mp4') || ext.includes('mov') ? 'video' : 'image' };
}

let funcs = [];
if (type?.mime?.startsWith('image')) {
funcs = [
support.ffmpeg && (support.convert || support.magick || support.gm) && sticker1,
sticker2,
support.ffmpeg && support.ffmpegWebp && sticker3,
sticker4,
];
} else if (type?.mime?.startsWith('video')) {
funcs = [
support.ffmpeg && sticker6,
];
} else {
funcs = [
support.ffmpeg && (support.convert || support.magick || support.gm) && sticker1,
sticker2,
support.ffmpeg && support.ffmpegWebp && sticker3,
sticker4,
support.ffmpeg && sticker6,
];
}

funcs = funcs.filter(f => f);

for (let func of funcs) {
try {
stiker = await func(img, url, ...args);
if (typeof stiker === 'string' && stiker.includes('html')) continue;
if (Buffer.isBuffer(stiker) && stiker.toString('hex', 0, 4) === '52494646') { // RIFF - WEBP
try {
const exifBuff = await addExif(stiker, ...args);
return exifBuff
} catch (e) {
console.error('addExif error:', e);
return stiker;
}
}
throw stiker.toString();
} catch (err) {
lastError = err;
console.error(`Error in ${func.name}:`, err);
continue;
}
}

support = null;
return lastError;
}

/**
* Image to Sticker
* @param {Buffer} img Image Buffer
* @param {String} url Image URL
*/
async function sticker1(img, url) {
const fs = await import('fs');
const { _quickTest } = await import('./functions.js');

let support = await _quickTest();
let {temp} = await import('../config.js')
const { format } = await import('util');
if (url) {
const { default: fetch } = await import('node-fetch');
let res = await fetch(url)
if (res.status !== 200) throw await res.text()
img = await res.buffer()
}
const { fileTypeFromBuffer } = await import('file-type')
const {ext, mime} = await fileTypeFromBuffer(img) || {};
const path = await import('path');
let inp = path.join(temp, `${Date.now()}.${ext}`)
await fs.promises.writeFile(inp, img)
if (mime === 'image/webp') return img

if (mime !== 'image/png') {
const { ffmpeg } = await import('./converter.js');
let ff = await ffmpeg(img, [
'-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1'
], ext, 'png')
img = ff.data
}
return new Promise(async (resolve, reject) => {
try {
let bufs = []
const command = support.gm ? ['gm', 'convert'] : support.magick ? ['magick', 'convert'] : support.convert ? ['convert'] : null
if (!command) throw new Error(' Ninguna herramienta de conversión soportada')
const args = ['-', 'webp:-']
const [_spawnprocess, ..._spawnargs] = [...command, ...args]
const { spawn } = await import('child_process');
let im = spawn(_spawnprocess, _spawnargs)
im.stderr.on('data', chunk => {
console.error('convert: stderr: ', chunk.toString())
})
im.on('error', reject)
im.stdout.on('data', chunk => {
bufs.push(chunk)})

im.on('close' , async (code) => {
await fs.promises.unlink(inp).catch(() => {})
if (code !== 0) {
return reject(new Error(` La conversión ha salido con el código: ${code}`))
}
const result = Buffer.concat(bufs)
return resolve(result)
})
im.stdin.write(img)
im.stdin.end()
} catch (e) {
return reject(e)
}
})
}

/**
* Image to Sticker
* @param {Buffer} img Image Buffer
* @param {String} url Image URL
*/
async function sticker2(img, url) {
const { default: uploadImage } = await import('./uploadImage.js');
url !== undefined ? url = url : img = await uploadImage(img)
const {fileTypeFromBuffer} = await import('file-type');
let {mime} = url ? { mime: 'image/jpeg' } : await fileTypeFromBuffer(img)
let sc = img
const {canvas} = await import('./canvas.js')
return await canvas(sc, 'webp')
}
/**
* Image to Sticker
* @param {Buffer} img Image/Video Buffer
* @param {String} url Image/Video URL
* @return Buffer
*/
async function sticker3(img, url) {
try {
if (url) {
const { default: fetch } = await import('node-fetch');
let res = await fetch(url)
if (res.status !== 200) throw await res.text()
img = await res.buffer()
}
const { ffmpeg } = await import('./converter.js');
let sticker = await ffmpeg(img, [
'-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1'
], 'jpeg', 'webp')
return sticker.data || sticker
} catch (error) {
}
}
/**
* 
* @param {Buffer} img 
* @param {string} url 
* @param {string} packname 
* @param {string} wm 
* @param {Object} categories 
* @param {properties} extra 
* @returns Buffer
*/
async function sticker4(img, url, packname, wm, categories = [''], extra = {}) {
const { Sticker } = await import('wa-sticker-formatter')
const stickerMetadata = {
pack: packname,
author: wm,
type: 'default',
categories,
...extra
}
const sticker = (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
return sticker
}
/**
* Image/Video to Sticker
* @param {Buffer} img Image/Video Buffer
* @param {String} url Image/Video URL
* @param {String} packname EXIF Packname
* @param {String} author EXIF Author
*/
async function sticker5(img, url, packname, author) {
const { default: uploadFile } = await import('./uploadFile.js');
let file = url ? url : await uploadFile(img)
return await res.buffer()
}

/**
* Convert using fluent-ffmpeg
* @param {string} img 
* @param {string} url 
* @return Buffer
*/
async function sticker6(img, url) {
const {fileTypeFromBuffer} = await import('file-type');
const path = await import('path');
const fs = await import('fs');
let {temp} = await import('../config.js')
const { default: fluent_ffmpeg } = await import('fluent-ffmpeg');
return new Promise(async (resolve, reject) => {
if (url) {
const { default: fetch } = await import('node-fetch');
let res = await fetch(url)
if (res.status !== 200) throw await res.text()
img = await res.buffer()
}
const type = await fileTypeFromBuffer(img) || {
mime: 'application/octet-stream',
ext: 'bin'
}
if (type.ext == 'bin') reject(img)
const tmp = path.join(temp, `${new Date()}.${type.ext}`)
const out = path.join(tmp + '.webp')
await fs.promises.writeFile(tmp, img)
// https://github.com/MhankBarBar/termux-wabot/blob/main/index.js#L313#L368
let Fffmpeg = /video/i.test(type.mime) ? fluent_ffmpeg(tmp).inputFormat(type.ext) : fluent_ffmpeg(tmp).input(tmp)
Fffmpeg.on('error', function (err) {
console.error(err)
fs.promises.unlink(tmp)
reject(img)
}).on('end', async function () {
fs.promises.unlink(tmp)
resolve(await fs.promises.readFile(out))
}).addOutputOptions([
`-vcodec`, `libwebp`, `-vf`,
`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`
]).toFormat('webp').save(out)
console.log('libSticker-sticker6: ', Fffmpeg)
})
}
/**
* Add WhatsApp JSON Exif Metadata
* Taken from https://github.com/pedroslopez/whatsapp-web.js/pull/527/files
* @param {Buffer} webpSticker 
* @param {String} packname 
* @param {String} author 
* @param {String} categories 
* @param {Object} extra 
* @returns 
*/
async function addExif(webpSticker, packname, wm, categories = [''], extra = {}) {
const crypto = await import('crypto');
const { default: webp } = await import('node-webpmux');
const img = new webp.Image();
const stickerPackId = crypto.randomBytes(32).toString('hex');
const json = { 'sticker-pack-id': stickerPackId, 'sticker-pack-name': packname, 'sticker-pack-publisher': wm,
'emojis': categories, 
...extra };
let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
let jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
let exif = Buffer.concat([exifAttr, jsonBuffer]);
exif.writeUIntLE(jsonBuffer.length, 14, 4);
await img.load(webpSticker)
img.exif = exif
return await img.save(null)
}

async function createSticker(img, url, gt, authorName, quality) {
const { Sticker } = await import('wa-sticker-formatter')
let stickerMetadata = {
type: 'full',
pack: gt,
author: authorName,
quality
}
return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}

const support = {
ffmpeg: true,
ffprobe: true,
ffmpegWebp: true,
convert: true,
magick: false,
gm: false,
find: false
}

export {
sticker,
sticker1,
sticker2,
sticker3,
sticker4,
sticker5,
sticker6,
addExif,
createSticker,
support
}
