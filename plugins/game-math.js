let math = {};
let handler = async (m, {conn, info, start, args, usedPrefix, command, db, userdb, senderJid}) => {
const { genMath } = await import('../lib/functions.js')
const {  modesMath  } = await import('../lib/constants.js');
const {userID} = await import('../config.js')
const buff = info.nanipe
let resp =  `*[❗INFO❗] INGRESE LA DIFICULTAD CON LA QUE DESEA JUGAR*\n\n*DIFICULTADES DISPONIBLES: ${Object.keys(modesMath).join(' | ')}*\n\n*EJEMPLO DE USO: ${usedPrefix}mates medium*\n\nMates disponibles:\n- Mates Easy: ${usedPrefix + command} easy\n- Mates Medium: ${usedPrefix + command} medium\n- Mates Hard: ${usedPrefix + command} hard`.trim();
if (args.length < 1 || !(args[0].toLowerCase() in modesMath)) {
const buttons = [
['MATES NOOB', `${usedPrefix + command} noob`], 
['MATES EASY', `${usedPrefix + command} easy`], 
['MATES MEDIUM', `${usedPrefix + command} medium`], 
['MATES HARD', `${usedPrefix + command} hard`], 
['MATES EXTREME', `${usedPrefix + command} extreme`], 
['MATES IMPOSSIBLE', `${usedPrefix + command} impossible`], 
['MATES IMPOSSIBLE2', `${usedPrefix + command} impossible2`]
]
if (start.buttons) {
const messageObj = {
text: resp,
footer: buff
}
return conn.sendButton( m.chat, messageObj, {}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+'\n'+buff, userdb, m);
}
}
let mode = args[0].toLowerCase()
let id = m.chat
if (id in math) {
let resp =  '*[❗INFO❗] TODAVÍA HAY PREGUNTAS SIN RESPONDER EN ESTE CHAT!*';
return conn.sendWritingText(m.chat, resp, userdb, m)
}
let getMathMode = await genMath(mode)
let question =  `CUANTO ES EL RESULTADO DE *${getMathMode.str}*?\n\n*⏳ TIEMPO: ${(getMathMode.time / 1000).toFixed(2)} _segundos_*\n*🏆 GANA HASTA: ${getMathMode.bonus} XP*`.trim()
let q = await conn.sendWritingText(m.chat, question, userdb, m)
math[id] = [
q,
getMathMode,
4,
setTimeout(async () => {
if (math[id]) {
let resp =  `*[❗INFO❗] SE HA FINALIZADO EL TIEMPO PARA RESPONDER*\n\n*LA RESPUESTA ES ${getMathMode.result}*`;
const buttons = [['VOLVER A INTENTAR', `${usedPrefix + command} ${math.mode}`]]
if (start.buttons) {
const messageObj = {
text: resp,
footer: buff
}
await conn.sendButton( m.chat, messageObj, {}, buttons, userdb, math[id][0])
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
await conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+'\n'+buff, userdb, math[id][0]);
}
delete math[id];
}
}, getMathMode.time)
];
math.usedPrefix = usedPrefix
};
handler.before = async (m, {conn, info, start, userdb, db, senderJid}) => {
const {userID} = await import('../config.js')
const buff = info.nanipe
let id = m.chat
if (!m.quoted) return
if (m.quoted.sender != conn.user.jid) return
if (!/^CUANTO ES EL RESULTADO DE/i.test(m.quoted.text) && !m.fromMe) return
if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return
if (!(m.chat in math)) {
let resp =  `*[❗INFO❗] YA SE HA RESPONDIDO A ESA PREGUNTA*\n\n`
const buttons = [['VOLVER A JUGAR', `${math.usedPrefix}mates`]]
if (start.buttons) {
const messageObj = {
text: resp,
footer: buff
}
return conn.sendButton( m.chat, messageObj, {}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+'\n'+buff, userdb, m);
}
}
if (m.quoted?.id && math[id]?.[0]?.id == m.quoted.id) {
let getMathMode = math[id][1]
if (m.text == getMathMode.result) {
let resp =  `*RESPUESTA CORRECTA!!*\n*HAZ GANADO: ${getMathMode.bonus} XP*\n\n`
userdb.exp += getMathMode.bonus
const buttons = [['VOLVER A JUGAR', `${math.usedPrefix}math ${getMathMode.mode}`]]
if (start.buttons) {
const messageObj = {
text: resp,
footer: buff
}
await conn.sendButton( m.chat, messageObj, {}, buttons, userdb, math[id][0])
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
await conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+'\n'+buff, userdb, math[id][0]);
}
clearTimeout(math[id][3])
delete math[id]
} else {
if (--math[id][2] == 0) {
let resp =  `*SE ACABARON TUS OPORTUNIDADES*\n*LA RESPUESTA ES: ${getMathMode.result}*`
const buttons = [['VOLVER A JUGAR', `${math.usedPrefix}math ${getMathMode.mode}`]]
if (start.buttons) {
const messageObj = {
text: resp,
footer: buff
}
await conn.sendButton( m.chat, messageObj, {}, buttons, userdb, math[id][0])
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
await conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+'\n'+buff, userdb, math[id][0]);
}
clearTimeout(math[id][3])
delete math[id]
} else {
let resp =  `*RESPUESTA INCORRECTA!!*\n*AUN DISPONIBLES ${math[id][2]} _oportunidades_*`
return conn.sendWritingText(m.chat, resp, userdb, m)}
}
}
if (false) {
if (start.buttons) {
return conn.sendButton( m.chat, resp, dataMsg.buff, dataMsg.buttons, fkontak, m)
} else {
const cmds = dataMsg.buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+'\n'+dataMsg.buff, m );
}
} else {
}
}

handler.help = ['math <mode>'];
handler.tags = ['game'];
handler.command = /^math|mates|matemáticas/i;
handler.menu = [
{title: "🎖️ MATES", description: "Responde a la pregunta de mates", id: `math`}
];
handler.type = "juegos";
handler.disabled = false;

export default handler;
