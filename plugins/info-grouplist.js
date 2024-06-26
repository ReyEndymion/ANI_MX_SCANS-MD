let handler = async (m, { conn }) => {
let group
for (let [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) {
group += `\n—◉ ${await conn.getName(jid)}\n➤ ${jid} [${chat?.metadata?.read_only ? 'NO PARTICIPANTE' : 'PARTICIPANTE'}]\n\n`
console.log('listaGrupos: ', conn.chats[jid].participants['admin'])
}
let resp = `*LISTA DE GRUPOS EN LOS QUE ESTA EL BOT:*\n\n
${group}`
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 1));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}

return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
handler.help = ['groups', 'grouplist']
handler.tags = ['info']
handler.command = /^(groups|grouplist|listadegrupo|gruposlista|listagrupos)$/i
export default handler
