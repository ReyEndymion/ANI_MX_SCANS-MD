//CREADO POR @gata_dios, refactorizado por ReyEndymion
const response = {}
let handler = async (m, {conn, info, start, args, text, usedPrefix, command, db, usersdb, userdb, senderJid}) => {
if (!m.isGroup) return !1
if (!args[0]) {
let resp = `Puedes elegir La dificultad`
const buttons = [
['Fácil 🎯', `${usedPrefix + command} facil`],
['Normal ⚔️', `${usedPrefix + command} normal`],
['Difícil 💀', `${usedPrefix + command} dificil`],
['Experto 👑', `${usedPrefix + command} experto`]
]
if (start.buttons) {
const messageObj = {
text: resp,
footer: info.nanipe
}
return conn.sendButton( m.chat, messageObj, {}, buttons, userdb, m)
} else {
resp += `\n Debe ser escribir el comando de la siguiente manera:`
const cmds = buttons.map(([a, b]) => `${a}: ${b}`).join('\n')
return conn.sendWritingText(m.chat, resp + '\n\n' + cmds + '\n', userdb, m)
}
}

const {createImageWithText, cellBordImageCreate} = await import('../lib/jimpHelper.js')
const {PALABRAS, modosSP} = await import('../lib/constants.js')
const {generarSopaDeLetras} = await import('../lib/functionsGames.js')
let userSP, cambioLetra, diamante = null, q
let intentos = 0
const modo = args[0].toLowerCase()
if (!['facil', 'normal', 'dificil', 'experto'].includes(modo)) {
return conn.sendWritingText(m.chat, `❌ Dificultad no válida. Usa: facil | normal | dificil | experto`, userdb, m)
}
const config = modosSP[modo]
if (m.chat in response) return conn.sendWritingText(m.chat, `*@${response[m.chat]?.user.split("@")[0]} ESTA JUGANDO SOPA DE LETRAS 🔠 ACTUALMENTE*`, userdb, m)

q = (await conn.sendWritingText(m.chat, `*@${senderJid.split("@")[0]} REGISTRADO EN EL JUEGO* ✅`, userdb, m))
let LADO = config.lado
const palabrasFiltradas = PALABRAS.filter(p => p.length >= config.minLen && p.length <= config.maxLen)

if (!palabrasFiltradas.length) throw `No hay palabras que entren en el modo ${modo}`
const PALABRA = palabrasFiltradas[Math.floor(Math.random() * palabrasFiltradas.length)]
let {matriz, fila, columna, sopaNube, sopaPalabra, sopaDir, imgbuff} = await generarSopaDeLetras(PALABRA, LADO)
intentos = 3
q = (await conn.sendWritingText(m.chat, `🔠 *SOPA DE LETRAS* 🔠
*PALABRA:* \`\`\`"${PALABRA}"\`\`\`
*TIENE 3 MINUTOS PARA ENCONTRAR LA RESPUESTA CORRECTA!!*

*ESCRIBA EL NÚMERO DE FILA Y COLUMNA DEL COMIENZO DE LA PRIMERA LETRA _"${PALABRA.charAt(0)}"_ DE LA PALABRA _"${PALABRA}"_ TIENE _${intentos}_ INTENTOS!!*

*EJEMPLO:*
❇️ \`\`\`28\`\`\`
equivale a:
➡️ \`\`\`FILA 2\`\`\`⬇️ \`\`\`COLUMNA 8\`\`\``.trim(), userdb, q))
q = await conn.sendImageWriting(m.chat, imgbuff, `🔠 *${PALABRA.split("").join(" ")}* 🔠`, userdb, q)
response[m.chat] = {
user: senderJid, 
q,
palabra: sopaPalabra,
fila, columna,
direccion: sopaDir,
sopaText: sopaNube,
intentos,
timeout: null,
warning: null,
matriz,
startedAt: Date.now()
}

const game = response[m.chat]
if (intentos === 3) await resetUserSP()
async function resetUserSP() {
game.warning = setTimeout(async () => {
if (intentos !== 0) {
await conn.sendWritingText(m.chat, `*@${game.user.split("@")[0]} TE QUEDA UN MINUTO!!* 😨`, userdb, q)
}
}, 2 * 60 * 1000)
game.timeout = setTimeout(async () => {
if (intentos !== 0) {
await conn.sendWritingText( m.chat, `*@${game.user.split("@")[0]} EL TIEMPO SE HA ACABADO!!* 😧\n\n*LA PALABRA _"${game.palabra}"_ SE ENCONTRABA EN LA DIRECCIÓN _${game.direccion}_ DE LA FILA _${fila}_ Y COLUMNA _${game.columna}_*`, userdb, q)
delete response[m.chat]
}
}, 3 * 60 * 1000)
}
}
handler.before = async (m, { conn, usedPrefix, command, usersdb, userdb, senderJid }) => {
const game = response[m.chat]
if (!game) return 

let { user, palabra, fila, columna, direccion, q, intentos, sopaText } = game
console.log('sopa: ', game.intentos, intentos, m.sender)
if (m.sender !== user) return
if (m.fromMe) return
let jugada = m.text.replace(new RegExp(`^${usedPrefix}${command}\\s*`, 'i'), '').trim()
if (!/^\d+$/.test(jugada)) return 
let diamante = palabra.length <= 4 ? 4 : palabra.length <= 8 ? 8 : palabra.length <= 11 ? 24 : 32
if (`${fila}${columna}` === jugada) {
clearTimeout(game.timeout)
clearTimeout(game.warning)
delete response[m.chat]


usersdb[m.sender].limit += diamante
const {rpgshop} = await import('../rpg.js')
await conn.sendWritingText(m.chat, `\`\`\`🎊 HAS GANADO ${diamante} ${rpgshop.emoticon('limit')}!!\`\`\`\n\n*CORRECTO!! LA PALABRA _"${palabra}"_ SE ENCONTRABA EN LA DIRECCIÓN _${direccion}_ DE LA FILA _${fila}_ Y COLUMNA _${columna}_*`, userdb, q)
} else {
game.intentos -= 1
if (game.intentos <= 0) {
clearTimeout(game.timeout)
clearTimeout(game.warning)
delete response[m.chat]

await conn.sendWritingText(m.chat, `🫡 *AGOTASTE LOS INTENTOS!! LA PALABRA _"sopaPalabra"_ SE ENCONTRABA EN LA DIRECCIÓN _${direccion}_ DE LA FILA _${fila}_ Y COLUMNA _${columna}_*`, userdb, q)
} else {
await conn.sendWritingText(m.chat, `😮‍💨 *INCORRECTO. TE QUEDAN _${game.intentos}_ INTENTOS!!*${game.intentos === 1 ? '' : `\n*PALABRA A ENCONTRAR:* \`\`\`${palabra}\`\`\``}\n\n${intentos === 1 ? `\`\`\`💡 PISTA!!\`\`\`\n*LA PALABRA _${palabra}_ SE ENCUENTRA EN LA DIRECCIÓN _"${direccion}"_*\n\n` : ''}`, userdb, game.q)
}
}

}
handler.command = /^(buscarpalabra|sopa|soup|wordsearch|wordfind|spdeletras|spletras|sppalabras|spalabras|spdepalabras)$/i
handler.group = true
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "🔠 SOPA DE LETRAS", description: `juega a la sopa de letras, encuentra la palabra oculta en la sopa de letras, usa el comando para jugar, si no encuentras la palabra se cancelará automáticamente en 2 minutos`, id: `sopa`}
];
handler.type = "juegos";
handler.disabled = false;

export default handler

