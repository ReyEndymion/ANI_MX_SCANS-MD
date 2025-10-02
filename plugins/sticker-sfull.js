//import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, {conn, args, usedPrefix, command, db, userdb, senderJid}) => {
const fetch = await import('node-fetch')
const { sticker, createSticker } = await import('../lib/sticker.js')
const { axiosJson } = await import('../lib/functions.js')
const {isUrl} = await import('../lib/constants.js')
let stiker = false
try {
let [gt, ...author] = args.join` `.split`|`
author = (author || []).join`|`
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp/g.test(mime)) {
const { addExif } = await import('../lib/sticker.js')
let img = await q.download?.()
stiker = await addExif(img, info.kom || '', author || '')
} else if (/image/g.test(mime)) {
let img = await q.download?.()
stiker = await createSticker(img, false, info.kom, author)
} else if (/video/g.test(mime)) {
const {mp4ToWebp} = await import('../lib/fileTo.js')
//if ((q.msg || q).seconds > 10) return conn.sendWritingText(m.chat, `Max 10 seconds!`, userdb, m)
let img = await q.download?.()
stiker = await mp4ToWebp(img, { pack: gt, author: author })
} else if (args[0] && isUrl(args[0])) {
stiker = await createSticker(false, args[0], '', info.nanipe, 20)
} else {
let resp = `Responda a una imagen/video/sticker con el comando ${usedPrefix + command}`
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

return conn.sendWritingText(m.chat, resp, userdb, m)
}
} catch (e) {
console.log(e)
stiker = e
} finally {
conn.sendMessage(m.chat, {sticker: {url: stiker}? stiker : {url: stiker}, mimetype: 'image/webp', asSticker: true}, { quoted: m, ephemeralExpiration: 2*60*1000 });
}
}
handler.help = ['sfull']
handler.tags = ['sticker']
handler.command = /^sfull$/i

handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

