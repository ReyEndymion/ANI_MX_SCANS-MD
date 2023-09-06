let handler = m => m

handler.all = async function (m, {conn, isBotAdmin }) {
// Auto borrado cuando hay un mensaje invisible en WA Desktop
if (m.messageStubType === 68) {
let log = {
key: m.key,
content: m.msg,
sender: m.sender
}
await this.modifyChat(m.chat, 'clear', {
includeStarred: false
}).catch(console.log)
}}
export default handler
