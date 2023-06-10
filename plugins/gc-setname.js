import Presence from '@whiskeysockets/baileys'
let handler  = async (m, { conn, args, text }) => {
if (!text && !m.quoted) throw `*[❗INFO❗] INGRESE EL NOMBRE QUE DESEA QUE SEA EL NUEVO NOMBRE DEL GRUPO O CONTESTE A UN MENSAJE QUE TENGA UN TAG Y SEA COMPATIBLE CON LA CANTIDAD DE 25 CARÁCTERES*`
try {
let text2 = m.quoted ? m.quoted.text : text
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let txt = text2.replace('@' + who.replace(/\s+/g, '').split`@`[0], name).trim()
conn.groupUpdateSubject(m.chat, txt)
} catch (e) {
throw '*[❗INFO❗] LO SIENTO HUBO UN ERROR, EL NOMBRE NO PUEDE SER MAS DE 25 CARACTERES*'
}}
handler.help = ['setname <text>']
handler.tags = ['group']
handler.command = /^(setname)$/i
handler.group = true
handler.admin = true
export default handler
//adaptación https://github.com/SinNombre999
//arreglos finales Rey Endymion 