import path, { join } from 'path'
import fs from 'fs'
let handler = async (m, {conn, db, userdb, senderJid}) => {
let { default: fetch } = await import('node-fetch');
let { default: Jimp } = await import('jimp');
function randomString(length) {
var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
if (!length) {
length = Math.floor(Math.random() * chars.length);
}
var str = '';
for (var i = 0; i < length; i++) {
str += chars[Math.floor(Math.random() * chars.length)];
}
return str;
} 
let vn = path.join(media, 'audios/gay2.mp3')
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
let sf = join(media, `pictures/sinFoto.png`)
let pp =await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png' )//? sf : 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
console.log('y la foto: ', sf)
const profilePicture = await Jimp.read(await (await fetch(pp)).buffer());
const lettersImage = await Jimp.read(fs.readFileSync(join(media, `pictures/gay.png`)));
lettersImage.resize(profilePicture.getWidth(), profilePicture.getHeight());
profilePicture.composite(lettersImage, 0, 0);
const img = path.join(temp, `${randomString(5)}.jpg`);
await profilePicture.writeAsync(img);
const resp = '*🏳️‍🌈 MIREN A ESTE GAY 🏳️‍🌈*'
let q = await conn.sendImageWriting(m.chat, img, resp, userdb, m)
return conn.sendAudioRecording(m.chat, vn, q)
}
handler.help = ['gay']
handler.tags = ['maker']
handler.command = /^(gay)$/i
handler.menu = [
{title: "🎖️ JODA GAY", description: "usa #gay ", id: `gay`}, 
];
handler.type = "fun";
handler.disabled = false;

export default handler
