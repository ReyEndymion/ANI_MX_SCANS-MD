import MessageType from '@whiskeysockets/baileys'
let handler = async (m, { conn, usedPrefix, command }) => {
let room = Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))
if (room == undefined) return conn.sendMessage(m.chat, { text: '*[❗] NO ESTÁS EN NINGUNA PARTIDA DE TRES EN RAYA*\n\n' + wm}//, [['INICIAR SALA DE JUEGO', `${usedPrefix}ttt partida nueva`]]
, m)
delete conn.game[room.id]
await m.reply('*[ ✔ ] SE ELIMINÓ LA SALA DE JUEGO DE TRES EN RAYA*')}
handler.command = /^(delttt|deltt|delxo|deltictactoe)$/i
handler.fail = null
export default handler
