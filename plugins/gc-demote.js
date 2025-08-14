import { getCommandVariants } from "../lib/functions.js"
let handler = async (m, {conn, usedPrefix, text, db, userdb, senderJid}) => {
if(isNaN(text) && !text.match(/@/g)){
	
}else if(isNaN(text)) {
var number = text.split`@`[1]
}else if(!isNaN(text)) {
var number = text
}
	
if(!text && !m.quoted) {
return conn.sendWritingText(m.chat, `*[❗] USO APROPIADO*\n\n*┯┷*\n*┠≽ ${usedPrefix}quitaradmin @tag*\n*┠≽ ${usedPrefix}quitaradmin -> responder a un mensaje*\n*┷┯*`, userdb, m)}
if(number.length > 13 || (number.length < 11 && number.length > 0)) return conn.sendWritingText(m.chat, `*[ ⚠️ ] El número ingresado es incorrecto, por favor ingrese el número correcto*`, m)

try {
if(text) {
var user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
var user = m.quoted.sender
} else if(m.mentionedJid) {
var user = number + '@s.whatsapp.net'
} 
} catch (e) {
} finally {
conn.groupParticipantsUpdate(m.chat, [user], 'demote')
conn.sendWritingText(m.chat, `*[ ✅ ] ÓRDENES RECIBIDAS*`, userdb, m)
}}
handler.help = ['*593xxx*','*@usuario*','*responder chat*'].map(v => 'demote ' + v)
handler.tags = ['group']
handler.command = /^(demote|quitarpoder|quitaradmin)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null
handler.menu = [
{title:"💎 QUITAR ADMIN", description: `Degrada a alguien como admin usando:\n${getCommandVariants(handler.command).map(hc => `#${hc} <tag>`).join('\n')}`, id: `demote`},
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
