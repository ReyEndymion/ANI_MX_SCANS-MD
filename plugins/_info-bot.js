import path, { join } from 'path'
import fetch from 'node-fetch';
import Jimp from 'jimp';
import fs from 'fs'
let handler = m => m
handler.before = async function (m, {conn}) {
let vn = path.join(media, 'audios/bot.mp3')
let bot = global.db.data.bot[conn.user.jid] || {}
const chats = bot.chats || {}
const privs = chats.privs || {}
const groups = chats.groups || {}
let chat, users, user
if (m.chat.endsWith(userID)) {
chat = privs[m.chat] || {}
user = privs[m.sender] || {}
} else if (m.chat.endsWith(groupID)) {
chat = groups[m.chat] || {}
users = chat.users || {}
user = users[m.sender] || {}
} else return

let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
if (/^bot$/i.test(m.text) && (!chat.isBanned || !chat.modoadmin)) { 
let resp = `*HOLA, ¿COMO TE PUEDO AYUDAR?*\n\nMENU DE COMANDOS\n=> *#menu*\n\n${wm}`

let txt = '';
 let count = 0;
 for (const c of resp) {
 await new Promise(resolve => setTimeout(resolve, 5));
 txt += c;
 count++;
 if (count % 10 === 0) {
 await conn.sendPresenceUpdate('composing' , m.chat);
 }
 }
let q = await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
const stats = fs.statSync(vn).size / 1024;
const fileSizeInMiliSeconds = Math.round((stats / 112) * 1000);
for (let i = 0; i < fileSizeInMiliSeconds; i++) {
await new Promise(resolve => setTimeout(resolve, 1));

if ((i + 1) % 10 === 0) {
await conn.sendPresenceUpdate('recording', m.chat);
}
}
return conn.sendMessage(m.chat, { audio: {url: vn} /*, seconds: '3600'*/, ptt: true, mimetype: 'audio/mpeg', fileName: `a.mp3` }, { quoted: q, ephemeralExpiration: 2*60*1000 })
}
}
export default handler
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
