global.math = global.math ? global.math : {}
let handler = async (m, { conn }) => {
    let usedPrefix = '/'
let id = m.chat
if (!m.quoted) return
if (m.quoted.sender != conn.user.jid) return
if (!/^CUANTO ES EL RESULTADO DE/i.test(m.quoted.text)) return
if (!(m.chat in global.math)) {
let resp = `*[❗INFO❗] YA SE AH RESPONDIDO A ESA PREGUNTA*\n\n[['VOLVER A JUGAR', '${usedPrefix}mates']]'`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
if (m.quoted?.id && global.math[id]?.[0]?.id == m.quoted.id) {
let math = global.math[id][1]
if (m.text == math.result) {
let resp = `*RESPUESTA CORRECTA!!*\n*HAZ GANADO: ${math.bonus} XP*\n\nVOLVER A JUGAR', ${usedPrefix}math ${math.mode}`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
global.db.data.users[m.sender].exp += math.bonus
clearTimeout(global.math[id][3])
delete global.math[id]
} else {
if (--global.math[id][2] == 0) {
let resp = `*SE ACABARON TUS OPORTUNIDADES*\n*LA RESPUESTA ES: ${math.result}*VOLVER A JUGAR', ${usedPrefix}math ${math.mode}`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
clearTimeout(global.math[id][3])
delete global.math[id]
} else {
let resp = `*RESPUESTA INCORRECTA!!*\n*AUN DISPONIBLES ${global.math[id][2]} _oportunidades_*`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
}
}
}
handler.customPrefix = /^-?[0-9]+(\.[0-9]+)?$/
handler.command = new RegExp
export default handler
/*
global.math = global.math ? global.math : {}
let handler = async (m, { conn }) => {
let id = m.chat
if (!m.quoted) return
if (m.quoted.sender != conn.user.jid) return
if (!/^CUANTO ES EL RESULTADO DE/i.test(m.quoted.text)) return
if (!(m.chat in global.math)) return conn.sendMessage(m.chat, { text: '*[❗INFO❗] YA SE AH RESPONDIDO A ESA PREGUNTA*', wm, null, [['VOLVER A JUGAR', '/mates']], m)
if (m.quoted.id == global.math[id][0].id) {
let math = global.math[id][1]
if (m.text == math.result) {
conn.sendButton(m.chat, `*RESPUESTA CORRECTA!!*\n*HAZ GANADO: ${math.bonus} XP*`, wm, null, [['VOLVER A JUGAR', `/math ${math.mode}`]], m)
global.db.data.users[m.sender].exp += math.bonus
clearTimeout(global.math[id][3])
delete global.math[id]
} else {
if (--global.math[id][2] == 0) {
conn.sendButton(m.chat, `*SE ACABARON TUS OPORTUNIDADES*\n*LA RESPUESTA ES: ${math.result}*`, wm, null, [['VOLVER A JUGAR', `/math ${math.mode}`]], m)
clearTimeout(global.math[id][3])
delete global.math[id]
} else conn.reply(m.chat, `*RESPUESTA INCORRECTA!!*\n*AUN DISPONIBLES ${global.math[id][2]} _oportunidades_*`, m)
}}}
handler.customPrefix = /^-?[0-9]+(\.[0-9]+)?$/
handler.command = new RegExp
export default handler
*/