/* Creditos del timer a https://github.com/ALBERTO9883/NyanCatBot-MD 
Mejorado el timer y unificado por https://github.com/ReyEndymion
*/
var groupTimers = {}
let handler = async (m, {conn, isAdmin, isOwner, args, text, usedPrefix, command, chatdb, userdb, groupMetadata, isBotAdmin, senderJid, objs, isLidGroup}) => {
const {clockString, parseDuration, ajusteTiempo} = await import('../lib/functions.js')
const {func} = objs
if (!(isAdmin || isOwner)) {
func.dfail('admin', m, conn)
throw false
}
if (/^(gr(oup|upo)(time|config)?|gctime)$/i.test(command)) {
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
if (/^(gr(oup|upo)(config)?)$/i.test(command) && !args[1]) {
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
if (/^set(desk|desc)$/i.test(command)) {
if (!text && !m.quoted) {
let resp = `*[❗INFO❗] INGRESE EL TEXTO QUE DESEA QUE SEA LA DESCRIPCION DEL GRUPO O CONTESTE A UN MENSAJE QUE TENGA EL TEXTO*`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
try {
let text2 = m.quoted ? m.quoted.text : text ? `${args.join(" ")}` : m.quoted.text
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
let name = await conn.getName(who)
let txto = text2.replace('@' + who.replace(/\s+/g, '').split`@`[0], name).trim()
await conn.groupUpdateDescription(m.chat, txto);
let resp = '*✅ La descripción del grupo se modifico correctamente*'
return conn.sendWritingText(m.chat, resp, userdb, m)
} catch (e) {
let resp = `*[❗INFO❗] LO SIENTO HUBO UN ERROR, LA DESCRIPCION NO SE PUDO CAMBIAR*'\n ${JSON.stringify(e)}`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
if (/^(setname)$/i.test(command)) {
if (!text && !m.quoted) {
let resp = `*[❗INFO❗] INGRESE EL NOMBRE QUE DESEA QUE SEA EL NUEVO NOMBRE DEL GRUPO O CONTESTE A UN MENSAJE QUE TENGA UN TAG Y SEA COMPATIBLE CON LA CANTIDAD DE 25 CARÁCTERES*`;
return conn.sendWritingText(m.chat, resp, userdb, m);
}

try {
let text2 = m.quoted ? m.quoted.text : text;

let mentions = [...text2.matchAll(/@\d+/g)];

if (mentions.length > 0) {
for (const mention of mentions) {
const phoneNumber = mention[0].replace('@', '');
const name = await conn.getName(`${phoneNumber}@s.whatsapp.net`);
text2 = text2.replace(new RegExp(mention[0], 'g'), name);
}
}

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid;
let name = await conn.getName(who);
let txto = text2.includes('@') ? text2 : text2.replace(new RegExp(who.replace(/\s+/g, '').split`@`[0], 'g'), name);

conn.groupUpdateSubject(m.chat, txto);

} catch (e) {
let resp = `*[❗INFO❗] LO SIENTO HUBO UN ERROR ${e}, EL NOMBRE NO PUEDE SER MAS DE 25 CARACTERES*`;
return conn.sendWritingText(m.chat, resp, userdb, m);
}
}
if (/^(setpp(group|grup|gc))$/i.test(command)) {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/image/.test(mime)) {
let img = await q.download()
if (!img) {
let resp = '*⚠️️ Responde a una imagen.*'
return conn.sendWritingText(m.chat, resp, userdb, m);
}
await conn.updateProfilePicture(m.chat, img).then(async _ => {
let resp = '⚘ *_Imagen actualizada con éxito._*'
return conn.sendWritingText(m.chat, resp, userdb, m)
})
} else {
let resp = '*⚠️️ Responde a una imagen.*'
return conn.sendWritingText(m.chat, resp, userdb, m);
}
}
}
handler.help = ['grouptime *<open/close>* *<número>*']
handler.tags = ['group']
handler.command = /^(gr(oup|upo)(time|config)?|gctime|set(desk|desc)|setname|setpp(group|grup|gc)?)$/i
handler.botAdmin = true
handler.group = true 
handler.menu = [
{title:"💎 ABRE O CIERRA EL GRUPO", description: "abrir o cerrar el grupo para controlar la conversacion usando #grupo", id: `grupo`},
{title:"💎 CONTROLA EL ESTADO DEL GRUPO", description: " Controla el estado del grupo usando un tiempo con el comando #grouptime <open/close> <DD:hh:mm:ss>", id: `grouptime`},
{title:"💎 CAMBIA EL NOMBRE DEL GRUPO", description: "solicita al bot que cambie el nombre al grupo usando #setname", id: `setname`},
{title:"💎 CAMBIA LA IMAGEN DEL GRUPO", description: "contesta a una imagen o sube la imagen para cambiarla usando #setpp", id: `setpp`},
{title:"💎 CAMBIAR LA DESCRIPCIÓN DEL GRUPO", description: "cambia la descripción del grupo usando #setdesc <texto>", id: `setdesc`}
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
