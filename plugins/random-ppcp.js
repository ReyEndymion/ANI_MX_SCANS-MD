import fetch from 'node-fetch'
let handler = async (m, { conn, command }) => {
let res = await fetch(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=${lolkeysapi}`)
if (res.status != 200) throw await res.text()
let json = await res.json()
if (!json.status) throw json
conn.sendMessage(m.chat, {image: {url: json.result.female}, caption: 'CHICA CUTE', wm}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [['🔄 SIGUIENTE 🔄', `/${command}`]], m)
conn.sendMessage(m.chat, {image: {url: json.result.male}, caption: 'CHICO CUTE', wm}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [['🔄 SIGUIENTE 🔄', `/${command}`]], m)
}
handler.help = ['ppcouple']
handler.tags = ['internet']
handler.command = /^(ppcp|ppcouple)$/i
export default handler
