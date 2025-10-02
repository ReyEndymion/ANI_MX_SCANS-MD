let handler = async (m, {conn, args, info, command, participants, groupsdb, usersdb: users, userdb, senderJid}) => {
if (!m.isGroup) return !1
const {sort, toNumber, enumGetKey} = await import('../lib/functions.js')
if (/^(l(eader)?b(oard)?)$/i.test(command)) {
let usersData = Object.entries(users).map(([key, value]) => {
return {...value, jid: key}})
let sortedExp = usersData.map(toNumber('exp')).sort(sort('exp'))
let sortedLim = usersData.map(toNumber('limit')).sort(sort('limit'))
let sortedLevel = usersData.map(toNumber('level')).sort(sort('level'))
let usersExp = sortedExp.map(enumGetKey)
let usersLim = sortedLim.map(enumGetKey)
let usersLevel = sortedLevel.map(enumGetKey)
let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 5)) : Math.min(5, sortedExp.length)
let resp = `
*< TABLA DE CLASIFICACION >*

▢ *TOP ${len} XP* •
Tú : *${usersExp.indexOf(senderJid) + 1}* de *${usersExp.length}*

${sortedExp.slice(0, len).map(({ jid, exp }, i) => `${i + 1}. @${jid.split`@`[0]} *${exp} Exp*`).join`\n`}

▢ *TOP ${len} DIAMANTES💎* •
Tú : *${usersLim.indexOf(senderJid) + 1}* de *${usersLim.length}*

${sortedLim.slice(0, len).map(({ jid, limit }, i) => `${i + 1}. @${jid.split`@`[0]} *${limit} Diamantes*`).join`\n`}

▢ *TOP ${len} NIVEL* • 
Tú : *${usersLevel.indexOf(senderJid) + 1}* de *${usersLevel.length}*

${sortedLevel.slice(0, len).map(({ jid, level }, i) => `${i + 1}. @${jid.split`@`[0]} *Nivel ${level}*`).join`\n`}

_Diseño By FG, naturalizacion by ${author}_\n> ${info.nanipe}`.trim()
return conn.sendWritingText(m.chat, resp, userdb, m);
}
if (/^(l(eader)?b(oard)?)(gral)$/i.test(command)) {
let allUsers = []

for (const group of Object.values(groupsdb)) {
if (!group.users) continue
let usersArray = Object.entries(group.users).map(([jid, data]) => ({ jid, ...data }))
allUsers.push(...usersArray)
}

let sortedExp = allUsers.sort((a, b) => b.exp - a.exp)
let sortedLim = [...allUsers].sort((a, b) => b.limit - a.limit)
let sortedLevel = [...allUsers].sort((a, b) => b.level - a.level)

let usersExp = sortedExp.map(u => u.jid)
let usersLim = sortedLim.map(u => u.jid)
let usersLevel = sortedLevel.map(u => u.jid)

let len = args[0] && args[0].length > 0
? Math.min(100, Math.max(parseInt(args[0]), 5))
: Math.min(5, sortedExp.length)

let resp = `
*< TABLA DE CLASIFICACION GENERAL >*

▢ *TOP ${len} XP* •
Tú : *${usersExp.indexOf(senderJid) + 1}* de *${usersExp.length}*

${sortedExp.slice(0, len).map(({ jid, exp }, i) => 
`${i + 1}. @${jid.split`@`[0]} *${exp} Exp*`).join`\n`}

▢ *TOP ${len} DIAMANTES💎* •
Tú : *${usersLim.indexOf(senderJid) + 1}* de *${usersLim.length}*

${sortedLim.slice(0, len).map(({ jid, limit }, i) => 
`${i + 1}. @${jid.split`@`[0]} *${limit} Diamantes*`).join`\n`}

▢ *TOP ${len} NIVEL* • 
Tú : *${usersLevel.indexOf(senderJid) + 1}* de *${usersLevel.length}*

${sortedLevel.slice(0, len).map(({ jid, level }, i) => 
`${i + 1}. @${jid.split`@`[0]} *Nivel ${level}*`).join`\n`}

_Diseño By FG, naturalizacion by ${author}_\n> ${info.nanipe}`.trim()
return conn.sendWritingText(m.chat, resp, userdb, m);
}
}
handler.help = ['top']
handler.tags = ['xp']
handler.command = /^(l(eader)?b(oard)?)(gral)?$/i
handler.group = true
handler.fail = null
handler.exp = 0

handler.menu = [
{title: "🏆 LEADERBOARD", description: `Consulta el ranking de XP, Diamantes y Nivel, usa el comando #leaderboard`, id: `leaderboard`},
{title: "🏆 LEADERBOARD GRAL", description: `Consulta el ranking de XP, Diamantes y Nivel de todos los grupos, usa el comando #leaderboardgral`, id: `leaderboardgral`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler

