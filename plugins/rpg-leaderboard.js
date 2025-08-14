let handler = async (m, {conn, args, participants, db, usersdb: users, userdb, senderJid}) => {
if (!m.isGroup) return !1
const {sort, toNumber, enumGetKey} = await import('../lib/functions.js')
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

_Diseño By FG, naturalizacion by ${author}_`.trim()
return conn.sendWritingText(m.chat, resp, userdb, m);
}
handler.help = ['top']
handler.tags = ['xp']
handler.command = ['leaderboard', 'lb']
handler.group = true
handler.fail = null
handler.exp = 0

handler.menu = [
{title: "🏆 LEADERBOARD", description: `Consulta el ranking de XP, Diamantes y Nivel, usa el comando #leaderboard`, id: `leaderboard`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler

