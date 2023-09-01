let handler = async (m, {conn, command, text }) => {
let resp = `
*⁉️ *PREGUNTAS* ⁉️*
  
*PREGUNTA:* ${text}
*RESPUESTA:* ${['Si','Tal vez sí','Posiblemente','Probablemente no','No','Imposible'].getRandom()}
`.trim()
//, null, m.mentionedJid ? {mentions: m.mentionedJid} : {})
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
handler.help = ['pregunta <texto>?']
handler.tags = ['kerang']
handler.command = /^pregunta|preguntas|apakah$/i
export default handler
