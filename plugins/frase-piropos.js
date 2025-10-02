/* By https://github.com/DIEGO-OFC/DORRAT-BOT-MD */

let handler = async (m, {conn, text, db, userdb, senderJid}) => {
const {piropo} = await import('../lib/constants.js')
const {pickRandom} = await import('../lib/functions.js')
return conn.sendWritingText(m.chat, `*╔═══════════════════════════*\n➢ *"${pickRandom(piropo)}"*\n*╚═══════════════════════════*`, userdb, m)
}
handler.tags = ['frases']
handler.command = ['piropo']
handler.help = [];
handler.menu = [
{title: "💞 | PIROPOS", description: "TE MUESTRA UN PIROPO AL AZAR", id: `piropo`}
];
handler.type = "fun";
handler.disabled = false;

export default handler
