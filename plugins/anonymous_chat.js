async function handler(m, { command }) {
command = command.toLowerCase()
this.anonymous = this.anonymous ? this.anonymous : {}
switch (command) {
case 'next':
case 'leave': {
let room = Object.values(this.anonymous).find(room => room.check(m.sender))
if (!room) return this.sendMessage(m.chat, { text: '*[❗INFO❗] NO ESTAS EN UN CHAT ANONIMO*\n\n*¿QUIERES INICIAR UNO?*\n_DA CLICK EN EL SIGUIENTE BOTON_'}, wm, null, [['INICIAR CHAT ANONIMO', `.start`]], m)
m.reply('*[ ✔ ] SALIO CON EXITO DEL CHAT ANONIMO*')
let other = room.other(m.sender) 
if (other) await this.sendButton(other, '*[❗INFO❗] EL OTRO USUARIO AH ABANDONADO EL CHAT ANONIMO*\n\n*¿QUIERES IR A OTRO CHAT ANONIMO?*\n_DA CLICK EN EL SIGUIENTE BOTON_', wm, null, [['INICIAR CHAT ANONIMO', `.start`]], m)
delete this.anonymous[room.id]
if (command === 'leave') break
}
case 'start': {
if (Object.values(this.anonymous).find(room => room.check(m.sender))) return this.sendMessage(m.chat, { text: '*[❗INFO❗] TODAVIA ESTAS EN UN CHAT ANONIMO O ESPERANDO A QUE OTRO USUARIO SE UNA PARA INICIAR*\n\n*¿QUIERES SALIR DEL CHAT ANONIMO?*\n_DA CLICK EN EL SIGUIENTE BOTON_'}, wm, null, [['SALIR DEL CHAT ANONIMO', `.leave`]], m)
let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
if (room) {
await this.sendButton(room.a, '*[ ✔ ] UNA PERSONA SE HA UNIDO AL CHAT ANONIMO, PUEDEN INICIAR A CHATEAR*', wm, null, [['IR A OTRO CHAT', `.next`]], m)
room.b = m.sender
room.state = 'CHATTING'
await this.sendMessage(m.chat, { text: '*[ ✔ ] UNA PERSONA SE HA UNIDO AL CHAT ANONIMO, PUEDEN INICIAR A CHATEAR*'}, wm, null, [['IR A OTRO CHAT', `.next`]], m)
} else {
let id = + new Date
this.anonymous[id] = {
id,
a: m.sender,
b: '',
state: 'WAITING',
check: function (who = '') {
return [this.a, this.b].includes(who)
},
other: function (who = '') {
return who === this.a ? this.b : who === this.b ? this.a : ''
},
}
await this.sendMessage(m.chat, { text: '*[❗INFO❗] ESPERANDO A OTRO USUARIO PARA INICIAR EL CHAT ANONIMO*\n\n*¿QUIERES SALIR DEL CHAT ANONIMO?*\n_DA CLICK EN EL SIGUIENTE BOTON_'}, wm, null, [['SALIR DEL CHAT ANONIMO', `.leave`]], m)
}
break
}}}
handler.help = ['start', 'leave', 'next']
handler.tags = ['anonymous']
handler.command = ['start', 'leave', 'next']
handler.private = true
export default handler
