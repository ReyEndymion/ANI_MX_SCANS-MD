let timeout = 60000
let poin = 500
let poin_lose = -100
let poin_bot = 200
let suit = {}
let handler = async (m, {conn, info, start, usedPrefix, text, command, db, userdb, senderJid}) => {
const {userID, lid} = await import('../config.js')
const buff = info.nanipe
const isActivedButons = start.buttons
if (Object.values(suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(senderJid))) return conn.sendWritingText(m.chat, `*[❗] TERMINA TU PARTIDA ANTES DE INICIAR OTRA*`, userdb, m)
let textquien = `*A QUIÉN QUIERES DESAFIAR? ETIQUETA A UNA PERSONA*\n\n*—◉ EJEMPLO:*\n${usedPrefix+command} @${conn.user.jid.split('@')[0]}`
if (!m.mentionedJid[0]) return conn.sendWritingText(m.chat, textquien, userdb, m)
if (Object.values(suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) return conn.sendWritingText(m.chat, `*[❗] LA PERSONA A LA QUE QUIERES DESAFIAR AÚN ESTÁ JUGANDO OTRA PARTIDA, ESPERA A QUE TERMINE DE JUGAR`, userdb, m)
let id = 'suit_' + new Date() * 1
const mention = m.mentionedJid[0].endsWith(lid) ? conn.lidToJid(m.mentionedJid[0], m.chat) : m.mentionedJid[0]
let caption = `🎮 *JUEGO - PVP* 🎮\n\n(PIEDRA PAPEL O TIJERAS)\n\n—◉ @${senderJid.split`@`[0]} DESAFÍA A @${mention.split`@`[0]} EN UN JUEGO DE PIEDRA, PAPEL O TIJERA`.trim()
let footer = `◉ ESCRIBE "aceptar" PARA ACEPTAR\n◉ ESCRIBE "rechazar" PARA RECHAZAR`
let imgplaygame = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`
const messageObj = {
text: caption,
footer: buff
}
const buttons = [[`Aceptar`], [`Rechazar`]]
suit[id] = {
chat: isActivedButons ? conn.sendButton(m.chat, messageObj, {url: imgplaygame}, buttons, userdb, m) : conn.sendImageWriting(m.chat, imgplaygame, caption + '\n' + footer, userdb, m),
id: id,
p: senderJid,
p2: mention,
status: 'wait',
waktu: setTimeout(() => {
if (suit[id]) conn.sendWritingText(m.chat, `[ ⏳ ] TIEMPO DE ESPERA FINALIZADO, EL PVP SE CANCELÓ POR FALTA DE RESPUESTA`, userdb, m)
delete suit[id]
}, timeout), poin, poin_lose, poin_bot, timeout
}
}
handler.before = async function before(m, {conn, info, start, db, usersdb, userdb, senderJid}) {
const {userID} = await import('../config.js')
const isActivedButons = start.buttons
const buff = info.nanipe
if (userdb.suit < 0) userdb.suit = 0
let room = Object.values(suit).find(room => room.id && room.status && [room.p, room.p2].includes(senderJid))
if (room) {
let win = ''
let tie = false
if (senderJid == room.p2 && /^(acc(ept)?|terima|aceptar|gas|aceptare?|nao|gamau|rechazar|ga(k.)?bisa)/i.test(m.text) && m.isGroup && room.status == 'wait') {
if (/^(tolak|gamau|rechazar|ga(k.)?bisa)/i.test(m.text)) {
let textno = `*[❗] @${room.p2.split`@`[0]} RECHAZO EL PVP, EL JUEGO SE CANCELA*`
await conn.sendWritingText(m.chat, textno, userdb, m)
delete suit[room.id]
return !0 }
room.status = 'play'
room.asal = m.chat
clearTimeout(room.waktu)
let textplay = `🎮 *JUEGO - PVP* 🎮\n\n(PIEDRA PAPEL O TIJERAS)\n\n—◉ EL JUEGO COMIENZA, LAS OPCIONES HAN SIDO ENVIADAS A LOS CHATS PRIVADOS DE @${room.p.split`@`[0]} Y @${room.p2.split`@`[0]}\n\n◉ SELECCIONEN UNA OPCIÓN EN SUS CHATS PRIVADOS, RESPECTIVAMENTE\n*◉ ELEGIR UNA OPCIÓN EN wa.me/${conn.user.jid.replace(userID, '')}*`
const q = await conn.sendWritingText(m.chat, textplay, userdb, m);
Object.assign(room, {q})
//m.reply(textplay, m.chat, {mentions: conn.parseMention(textplay)})
let imgplay = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`
let resp = `POR FAVOR `
const buttons = [['PIEDRA 🗿', 'Piedra'], ['PAPEL 📄', 'Papel'], ['TIJERA ✂️', 'Tijera']]
if (!room.pilih) {
await conn.updateBlockStatus(room.p, 'unblock')
if (isActivedButons) {
resp += `SELECCIONE UNA DE LAS 3 OPCIONES`
const messageObj = {
text: resp,
footer: buff
}
await conn.sendButton(room.p, messageObj, {}, buttons, userdb, m)
} else {
resp += `ESCRIBA UNA DE LAS SIGUIENTES OPCIONES'\n\n*['🗿' 'PIEDRA o Piedra']*\n\n*['📄' 'PAPEL o Papel']*\n\n*['✂️' 'TIJERA o Tijera']*\n\nGANADOR +${room.poin}XP\n PERDEDOR ${room.poin_lose}XP`
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
await conn.sendImageWriting(room.p, imgplay, resp+'\n'+cmds+'\n'+'\n'+buff, userdb, m)
}
}
if (!room.pilih2) {
await conn.updateBlockStatus(room.p2, 'unblock')
if (isActivedButons) {
resp += `SELECCIONE UNA DE LAS 3 OPCIONES`
const messageObj = {
text: resp,
footer: buff
}
await conn.sendButton(room.p2, messageObj, {}, buttons, userdb, m)
} else {
resp += `ESCRIBA UNA DE LAS SIGUIENTES OPCIONES'\n\n*['🗿' 'PIEDRA o Piedra']*\n\n*['📄' 'PAPEL o Papel']*\n\n*['✂️' 'TIJERA o Tijera']*\n\nGANADOR +${room.poin}XP\n PERDEDOR ${room.poin_lose}XP`
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
await conn.sendImageWriting(room.p2, imgplay, resp+'\n'+cmds+'\n'+'\n'+buff, userdb, m)
}
}
room.waktu_milih = setTimeout(async () => {
if (!room.pilih && !room.pilih2) 
conn.sendMessage(m.chat, { text: `[❗] NINGÚN JUGADOR TOMÓ LA INICIATIVA DE EMPEZAR EL JUEGO, EL PVP SE HA CANCELADO`}, info.nbcde, null, [['MENÚ PRINCIPAL', '#menu']], m)
else if (!room.pilih || !room.pilih2) {
win = !room.pilih ? room.p2 : room.p 
let textnull = `*[❗] @${(room.pilih ? room.p2 : room.p).split`@`[0]} NO ELEGISTE NINGUNA OPCIÓN, FIN DEL PVP*`
await conn.sendImageWriting(m.chat, textnull, resp.trim(), userdb, m)
usersdb[win == room.p ? room.p : room.p2].exp += room.poin
usersdb[win == room.p ? room.p : room.p2].exp += room.poin_bot
usersdb[win == room.p ? room.p2 : room.p].exp -= room.poin_lose
}
delete suit[room.id]
//return !0
}, room.timeout)
}
let jwb = senderJid == room.p
let jwb2 = senderJid == room.p2
let g = /tijera/i
let b = /piedra/i
let k = /papel/i
let reg = /^(tijera|piedra|papel)/i
if (jwb && reg.test(m.text) && !room.pilih && !m.isGroup) {
room.pilih = reg.exec(m.text.toLowerCase())[0]
room.text = m.text
conn.sendWritingText(m.chat, `*[ ✔ ] HAS ELEGIDO ${m.text}, REGRESA AL GRUPO Y ${room.pilih2 ? `REVISA LOS RESULTADOS*` : 'ESPERA LOS RESULTADOS*'}\n\n_Para regresar al grupo mas rapido usa el citado de mi mensaje de seleccion de opciones_`, userdb, m)
if (!room.pilih2) conn.reply(room.p2, '*[❗] EL OPONENTE HA ELEGIDO, ES TU TURNO DE ELEGIR!!*', 0)}
if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
room.pilih2 = reg.exec(m.text.toLowerCase())[0]
room.text2 = m.text
conn.sendWritingText(m.chat, `*[ ✔ ] HAS ELEGIDO ${m.text}, REGRESA AL GRUPO Y ${room.pilih ? `REVISA LOS RESULTADOS*` : 'ESPERA LOS RESULTADOS*'}`, userdb, m)
if (!room.pilih) conn.reply(room.p, '*[❗] EL OPONENTE HA ELEGIDO, ES TU TURNO DE ELEGIR!!*', 0)}
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
conn.sendWritingText(room.asal, `
*👑 RESULTADOS DEL PVP 👑*${tie ? '\n*—◉ EMPATE!!*' : ''}

*@${room.p.split`@`[0]} (${room.text}) ${tie ? '' : room.p == win ? ` GANÓ 🥳 +${room.poin}XP*` : ` PERDIÓ 🤡 ${room.poin_lose}XP*`}
*@${room.p2.split`@`[0]} (${room.text2}) ${tie ? '' : room.p2 == win ? ` GANÓ 🥳 +${room.poin}XP*` : ` PERDIÓ 🤡 ${room.poin_lose}XP*`}
`.trim(), userdb, room.q)
if (!tie) {
usersdb[win == room.p ? room.p : room.p2].exp += room.poin
usersdb[win == room.p ? room.p : room.p2].exp += room.poin_bot
usersdb[win == room.p ? room.p2 : room.p].exp += room.poin_lose
}
delete suit[room.id]
}
}
//return !0
}
handler.command = /^pvp|suit(pvp)?$/i
handler.group = true
handler.game = true
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "🎮 PVP", description: `juega al piedra papel o tijera con otro usuario, usa el comando para desafiar a alguien y acepta el reto en el chat privado, si no aceptas el reto se cancelará automáticamente en ${timeout / 1000} segundos`, id: `pvp`},
];
handler.type = "juegos";
handler.disabled = false;
export default handler