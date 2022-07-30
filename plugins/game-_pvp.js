let handler = m => m
handler.before = async function (m) {
this.suit = this.suit ? this.suit : {}
if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0
let room = Object.values(this.suit).find(room => room.id && room.status && [room.p, room.p2].includes(m.sender))
if (room) {
let win = ''
let tie = false
if (m.sender == room.p2 && /^(acc(ept)?|acepto|okay|si|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa)/i.test(m.text) && m.isGroup && room.status == 'wait') {
if (/^(tolak|no|rechazo|fuera|safa|gamau|nanti|ga(k.)?bisa)/i.test(m.text)) {
this.reply(m.chat, `*[❗] @${room.p2.split`@`[0]} RECHAZO EL PVP, EL PVP SE CANCELA*`, m)
delete this.suit[room.id]
return !0
}
room.status = 'play'
room.asal = m.chat
clearTimeout(room.waktu)
m.reply(`*🎮 GAMES - PVP - GAMES 🎮*

*—◉ EL JUEGO COMENZA, LAS OPCIONES HAN SIDO ENVIADOS A LOS CHATS PRIVADOS DE @${room.p.split`@`[0]} Y @${room.p2.split`@`[0]}*

*◉ SELECCIONEN UNA OPCION EN SUS CHATS PRIVADOS, RESPECTIVAMENTE*
*◉ ELEGIR OPCION EN wa.me/${conn.user.jid.split`@`[0]}*`, m.chat, {
contextInfo: {
mentionedJid: [room.p, room.p2]
}
})
    
if (!room.pilih) this.sendHydrated(room.p, '*POR FAVOR SELECCIONE UNA DE LAS SIGUIENTES OPCIONES*', `GANADOR +${room.poin} XP\nPERDEDOR -${room.poin_lose} XP\nEMPATE +${room.poin_bot} XP`, null, null, null, null, null, [['PIEDRA 🗿', 'Piedra'], ['PAPEL 📄', 'Papel'], ['TIJERA ✂️', 'Tijera']], m)
    
if (!room.pilih2) this.sendHydrated(room.p2, '*POR FAVOR SELECCIONE UNA DE LAS SIGUIENTES OPCIONES*', `GANADOR +${room.poin} XP\nPERDEDOR -${room.poin_lose} XP\nEMPATE +${room.poin_bot} XP`, null, null, null, null, null, [['PIEDRA 🗿', 'Piedra'], ['PAPEL 📄', 'Papel'], ['TIJERA ✂️', 'Tijera']], m)
                                    
room.waktu_milih = setTimeout(() => {
if (!room.pilih && !room.pilih2) this.sendButton(m.chat, `*[❗] NINGUN JUGADOR TOMO LA INICIATIVA DE EMPEZAR EL JUEGO, EL PVP SE HA CANCELADO*`, wm, null, [['MENU PRINCIPAL', '/menu']], m)
else if (!room.pilih || !room.pilih2) {
win = !room.pilih ? room.p2 : room.p
this.sendButton(m.chat, `*[❗] @${(room.pilih ? room.p2 : room.p).split`@`[0]} NO ELEGISTE NINGUNA OPCION, FIN DEL PVP*`.trim(), wm, null, [['MENU PRINCIPAL', '/menu']], m)    
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose
}
delete this.suit[room.id]
return !0
}, room.timeout)
}
let jwb = m.sender == room.p
let jwb2 = m.sender == room.p2
let g = /gunting/i
let b = /batu/i
let k = /kertas/i
let reg = /^(tijera|piedra|papel)/i
if (jwb && reg.test(m.text) && !room.pilih && !m.isGroup) {
room.pilih = reg.exec(m.text.toLowerCase())[0]
room.text = m.text
m.reply(`*[ ✔ ] HAS ELEGIDO ${m.text}* ${!room.pilih2 ? `\n\n*ESPERANDO A QUE EL OPONENTE ELIJA*` : ''}`)
if (!room.pilih2) this.reply(room.p2, '*[❗] EL OPONENTE HA ELEGIDO, ES TU TURNO DE ELEGIR!!*', 0)
}
if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
room.pilih2 = reg.exec(m.text.toLowerCase())[0]
room.text2 = m.text
m.reply(`*[ ✔ ] HAS ELEGIDO ${m.text}* ${!room.pilih ? `\n\n*ESPERANDO A QUE EL OPONENTE ELIJA*` : ''}`)
if (!room.pilih) this.reply(room.p, '*[❗] EL OPONENTE HA ELEGIDO, ES TU TURNO DE ELEGIR!!*', 0)
}
let stage = room.pilih
let stage2 = room.pilih2
if (room.pilih && room.pilih2) {
clearTimeout(room.waktu_milih)
if (b.test(stage) && g.test(stage2)) win = room.p
else if (b.test(stage) && k.test(stage2)) win = room.p2
else if (g.test(stage) && k.test(stage2)) win = room.p
else if (g.test(stage) && b.test(stage2)) win = room.p2
else if (k.test(stage) && b.test(stage2)) win = room.p
else if (k.test(stage) && g.test(stage2)) win = room.p2
else if (stage == stage2) tie = true

this.reply(room.asal, `*🎮 GAMES - PVP - GAMES 🎮*

*—◉ RESULTADO DEL JUEGO*

*◉ @${room.p.split`@`[0]} (${room.text}) ${tie ? '' : room.p == win ? ` GANO \n${room.poin} XP\nEMPATE, BONUS: ${room.poin_bot} XP` : ` PERDIO ${room.poin_lose} XP`}*
*◉ @${room.p2.split`@`[0]} (${room.text2}) ${tie ? '' : room.p2 == win ? ` GANO \n${room.poin} XP\nEMPATE, BONUS: ${room.poin_bot} XP` : ` PERDIO ${room.poin_lose} XP`}*
`.trim(), m, { contextInfo: { mentionedJid: [room.p, room.p2] } })

if (!tie) {
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp += room.poin_lose
}
delete this.suit[room.id]
}
return !0
}}
handler.exp = 0
export default handler
function random(arr) {
return arr[Math.floor(Math.random() * arr.length)]}
