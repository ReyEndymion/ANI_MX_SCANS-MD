import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
let res = await fetch('https://api.waifu.pics/sfw/waifu')
if (!res.ok) throw await res.text()
let json = await res.json()
if (!json.url) throw 'Error!'
conn.sendMessage(m.chat, { image:{url: json.url}, caption: `A-ARA ARA SEMPAI~~\n\n${wm}`}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [['🔄 SIGUIENTE 🔄', `/${command}`]], m)
}
handler.help = ['waifu']
handler.tags = ['anime']
handler.command = /^(waifu)$/i
export default handler
