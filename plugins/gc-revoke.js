/* Creditos a https://github.com/ALBERTO9883 */

let handler = async(m, { conn }) => {
let revoke = await conn.groupRevokeInvite(m.chat)
//let resp = `🔹️ *_Se restableció con éxito el link del grupo._*\n♾ • Link Nuevo: ${'https://chat.whatsapp.com/' + revoke}`
let resp = `🔹️ *_Se restableció con éxito el link del grupo._*`
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

conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
handler.command = ['resetlink', 'revoke']
handler.botAdmin = true
handler.admin = true
handler.group = true
export default handler
