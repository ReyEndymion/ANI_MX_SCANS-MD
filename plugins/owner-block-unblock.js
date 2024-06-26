let handler = async (m, { text, conn, usedPrefix, command }) => {
let why = `*[❗] USO ERRONEO, EJEMPLO:*\n*—◉ ${usedPrefix + command} @${m.sender.split("@")[0]}*`
let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
let resp
if (!who) {
resp = why
}
let res = [];
switch (command) {
case "blok": case "block":
if (who) {
    await conn.updateBlockStatus(who, "block").then(() => { res.push(who); })
} else {
resp = why
}
break
case "unblok": case "unblock":
if (who) {
    await conn.updateBlockStatus(who, "unblock").then(() => { res.push(who); })
} else {
resp = why
}
break
}
if (res[0]) {
    resp = `*[❗] SE USO CON EXITO EL COMANDO ${command} PARA EL/LA USUARIO/A ${res ? `${res.map(v => '@' + v.split("@")[0])}` : ''}*`
}
    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
      
    await conn.sendPresenceUpdate('composing' , m.chat);
    }
    }
    conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
handler.help = ["block", "unblock"]
handler.tags = ["owner"]
handler.command = /^(block|unblock)$/i
handler.rowner = true
export default handler
