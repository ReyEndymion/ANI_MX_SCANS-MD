let handler= async (m, {conn, db, userdb, senderJid}) => {
const {info} = await import('../config.js')
const {bucin} = await import('../lib/constants.js')
const {pickRandom} = await import('../lib/functions.js')
let resp = `*┌────「 RETO 」─*\n*“${pickRandom(bucin)}”*\n*└「 ${info.nanipe} 」─*`
await conn.sendWritingText(m.chat, resp, userdb, m);
}
handler.help = ['reto']
handler.tags = ['fun']
handler.command = /^reto/i
handler.menu = [
{title: "🎖️ RETO", description: "usa #reto", id: `reto`},
];
handler.type = "fun";
handler.disabled = false;

export default handler
