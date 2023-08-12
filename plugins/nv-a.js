import fs from "fs"
let handler = async (m, { conn }) => {
if (!db.data.chats[m.chat].audios && m.isGroup) throw 0
let vn = media + 'a.mp3'
const stats = fs.statSync(vn).size / 1024;
const fileSizeInMiliSeconds = Math.round((stats / 112) * 1000);
for (let i = 0; i < fileSizeInMiliSeconds; i++) {
        await new Promise(resolve => setTimeout(resolve, 1));
        if ((i + 1) % 10 === 0) {
            conn.sendPresenceUpdate('recording', m.chat);
          }
    }
conn.sendMessage(m.chat, { audio: { url: vn }/*, seconds: '3600'*/, ptt: true, mimetype: 'audio/mpeg', fileName: `a.mp3` }, { quoted: m, ephemeralExpiration: 24*60*1000 })
}
handler.customPrefix = /ª|a|A/
handler.command = /^(a|ª|A?$)/
export default handler

/*
let handler = async (m, { conn }) => {
if (!db.data.chats[m.chat].audios && m.isGroup) throw 0
let vn = media + 'a.mp3'
conn.sendPresenceUpdate('recording', m.chat)  
conn.sendMessage(m.chat, { audio: { url: vn }, contextInfo: { "externalAdReply": { "title": `👑 ANI MX SCANS 👑`, "body": `=> ᴀᴜᴅɪᴏ ᴀᴜᴛᴏᴍᴀᴛɪᴄᴏ`, "previewType": "PHOTO", "thumbnailUrl": null,"thumbnail": imagen1, "sourceUrl": `https://github.com/ReyEndymion/ANI_MX_SCANS-MD`, "showAdAttribution": true}}, seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: m })}
handler.customPrefix = /ª|a|A/
handler.command = /^(a|ª|A?$)/
export default handler
*/
