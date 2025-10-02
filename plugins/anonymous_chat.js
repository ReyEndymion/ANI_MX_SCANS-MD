let anonymous = {}
async function handler(m, {conn, start, info, usedPrefix, command, db, userdb, senderJid }) {
const footer = info.nanipe
command = command.toLowerCase()
anonymous = anonymous ? anonymous : {}
let room = Object.values(anonymous).find(room => room.check(senderJid))
console.log('anonimus: ', room)
switch (command) {
case 'next':
case 'leave': {
if (!room) {
let resp = '*[❗INFO❗] NO ESTAS EN UN CHAT ANONIMO*\n\n*¿QUIERES INICIAR UNO?*'
const buttons = [['INICIAR CHAT ANONIMO', `${usedPrefix}start`]]
if (start.buttons) {
resp += '\n_DA CLICK EN EL SIGUIENTE BOTON_'
const messageContent = {
text: resp,
footer: footer
}
await conn.sendButton(m.chat, messageContent, null, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\nUSA PARA ${cmds}`
resp += `\n\n${footer}`
return this.sendWritingText(m.chat, resp, userdb, m)
}
}
await conn.sendWritingText(m.chat, `*[ ✔ ] SALIO CON EXITO DEL CHAT ANONIMO*`, userdb, m)
let other = room.other(senderJid) 
if (other) {
let resp = '*[❗INFO❗] EL OTRO USUARIO AH ABANDONADO EL CHAT ANONIMO*\n\n*¿QUIERES IR A OTRO CHAT ANONIMO?*'
const buttons = [['INICIAR CHAT ANONIMO', `${usedPrefix}start`]]
if (start.buttons) {
resp += `\n_DA CLICK EN EL SIGUIENTE BOTON_`
const messageContent = {
text: resp,
footer: footer
}
await this.sendButton(room.a, messageContent, null, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\nUSA PARA ${cmds}`
resp += `\n\n${footer}`
return this.sendWritingText(m.chat, resp, userdb, m)

}
}
delete anonymous[room.id]
if (command === 'leave') {
delete anonymous[room.id]
break
}
}
case 'start': {
if (Object.values(anonymous).find(room => room.check(senderJid))) {
let resp = '*[❗INFO❗] TODAVIA ESTAS EN UN CHAT ANONIMO O ESPERANDO A QUE OTRO USUARIO SE UNA PARA INICIAR*\n\n*¿QUIERES SALIR DEL CHAT ANONIMO?*'
const buttons = [['SALIR DEL CHAT ANONIMO', `${usedPrefix}leave`]]
if (start.buttons) {
resp += `\n_DA CLICK EN EL SIGUIENTE BOTON_`
const messageContent = {
text: resp,
footer: footer
}
await this.sendButton(room.a, messageContent, null, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\nUSA PARA ${cmds}`
return this.sendWritingText(m.chat, resp, userdb, m)

}
}
let room = Object.values(anonymous).find(room => room.state === 'WAITING' && !room.check(senderJid))
if (room) {
room.b = senderJid
room.state = 'CHATTING'
let resp = '*[ ✔ ] UNA PERSONA SE HA UNIDO AL CHAT ANONIMO, PUEDEN INICIAR A CHATEAR*'
const buttons = [['IR A OTRO CHAT', `${usedPrefix}next`]]
if (start.buttons) {
const messageContent = {
text: resp,
footer: footer
}
await this.sendButton(room.a, messageContent, null, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\nSI DESEAS CAMBIAR DE CHAT USA ${cmds}`
resp += `\n\n${footer}`
await this.sendWritingText(m.chat, resp, userdb, m)
}
} else {
let id = + new Date
anonymous[id] = {
id,
a: senderJid,
b: '',
state: 'WAITING',
check: function (who = '') {
return [this.a, this.b].includes(who)
},
other: function (who = '') {
return who === this.a ? this.b : who === this.b ? this.a : ''
},
}
let resp = '*[❗INFO❗] ESPERANDO A OTRO USUARIO PARA INICIAR EL CHAT ANONIMO*\n\n*¿QUIERES SALIR DEL CHAT ANONIMO?*'
const buttons = [['SALIR DEL CHAT ANONIMO', `${usedPrefix}leave`]]
if (start.buttons) {
resp += `\n_DA CLICK EN EL SIGUIENTE BOTON_`
const messageContent = {
text: resp,
footer: footer
}
await conn.sendButton(m.chat, messageContent, null, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\nUSA PARA ${cmds}`
resp += `\n\n${footer}`
await this.sendWritingText(m.chat, resp, userdb, m)
}
}
break
}
}
}
handler.before = async function before(m, { match , db, senderJid}) {
// if (match) return !1
if (!m.chat.endsWith('@s.whatsapp.net'))
return !0
anonymous = anonymous ? anonymous : {}
let room = Object.values(anonymous).find(room => [room.a, room.b].includes(senderJid) && room.state === 'CHATTING')
if (room) {
if (/^.*(next|leave|start)/.test(m.text))
return
let other = [room.a, room.b].find(user => user !== senderJid)
await m.copyNForward(other, true)
}
//return !0
}
handler.help = ['start', 'leave', 'next']
handler.tags = ['anonymous']
handler.command = ['start', 'leave', 'next']
handler.private = true
handler.menu = [
{
title: `*LISTA DE OPCIONES*`,
rows: [
{title: "📳 START", description: "para iniciar el chat anonimo use #start", id: `start`},
{title: "📳 NEXT", description: "para el siguiente chat anonimo use #next", id: `next`},
{title: "📳 LEAVE", description: "para salir del chat anonimo use #leave", id: `leave`},
]}, 
];
handler.type = "chatanonimo";
handler.disabled = false;

export default handler
