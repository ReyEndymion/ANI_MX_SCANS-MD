/* Creditos a https://github.com/FG98F 
modificado por https://github.com/ReyEndymion*/
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let handler = m => m
handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner, isROwner} ) {
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[conn.user.jid] || {}
if (isBotAdmin && chat.antiArab && !isAdmin && !isOwner && !isROwner && bot.restrict) {
		
let removevrt = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (m.sender.startsWith('212' || '212') && m.sender.startsWith('265' || '265') && m.sender.startsWith('92' || '92')) {
m.reply(`✳️ Anti árabes está activo para evitar spam, asi que seras eliminado\n\nHasta la próxima`)
await delay(1 * 10000)
await removevrt
global.db.data.users[m.sender].banned = true
if (removevrt[0].status === "404") { 
m.reply(`Se salio antes de que lo baneara, podria entrar de nuevo... re recomienda tomar precauciones`)}
}
} 
}
export default handler
