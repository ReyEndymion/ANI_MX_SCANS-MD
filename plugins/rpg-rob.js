let ro = 3000
let handler = async (m, {conn, info, isPrems, usedPrefix, command, usersdb, userdb, senderJid}) => {
const {pickRandom, msToTime} = await import('../lib/functions.js')
const {crimen} = await import('../lib/constants.js')
if (!m.isGroup) return 
let time = usersdb[senderJid].lastrob + 7200000
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
else who = m.chat

let user = usersdb[who]
let rob = Math.floor(Math.random() * ro)
userdb.exp += rob
if (new Date - userdb.lastrob < 7200000) {
let resp =`*⏱️¡Hey! Espera ${msToTime(time - new Date())} para volver a robar*`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
if (!who) {
let resp =`${pickRandom(crimen)} *${rob} XP*`
usersdb[senderJid].lastrob = new Date * 1
return conn.sendWritingText(m.chat, resp, userdb, m)
} else if (!(who in usersdb)) {
let resp = `*[❗] El usuario no se encuentra en mi base de datos.*`
return conn.sendWritingText(m.chat, resp, userdb, m)
} else if (user.exp < rob) {
let resp = `😔 @${who.split`@`[0]} tiene menos de *${ro} xp*\nNo robes a un pobre v":`
return conn.sendWritingText(m.chat, resp, userdb, m)
} else {
if (who.includes(conn.user.jid)) return conn.sendWritingText(m.chat, `Yo soy el Bot, a mi no me puedes Robar nada`)
usersdb[who].exp -= rob 
let resp = `*‣ Robaste ${rob} XP a @${who.split`@`[0]}*`
usersdb[senderJid].lastrob = new Date * 1
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
handler.help = ['robar']
handler.tags = ['xp']
handler.command = ['robar', 'crimen', 'rob', 'asaltar']
handler.fail = null
handler.exp = 0
handler.menu = [
{title: "💰 ROBAR", description: `Robar XP a un usuario, usa el comando #robar @usuario`, id: `robar`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler
