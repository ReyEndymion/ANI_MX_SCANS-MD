const handler = async (m, {conn, args, usedPrefix, command, db, userdb, senderJid}) => {
if (usedPrefix == 'a' || usedPrefix == 'A') return;
let stiker = false;
const { sticker } = await import('../lib/sticker.js');
try {
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || q.mediaType || '';
if (/webp|image|video/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 10) return conn.sendWritingText(m.chat, `*[❗INFO❗] EL VÍDEO NO PUEDE DURAR MÁS DE 10 SEGUNDOS*`, userdb, m);
const img = await q.download?.();
if (!img) return conn.sendWritingText(m.chat, `*[❗INFO❗] RESPONDE A UN VÍDEO, IMAGEN O INSERTE EL ENLACE DE UNA IMAGEN TERMINACIÓN .jpg EL CUAL SERÁ CONVERTIDO EN STICKER, DEBE RESPONDER O USAR EL COMANDO ${usedPrefix + command}*`, userdb, m);
let out;
try {
stiker = await sticker(img, false, global.packname, info.gitAuthor);
} catch (e) {
console.error(e);
} finally {
if (!stiker) {
let { default: uploadFile } = await import('../lib/uploadFile.js');
let { default: uploadImage } = await import('../lib/uploadImage.js');
const { webp2png } = await import('../lib/webp2mp4.js');
if (/webp/g.test(mime)) out = await webp2png(img);
else if (/image/g.test(mime)) out = await uploadImage(img);
else if (/video/g.test(mime)) out = await uploadFile(img);
if (typeof out !== 'string') out = await uploadImage(img);
stiker = await sticker(false, out, global.packname, info.gitAuthor);
}
}
} else if (args[0]) {
if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, info.gitAuthor);
else return conn.sendWritingText(m.chat, `*[❗INFO❗] EL ENLACE / URL / LINK NO ES VALIDA, LA TERMINACION DEL ENLACE / URL / LINK DEBE SER .jpg, EJEMPLO: #s https://telegra.ph/file/0dc687c61410765e98de2.jpg*`, m);
}
} catch (e) {
console.error(e);
if (!stiker) stiker = e;
} finally {
if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
else return conn.sendWritingText(m.chat, `*[❗INFO❗] LO SIENTO, OCURRIO UN ERROR, VUELVA A INTENTARLO. NO OLVIDE RESPONDE A UN VIDEO, IMAGEN O INSERTE EL ENLACE DE UNA IMAGEN TERMINACIÓN .jpg EL CUAL SERA CONVERTIDO EN STICKER*`, m);
}
};
handler.help = ['stiker (caption|reply media)', 'stiker <url>', 'stikergif (caption|reply media)', 'stikergif <url>'];
handler.tags = ['sticker'];
handler.command = /^(sfull|s2|sticker2|stickergif2|stickerwm2|stiker2)$/i;
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler;

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'));
};
