import fs, { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync} from "fs"
import path, { join } from 'path'
let handler= async (m, { conn, args, command, isROwner, text }) => {
let uniqid //parentw.getName(who)
if (isROwner) {
let args = conn.formatNumberWA(m.text.replace(`${command} `, ''))
uniqid = args
} else {
uniqid = `${m.sender.split`@`[0]}`
}
console.log('deletebot: ', args, args[0], m.text.replace(`${command} `, ''), uniqid)
let bot = path.join(jadibts, uniqid)
/*
if (global.conn.user.jid !== conn.user.jid) {
let resp = `Por qué no vas directamente con el numero del Bot @${uniqid}?`
*/
try {
conn.isInit = false
//conn.ws.close()
fs.rmSync(bot, { recursive: true, force: true })
console.log('se han eliminado todos los archivos')
let resp = "Adiós Bot\n\nTodos los archivos fueron eliminados"
return conn.sendWritingText(m.chat, resp, m )


 /*fs.unlink("./jadibts/" + uniqid + "/creds.json")
console.log('File removed')
await conn.sendMessage(m.chat, {text : "la session fue eliminada " } , { quoted: m })
await fs.unlink("./jadibts/" + uniqid).md
console.log('Folder removed')
await conn.sendMessage(m.chat, {text : "la carpeta fue eliminada " } , { quoted: m })*/
} catch(err) {
console.error('La carpeta o archivo de sesion no existen ', err)
let resp = `Usted ya no es un miembro de los Sub-Bots de este Bot(${wm}).\n\nPara poder ser Sub-bot use el comando *${usedPrefix + 'jadibot'}*\n\n En caso de que tu sesion no la puedas iniciar otra vez, borra la sesion creada en dispositivos vinculados y usa el comando *${usedPrefix + 'deletebot'}* para poder solicitar una nueva sesion`
return conn.sendWritingText(m.chat, resp, m )
}
}
handler.help = ['delete']
handler.tags = ['General']
handler.command = /^(deletebot)$/i
handler.owner = false
handler.group = false
handler.private = true
export default handler