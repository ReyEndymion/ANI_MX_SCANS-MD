/* Creditos a https://github.com/FG98F 
modificado por https://github.com/ReyEndymion*/

export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner, botdb, chatdb, userdb, db, senderJid}) {
//console.log('antArab: ', m.fromMe, senderJid)
if (!m.isGroup) return !1
let user = senderJid.split`@`[0]
let resp = `✳️ @${user} Anti árabes está activo para evitar spam\n\nHasta la próxima`
let settings = botdb.settings || {}
if (isBotAdmin && chatdb.antiArab && !isAdmin && !isOwner && !isROwner && settings.restrict) {
		
if (senderJid.startsWith('212' || '212') && senderJid.startsWith('265' || '265')) {
userdb.banned = true
await conn.sendWritingText(m.chat, resp, userdb, m)
return conn.groupParticipantsUpdate(m.chat, [senderJid], 'remove')} 
}
}
