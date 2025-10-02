let handler= async (m, {conn, db, userdb, senderJid}) => {
const {info} = await import('../config.js')
const {verdad} = await import('../lib/constants.js')
const {pickRandom} = await import('../lib/functions.js')
let resp = `*┌────「 VERDAD 」─*\n*“${pickRandom(verdad)}”*\n*└「 ${info.nanipe} 」─*` 
return conn.sendWritingText(m.chat, resp, userdb, m);
}
handler.help = ['verdad']
handler.tags = ['fun']
handler.command = /^verdad/i
handler.menu = [
{title: "🎖️ VERDAD", description: "juego de la Verdad, usa #verdad para jugar", id: `verdad`}
];
handler.type = "fun";
handler.disabled = false;

export default handler

