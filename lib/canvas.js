import nodeHtmlToImage from 'node-html-to-image';
import sharp from 'sharp'
import fs from 'fs';
async function renderImage() {
const buffer = await nodeHtmlToImage({
html: `
<html>
<body style="background: #282c34; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 300px;">
<h1>¡Hola desde un canvas!</h1>
</body>
</html>
`,
type: 'png',
quality: 100,
encoding: 'buffer'
});

fs.writeFileSync('output.png', buffer);
return buffer;
}

/**
 * 
 * @param {Buffer||stringPath} buffer 
 * @param {mime} type 
 * @returns 
 */

export async function canvas(buffer, type = 'webp') {
const sharp = await import('sharp');

const resized = await sharp.default(buffer)
.resize({
width: 512,
height: 512,
fit: 'contain',
background: { r: 0, g: 0, b: 0, alpha: 0 }
})
.webp()
.toBuffer();

return resized;
}
