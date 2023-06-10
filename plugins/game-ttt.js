import TicTacToe from '../lib/tictactoe.js'
let handler = async (m, { conn, usedPrefix, command, text }) => {
conn.game = conn.game ? conn.game : {}
if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw '*[❗] 𝙰𝚄𝙽 𝙴𝚂𝚃𝙰𝚂 𝙴𝙽 𝚄𝙽 𝙹𝚄𝙴𝙶𝙾 𝙲𝙾𝙽 𝙰𝙻𝙶𝚄𝙸𝙴𝙽*'
if (!text) throw `*[❗] SE REQUIERE PONER UN NOMBRE A LA SALA DEL JUEGO*\n\n*—◉ 𝙴𝙹𝙴𝙼𝙿𝙻𝙾*\n*◉ ${usedPrefix + command} nueva sala*`
let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
if (room) {
await m.reply('*[🕹️] INICIA EL JUEGO, UN JUGADOR SE UNIÓ A LA PARTIDA*')
room.o = m.chat
room.game.playerO = m.sender
room.state = 'PLAYING'
let arr = room.game.render().map(v => {
return {
X: '❎',
O: '⭕',
1: '1️⃣',
2: '2️⃣',
3: '3️⃣',
4: '4️⃣',
5: '5️⃣',
6: '6️⃣',
7: '7️⃣',
8: '8️⃣',
9: '9️⃣',
}[v]})
let str = `
🎮 *TRES EN RAYA* 🎮

❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}

        ${arr.slice(0, 3).join('')}
        ${arr.slice(3, 6).join('')}
        ${arr.slice(6).join('')}

𝚃𝚄𝚁𝙽𝙾 𝙳𝙴 @${room.game.currentTurn.split('@')[0]}
`.trim()
if (room.x !== room.o) await conn.sendMessage(room.x, { text: str, mentions: this.parseMention(str)}, { quoted: m })
await conn.sendMessage(room.o, { text: str, mentions: conn.parseMention(str)}, { quoted: m })
} else {
room = {
id: 'tictactoe-' + (+new Date),
x: m.chat,
o: '',
game: new TicTacToe(m.sender, 'o'),
state: 'WAITING' }
if (text) room.name = text     
let imgplay = `https://cope-cdnmed.agilecontent.com/resources/jpg/8/9/1590140413198.jpg`
conn.sendMessage(m.chat, {image: {url: imgplay}, caption: `*🕹 *TRES EN RAYA* 🎮*\n\n*◉ ESPERANDO AL SEGUNDO JUGADOR*\n*◉ PARA BORRAR O SALIRSE DE LA PARTIDA USEN EL COMANDO ${usedPrefix}delttt*`, wm},  [['𝚄𝙽𝙸𝚁𝚂𝙴 𝙰 𝙻𝙰 𝙿𝙰𝚁𝚃𝙸𝙳𝙰', `${usedPrefix + command} ${text}`]], m, { mentions: conn.parseMention(text) })
conn.game[room.id] = room
}}
handler.command = /^(tictactoe|ttc|ttt|xo)$/i
export default handler
