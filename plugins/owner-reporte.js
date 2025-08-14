let handler = async (m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESE UN REPORTE*\n\n*EJEMPLO:*\n*${usedPrefix + command} el comando ${usedPrefix}play no manda nada*`, userdb, m)
if (text.length < 10) return conn.sendWritingText(m.chat, `*[❗INFO❗] EL REPORTE DEBE SER MÁXIMO 10 CARACTERES!*`, userdb, m)
if (text.length > 1000) return conn.sendWritingText(m.chat, `*[❗INFO❗] EL REPORTE DEBE SER MÁXIMO 1000 CARACTERES!*`, userdb, m)
let teks = `*❒═════[REPORTE]═════❒*\n*┬*\n*├❧ NUMERO:* wa.me/${senderJid.split`@`[0]}\n*┴*\n*┬*\n*├❧ MENSAJE:* ${text}\n*┴*`

await conn.sendMessage('5215517489568@s.whatsapp.net', { text: m.quoted ? teks + m.quoted.text : teks.trim(), mentions: conn.parseMention(teks) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
conn.reply('5215517489568@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {contextInfo: {mentionedJid: [senderJid]}})
conn.reply('5215517489568@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [senderJid] }})

let resp = `*[ ✔️ ] REPORTE ENVIADO CON ÉXITO AL CREADOR DEL BOT, SU REPORTE SERÁ ATENDIDO LO ANTES POSIBLE, SÍ ES FALSO SERÁ IGNORADO*`
return conn.sendMessage(m.chat, { text: resp, mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
handler.help = ['reporte', 'request'].map(v => v + ' <teks>')
handler.tags = ['info']
handler.command = /^(report|request|reporte|bugs|bug|report-owner|reportes)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
