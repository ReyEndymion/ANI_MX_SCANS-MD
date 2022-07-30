global.math = global.math ? global.math : {}
let handler  = async (m, { conn, args, usedPrefix, command }) => {
let mat =`
*[❗INFO❗] INGRESE LA DIFICULTADO CON LA QUE DESEA JUGAR*

*DIFICULTADES DISPONIBLES: ${Object.keys(modes).join(' | ')}*
*EJEMPLO DE USO: ${usedPrefix}mates medium*
`.trim()
if (args.length < 1) return conn.sendHydrated(m.chat, mat, author, null, null, null, null, null, [
['MATES EASY', `${usedPrefix + command} easy`], 
['MATES MEDIUM', `${usedPrefix + command} medium`], 
['MATES HARD', `${usedPrefix + command} hard`]], m)
let mode = args[0].toLowerCase()
if (!(mode in modes)) return conn.sendHydrated(m.chat, mat, author, null, null, null, null, null, [
['MATES EASY', `${usedPrefix + command} easy`], 
['MATES MEDIUM', `${usedPrefix + command} medium`], 
['MATES HARD', `${usedPrefix + command} hard`]], m)
let id = m.chat
if (id in global.math) return conn.reply(m.chat, '*[❗INFO❗] TODAVIA HAY PREGUNTAS SIN RESPONDER EN ESTE CHAT!*', global.math[id][0])
let math = genMath(mode)
global.math[id] = [
await conn.reply(m.chat, `CUANTO ES EL RESULTADO DE *${math.str}*?\n\n*⏳ TIEMPO: ${(math.time / 1000).toFixed(2)} _segundos_*\n*🏆 GANA HASTA: ${math.bonus} XP*`, m),
math, 4,
setTimeout(() => { 
if (global.math[id]) conn.sendButton(m.chat, `*[❗INFO❗] SE HA FINALIZADO EL TIEMPO PARA RESPONDER*\n\n*LA RESPUESTA ES ${math.result}*`, author, null, [['VOLVER A INTENTAR', `${usedPrefix + command} ${math.mode}`]], global.math[id][0])
delete global.math[id]
}, math.time)
]}
handler.help = ['math <mode>']
handler.tags = ['game']
handler.command = /^math|mates|matemáticas/i
export default handler

let modes = {
noob: [-3, 3,-3, 3, '+-', 15000, 10],
easy: [-10, 10, -10, 10, '*/+-', 20000, 40],
medium: [-40, 40, -20, 20, '*/+-', 40000, 150],
hard: [-100, 100, -70, 70, '*/+-', 60000, 350],
extreme: [-999999, 999999, -999999, 999999, '*/', 99999, 9999],
impossible: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 35000],
impossible2: [-999999999999999, 999999999999999, -999, 999, '/', 30000, 5000]
} 

let operators = {
'+': '+',
'-': '-',
'*': '×',
'/': '÷'
}

function genMath(mode) {
let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
let a = randomInt(a1, a2)
let b = randomInt(b1, b2)
let op = pickRandom([...ops])
let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
if (op == '/') [a, result] = [result, a]
return {
str: `${a} ${operators[op]} ${b}`,
mode,
time,
bonus,
result
}}

function randomInt(from, to) {
if (from > to) [from, to] = [to, from]
from = Math.floor(from)
to = Math.floor(to)
return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
