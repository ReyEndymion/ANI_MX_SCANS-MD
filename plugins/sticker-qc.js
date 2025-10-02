const handler = async (m, {conn, args, usedPrefix, command, db, userdb, senderJid}) => {
const {  sticker  } = await import('../lib/sticker.js');
let { default: axios } = await import('axios');
let text
if (args.length >= 1) {
text = args.slice(0).join(" ");
} else if (m.quoted && m.quoted.text) {
text = m.quoted.text;
} else {
let resp = "*[❗️] Uso incorrecto del comando, agregue un texto*";
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
if (!text) {
let resp = '*[❗️] Uso incorrecto del comando, agregue un texto*';
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
const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid; 
const mentionRegex = new RegExp(`@${who.split('@')[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'g');
const mishi = text.replace(mentionRegex, '');
if (mishi.length > 30) {
let resp = '*[❗️] El texto no puede tener mas de 30 caracteres*';

return conn.sendWritingText(m.chat, resp, userdb, m) 
}
const pp = await conn.profilePictureUrl(who).catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
const nombre = await conn.getName(who)
const obj = {"type": "quote", "format": "png", "backgroundColor": "#000000", "width": 512, "height": 768, "scale": 2, "messages": [{"entities": [], "avatar": true, "from": {"id": 1, "name": `${who?.name || nombre}`, "photo": {url: `${pp}`}}, "text": mishi, "replyMessage": {}}]};
const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {headers: {'Content-Type': 'application/json'}});
const buffer = Buffer.from(json.data.result.image, 'base64');
let stiker = await sticker(buffer, false, info.kom, info.gitAuthor);
if (stiker) return conn.sendMessage(m.chat, {sticker: {url: stiker}? stiker : {url: stiker}, mimetype: 'image/webp', asSticker: true}, { quoted: m, ephemeralExpiration: 2 * 60 * 1000 });
}
handler.help = ['qc'];
handler.tags = ['sticker'];
handler.command = /^(qc)$/i;
handler.menu = [
{title: "🖼️ QUOTE-COMEDIA", description: `Crea un sticker con un texto y una mención, usa el comando #qc <texto> @usuario`, id: `qc`}
];
handler.type = "stickermenu";
handler.disabled = false;

export default handler;
