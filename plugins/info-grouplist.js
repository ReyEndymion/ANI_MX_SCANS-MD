let handler = async (m, { conn }) => {
let txt = ''
const groupsChats = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)
for (let [jid, chat] of groupsChats) {
console.log('chats: ', chat.metadata.participants.find(jid => jid.id === conn.user.jid && jid.admin === 'admin'))
//
txt += `\n—◉ ${await conn.getName(jid)}\n➤ ${jid} [${chat?.metadata?.participants.find(jid => jid.id === conn.user.jid && jid.admin === 'admin') ? 'El Bot participa como: ADMINISTRADOR' : 'El Bot esta como: PARTICIPANTE'}]\n\n`
return conn.sendWritingText(m.chat, `*LISTA DE GRUPOS EN LOS QUE ESTA EL BOT:*\n${txt}\n`.trim(), m)
}
}
handler.help = ['groups', 'grouplist']
handler.tags = ['info']
handler.command = /^(groups|grouplist|listadegrupo|gruposlista|listagrupos)$/i
export default handler
