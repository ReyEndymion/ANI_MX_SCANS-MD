let handler = async (m, {conn, text, command, db, usersdb, userdb, senderJid, objs}) => {
//if (!m.isGroup) return
let who
let resp = ''
if (m.isGroup) {who = (m.mentionedJid[0] || m.quoted.sender)} else {who = m.chat}
if (!who && !text && !m.quoted?.sender) {
resp = '*[❗INFO❗] INGRESA EL @tag DE ALGUN USUARIO*'
return conn.sendWritingText(m.chat, resp, userdb, m)
} else {
try {
if (/^banuser$/i.test(command)) {
usersdb[who].banned = true
resp = `*[❗INFO❗] EL USUARIO FUE BANEADO CON ÉXITO*\n*—◉ EL USUARIO YA NO PODRÁ USAR EL BOT HASTA QUE SEA DESBANEADO*`
} else if (/^unbanuser$/i.test(command)) {
usersdb[who].banned = false
usersdb[who].bannedMessageCount = 0
resp = `*[❗INFO❗] EL USUARIO FUE DESBANEADO CON ÉXITO*\n*—◉ EL USUARIO YA PUEDE USAR EL BOT*`
}
console.log('(ban/unban)user: ', m.quoted?.sender, who,  !who, userdb.banned)
return conn.sendWritingText(m.chat, resp, userdb, m)
} catch (error) {
resp = `${error}`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
}
handler.help = ['unbanuser']
handler.tags = ['owner']
handler.command = /^(un)?banuser$/i
handler.rowner = true
handler.menu = [
{title: "👑 BANUSER", description: "#banuser <@tag> ", id: `banuser`}, 
{title: "👑 UNBANUSER", description: "#unbanuser <@tag> ", id: `unbanuser`}, 
];
handler.type = "owners";

handler.disabled = false;

export default handler
