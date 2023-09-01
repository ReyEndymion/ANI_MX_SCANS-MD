import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
import MessageType from '@whiskeysockets/baileys'
const effects = ['greyscale', 'invert', 'brightness', 'threshold', 'sepia', 'red', 'green', 'blue', 'blurple', 'pixelate', 'blur']

let handler = async (m, { conn, usedPrefix, text }) => {
let effect = text.trim().toLowerCase()
if (!effects.includes(effect)){ 
let resp = `
*_✳️ USO CORRECTO DEL COMANDO ✳️_*
*👉 Use:* ${usedPrefix}stickerfilter (efecto) 
- Y responda a una imagen
*✅ Ejemplo:* ${usedPrefix}stickerfilter greyscale
*Lista de efectos:*
${effects.map(effect => `_> ${effect}_`).join('\n')}
`.trim()
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

}
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) {
let resp = '*_🔰 No se encontro la imagen_*\n\n*_✅ Responda a una imagen_*'
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

}
if (!/image\/(jpe?g|png)/.test(mime)) {
    let resp = `*_⚠️ Formato no admitido_*\n\n*_👉🏻 Responda a una imagen_*`
    let txt = '';
    let count = 0;
    for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 5));
        txt += c;
        count++;
    
        if (count % 10 === 0) {
            conn.sendPresenceUpdate('composing' , m.chat);
        }
    }
        await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
    
    }
let img = await q.download()
let url = await uploadImage(img)
let apiUrl = global.API('https://some-random-api.ml/canvas/', encodeURIComponent(effect), {
avatar: url
})
try {
let stiker = await sticker(null, apiUrl, global.packname, global.author)
//conn.sendFile(m.chat, stiker, null, { asSticker: true })
conn.sendMessage(m.chat, {sticker: {url: stiker}?  stiker : {url: stiker},  mimetype: 'image/webp', asSticker: true}, { quoted: m, ephemeralExpiration: 24 * 60 * 1000 });
    
} catch (e) {
let resp = '*_⚠️ Ocurrió un error al hacer la conversión a sticker_*\n\n*_✳️ Enviando imagen en su lugar..._*'
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
//    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

//await conn.sendFile(m.chat, apiUrl, 'image.png', null, m)
await conn.sendMessage(m.chat, { image: {url: apiUrl}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );  
}}
handler.help = ['stickfilter (caption|reply media)']
handler.tags = ['General']
handler.command = /^(stic(k|ker)filter|cs2)$/i
export default handler
