import { pinterest } from '../lib/pinterestscraper.js'
let handler = async(m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] EJEMPLO DE USO DEL COMANDO ${usedPrefix + command} Minecraft*`, userdb, m)
const json = await pinterest(text)
conn.sendFile(m.chat, json.getRandom(), 'error.jpg', `
*RESULTADOS DE LA BUSQUEDA*
${text}
`.trim(), m)
}
handler.help = ['pinterest <keyword>']
handler.tags = ['internet']
handler.command = /^(pinterest)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
