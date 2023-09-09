import { addExif } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
if (!m.quoted) {
    let resp = '*[❗INFO❗] RESPONDE AL STICKER QUE DESEA AGREGAR UN PAQUETE Y UN NOMBRE*'
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

    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
let stiker = false
try {
let [packname, ...author] = text.split('|')
author = (author || []).join('|')
let mime = m.quoted.mimetype || ''
if (!/webp/.test(mime)) {
    let resp = '*[❗INFO❗] RESPONDE AL STICKER QUE DESEA AGREGAR UN PAQUETE Y UN NOMBRE*'
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

    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
let img = await m.quoted.download()
if (!img) {
    let resp = '*[❗INFO❗] RESPONDE AL STICKER QUE DESEA AGREGAR UN PAQUETE Y UN NOMBRE*'
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
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
stiker = await addExif(img, packname || '', author || '')
} catch (e) {
console.error(e)
if (Buffer.isBuffer(e)) stiker = e
} finally {
if (stiker) {
    conn.sendMessage(m.chat, {sticker: stiker,  mimetype: 'image/webp', asSticker: true}, { quoted: m, ephemeralExpiration: 2*60*1000 });

} else {
    let resp = '*[❗INFO❗] LO SIENTO, ALGO FALLO.. CORROBORE QUE HAYA RESPONDIDO A UN STICKER Y HAYA AGREGADO UN NOMBRE DE PAQUETE Y UN NOMBRE DE USUARIO*'
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

    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
}}
handler.help = ['wm <packname>|<author>']
handler.tags = ['sticker']
handler.command = /^take|nuestro|wm$/i
export default handler
