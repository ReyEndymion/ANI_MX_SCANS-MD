import fs from "fs"
import path from 'path'
let handler = async (m, {conn, chatdb, db, userdb, senderJid}) => {

if (!chatdb.audios && m.isGroup) throw 0
let vn = path.join(media, 'audios/a.mp3')
const stats = fs.statSync(vn).size / 1024;
const fileSizeInMiliSeconds = Math.round((stats / 112) * 1000);
for (let i = 0; i < fileSizeInMiliSeconds; i++) {
await new Promise(resolve => setTimeout(resolve, 1));
if ((i + 1) % 10 === 0) {
await conn.sendPresenceUpdate('recording', m.chat);
}
}
conn.sendMessage(m.chat, { audio: { url: vn }/*, seconds: '3600'*/, ptt: true, mimetype: 'audio/mpeg', fileName: `a.mp3` }, { quoted: m, ephemeralExpiration: 24*60*1000 })
}
handler.customPrefix = /ª|a|A/
handler.command = /^(a|ª|A?$)/
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler


