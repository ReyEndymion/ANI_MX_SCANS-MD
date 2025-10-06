let handler= async (m, {conn, info, args, usedPrefix, command, isROwner, text, db, userdb, senderJid}) => {
const { owner } = await import('../config.js');
let uniqid //parentw.getName(who)
console.log('deletebot: ', m.isROwner)
if (m.isROwner && args[1]) {
const number = m.text.split(`${usedPrefix+command} `)[1].replace(/ /g, '')
const { formatNumberWA } = await import('../lib/functions.js');
uniqid = formatNumberWA(number)
} else {
uniqid = `${senderJid.split`@`[0]}`
}
const path = await import('path')
let bot = path.join(jadibts, uniqid)
const fs = await import('fs')
if (fs.existsSync(bot)) {
const valuesConns = Array.from(global.conns.values())
if (global.conns.has(bot)) {
const sock = global.conns.get(bot)
try {
conn.isInit = false
sock.logout()
fs.rmSync(bot, { recursive: true, force: true })
console.log('se han eliminado todos los archivos')
let resp = "Adiós Bot\n\nTodos los archivos fueron eliminados"
return conn.sendWritingText(m.chat, resp, m )

} catch(err) {
console.error('La carpeta o archivo de sesion no existen ', err)
let resp = `Usted ya no es un miembro de los Sub-Bots de este Bot(${info.nanipe}).\n\nPara poder ser Sub-bot use el comando *${usedPrefix + 'jadibot'}*\n\n En caso de que tu sesion no la puedas iniciar otra vez, borra la sesion creada en dispositivos vinculados y usa el comando *${usedPrefix + 'deletebot'}* para poder solicitar una nueva sesion`
return conn.sendWritingText(m.chat, resp, m )
}
}
} else {
if (m.fromMe) return
let resp = `Es posible que la sesion no exista o este es el bot principal de (${info.nanipe}).\n\n En caso de que tu sesion no la puedas iniciar otra vez, borra la sesion creada en dispositivos vinculados y usa el comando *${usedPrefix + 'deletebot'}* para poder solicitar una nueva sesion`
return conn.sendWritingText(m.chat, resp, m )

}
}
handler.help = ['delete']
handler.tags = ['General']
handler.command = /^(deletebot)$/i
handler.owner = false
handler.group = false
handler.private = true
handler.menu = [
{title: 'SERBOT-DELETE', description: 'Utiliza Este comando para eliminar tu subbot\nComando #deletebot', id: 'deletebot'}
];
handler.type = "menubots";
handler.disabled = false;

export default handler