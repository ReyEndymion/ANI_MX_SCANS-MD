let handler = async (m, { text, conn, usedPrefix, command }) => {
let why = `*[❗] USO ERRONEO, EJEMPLO:*\n*—◉ ${usedPrefix + command} @${m.sender.split("@")[0]}*`
let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
if (!who) {
    let txt = '';
    let count = 0;
    for (const c of why) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
    }
    conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
let res = [];
switch (command) {
case "blok": case "block":
if (who) {
    await conn.updateBlockStatus(who, "block").then(() => { res.push(who); })
} else {
    let txt = '';
    let count = 0;
    for (const c of why) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
    }
    conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
break
case "unblok": case "unblock":
if (who) {
    await conn.updateBlockStatus(who, "unblock").then(() => { res.push(who); })
} else {
    let txt = '';
    let count = 0;
    for (const c of why) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
    }
    conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
break
}
if (res[0]) {
    let resp = `*[❗] SE USO CON EXITO EL COMANDO ${command} PARA EL COMANDO/𝙰 ${res ? `${res.map(v => '@' + v.split("@")[0])}` : ''}*`
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
    conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
}
handler.help = ["block", "unblock"]
handler.tags = ["owner"]
handler.command = /^(block|unblock)$/i
handler.rowner = true
export default handler
