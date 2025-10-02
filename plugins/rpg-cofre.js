let handler = async (m, {conn, start, info, isPrems, db, userdb, senderJid}) => {
const {msToTime} = await import('../lib/functions.js')
let time = userdb.lastcofre + 86400000 // 36000000 10 Horas //86400000 24 Horas
if (new Date - userdb.lastcofre < 86400000) {
let resp = `[❗INFO❗] YA RECLAMASTE TU COFRE\nVUELVE EN *${msToTime(time - new Date())}* PARA VOLVER A RECLAMAR`
return await conn.sendWritingText(m.chat, resp, userdb, m)
}
let img = 'https://img.freepik.com/vector-gratis/cofre-monedas-oro-piedras-preciosas-cristales-trofeo_107791-7769.jpg?w=2000'
let dia = Math.floor(Math.random() * 30)
let tok = Math.floor(Math.random() * 10)
let coins = Math.floor(Math.random() * 4000)
let expp = Math.floor(Math.random() * 5000)

userdb.limit += dia
userdb.money += coins
userdb.joincount += tok
userdb.exp += expp
 
let texto = `
@${senderJid.split`@`[0]}
╔══🎉═🎉═🎉══⬣
║🛒 OBTIENES UN COFRE
║┈┈┈┈┈┈┈┈┈┈┈┈┈
║➢ *${dia} Diamantes* 💎
║➢ *${tok} Tokens* 🪙
║➢ *${coins} Coins* 👾
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
userdb.lastcofre = new Date * 1
const buttons = [['🔰 MENU', '/menu'] ]
if (start.buttons) {
await conn.sendButton(m.chat, {text: texto, footer: info.nbcde}, {url: img}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
texto += `\n${cmds}\n> ${info.nanipe}`
await conn.sendImageWriting(m.chat, img, texto, userdb, fkontak)
}
}
handler.help = ['daily']
handler.tags = ['xp']
handler.command = ['coffer', 'cofre', 'abrircofre', 'cofreabrir'] 
handler.level = 5
handler.menu = [
{title: "🎁 COFRE", description: `Reclama tu cofre diario, usa el comando #cofre`, id: `cofre`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler
