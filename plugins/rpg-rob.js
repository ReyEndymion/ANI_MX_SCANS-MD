let ro = 3000
let handler = async (m, { conn, isPrems, usedPrefix, command}) => {
//let hasil = Math.floor(Math.random() * 5000)
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let bot = global.db.data.bot[conn.user.jid]
let chats = bot.chats || {}
let chat = chats.groups[m.chat] || {}
let users = chat.users || {}
let user = users[m.sender] || {}
let settings = bot.settings || {}
console.log('robar: ', users)
let time = users[m.sender].lastrob + 7200000
let who, resp
if (m.isGroup) { who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false} else {who = m.sender}
//users[who]
let rob = Math.floor(Math.random() * ro)
user.exp += rob
console.log('robar: ', user)

if (new Date - user.lastrob < 7200000) {
resp =  `*⏱️¡Hey! Espera ${msToTime(time - new Date())} para volver a robar*`
} else if (!who) {
user.lastrob = new Date * 1
resp =  `${pickRandom(global.crimen)} *${rob} XP*`
} else if (!(who in users)) {
resp = `*[❗] El usuario no se encuentra en mi base de datos.*`
} else if (user.exp < rob) {
resp = `😔 @${who.split`@`[0]} tiene menos de *${ro} xp*\nNo robes a un pobre v":`
} else {
users.exp -= rob 
user.lastrob = new Date * 1
resp = `*‣ Robaste ${rob} XP a @${who.split`@`[0]}*`

}
user.lastrob = new Date * 1
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;

if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
if (resp) {
user.lastrob = new Date * 1
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} 
}
handler.help = ['robar']
handler.tags = ['xp']
handler.command = ['robar', 'crimen', 'rob', 'asaltar']
handler.fail = null
handler.exp = 0
export default handler

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return minutes + " m " + seconds + " s " 
}


function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}

global.crimen = [
"Robaste a un politico y ganas", 
"Robaste al Gobierno, ganando", 
"Robaste una persona y ganas",
"Robaste un Búnker y ganaste", 
"Robaste una Mansión y te pagaron", 
"Robaste un Avión y ganaste", 
"trabajaste para la mafia y te pagaron", 
"Robaste dos obra de arte del museo de España y ganaste", 
"Asaltaste dos bancos de tu ciudad y ganas", 
"Robaste a McDonald's y ganaste", 
"robaste a roblox y ganaste",
"Robaste a discord y ganaste", 
"Robaste una tienda de ropa y ganaste"
]

/*****************************************
*CREADO POR https://github.com/DIEGO-OFC*
*****************************************/
/*adptado para animxscans por ReyEndymion*/
