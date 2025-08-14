export async function before(m, {conn, isBotAdmin , db}) {
// Auto borrado cuando hay un mensaje invisible en WA Desktop
if (m.messageStubType === 68) {
let log = {
key: m.key,
content: m.msg,
sender: senderJid
}
await conn.modifyChat(m.chat, 'clear', {
includeStarred: false
}).catch(console.log)
}}
