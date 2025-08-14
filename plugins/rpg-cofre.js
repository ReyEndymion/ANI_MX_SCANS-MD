let handler = async (m, {isPrems, conn, usersdb, userdb, db, senderJid}) => {
let time = userdb.lastcofre + 86400000 // 36000000 10 Horas //86400000 24 Horas
if (new Date - userdb.lastcofre < 86400000) {
let resp = `[❗INFO❗] YA RECLAMASTE TU COFRE\nVUELVE EN *${msToTime(time - new Date())}* PARA VOLVER A RECLAMAR`

return await conn.sendWritingText(m.chat, resp, userdb, m)
}
let img = 'https://img.freepik.com/vector-gratis/cofre-monedas-oro-piedras-preciosas-cristales-trofeo_107791-7769.jpg?w=2000'
let dia = Math.floor(Math.random() * 30)
let tok = Math.floor(Math.random() * 10)
let animxscans = Math.floor(Math.random() * 4000)
let expp = Math.floor(Math.random() * 5000)

userdb.limit += dia
userdb.money += animxscans
userdb.joincount += tok
userdb.exp += expp

let texto = `
@${senderJid.split`@`[0]}
╔══🎉═🎉═🎉══⬣
║🛒 OBTIENES UN COFRE
║┈┈┈┈┈┈┈┈┈┈┈┈┈
║➢ *${dia} Diamantes* 💎
║➢ *${tok} Tokens* 🪙
║➢ *${animxscans} ANICoins* 👾
║➢ *${expp} Exp* ⚡
╚═════════════════⬣`

const fkontak = {
	"key": {
"participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}


await conn.sendMessage(m.chat, {image: {url: img}, caption: txt + '\n\n' + info.nanie, mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [['🔰 MENU', '/menu'] ])
userdb.lastcofre = new Date * 1
}
handler.help = ['daily']
handler.tags = ['xp']
handler.command = ['coffer', 'cofre', 'abrircofre', 'cofreabrir'] 
handler.level = 5
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return hours + " Horas " + minutes + " Minutos"
}
