let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*[❗INFO❗] INGRESE UN REPORTE*\n\n*EJEMPLO:*\n*${usedPrefix + command} el comando ${usedPrefix}play no manda nada*`
if (text.length < 10) throw `*[❗INFO❗] EL REPORTE DEBE SER MÁXIMO 10 CARACTERES!*`
if (text.length > 1000) throw `*[❗INFO❗] EL REPORTE DEBE SER MÁXIMO 1000 CARACTERES!*`
let teks = `*❒═════[REPORTE]═════❒*\n*┬*\n*├❧ NUMERO:* wa.me/${m.sender.split`@`[0]}\n*┴*\n*┬*\n*├❧ MENSAJE:* ${text}\n*┴*`
let txt = '';
let count = 0;
for (const c of teks) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage('5215517489568@s.whatsapp.net', { text: m.quoted ? teks + m.quoted.text : teks.trim(), mentions: conn.parseMention(teks) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
conn.reply('5215517489568@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {contextInfo: {mentionedJid: [m.sender]}})
conn.reply('5215517489568@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})

let resp = `*[ ✔️ ] REPORTE ENVIADO CON ÉXITO AL CREADOR DEL BOT, SU REPORTE SERÁ ATENDIDO LO ANTES POSIBLE, SÍ ES FALSO SERÁ IGNORADO*`
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
handler.help = ['reporte', 'request'].map(v => v + ' <teks>')
handler.tags = ['info']
handler.command = /^(report|request|reporte|bugs|bug|report-owner|reportes)$/i
export default handler
