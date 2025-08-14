let handler = async (m, {text, conn, usedPrefix, command, db, userdb, senderJid}) => {
let why = `*[❗] USO ERRONEO, EJEMPLO:*\n*—◉ ${usedPrefix + command} @${senderJid.split("@")[0]}*`
let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
if (!who) {

conn.sendWritingText(m.chat, why, userdb, m)
}
let res = [];
switch (command) {
case "blok": case "block":
if (who) {
await conn.updateBlockStatus(who, "block").then(() => { res.push(who); })
} else {

conn.sendWritingText(m.chat, why, userdb, m)
}
break
case "unblok": case "unblock":
if (who) {
await conn.updateBlockStatus(who, "unblock").then(() => { res.push(who); })
} else {

conn.sendWritingText(m.chat, why, userdb, m)
}
break
}
if (res[0]) {
let resp = `*[❗] SE USO CON EXITO EL COMANDO ${command} PARA EL COMANDO/A ${res ? `${res.map(v => '@' + v.split("@")[0])}` : ''}*`

conn.sendWritingText(m.chat, resp, userdb, m)
}
}
handler.help = ["block", "unblock"]
handler.tags = ["owner"]
handler.command = /^(block|unblock)$/i
handler.rowner = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
