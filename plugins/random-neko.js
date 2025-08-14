import fetch from 'node-fetch'
let handler = async (m, {conn, command, db, userdb, senderJid}) => {
let ne = await (await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')).text()
let nek = ne.split('\n')
let neko = pickRandom(nek)
let resp = `Nyaww~ 🐾💗\n\n${info.nanie}`

conn.sendMessage(m.chat, {image: {url: neko}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [['🔄 SIGUIENTE 🔄', `/${command}`]],m)
}
handler.command = /^(neko)$/i
handler.tags = ['anime']
handler.help = ['neko']
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}