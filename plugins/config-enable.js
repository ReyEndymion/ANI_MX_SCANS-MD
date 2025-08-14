let confirmacion = {}
let handler = async (m, {conn, start, info, usedPrefix, command, args, isOwner, isAdmin, isROwner, text, botdb, chatdb, userdb, db, objs, senderJid}) => {
const {func, imagen1, imagen2} = objs
const { fail } = func;
const {opts} = await import('../lib/functions.js');
const { newsletterID, sBroadCastID, media} = await import('../config.js');
let resp = '', lineaFinal = '', context, q
let name = await conn.getName(senderJid)
const fs = await import('fs')
let img = fs.readFileSync(imagen4)
let pp = fs.readFileSync(imagen1)
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid 
let mentionedJid = [who]
let userm =`@${who.split(`@s.whatsapp.net`)[0]}` && `@${who.replace(/@.+/, '')}`
let userg =await conn.getName(m.chat)


let isEnable = /true|enable|(turn)?on|1/i.test(command)
const settings = botdb.settings || {}
let type = (args[0] || '').toLowerCase()
let isAll = false, isUser = false
switch (type) {
case 'welcome':
if (!m.isGroup) {
fail('group', m, conn, userdb)
throw false
} else if (!isAdmin || !isOwner) {
fail('admin', m, conn, userdb)
throw false
}
chatdb.welcome = isEnable
break
case 'bye':
if (!m.isGroup) {
fail('group', m, conn, userdb)
throw false
} else if (!isAdmin || !isOwner) {
fail('admin', m, conn, userdb)
throw false
}
chatdb.bye = isEnable
break
case 'countmsg':
if (!m.isGroup) {
fail('group', m, conn, userdb)
throw false
} else if (!isAdmin || !isOwner) {
fail('admin', m, conn, userdb)
throw false
}
chatdb.isCountMsgs = isEnable
break
case 'detect':
if (!m.isGroup) {
fail('group', m, conn, userdb)
throw false
} else if (!isAdmin || !isOwner) {
fail('admin', m, conn, userdb)
throw false
}
chatdb.detect = isEnable
break
case 'delete':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.delete = isEnable
break
case 'antidelete':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.delete = !isEnable
break
case 'public':
isAll = true
if (!isROwner) {
fail('rowner', m, conn, userdb)
throw false
}
opts['self'] = !isEnable
break
case 'antilink':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.antiLink = isEnable
break
case 'antilink2':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.antiLink2 = isEnable 
break
case 'antiviewonce':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.antiviewonce = isEnable 
break
case 'modohorny':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('owner', m, conn, userdb)
throw false
}}
chatdb.modohorny = isEnable
break
case 'modoadmin':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.modoadmin = isEnable
break
case 'autosticker':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.autosticker = isEnable
break
case 'autoreac':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.autoreac = isEnable
break
case 'audios':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.audios = isEnable
break
//OWNER
case 'restrict':
isAll = true
if (!isOwner) {
fail('owner', m, conn, userdb)
throw false
}
settings.restrict = isEnable
break
case 'nyimak':
isAll = true
if (!isROwner) {
fail('rowner', m, conn, userdb)
throw false
}
opts['nyimak'] = isEnable
break
case 'autoread':
isAll = true
if (!isROwner) {
fail('rowner', m, conn, userdb)
throw false
}
opts['autoread'] = isEnable
break
case 'pconly':
case 'privateonly':
isAll = true
if (!isROwner) {
fail('rowner', m, conn, userdb)
throw false
}
opts['pconly'] = isEnable
break
case 'gconly':
case 'grouponly':
isAll = true
if (!isROwner) {
fail('rowner', m, conn, userdb)
throw false
}
opts['gconly'] = isEnable
break
case 'swonly':
case 'statusonly':
isAll = true
if (!isROwner) {
fail('rowner', m, conn, userdb)
throw false
}
opts['swonly'] = isEnable
break
case 'anticall':
isAll = true
if (!isROwner) {
fail('owner', m, conn, userdb)
throw false
}
settings.antiCall = isEnable
break
case 'antiprivado':
isAll = true
if (!isOwner) {
fail('owner', m, conn, userdb)
throw false
}
settings.antiPrivate = isEnable
break
case 'modejadibot':
isAll = true
if (!isROwner) {
fail('rowner', m, conn, userdb)
throw false
}
settings.modejadibot = isEnable
break
case 'antitoxic':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.antiToxic = isEnable
break
case 'antitraba':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.antiTraba = isEnable
break
case 'gantispam':
isAll = true
if (!isOwner) {
fail('rowner', m, conn, userdb)
throw false
}
settings.antispam = isEnable
break
case 'gantispam':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.antiTraba = isEnable
break
case 'antiarabes':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.antiArab = isEnable
break
case 'asistente':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.asistente = isEnable
break
case 'ia':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.ia = isEnable
break
case 'gruposrol':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.gruposrol = isEnable
break
case 'stickers':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
fail('admin', m, conn, userdb)
throw false
}}
chatdb.stickers = isEnable
break
default:
break
}


const validTypes = [
'welcome', 'detect', 'delete', 'antidelete', 'public', 'antilink', 'antilink2', 'antiviewonce', 'modohorny', 'modoadmin', 'autosticker', 'audios', 'restrict', 'nyimak', 'autoread', 'pconly', 'privateonly', 'gconly', 'grouponly', 'swonly', 'statusonly', 'anticall', 'antiprivado', 'modejadibot', 'antitoxic', 'antitraba', 'antiarabes', 'asistente', 'gruposrol', 'stickers', 'ia', 'bye', 'countmsg', 'autoreac', 'antispam', 'gantispam'
]
resp = `
╭══╡✯✯✯✯✯✯✯✯✯✯╞══╮
║━━━━━━━━━━━━━━━━━━━━
║➤ *✨HOLA, ${userm}!!*
║━━━━━━━━━━━━━━━━━━━━
*Escribe alguna de las opciones de los comandos de la siguiente lista a continuación:*
`
const sections = []
const rows = [
{ title: "🥸 | ASISTENTE", description: 'HABILITA EL ASISTENTE DE GRUPOS(AUTORESPUESTAS PROGRAMADAS)', id: `${usedPrefix + command} asistente`},
{ title: "🎭 | ASISTENTE GRUPOSROL", description: 'HABILITA EL ASISTENTE PARA GRUPOS DE ROL(AUTORESPUESTAS PREDEFINIDAS PARA ESOS GRUPOS)', id: `${usedPrefix + command} gruposrol`},
{ title: "👎🏻 | ANTIARABES", description: 'EXPULSA A LOS NUMEROS EXTRANJEROS DEL OTRO LADO DEL MUNDO BAJO SOSPECHA DE QUE SEAN NUMEROS VIRTUALES Y USUARIOS MAL INTENCIONADOS', id: `${usedPrefix + command} antiarabes`},
{title: "🔗 | ANTILINK", description: "ACTIVA O DESACTIVA EL ANTI ENLACES DE GRUPOS DE WHATSAPP", id: `${usedPrefix + command} antilink`}, 
{title: "🔗 | ANTILINK 2", description: "ACTIVA O DESACTIVA EL ANTI ENLACES QUE INICIAN EN HTTPS", id: `${usedPrefix + command} antilink2`},
{title: "📵 | ANTILLAMADA", description: "ACTIVA O DESACTIVA EL ANTI LLAMADA", id: `${usedPrefix + command} anticall`},
{title: "💬 | ANTIPRIVADO", description: "EL BOT BLOQUEARA A LOS USUARIOS QUE LE HABLEN AL PRIVADO", id: `${usedPrefix + command} antiprivado`},
{ title: "🤬 | ANTITOXIC", description: 'ANTITOXIC AYUDARA A EVITAR MAL LENGUAJE', id: `${usedPrefix + command} antitoxic`},
{ title: "🕸️ | ANTITRABAS", description: 'HABILITA O DESHABILITA LA PROTECCION CONTRA USUARIOS CON MENSAJES QUE TRABAN', id: `${usedPrefix + command} antitraba`},
{ title: "🕸️ | ANTISPAM", description: 'HABILITA O DESHABILITA EL ANTISPAM POR CHAT', id: `${usedPrefix + command} antispam`},
{ title: "🕸️ | ANTISPAMG", description: 'HABILITA O DESHABILITA EN TODOS LADOS EL ANTISPAM', id: `${usedPrefix + command} gantispam`},
{title: "❌ | ANTIVIEWONCE", description: "ACTIVA O DESACTIVA EL ANTI VER UNA SOLA VEZ", id: `${usedPrefix + command} antiviewonce`},
{title: "🔊 | AUDIOS", description: "ACTIVA O DESACTIVA LOS COMANDOS DE AUDIOS SIN PREFIJO", id: `${usedPrefix + command} audios`},
{title: "💖 | AUTOREAC", description: "HABILITA QUE EL BOT REACCIONE CON STICKERS O REACCIONES CUANDO SE LE MENCIONE O A SU OWNER", id: `${usedPrefix + command} autoreac`},
{title: "☑️ | AUTOREAD", description: "MARCA AUTOMATICAMENTE LAS CONVERSACIONES COMO LEIDO", id: `${usedPrefix + command} autoread`},
{title: "👾 | AUTOSTICKER", description: "TODAS LAS IMAGENES, VIDEOS O ENLACES ENVIADOS SE CONVIERTEN EN STICKER", id: `${usedPrefix + command} autosticker`},
{title: "✨ | BYE", description: "ACTIVA O DESACTIVA LA DESPEDIDA EN EL GRUPO", id: `${usedPrefix + command} bye`},
{title: "✨ | CONTADOR DE MENSAJES", description: "ACTIVA O DESACTIVA EL CONTADOR DE MENSAJES EN EL GRUPO", id: `${usedPrefix + command} countmsg`},
{title: "🔎 | DETECT", description: "ACTIVA O DESACTIVA LAS NOTIFICACIONES DE NUEVA MODIFICACION EN UN GRUPO", id: `${usedPrefix + command} detect`},
{ title: "🤖 | IA", description: 'HABILITA EL ASISTENTE DE IA', id: `${usedPrefix + command} ia`},
{ title: "👑 | MODO ADMIN", description: 'HABILITA A QUE SOLO LOS ADMINS USEN EL BOT', id: `${usedPrefix + command} modoadmin`},
{title: "🥵 | MODO HORNY", description: "ACTIVA O DESACTIVA LOS COMANDOS +18", id: `${usedPrefix + command} modohorny`},
{title: "🤖 | MODO JADIBOT/SERBOT", description: "ACTIVA LA CAPACIDAD DEL BOT DE PERMITIR TENER SUBBOTS", id: `${usedPrefix + command} modejadibot`},
{title: "🌎 | MODO PUBLICO", description: "EL BOT SE VUELVE DE USO PUBLICO Y/O PRIVADO", id: `${usedPrefix + command} public`},
{title: "❗ | RESTRICT", description: "ACTIVA O DESACTIVA LAS RESTRICCIONES PARA SACAR GENTE DE GRUPOS", id: `${usedPrefix + command} restrict`},
{title: "🏢 | SOLO GRUPOS", description: "EL BOT SOLO RESPONDERA A LOS COMANDOS SI ES UN GRUPO", id: `${usedPrefix + command} gconly`},
{title: "💬 | SOLO PRIVADOS", description: "EL BOT SOLO RESPONDERA A LOS COMANDOS SI ES UN CHAT PRIVADO", id: `${usedPrefix + command} pconly`},
{title: "👾 | STICKERS", description: "PERMITE QUE EL BOT MANDE STICKERS", id: `${usedPrefix + command} autosticker`},
{title: "✨ | WELCOME", description: "ACTIVA O DESACTIVA LA BIENVENIDA EN EL GRUPO", id: `${usedPrefix + command} welcome`},
]
let totalComandos = 0
if (Array.isArray(rows)) {
for (const item of rows) {
if (!item.title && !item.description && !item.id) continue
resp += `╠════════════════════\n`
if (item.title) resp += `*${item.title}*\n`
if (item.description) resp += `${item.description.replace(/#/g, `${usedPrefix}`)}\n`
if (item.id) resp += ` 📎 *Comando:* ${item.id}\n`
totalComandos++
}
if (rows.length > 0) {
sections.push({
//title: aliasToType[command].toUpperCase(),
rows
})
}

//resp += resp.trimEnd()
lineaFinal = `╰══╡✯✯✯✯✯✯✯✯✯✯╞══╯`

}
if (validTypes.includes(type)) {
resp = `🗂️ OPCIÓN: *${type}*\n🎚️ ESTADO: ${isEnable ? '*ACTIVADO*' : '*DESACTIVADO*'}\n📣 PARA: ${isAll ? '*ESTE BOT*' : isUser ? '' : '*ESTE CHAT*'}\n\n'Para ${isEnable ? 'desactivar' : 'activar'} esta opción, ${start.buttons ? 'usa el boton' : 'contesta este mensaje a continuacion con la palabra'} ${isEnable ? '*desactivar*' : '*activar*'}`
if (start.buttons) {
const messageObject = {
text: resp.trim(),
footer: info.nanie
}
const buttons = [[`${isEnable ? '✖️ DESACTIVAR ✖️' : '✔️ ACTIVAR ✔️'}`, `${isEnable ? `.disable ${type}` : `.enable ${type}`}`], ['👾 MENÚ PRINCIPAL 👾', '.menu']]
return conn.sendButton(m.chat, messageObject, {}, buttons, userdb, m)
} else {
context = false
}
// if (args[0])
} else if (!args[0]) {
context = true
} else {
let { default: similarity } = await import('similarity');
let similitudes = validTypes.map(cmd => ({
cmd,
score: similarity(type, cmd, 100)
}))
similitudes.sort((a, b) => a.score - b.score)

const sugerido = similitudes[0]
resp = `❌ El comando *${type}* no existe.\n📌 ¿Quizás quisiste decir: *${sugerido.cmd}*?\nUsa uno de estos comandos válidos:\n${validTypes.map(c => `• ${c}`).join('\n')}`
return conn.sendWritingText(m.chat, resp, userdb, m);
}

if (start.buttons) {
const listMessage = {
title: `*MENU CONFIGURACION*`,
text: resp+lineaFinal,
buffer: img,
buttonText: '🧾 Ver opciones',
footerText: info.nanie,
listSections: sections,
options: {}
}

return conn.sendList(m.chat, listMessage, userdb, m)
} else {
await conn.writing(m.chat, resp)
if (context) {
let contextInfo = {
mentionedJid: conn.parseMention(resp),
"externalAdReply": {
//"showAdAttribution": true,
"containsAutoReply": true,
"renderLargerThumbnail": true,
"title": info.nanie, 
"containsAutoReply": true,
"mediaType": 1, 
"thumbnail": fs.readFileSync(imagen4),
"mediaUrl": info.paypal,
"sourceUrl": info.paypal
}
}
return conn.sendMessage(m.chat, {text: resp.trim(), contextInfo: contextInfo, mentions: conn.parseMention(resp)}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
} else {
q = await conn.sendWritingText(m.chat, resp, userdb, m);

confirmacion[senderJid] = {
sender: senderJid,
isEnable: isEnable,
type: type,
chat: chatdb,
user: userdb,
settings: settings,
message: args[0],
quoted: q,
timeout: setTimeout(async () => {
delete confirmacion[senderJid]}, 60 * 1000)
}
}//throw false
/**
*/ 
context = ''
}
}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?[01])$/i
handler.menu = [
{title: "👑 ENABLE/DISABLE", description: "#enable <opcion> o #disable <opcion>", id: `enable`},
]
handler.type = "owners";
handler.before = async function before (m, {conn, text, isOwner, isAdmin, command, args, db}) {
const confirmation = Object.values(confirmacion).find(c => c.sender === senderJid);
if (!confirmation) return;
let resp
const regEx = /(des)?(activar)/i.test(m.text)
if (regEx){
const { sender, isEnable, message, quoted, type, timeout, chatdb, userdb, settings } = confirmation;
let analiztxt = (m.quoted ? m.quoted?.text : m.text ) || m.caption;
let regexIsEnable = /🎚️ ESTADO: (.+)/g;
let matchM = analiztxt.match(regexIsEnable);
const activarRegex = `ACTIVAR`.toLowerCase();
const desactivarRegex = `DESACTIVAR`.toLowerCase();
let activadoRGX = new RegExp('ACTIVADO')
let desactivadoRGX = new RegExp('DESACTIVADO')
if (desactivadoRGX.test(matchM) && activarRegex === m.text.toLowerCase()) {
(chat||settings)[type] = true;
resp = `${isEnable ? `✖️ *DESACTIVADO* ✖️\nFunción ${type}` : `✔️ *ACTIVADO* ✔️\nFunción ${type}`}`
} else if (activadoRGX.test(matchM) && desactivarRegex === m.text.toLowerCase()) {
(chatdb||settings)[type] = false;
resp = `${isEnable ? `✖️ *DESACTIVADO* ✖️\nFunción ${type}` : `'✔️ *ACTIVADO* ✔️\nFunción ${type}`}`
}

return conn.sendMessage(m.chat, { text: resp.trim()}, {quoted: quoted, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
}
handler.disabled = false;

export default handler

