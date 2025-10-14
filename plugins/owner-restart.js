import { exec } from 'child_process'
let handler = async (m, {conn, args, isROwner, command, db, userdb, senderJid}) => {
const {getBot} = await import('../lib/functions.js')
if (!process.send) return conn.sendWritingText(m.chat, `Dont: node main.js\nDo: node index.js`, userdb, m)
let resp = '``Reiniciando el Bot. . .``'
await conn.sendWritingText(m.chat, resp, userdb, m)
return process.send(`reset`)
}
handler.help = ['restart']
handler.tags = ['owner']
handler.command = /^((full)?(rest(art)?|startbot)$)/i
handler.owner = true

handler.menu = [
{ title: "🔄 REINICIAR BOT", description: "Reiniciar el bot o un bot especifico", id: `restart` },
];
handler.type = "owners";
handler.disabled = false;

export default handler
