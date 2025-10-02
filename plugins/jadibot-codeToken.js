/*
El codigo de este archivo esta totalmente hecho por:
- ReyEndymion (https://github.com/ReyEndymion)
*/
import fs from "fs"
let handler = async (m, { conn, usedPrefix , db}, args, command, senderJid) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid || m.sender
	let uniqid = `${who.split`@`[0]}`
try {
if(global.conns.push(conn))
await conn.sendMessage(m.chat, {text : usedPrefix + 'jadibot' + " " + Buffer.from(fs.readFileSync("./jadibts/" + uniqid + "/creds.json"), "utf-8").toString("base64")}, { quoted: m })
} catch(e) {
conn.sendWritingText(m.chat, `Usted no es un miembro de los Sub-Bots de este Bot(${info.nanipe}).\n\nPara poder ser Sub-bot use el comando *${usedPrefix + 'jadibot'}*\n\n En caso de que tu sesion no la puedas iniciar otra vez, borra la sesion creada en dispositivos vinculados y usa el comando *${usedPrefix + 'deletebot'}* para poder solicitar una nueva sesion`, m)
}
}
handler.help = ['getcode']
handler.tags = ['jadibot']
handler.command = /^(codetoken)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = true

handler.admin = false
handler.botAdmin = false

handler.fail = null

handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler