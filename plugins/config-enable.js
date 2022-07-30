let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
const sections = [
{
title: `*LISTA DE OPCIONES*`,
rows: [
{title: "✨ | WELCOME", description: "ACTIVA O DESACTIVA LA BIENVENIDA EN EL GRUPO", rowId: `${usedPrefix + command} welcome`},
{title: "🌎 | MODO PUBLICO", description: "EL BOT SE VUELVE DE USO PUBLICO Y/O PRIVADO", rowId: `${usedPrefix + command} public`},
{title: "🥵 | MODO HORNY", description: "ACTIVA O DESACTIVA LOS COMANDOS +18", rowId: `${usedPrefix + command} modohorny`},
{title: "🔗 | ANTILINK", description: "ACTIVA O DESACTIVA EL ANTI ENLACES DE GRUPOS DE WHATSAPP", rowId: `${usedPrefix + command} antilink`},   
{title: "🔗 | ANTILINK 2", description: "ACTIVA O DESACTIVA EL ANTI ENLACES QUE INICIAN EN HTTPS", rowId: `${usedPrefix + command} antilink2`},    
{title: "🔎 | DETECT", description: "ACTIVA O DESACTIVA LAS NOTIFICACIONES DE NUEVA MODIFICACION EN UN GRUPO", rowId: `${usedPrefix + command} detect`},      
{title: "❗ | RESTRICT", description: "ACTIVA O DESACTIVA LAS RESTRICCIONES PARA SACAR GENTE DE GRUPOS", rowId: `${usedPrefix + command} restrict`},    
{title: "☑️ | AUTOREAD", description: "MARCA AUTOMATICAMENTE LAS CONVERSACIONES COMO LEIDO", rowId: `${usedPrefix + command} autoread`},
{title: "🔊 | AUDIOS", description: "ACTIVA O DESACTIVA LOS COMANDOS DE AUDIOS SIN PREFIJO", rowId: `${usedPrefix + command} audios`},
{title: "👾 | AUTOSTICKER", description: "TODAS LAS IMAGENES, VIDEOS O ENLACES ENVIADOS SE CONVIERTEN EN STICKER", rowId: `${usedPrefix + command} autosticker`},
{title: "💬 | PCONLY", description: "EL BOT SOLO RESPONDERA A LOS COMANDOS SI ES UN CHAT PRIVADO", rowId: `${usedPrefix + command} pconly`},
{title: "🏢 | GCONLY", description: "EL BOT SOLO RESPONDERA A LOS COMANDOS SI ES UN GRUPO", rowId: `${usedPrefix + command} gconly`},
{title: "❌ | ANTIVIEWONCE", description: "ACTIVA O DESACTIVA EL ANTI VER UNA SOLA VEZ", rowId: `${usedPrefix + command} antiviewonce`},
]}, ]
let name = await conn.getName(m.sender)
const listMessage = {
text: ' ',
footer: `╭══〘 ✯✯✯✯✯✯✯✯ 〙═╮
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡
║➤ *✨HOLA, ${name}!!*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡
╰══╡✯✯✯✯✯✯✯✯╞══╯
┏━━━━━━━━━━━━━┓
┣❧ *SELECCIONA UNA DE LAS OPCIONES QUE SALEN EN LA SIGUIENTE LISTA O DA CLICK EN ALGUN BOTON DE ESTE MENSAJE*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ ඬ⃟ℹ️ _${usedPrefix}enable *welcome*_
┣ ඬ⃟ℹ️ _${usedPrefix}disable *welcome*_
┣ ඬ⃟ℹ️ _${usedPrefix}enable *public*_
┣ ඬ⃟ℹ️ _${usedPrefix}disable *public*_
┣ ඬ⃟ℹ️ _${usedPrefix}enable *modohorny*_
┣ ඬ⃟ℹ️ _${usedPrefix}disable *modohorny*_
┣ ඬ⃟ℹ️ _${usedPrefix}enable *antilink*_
┣ ඬ⃟ℹ️ _${usedPrefix}disable *antilink*_
┣ ඬ⃟ℹ️ _${usedPrefix}enable *antilink2*_
┣ ඬ⃟ℹ️ _${usedPrefix}disable *antilink2*_
┣ ඬ⃟ℹ️ _${usedPrefix}enable *detect*_
┣ ඬ⃟ℹ️ _${usedPrefix}disable *detect*_
┣ ඬ⃟ℹ️ _${usedPrefix}enable *restrict*_
┣ ඬ⃟ℹ️ _${usedPrefix}disable *restrict*_
┣ ඬ⃟ℹ️ _${usedPrefix}enable *pconly*_
┣ ඬ⃟ℹ️ _${usedPrefix}disable *pconly*_
┣ ඬ⃟ℹ️ _${usedPrefix}enable *gconly*_
┣ ඬ⃟ℹ️ _${usedPrefix}disable *gconly*_
┣ ඬ⃟ℹ️ _${usedPrefix}enable *autoread*_
┣ ඬ⃟ℹ️ _${usedPrefix}disable *autoread*_
┣ ඬ⃟ℹ️ _${usedPrefix}enable *audios*_
┣ ඬ⃟ℹ️ _${usedPrefix}disable *audios*_
┣ ඬ⃟ℹ️ _${usedPrefix}enable *antiviewonce*_
┣ ඬ⃟ℹ️ _${usedPrefix}disable *antiviewonce*_
┣ ඬ⃟ℹ️ _${usedPrefix}enable *autosticker*_
┣ ඬ⃟ℹ️ _${usedPrefix}disable *autosticker*_
┗━━━━━━━━━━━━━┛
${author}`,
title: null,
buttonText: "SELECCIONE AQUI",
sections }

let isEnable = /true|enable|(turn)?on|1/i.test(command)
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
let bot = global.db.data.settings[conn.user.jid] || {}
let type = (args[0] || '').toLowerCase()
let isAll = false, isUser = false
switch (type) {
case 'welcome':
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}
} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.welcome = isEnable
break
case 'detect':
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}
} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.detect = isEnable
break
case 'delete':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.delete = isEnable
break
case 'antidelete':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.delete = !isEnable
break
case 'public':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['self'] = !isEnable
break
case 'antilink':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiLink = isEnable
break
case 'antilink2':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiLink2 = isEnable 
break
case 'antiviewonce':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiviewonce = isEnable 
break
case 'modohorny':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.modohorny = isEnable          
break
case 'autosticker':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.autosticker = isEnable          
break
case 'audios':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.audios = isEnable          
break
case 'restrict':
isAll = true
if (!isOwner) {
global.dfail('owner', m, conn)
throw false
}
bot.restrict = isEnable
break
case 'nyimak':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['nyimak'] = isEnable
break
case 'autoread':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['autoread'] = isEnable
break
case 'pconly':
case 'privateonly':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['pconly'] = isEnable
break
case 'gconly':
case 'grouponly':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['gconly'] = isEnable
break
case 'swonly':
case 'statusonly':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['swonly'] = isEnable
break
default:
if (!/[01]/.test(command)) return await conn.sendMessage(m.chat, listMessage)
throw false
}
conn.sendButton(m.chat, `🗂️ OPCION: ${type} 
🎚️ ESTADO: ${isEnable ? 'ACTIVADO' : 'DESACTIVADO'}
📣 PARA: ${isAll ? 'ESTE BOT' : isUser ? '' : 'ESTE CHAT'}`, author, null, [[`${isEnable ? '✖️ DESACTIVAR ✖️' : '✔️ ACTIVAR ✔️'}`, `${isEnable ? `.off ${type}` : `.on ${type}`}`], ['👾 MENU PRINCIPAL 👾', '.menu']],m)}

handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?[01])$/i
export default handler
