/* Creditos a https://github.com/FG98F 
modificado por https://github.com/ReyEndymion*/
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let handler = m => m
handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner, isROwner} ) {
    let user = m.sender.split`@`[0]
let resp = `✳️ @${user} Anti árabes está activo para evitar spam\n\nHasta la próxima`
	
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[conn.user.jid] || {}
if (isBotAdmin && chat.antiArab && !isAdmin && !isOwner && !isROwner && bot.restrict) {
		
if (m.sender.startsWith('212' || '212') && m.sender.startsWith('265' || '265')) {
global.db.data.users[m.sender].banned = true
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')} 
}
}
export default handler
