import Presence from '@adiwajshing/baileys'
let handler  = async (m, { conn, args, text }) => {
if (!text) throw `*[❗INFO❗] INGRESE EL NOMBRE QUE DESEA QUE SEA EL NUEVO NOMBRE DEL GRUPO*`
try {
let text = args.join` `
if(!args || !args[0]) {
} else {
conn.groupUpdateSubject(m.chat, text)}
} catch (e) {
throw '*[❗INFO❗] LO SIENTO HUBO UN ERROR, EL NOMBRE NO PUEDE SER MAS DE 25 CARACTERES*'
}}
handler.help = ['setname <text>']
handler.tags = ['group']
handler.command = /^(setname)$/i
handler.group = true
handler.admin = true
export default handler
