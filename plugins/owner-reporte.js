let handler = async (m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
const {owner: owners, userID} = await import('../config.js')
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESE UN REPORTE*\n\n*EJEMPLO:*\n*${usedPrefix + command} el comando ${usedPrefix}play no manda nada*`, userdb, m)
if (text.length < 10) return conn.sendWritingText(m.chat, `*[❗INFO❗] EL REPORTE DEBE SER MÁXIMO 10 CARACTERES!*`, userdb, m)
if (text.length > 1000) return conn.sendWritingText(m.chat, `*[❗INFO❗] EL REPORTE DEBE SER MÁXIMO 1000 CARACTERES!*`, userdb, m)
let teks = `*❒═════[REPORTE]═════❒*\n*┬*\n*├❧ NUMERO:* @${senderJid.split`@`[0]}\n*┴*\n*┬*\n*├❧ MENSAJE:* ${text}\n*┴*`
for (const owner of owners) {
const jid = owner[0] + userID
await conn.sendWritingText(jid, m.quoted ? teks + m.quoted.text : teks.trim(), userdb, m);
}

let resp = `*[ ✔️ ] REPORTE ENVIADO CON ÉXITO AL CREADOR DEL BOT, SU REPORTE SERÁ ATENDIDO LO ANTES POSIBLE, SÍ ES FALSO SERÁ IGNORADO*`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
handler.help = ['reporte', 'request'].map(v => v + ' <teks>')
handler.tags = ['info']
handler.command = /^(report|request|reporte|bugs|bug|report-owner|reportes)$/i
handler.menu = [
{title: "📢 REPORTAR", description: "Envía un reporte al creador del bot", id: `reporte <mensaje>`}
];
handler.type = "owners";
handler.disabled = false;

export default handler
