async function handler(m, {conn, args, userdb, objs}) {
const fs = await import('fs')
const path = await import('path')
const {pathBotDBs} = objs

const {configDinamics} = await import('../lib/database.js')
fs.writeFileSync(path.join(pathBotDBs, 'chats.json'), JSON.stringify(conn.chats, null, 2))

}
handler.command = /^connchats/
handler.rowner = true
//handler.private = true
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler