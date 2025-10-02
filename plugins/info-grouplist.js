let handler = async (m, {conn, db, userdb, objs, senderJid, participantFind, isLidGroup}) => {
const {dbGroups} = objs
await dbGroups.read()
let txt = ''
let i = 0
const groupsChats = Object.entries(dbGroups.data)
for (let [jid, chat] of groupsChats) {
const groupLid = chat.addressingMode === 'lid'
i++
txt += `\n${i}. —◉ ${chat.subject || await conn.getName(jid)}\n➤ @${jid}\n${chat?.participants.find(p => groupLid ? p.phoneNumber === conn.user.jid && p.admin === 'admin' : p.id === conn.user.jid && p.admin === 'admin') ? 'El Bot es *ADMINISTRADOR*' : 'El Bot es *PARTICIPANTE*'} ${chat.isCommunity ? 'EN COMUNIDAD' : `parte de *${chat.participants.length} PARTICIPANTES*`}\n`
}
const contextInfo = {
groupMentions: await conn.parseGroupMention(txt)
}
return conn.sendWritingTextCI(m.chat, `*LISTA DE GRUPOS EN LOS QUE ESTA EL BOT: ${groupsChats.length}*\n${txt}\n`.trim(), contextInfo, userdb, m)
}
handler.help = ['groups', 'grouplist']
handler.tags = ['info']
handler.command = /^(groups|grouplist|listadegrupo|gruposlista|listagrupos)$/i
handler.menu = [
{title:"💎 GRUPOS", description: "muestra la lista de grupos en los que está el bot usando #grouplist", id: `grouplist`}
];
handler.type = "info";
handler.disabled = false;

export default handler
