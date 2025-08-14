let handler = async (m, {conn, command, text, db, userdb, senderJid}) => {
let resp = `
*⁉️ *PREGUNTAS* ⁉️*

*PREGUNTA:* ${text}
*RESPUESTA:* ${['Si','Tal vez sí','Posiblemente','Probablemente no','No','Imposible'].getRandom()}
`.trim()
//, null, m.mentionedJid ? {mentions: m.mentionedJid} : {})

return conn.sendWritingText(m.chat, resp, userdb, m);
}
handler.help = ['pregunta <texto>?']
handler.tags = ['kerang']
handler.command = /^pregunta|preguntas|apakah$/i
handler.menu = [
{title: "🎖️ PREGUNTA", description: "usa #pregunta <texto>", id: `pregunta`},
];
handler.type = "fun";
handler.disabled = false;

export default handler
