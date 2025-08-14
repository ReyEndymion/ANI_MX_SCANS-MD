import fetch from 'node-fetch'
let handler = async(m, {conn, args, usedPrefix, command, db, userdb, senderJid}) => {
fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/blackpink.txt').then(res => res.text()).then(body => {
let randomkpop = body.split('\n')
let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
conn.sendMessage(m.chat, {image: {url: randomkpopx}, caption: `_${command}_\n\n` + info.nanie, }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [['🔄 SIGUIENTE 🔄', `/${command}`]], m)
})}
handler.help = ['blackpink']
handler.tags = ['internet']
handler.command = /^(blackpink)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
