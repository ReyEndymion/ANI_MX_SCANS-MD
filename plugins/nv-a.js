let handler = async (m, { conn }) => {
if (!db.data.chats[m.chat].audios && m.isGroup) throw 0
let vn = media + 'a.mp3'
async function ejecutarEnIntervalo() {
    conn.sendPresenceUpdate('recording', m.chat);
    }
    const intervalID = setInterval(ejecutarEnIntervalo, 1 * 100);
    await new Promise(resolve => setTimeout(resolve, 20 * 100));
conn.sendMessage(m.chat, { audio: { url: vn }, seconds: '3600', ptt: true, mimetype: 'audio/mpeg', fileName: `a.mp3` }, { quoted: m, ephemeralExpiration: 24*60*1000 })
clearInterval(intervalID);
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
