let timeout = 60000
let poin = 500
let poin_lose = -100
let poin_bot = 200
let handler = async (m, { conn, usedPrefix, text, command }) => {
conn.suit = conn.suit ? conn.suit : {}
if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) throw '*[❗] TERMINA TU PARTIDA ANTES DE INICIAR OTRA*'
let textquien = `*A QUIÉN QUIERES DESAFIAR? ETIQUETA A UNA PERSONA*\n\n*—◉ EJEMPLO:*\n${usedPrefix+command} @${global.animxscans[0][0]}`
if (!m.mentionedJid[0]) return m.reply(textquien, m.chat, { mentions: conn.parseMention(textquien)})
if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `*[❗] LA PERSONA A LA QUE QUIERES DESAFIAR AÚN ESTÁ JUGANDO OTRA PARTIDA, ESPERA A QUE TERMINE DE JUGAR`
let id = 'suit_' + new Date() * 1
let caption = `🎮 *JUEGO - PVP* 🎮\n\n(PIEDRA PAPEL O TIJERAS)\n\n—◉ @${m.sender.split`@`[0]} DESAFÍA A @${m.mentionedJid[0].split`@`[0]} EN UN JUEGO DE PIEDRA, PAPEL O TIJERA`.trim()
let footer = `◉ ESCRIBE "aceptar" PARA ACEPTAR\n◉ ESCRIBE "rechazar" PARA RECHAZAR`
let imgplaygame = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`
conn.suit[id] = {
chat: await conn.sendMessage(m.chat, {image: {url: imgplaygame}, caption: caption +'\n\n'+ footer, mentions: conn.parseMention(caption)}, {quoted: m, ephemeralExpiration: true, disappearingMessagesInChat: 24*60*100} [[`Aceptar`], [`Rechazar`]], null),
id: id,
p: m.sender,
p2: m.mentionedJid[0],
status: 'wait',
waktu: setTimeout(() => {
if (conn.suit[id]) conn.reply(m.chat, `[ ⏳ ] TIEMPO DE ESPERA FINALIZADO, EL PVP SE CANCELÓ POR FALTA DE RESPUESTA`, m)
delete conn.suit[id]
}, timeout), poin, poin_lose, poin_bot, timeout
}}
handler.command = /^pvp|suit(pvp)?$/i
handler.group = true
handler.game = true
export default handler