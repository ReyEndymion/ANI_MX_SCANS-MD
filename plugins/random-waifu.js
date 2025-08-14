import fetch from 'node-fetch'
let handler = async (m, {conn, usedPrefix, command, db, userdb, senderJid}) => {
let res = await fetch('https://api.waifu.pics/sfw/waifu')
if (!res.ok) throw await res.text()
let json = await res.json()
if (!json.url) return conn.sendWritingText(m.chat, `Error!`, userdb, m)
conn.sendMessage(m.chat, { image:{url: json.url}, caption: `A-ARA ARA SEMPAI~~\n\n${info.nanie}`}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [['🔄 SIGUIENTE 🔄', `/${command}`]], m)
}
handler.help = ['waifu']
handler.tags = ['anime']
handler.command = /^(waifu)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
