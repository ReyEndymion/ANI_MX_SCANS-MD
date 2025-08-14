/* Creditos a https://github.com/ALBERTO9883/NyanCatBot-MD */

let handler = async (m, {conn, isAdmin, isOwner, args, usedPrefix, command, db, userdb, senderJid, objs}) => {
const {clockString, parseDuration} = await import('../lib/functions.js')
const {func} = objs
if (!(isAdmin || isOwner)) {
func.dfail('admin', m, conn)
throw false
}
let isConfig = {
'open': 'not_announcement',
'buka': 'not_announcement',
'on': 'not_announcement',
'1': 'not_announcement',
'close': 'announcement',
'tutup': 'announcement',
'off': 'announcement',
'0': 'announcement',
}[String(args[0] || '').toLowerCase()]
if (isConfig === undefined) {
let resp = `
*• Ejemplo:*
*${usedPrefix + command} open 1*
*${usedPrefix + command} close 1*
📌 *_Ejemplo de uso:_* *${usedPrefix + command} close 1* 
*_🌿 Para que el grupo este cerrado una hora._*
`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
let timeoutset = 86400000 * args[1] / 24
await conn.groupSettingUpdate(m.chat, isConfig).then(async _=> {
let resp = `⚠️ *_Grupo ${isConfig == 'announcement' ? 'cerrado' : 'abierto'} ${args[1] ? `durante *${clockString(timeoutset)}_*` : ''}`
return conn.sendWritingText(m.chat, resp, userdb, m)
})
if (args[1]) {
setTimeout(async () => {
await conn.groupSettingUpdate(m.chat, `${isConfig == 'announcement' ? 'not_announcement' : 'announcement'}`).then(async _=>{
let resp = `${isConfig == 'not_announcement' ? '*El grupo ha sido cerrado, ¡ahora solo los administradores pueden enviar mensajes!*' : '*El grupo se ha abierto, ¡ahora todos los miembros pueden enviar mensajes!*'}!`
return conn.sendWritingText(m.chat, resp, userdb, m)
})
}, timeoutset)
}
}
handler.help = ['grouptime *<open/close>* *<número>*']
handler.tags = ['group']
handler.command = /^(grouptime|gctime)$/i
handler.botAdmin = true
handler.group = true 
handler.menu = [
{title:"💎 CAMBIAR EL ESTADO DEL GRUPO", description: "cambia el estado del grupo usando #grouptime <open/close> <número>", id: `grouptime`}
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
