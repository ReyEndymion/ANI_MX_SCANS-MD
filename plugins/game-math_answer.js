global.math = global.math ? global.math : {}
let handler = async (m, { conn }) => {
let id = m.chat
if (!m.quoted) return
if (m.quoted.sender != conn.user.jid) return
if (!/^CUANTO ES EL RESULTADO DE/i.test(m.quoted.text)) return
if (!(m.chat in global.math)) return conn.sendButton(m.chat, '*[❗INFO❗] YA SE AH RESPONDIDO A ESA PREGUNTA*', author, null, [['VOLVER A JUGAR', '/mates']], m)
if (m.quoted.id == global.math[id][0].id) {
let math = global.math[id][1]
if (m.text == math.result) {
conn.sendButton(m.chat, `*RESPUES CORRECTA!!*\n*HAZ GANADO: ${math.bonus} XP*`, author, null, [['VOLVER A JUGAR', `/math ${math.mode}`]], m)
global.db.data.users[m.sender].exp += math.bonus
clearTimeout(global.math[id][3])
delete global.math[id]
} else {
if (--global.math[id][2] == 0) {
conn.sendButton(m.chat, `*SE ACABARON TUS OPORTUNIDADES*\n*LA RESPUESTA ES: ${math.result}*`, author, null, [['VOLVER A JUGAR', `/math ${math.mode}`]], m)
clearTimeout(global.math[id][3])
delete global.math[id]
} else conn.reply(m.chat, `*RESPUESTA INCORRECTA!!*\n*AUN DISPONIBLES ${global.math[id][2]} _oportunidades_*`, m)
}}}
handler.customPrefix = /^-?[0-9]+(\.[0-9]+)?$/
handler.command = new RegExp
export default handler
