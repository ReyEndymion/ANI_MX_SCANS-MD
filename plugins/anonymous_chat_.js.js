export async function before(m, { match , db, senderJid}) {
// if (match) return !1
if (!m.chat.endsWith('@s.whatsapp.net'))
return !0
this.anonymous = this.anonymous ? this.anonymous : {}
let room = Object.values(this.anonymous).find(room => [room.a, room.b].includes(senderJid) && room.state === 'CHATTING')
if (room) {
if (/^.*(next|leave|start)/.test(m.text))
return
let other = [room.a, room.b].find(user => user !== senderJid)
await m.copyNForward(other, true)
}
return !0
}