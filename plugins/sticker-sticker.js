
let handler = async (m, {conn, args, usedPrefix, command, chatdb, db, userdb, senderJid}) => {
const {info} = await import('../config.js')
if (chatdb.isBanned) return 
let stiker = false
let resp
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp|image|video/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 8) return conn.sendWritingText(m.chat, `*[❗INFO❗] EL VIDEO NO PUEDE DURAR MÁS DE 7 SEGUNDOS*`, userdb, m)
let img = await q.download?.()

if (!img) { 
resp = `*[❗INFO❗] RESPONDE A UN VIDEO, IMAGEN O INSERTE EL ENLACE DE UNA IMAGEN TERMINACIÓN .jpg EL CUAL SERÁ CONVERTIDO EN STICKER, DEBE RESPONDER O USAR EL COMANDO ${usedPrefix + command}*`
}
let out
const { sticker } = await import('../lib/sticker.js')
try {
stiker = await sticker(img, false, info.packname, info.gitAuthor)
} catch (e) {
console.error(e)
} finally {
if (!stiker) {
if (/webp/g.test(mime)){
const { webp2png } = await import('../lib/webp2mp4.js')
out = await webp2png(img)
} else if (/image/g.test(mime)){
const {default: uploadImage} = await import('../lib/uploadImage.js')
out = await uploadImage(img)
} else if (/video/g.test(mime)){
const {default: uploadFile} = await import('../lib/uploadFile.js')
out = await uploadFile(img)}
if (typeof out !== 'string'){ 
const {default: uploadImage} = await import('../lib/uploadImage.js')
out = await uploadImage(img)}
stiker = await sticker(false, out, info.packname, info.gitAuthor)
}}
} else if (args[0]) {
if (isUrl(args[0])){ stiker = await sticker(false, args[0], info.packname, info.gitAuthor)
} else {
resp ='*[❗INFO❗] EL ENLACE/URL/ LINK NO ES VALIDA, LA TERMINACION DEL ENLACE/URL/ LINK DEBE SER .jpg, EJEMPLO: #s https://telegra.ph/file/0dc687c61410765e98de2.jpg*'
}
}
} catch (e) {
console.error(e)
if (!stiker) stiker = e
resp = `*[❗INFO❗] ERROR*:\n\n${e.stack}`
} finally {
if (stiker) {
return conn.sendMessage(m.chat, {sticker: {url: stiker}? stiker : {url: stiker},mimetype: 'image/webp', asSticker: true}, { quoted: m, ephemeralExpiration: 24 * 60 * 1000 });
} else {
resp ='*[❗INFO❗] LO SIENTO, OCURRIÓ UN ERROR, VUELVA A INTENTARLO. NO OLVIDE RESPONDER A UN VIDEO, IMAGEN O INSERTE EL ENLACE DE UNA IMAGEN TERMINACIÓN .jpg EN EL CUAL SERÁ CONVERTIDO EN STICKER*'
}
}
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
await conn.sendWritingText(m.chat, resp, userdb, m) 
}
handler.help = ['stiker (caption|reply media)', 'stiker <url>', 'stikergif (caption|reply media)', 'stikergif <url>']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?(info.nanie)?$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))}
