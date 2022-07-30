let timeout = 60000
let poin = 500
let poin_lose = -100
let poin_bot = 200
let handler = async (m, { conn, usedPrefix }) => {
conn.suit = conn.suit ? conn.suit : {}
if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) throw '*[ ⚠ ] YA SE ENCUENTRA EN UN PVP, TERMINE ANTES DE INICIAR OTRA*'
if (!m.mentionedJid[0]) return m.reply(`*[❗] ¿CON QUEN DESEA JUGAR?*\n*ETIQUETE A LA PERSONA!*\n\n*EJEMPLO:*\n*${usedPrefix}suit @tag*`)
if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `*[ ⚠ ] LA PERSONA QUE USTED QUIERE DESAFIAR YA ESTA EN OTRA PARTIDA, ESPERE A QUE FINALICE*`
let id = 'suit_' + new Date() * 1
let caption = `*🎮 GAMES - PVP - GAMES 🎮*

*—◉ @${m.sender.split`@`[0]} DESAFIA A @${m.mentionedJid[0].split`@`[0]} EN UN PVP DE PIEDRA, PAPEL O TIJERA*
`.trim()
let footer = `◉ ESCRIBE "ok" PARA INICIAR EL JUEGO`
conn.suit[id] = {
chat: await conn.sendButton(m.chat, caption, footer, null, [[`Ok`]], m, { contextInfo: { mentionedJid: conn.parseMention(caption) } }),
id: id,
p: m.sender,
p2: m.mentionedJid[0],
status: 'wait',
waktu: setTimeout(() => {
if (conn.suit[id]) conn.reply(m.chat, `*[ ⏳ ] TIEMPO DE ESPERA FINALIZADO, EL PVP SE CANCELO POR FALTA DE RESPUESTA*`, m)
delete conn.suit[id]
}, timeout), poin, poin_lose, poin_bot, timeout
}}
handler.tags = ['games']
handler.help = ['suitpvp', 'suit'].map(v => v + ' @tag')
handler.command = /^suitpvp|suit|pvp|ppt2?$/i
handler.group = true
export default handler
