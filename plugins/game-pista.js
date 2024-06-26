/* Created by https://github.com/unptoadrih15 */

let handler = async (m, { conn }) => {
conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {}
let id = m.chat
if (!(id in conn.tebaklagu)) throw false
let json = conn.tebaklagu[id][1]
let nya = json.jawaban
let nyanya = nya.replace(/[bcdfghjklmnñpqrstvwxyzBCDEFGHJKLMNÑPQRSTVWXYZ]/g, '_')
if (!json.jawaban) {
    let resp = `La pista no existe`
    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 1));
    txt += c;
    count++;
    if (count % 10 === 0) {
    await conn.sendPresenceUpdate('composing' , m.chat);
    }
    }

conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
throw new Error('La propiedad jawaban no existe en este objeto')
}
let resp = '' + nyanya + ''
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 1));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}

return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
handler.command = /^insinuar|^hint|pista$/i
export default handler
