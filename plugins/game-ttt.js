import TicTacToe from '../lib/tictactoe.js'
import { owner, temp, newsletterID, sBroadCastID, userID, groupID, media } from '../config.js'
import { googleImage } from '../lib/googleMedia.js'
import { format } from 'util'
let game = {}
let handler = async (m, {conn, start, info, usedPrefix, command, text, db, userdb, senderJid}) => {
const buff = info.nanipe
if (/^(tictactoe|ttc|ttt|xo)$/i.test(command)) {
//conn.game = conn.game ? conn.game : {}
if (Object.values(game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(senderJid))) return conn.sendWritingText(m.chat, `*[❗] AÚN ESTÁS EN UN JUEGO CON ALGUIEN*`, userdb, m) 
if (!text) return conn.sendWritingText(m.chat, `*[❗] SE REQUIERE PONER UN NOMBRE A LA SALA DEL JUEGO*\n\n*—◉ EJEMPLO*\n*◉ ${usedPrefix + command} nueva sala*`, userdb, m)
let room = Object.values(game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
if (room) {
await conn.sendWritingText(m.chat, '*[🕹️] INICIA EL JUEGO, UN JUGADOR SE UNIÓ A LA PARTIDA*', userdb, m)
room.o = m.chat
room.game.playerO = senderJid
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

TURNO DE @${room.game.currentTurn.split('@')[0]}
`.trim()
if (room.x !== room.o) await conn.sendWritingText(room.x, str, userdb, m)
await conn.sendWritingText(room.o, str, userdb, m)
} else {
room = {
id: 'tictactoe-' + (+new Date),
x: m.chat,
o: '',
game: new TicTacToe(senderJid, 'o'),
state: 'WAITING' }
if (text) room.name = text 
const gatottt = ['tictactoe', '3 en raya juego imagenes'].getRandom()
const res = await googleImage(gatottt)
let imgplay = await res.getRandom()
console.log('ttt: ', imgplay)
const resp = `*🕹 *TRES EN RAYA* 🎮*\n\n*◉ ESPERANDO AL SEGUNDO JUGADOR*\n*◉ PARA BORRAR O SALIRSE DE LA PARTIDA USEN EL COMANDO ${usedPrefix}delttt*`
game[room.id] = room
const buttons = [['UNIRSE A LA PARTIDA', `${usedPrefix + command} ${text}`], ['SALIR DE LA PARTIDA ACTUAL', `${usedPrefix}delttt`]]
if (start.buttons) {
const messageObj = {
text: resp,
footer: buff
}
return conn.sendButton( m.chat, messageObj, {url: imgplay}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendImageWriting(m.chat, imgplay, resp+'\n'+cmds+'\n'+'\n'+buff, userdb, m)
//return conn.sendWritingText(m.chat, , m );
}
}
}
if (/^(delttt|deltt|delxo|deltictactoe)$/i) {
let resp = ''
let room = Object.values(game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(senderJid))
if (room == undefined) {
resp = '*[❗] NO ESTÁS EN NINGUNA PARTIDA DE TRES EN RAYA*'//return conn.sendWritingText(m.chat,, userdb, m)
} else {
delete game[room.id]
resp = `*[ ✔ ] SE ELIMINÓ LA SALA DE JUEGO DE TRES EN RAYA*`
}
const buttons = [['INICIAR SALA DE JUEGO', `${usedPrefix}ttt partida nueva`]]
if (start.buttons) {
const messageObj = {
text: resp,
footer: buff
}
return conn.sendButton( m.chat, messageObj, {}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendImageWriting(m.chat, imgplay, resp+'\n'+cmds+'\n'+'\n'+buff, userdb, m)
//return conn.sendWritingText(m.chat, , m );
}
  
}
}
handler.command = /^(delttt|deltt|delxo|deltictactoe|tictactoe|ttc|ttt|xo)$/i
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "🎮 TRES EN RAYA", description: `juega al tres en raya con otro usuario, usa el comando para desafiar a alguien y acepta el reto en el chat privado, si no aceptas el reto se cancelará automáticamente`, id: `tictactoe`},
{title: "🎖️ ELIMINAR DESAFIO # EN RAYA", description: "Elimina un desafio 3 en raya", id: `delttt`}
];
handler.type = "juegos";

handler.disabled = false;
handler.before = async function before(m, {conn, db, usersdb, userdb, senderJid}) {
let ok
let isWin = !1
let isTie = !1
let isSurrender = !1
//this.game = this.game ? this.game : {}
let room = Object.values(game).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(senderJid) && room.state == 'PLAYING')
let resp
if (room) {
if (!/^([1-9]|(me)?nyerah|\rendirse\|rendirse|RENDIRSE|surr?ender)$/i.test(m.text)) return !0
isSurrender = !/^[1-9]$/.test(m.text)
if (senderJid !== room.game.currentTurn) { 
if (!isSurrender)
return !0 }
if (debugMode)
return conn.sendWritingText(m.chat, `[DEBUG]\n` + require('util').format({
isSurrender,
text: m.text }), userdb, m)
if (!isSurrender && 1 > (ok = room.game.turn(senderJid === room.game.playerO, parseInt(m.text) - 1))) {
return conn.sendWritingText(m.chat, {
'-3': 'El juego ha terminado',
'-2': 'Inválido',
'-1': 'Posición inválida',
0: 'Posición inválida',
}[ok], userdb, m)
}
if (senderJid === room.game.winner)
isWin = true
else if (room.game.board === 511)
isTie = true
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
if (isSurrender) {
room.game._currentTurn = senderJid === room.game.playerX
isWin = true }
let winner = isSurrender ? room.game.currentTurn : room.game.winner
let str = `
🎮 *TRES EN RAYA* 🎮

❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

${isWin ? `@${(isSurrender ? room.game.currentTurn : room.game.winner).split('@')[0]} GANASTE 🥳, TE LLEVAS +4999 exp` : isTie ? 'EL JUEGO TERMINÓ EN EMPATE 😐' : `TURNO DE @${room.game.currentTurn.split('@')[0]}`}
`.trim()
if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat)
room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
if (room.x !== room.o)
await this.sendWritingText(room.x, str, userdb, m)
await this.sendWritingText(room.o, str, userdb, m)
if (isTie || isWin) {
usersdb[room.game.playerX].exp += playScore
usersdb[room.game.playerO].exp += playScore
if (isWin)
usersdb[winner].exp += winScore - playScore
if (debugMode)
return conn.sendWritingText(m.chat, '[DEBUG]\n' + format(room), userdb, m)
delete game[room.id]}}
//return !0 
}

export default handler
