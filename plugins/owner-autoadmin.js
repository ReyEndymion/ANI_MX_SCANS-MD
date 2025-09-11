/* Creditos a https://github.com/unptoadrih15/UPABOT-MD */

let handler = async (m, {conn, isAdmin, text, db, userdb, senderJid}) => {
if (m.fromMe) return
if (isAdmin) return conn.sendWritingText(m.chat, `*[❗] HOLA CREADOR, COMO ESTA? USTED YA ES ADMIN DE ESTE GRUPO*`, m)
try {
await conn.groupParticipantsUpdate(m.chat, [senderJid], "promote")
} catch {
return conn.sendWritingText(m.chat, `*[❗] ERROR, NO FUE POSIBLE DARLE ADMIN*`, m)}}
handler.command = /^autoadmin$/i
handler.owner = true
handler.group = true
handler.botAdmin = true
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "👑 AUTODADMIN", description: "Otorga admin a un usuario mencionado o al dueño del bot si no se menciona a nadie", id: `autoadmin`}
];
handler.type = "owners";
handler.disabled = false;

export default handler
