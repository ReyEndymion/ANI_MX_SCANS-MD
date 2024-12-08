let handler = async (m, { conn, command, usedPrefix, text }) => {
if(isNaN(text) && !text.match(/@/g)){
	
} else if(isNaN(text)) {
var number = text.split`@`[1]
} else if(!isNaN(text)) {
var number = text
}
	
if (isBotAdmin && isAdmin) {
if(!text || !m.quoted) {
let resp = `*[❗] USO APROPIADO*\n\n*┯┷*\n*┠≽ ${usedPrefix + command} @tag*\n*┠≽ ${usedPrefix + command} -> responder a un mensaje*\n*┷┯*`
return conn.sendWritingText(m.chat, resp, m);
} else {
if (number.length > 13 || (number.length < 11 && number.length > 0)) {
let resp = `*[ ⚠️ ] El número ingresado es incorrecto, por favor ingrese el número correcto*`
return conn.sendWritingText(m.chat, resp, m);
}	
if (text) {
var user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
var user = m.quoted.sender
} else if(m.mentionedJid) {
var user = number + '@s.whatsapp.net'
} 
conn.groupParticipantsUpdate(m.chat, [user], 'promote')
let resp = `*[ ✅ ] ÓRDENES RECIBIDAS*`
return conn.sendWritingText(m.chat, resp, m);
try {
} catch (e) {
} finally {
}
}
} else if (!isBotAdmin && isAdmin)  {
let resp = `*[❗INFO❗] EL BOT NO ES ADMINISTRADOR DEL GRUPO, NO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, m);
} else {
let resp = `*[❗INFO❗] SOLO UN ADMINISTRADOR DEL GRUPO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, m);
}
}
handler.tags = ['group']
handler.command = /^(promote|daradmin|darpoder)$/i
handler.group = true
export default handler
