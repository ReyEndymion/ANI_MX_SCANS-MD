/* Creditos a https://github.com/FG98F */

let handler = async (m, {conn, usedPrefix, command, db, userdb, senderJid}) => {	
if (!m.quoted) return conn.sendWritingText(m.chat, `*[❗INFO❗] RESPONDA AL MENSAJE QUE DESEA QUE SEA ELIMINADO*`, userdb, m)
try {
let delet = m.message.extendedTextMessage.contextInfo.participant
let bang = m.message.extendedTextMessage.contextInfo.stanzaId
console.log('delmsggc: ', delet, bang)
return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
} catch {
return conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
}}
handler.help = ['del', 'delete']
handler.tags = ['group']
handler.command = /^del(ete)?msg$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.menu = [
{title:"💎 ELIMINAR MENSAJE", description: "elimina un mensaje del grupo usando #del @tag o respondiendo al mensaje", id: `del`}
];
handler.type = "gadmin";
handler.disabled = false;

export default handler

/*let handler = function (m) {
if (!m.quoted) throw false
let { chat, fromMe, isBaileys } = m.quoted
if (!fromMe) throw false
if (!isBaileys) return conn.sendWritingText(m.chat, `*[❗INFO❗] ESE MENSAJE NO FUE ENVIADO POR MÍ, NO LO PUEDO ELIMINAR*`, m)
conn.sendMessage(chat, { delete: m.quoted.vM.key })
}
handler.help = ['del', 'delete']
handler.tags = ['tools']
handler.command = /^del(ete)?$/i
handler.group = true
handler.admin = true
export default handler*/
