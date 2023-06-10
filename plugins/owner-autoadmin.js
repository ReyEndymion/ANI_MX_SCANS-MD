/* Creditos a https://github.com/unptoadrih15/UPABOT-MD */

let handler = async (m, { conn, isAdmin }) => {  
if (m.fromMe) return
if (isAdmin) throw '*[❗] HOLA CREADOR, COMO ESTA? USTED YA ES ADMIN DE ESTE GRUPO*'
try {  
await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")
} catch {
await m.reply('*[❗] ERROR, NO FUE POSIBLE DARLE ADMIN*')}}
handler.command = /^autoadmin$/i
handler.owner = true
handler.group = true
handler.botAdmin = true
export default handler
