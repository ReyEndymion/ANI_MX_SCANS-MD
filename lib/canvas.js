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
type: 'png', // o 'jpeg'
quality: 100,
encoding: 'buffer' // Para obtener un Buffer y enviarlo como imagen
});

fs.writeFileSync('output.png', buffer); // Guarda la imagen si quieres
return buffer; // Puedes usarlo como sticker o imagen en tu bot
}

//renderImage();, quality = 0.92
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
/*
const buffer = await nodeHtmlToImage({
html: htmlCode,
type,
quality: type === 'jpeg' ? Math.floor(quality * 100) : undefined,
encoding: 'buffer',
});
console.log('canvas: ', buffer)
return buffer;
await nodeHtmlToImage({
html: `<html><body><h1>Hola, {{name}}!</h1></body></html>`,
content: { name: 'Rey Endymion' },
encoding: 'buffer'
});
export async function canvas(code, type = 'png', quality = 0.92) {
const { default: fetch } = await import('node-fetch');
let res = await fetch('https://nurutomo.herokuapp.com/api/canvas?' + queryURL({
type,
quality
}), {
method: 'POST',
headers: {
'Content-Type': 'text/plain',
'Content-Length': code.length
},
body: code
})
let image = await res.buffer()
return image
}
*/
