import similarity from 'similarity'
const threshold = 0.72
let handler = m => m
handler.before = async function (m, {conn}) {
let id = m.chat
if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0
this.tekateki = this.tekateki ? this.tekateki : {}
if (!(id in this.tekateki)){ 
    let resp = 'Ese acertijo ya ha terminado!'
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
       return await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
    }
if (m.quoted.id == this.tekateki[id][0].id) {
let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
let userResponse = m.text.toLowerCase();

if (userResponse.includes(json.response.toLowerCase().trim())) {
global.db.data.users[m.sender].exp += this.tekateki[id][2]
let resp = `*Respuesta correcta!*\n+${this.tekateki[id][2]} Exp`
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

clearTimeout(this.tekateki[id][3])
delete this.tekateki[id]
} else if (similarity(userResponse, json.response.toLowerCase().trim()) >= threshold) {
    let resp = `Casi lo logras!`
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
} else {
    let resp = 'Respuesta incorrecta!'
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
return !0
}
handler.exp = 0
export default handler
