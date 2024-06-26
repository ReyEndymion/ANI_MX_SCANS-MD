import similarity from 'similarity'
const threshold = 0.72
let handler = {
async before(m, conn) {
let id = m.chat
if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/ADIVINA EL TITULO DE LA CANCION/i.test(m.quoted.text)) return !0
this.tebaklagu = this.tebaklagu ? this.tebaklagu : {}
if (!(id in this.tebaklagu)) {
let resp = 'El juego ha terminado'
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
if (m.quoted.id == this.tebaklagu[id][0].id) {
let json = JSON.parse(JSON.stringify(this.tebaklagu[id][1]))
if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].exp += this.tebaklagu[id][2]
{
    let resp = `✅Correcto!\n+${this.tebaklagu[id][2]} XP`
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

    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
clearTimeout(this.tebaklagu[id][3])
delete this.tebaklagu[id]
} else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
    let resp = `Casii!`
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
} else {
    let resp = `❌Incorrecto!`
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
}
return !0
},
exp: 0
}
export default handler
