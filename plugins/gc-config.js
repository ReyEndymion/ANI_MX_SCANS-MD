/* Creditos del timer a https://github.com/ALBERTO9883/NyanCatBot-MD 
Mejorado el timer y unificado por https://github.com/ReyEndymion
*/
var groupTimers = {}
let handler = async (m, {conn, isAdmin, isOwner, args, usedPrefix, command, chatdb, userdb, groupMetadata, isBotAdmin, senderJid, objs}) => {
const {clockString, parseDuration, ajusteTiempo} = await import('../lib/functions.js')
const {func} = objs
if (!(isAdmin || isOwner)) {
func.dfail('admin', m, conn)
throw false
}
const isLidGroup = groupMetadata.addresingMode === 'lid'
let isConfig = {
'open': 'not_announcement',
'close': 'announcement',
'abierto': 'not_announcement',
'cerrado': 'announcement',
'abrir': 'not_announcement',
'cerrar': 'announcement',
}[String(args[0] || '').toLowerCase()]
if (isConfig === undefined) {
let resp = `
*[❗] FORMATO ERRONEO!!*
*• Debe usar el comando de la siguiente manera:*
*${usedPrefix + command} open${/^((group|grupo)time|gctime)$/i.test(command) ? ' 30s*' : '*'}
*${usedPrefix + command} abrir${/^((group|grupo)time|gctime)$/i.test(command) ? ' 30s*' : '*'}
📌 *_Ejemplo de uso:_* *${usedPrefix + command} close${/^((group|grupo)time|gctime)$/i.test(command) ? ' 30s*\n*_🌿 Para que el grupo este cerrado 30 segundos._*\n*Ejemplo de uso de tiempo:*\n5m → *5 minutos*\n2h → *2 horas*\n1d → *un día*\n2h47m → *2 horas con 47 minutos*.\n1h30m20s → *1 hora, 30 minutos y 20 segundos*.\n3d12h → *3 días y 12 horas*.' : '*'} 
`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
const chatdetect = chatdb.detect
if (chatdetect === true) chatdb.detect = false
if (groupMetadata.announce === true && isConfig == 'announcement') return conn.sendWritingText(m.chat, `El grupo ya esta *CERRADO* no se puede volver a configurar igual`, userdb, m)
if (groupMetadata.announce === false && isConfig == 'not_announcement') return conn.sendWritingText(m.chat, `El grupo ya esta *ABIERTO* no se puede volver a configurar igual`, userdb, m)
if (isConfig === ('cerrado' || 'cerrar' || 'close') && !isBotAdmin) chatdb.isBanned = true
if (isConfig === ('abierto' || 'abrir' || 'open') && !isBotAdmin) chatdb.isBanned = false
if (/^gr(oup|upo)(config)?$/i.test(command) && !args[1]) {
await conn.groupSettingUpdate(m.chat, isConfig).then(async _=> {
let resp = `⚠️ *[ ✔ ] GRUPO CONFIGURADO CORRECTAMENTE A*: ${isConfig == 'announcement' ? '_CERRADO_\n\n¡Ahora solo los administradores pueden enviar mensajes!' : '_ABIERTO_\n\n¡Ahora todos los miembros pueden enviar mensajes!'}`
await conn.sendWritingText(m.chat, resp, userdb, m)
chatdb.detect = chatdetect
})
} else if (/^(gr(oup|upo)time|gctime)$/i.test(command) && args[1]) {
console.info('announcement: ', groupMetadata.announce, isConfig && !args[1])
let timeoutset = parseDuration(args[1])
if (groupTimers[m.chat]) {
clearTimeout(groupTimers[m.chat])
delete groupTimers[m.chat]
}
await conn.groupSettingUpdate(m.chat, isConfig).then(async _=> {})
let resp = `⚠️ *[ ✔ ] GRUPO CONFIGURADO CORRECTAMENTE A: ${isConfig == 'announcement' ? '_CERRADO_*\n\n¡Ahora solo los administradores pueden enviar mensajes!' : '_ABIERTO_*\n\n¡Ahora todos los miembros pueden enviar mensajes!'} ${args[1] ? `durante *${ajusteTiempo(timeoutset)}_*` : ''}`
let q = await conn.sendWritingText(m.chat, resp, userdb, m)
groupTimers[m.chat] = setTimeout(async () => {
let metadata = await conn.groupMetadata(m.chat).catch(() => null)
if (!metadata) return

let participant = metadata.participants.find(p => isLidGroup ? p.jid === conn.user.jid : p.id === conn.user.jid)
let isBotAdmin = participant?.admin === 'admin' || participant?.admin === 'superadmin'

if (!isBotAdmin) return

try {
await conn.groupSettingUpdate(m.chat, `${isConfig == 'announcement' ? 'not_announcement' : 'announcement'}`).then(async _=> {
resp = `⚠️ *[ ✔ ] GRUPO CONFIGURADO CORRECTAMENTE A: ${groupMetadata.announce ? '_ABIERTO_*\n\n¡Ahora todos los miembros pueden enviar mensajes!' : '_CERRADO_*\n\n¡Ahora solo los administradores pueden enviar mensajes!'}`
})
} catch (error) {
resp = `${error.stack}`
} finally {
delete groupTimers[m.chat]
}
await conn.sendWritingText(m.chat, resp, userdb, q)
}, timeoutset)
chatdb.detect = chatdetect
}
}
handler.help = ['grouptime *<open/close>* *<número>*']
handler.tags = ['group']
handler.command = /^gr(oup|upo)(time|config)?|gctime$/i
handler.botAdmin = true
handler.group = true 
handler.menu = [
{title:"💎 CONTROLA EL ESTADO DEL GRUPO", description: " Controla el estado del grupo usando un tiempo con el comando #grouptime <open/close> <DD:hh:mm:ss>", id: `grouptime`},
{title:"💎 ABRE O CIERRA EL GRUPO", description: "abrir o cerrar el grupo para controlar la conversacion usando #grupo", id: `grupo`},
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
