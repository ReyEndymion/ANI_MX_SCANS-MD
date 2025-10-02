let handler = async (m, {conn, info, isPrems, db, userdb, senderJid}) => {
const {pickRandom, msToTime} = await import('../lib/functions.js')
const {work} = await import('../lib/constants.js')
let hasil = Math.floor(Math.random() * 5000)
let time = userdb.lastwork + 600000
if (new Date - userdb.lastwork < 600000) {
return conn.sendWritingText(m.chat, `*Estás cansado debes descansar como mínimo ${msToTime(time - new Date())} para volver a trabajar!*`, userdb, m)
} else {
userdb.lastwork = new Date * 1
return conn.sendWritingText(m.chat, `${pickRandom(work).replace('@bot', info.nani).replace('@owner', info.author)} *${hasil} XP*`, userdb, m)
}
}
handler.help = ['work']
handler.tags = ['xp']
handler.command = ['work', 'trabajar']
handler.fail = null
handler.exp = 0
handler.menu = [
{ title: "💼 TRABAJAR", description: `Trabaja para ganar XP`, id: `work` }
];
handler.type = "rpg";
handler.disabled = false;

export default handler
