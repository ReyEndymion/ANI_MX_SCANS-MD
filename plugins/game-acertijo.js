import fs from 'fs'
let timeout = 60000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
conn.tekateki = conn.tekateki ? conn.tekateki : {}
let id = m.chat
if (id in conn.tekateki) {
let resp = `Todavía hay acertijos sin responder en este chat`
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
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: conn.tekateki[id][0], ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

throw false
}
let tekateki = JSON.parse(fs.readFileSync(`./src/game/acertijo.json`))
let json = tekateki[Math.floor(Math.random() * tekateki.length)]
let _clue = json.response
let clue = _clue.replace(/[A-Za-z]/g, '_')
let caption = `
ⷮ *${json.question}*
*• Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*• Bono:* +${poin} Exp
`.trim()
let txt = '';
let count = 0;
for (const c of caption) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
conn.tekateki[id] = [
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} ), json, 
poin,
setTimeout(async () => {
if (conn.tekateki[id]) {
let resp = `Se acabó el tiempo!\n*Respuesta:* ${json.response}`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: conn.tekateki[id][0], ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
delete conn.tekateki[id]
}, timeout)]}
handler.help = ['acertijo']
handler.tags = ['game']
handler.command = /^(acertijo|acert|pregunta|adivinanza|tekateki)$/i
export default handler
