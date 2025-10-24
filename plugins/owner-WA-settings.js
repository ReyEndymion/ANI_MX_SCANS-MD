let handler = async (m, {text, args, conn, info, usedPrefix, command, isMods, isOwner, isPrems, db, userdb, senderJid, objs}) => {
const {func} = objs
const {owner, userID} = await import('../config.js')
if (/^((un)?block)$/i.test(command)) {
let why = `*[❗] USO ERRONEO, EJEMPLO:*\n*—◉ ${usedPrefix + command} @${senderJid.split("@")[0]}*`
let who = m.mentionedJid[0] ? m.mentionedJid[0] : !m.quoted?.fromMe && m.quoted?.sender ? m.quoted.sender : false
if (!who) {

return conn.sendWritingText(m.chat, why, userdb, m)
}
let res = [];
switch (command) {
case "blok": case "block":
if (who) {
await conn.updateBlockStatus(who, "block").then(() => { res.push(who); })
} else {

return conn.sendWritingText(m.chat, why, userdb, m)
}
break
case "unblok": case "unblock":
if (who) {
await conn.updateBlockStatus(who, "unblock").then(() => { res.push(who); })
} else {

return conn.sendWritingText(m.chat, why, userdb, m)
}
break
}
if (res[0]) {
let resp = `*[❗] SE USO CON EXITO EL COMANDO ${command} PARA EL USUARIO/A:*\n ${res ? `${res.map(v => '@' + v.split("@")[0])}` : ''}`

return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
if (/^(blocklist)$/i.test(command)) {
await conn.fetchBlocklist().then(async data => {
let resp = `*≡ Lista de bloqueados*\n\n*Total :* ${data.length}\n\n┌─⊷\n`
for (let i of data) {
resp += `▢ @${i.split("@")[0]}\n`}
resp += "└───────────"
return conn.sendWritingText(m.chat, resp, userdb, m)
}).catch(async err => {
console.log(err);
let resp = 'No hay números bloqueados'
return conn.sendWritingText(m.chat, resp, userdb, m)
})
}
if (/^(join|nuevogrupo)$/i.test(command)) {
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
try {
let link = (m.quoted ? m.quoted.text ? m.quoted.text : text : text) || text
let [_, code] = link.match(linkRegex) || []
if (!code) {
let resp = `*[ ⚠️ ALERTA ⚠️ ] LINK ERRÓNEO O FALTANTE*\n*👉🏻 ingrese el enlace de un grupo*\n\n*ejemplo:*\n*#join ${info.community}*\n\n*por cierto ese enlace de ejemplo es un grupo para que puedan pedir la solicitud ya que los privados se estarán bloqueando poco a poco*\n\n*[❗INFO❗] no responda a ningún mensaje, puede causar interferencia, escríbalo únicamente como mensaje nuevo*`
return conn.sendWritingText(m.chat, resp, userdb, m)
} else if ( isPrems || isMods || isOwner || m.fromMe) {
let resp = `✔️ *tú eres admin fundador, podrás disfrutar de este bot!*`
await conn.sendWritingText(m.chat, resp, userdb, m)
return await conn.groupacceptInvite(code)
} else {
const data = owner.filter(([id]) => id)
for (let jid of data.map(([id]) => [id] + userID).filter(v => v != conn.user.jid)) {
let resp = '*[❗INFO❗] NUEVA SOLICITUD DEL BOT PARA UN GRUPO [❗INFO❗]*\N\N*—◉ NÚMERO SOLICITANTE:* ' + 'wa.me/' + senderJid.split('@')[0] + '\n*—◉ LINK DEL GRUPO DÓNDE SE SOLICITA EL BOT ' + link
await conn.sendWritingText(jid, resp, userdb, m)
}
let resp = `*[❗INFO❗] el link del grupo fue enviado a mi propietario/a*\n\n*👉🏻 su grupo estará en evaluación para el bot 🌎ani mx scans🌏 y el propietario/a de ese bot decidirá si lo agrega o no*\n\n*[❗info❗] algunas de las razones por las que su solicitud puede ser rechazada:*\n\n*1.- este bot es privado*\n*2.- solo se puede disfrutar de este bot en el grupo otakus together*\n*3.- solo se presta el bot de promoción para los miembros de la asociación de grupos*\n*4.- aún no estás en la asociación de grupos*\n*5.- te falta leer más books o no leíste bien el apartado de arriba donde está el enlace del grupo donde tienes que entrar 👺👎*\n\n*👉🏻 una vez que estés dentro del grupo lee las reglas acepta o no las reglas del grupo de la asociación y pide el comando al otro bot para el enlace de invitación del grupo de la asociación, ten paciencia 👺🙏*\n\n *para dar más rapidez a este procedimiento ponga el comando #rgou y entérate de las reglas de la asociación de grupos*\n\n👺👉 *no me vengas a echar la culpa de tus errores si no entendiste dos veces*`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
} catch (e) {
let resp = '*[❗INFO❗] LO SENTIMOS, HAY UN ERROR EN ESTE COMANDO Y AUN TRABAJAMOS EN LA SOLUCION*' + e.stack
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
if (/^(f(etch)?|mostrar)p((riv)?(acity|acidad)?)$/i.test(command)) {
const configs = {
readreceipts: "✔ Confirmaciones de lectura",
profile: "🖼 Foto de perfil",
status: "💬 Estado",
online: "🟢 En línea",
last: "👀 Último visto",
groupadd: "👥 Agregar a grupos",
calladd: "📞 Llamadas",
stickers: "🌟 Stickers de avatar",
messages: "✉ Mensajes"
}

// Diccionario de valores traducidos
const valores = {
all: "Todos",
contacts: "Solo contactos",
contact_blacklist: "Contactos excepto algunos",
none: "Nadie",
match_last_seen: "Igual que último visto"
}
let configuracionPrivacidad = await conn.fetchPrivacySettings(true);

let mensaje = '*🔒 CONFIGURACIÓN DE PRIVACIDAD ACTUAL*\n\n';
for (let key in configuracionPrivacidad) {
mensaje += `*${configs[key]}:* ${valores[configuracionPrivacidad[key]]}\n`;
}
return conn.sendWritingText(m.chat, mensaje, userdb, m)
}
if (/^((set|cfg|cambiar)((lastseen|ultimovisto)|(profilepic|foto)|(status|estado)|(groupsadd|addgr(oups|upos))|(online|enlinea)|(readreceipts|confirmaciones)))$/i.test(command)) {
if (!args[0]) return conn.sendWritingText(m.chat, ` Uso correcto de este comando: *${usedPrefix+command} <all|todos|contacts|contactos|contacts_blacklist|excepto|none|nadie|match_last_seen|igual>*`, userdb, m)
const valoresES = {
todos: "all",
contactos: "contacts",
excepto: "contacts_blacklist",
nadie: "none",
igual: "match_last_seen"
}[args[0]]
let valor = valoresES || args[0]
if (/^((set|cfg|cambiar)(lastseen|ultimovisto))$/i.test(command)) {
await conn.updateLastSeenPrivacy(valor);
return conn.sendWritingText(m.chat, `✅ Privacidad: Quién puede ver la última vez visto del bot actualizado a: *${args[0]}*`, userdb, m);

}
if (/^((set|cfg|cambiar)(profilepic|foto))$/i.test(command)) {
await conn.updateProfilePicturePrivacy(valor);
return conn.sendWritingText(m.chat, `✅ Privacidad: quién puede ver la imagen de perfil del bot actualizado a: *${args[0]}*`, userdb, m);

}
if (/^((set|cfg|cambiar)(status|estado))$/i.test(command)) {
await conn.updateStatusPrivacy(valor);
return conn.sendWritingText(m.chat, `✅ Privacidad Quién puede ver el estado del bot actualizado a: *${args[0]}*`, userdb, m);
}
if (/^((set|cfg|cambiar)(groupsadd|addgr(oups|upos)))$/i.test(command)) {
let resp = await conn.updateGroupsAddPrivacy(valor);
console.log('owWACheck: ', resp)
return conn.sendWritingText(m.chat, `✅ Privacidad: quién puede agregar al bot a grupos actualizado a: *${args[0]}*`, userdb, m);

}
if (/^((set|cfg|cambiar)(online|enlinea))$/i.test(command)) {
await conn.updateOnlinePrivacy(valor);
return conn.sendWritingText(m.chat, `✅ Privacidad de Estado en línea actualizado a: *${args[0]}*`, userdb, m);

}
if (/^((set|cfg|cambiar)(readreceipts|confirmaciones))$/i.test(command)) {
await conn.updateReadReceiptsPrivacy(valor);
return conn.sendWritingText(m.chat, `✅ Privacidad: confirmaciones de lectura actualizado a: *${args[0]}*`, userdb, m);
}
}
if (/^((out|leave|salir)(delgrupo|gc)?)$/i.test(command)) {
if (!m.isGroup) return func.fail('group', m, conn, userdb)
await conn.sendWritingText(m.chat, `*Adios a todos, el Bot se despide! (≧ω≦)ゞ*`, userdb, m) 
return conn.groupLeave(m.chat)
}
if (/^((leave|salir|out)(degrupo|togroup))$/i.test(command)) {
if (!(m.quoted?.text && args[0])) return conn.sendWritingText(m.chat, `*[❗INFO❗]* Debe contestar a la lista del comando ${usedPrefix}grouplist indicando el Número Del grupo o los grupos separados por comas a los cuales quiere que el Bot abandone\n\nEjemplo:\n\n${usedPrefix+command} 1,2,3,50`, userdb, m)
const quotedText = m.quoted.text;
const lines = quotedText.split('\n');
let jidList = [];
let salidos = []
for (let line of lines) {
const match = line.match(/@([0-9-]+@g\.us)/);
if (match) jidList.push(match[1]);
}

const selectedIndexes = args[0].split(',').map(n => parseInt(n.trim()) - 1);
for (let i of selectedIndexes) {
const jid = jidList[i];
console.log('owWACheck: ', jid)
let q = {key: {remoteJid: jid, fromMe: true}, message: {extendedTextMessage: {text: `👋👋👋`}}}
await conn.sendWritingText(jid, `*Adios a todos, el Bot se despide! (≧ω≦)ゞ*`, userdb, q) 
if (jid) await conn.groupLeave(jid);
salidos.push(jid)
}
if (salidos.length) {
let txt = `Me he salido correctamente ${salidos.length == 1 ? 'del grupo:' : 'de los grupos:'}\n\n`
txt += salidos.map(j => `➤ @${j}`).join('\n')

return conn.sendWritingTextCI(m.chat, txt, {mentionedJid: conn.parseMention(txt), groupMentions: await conn.parseGroupMention(txt)}, userdb, m)
} else {
return conn.sendWritingText(m.chat, 'No me pude salir de ningún grupo.', userdb, m)
}
}
if (/^((set|cfg|cambiar)(pp|img|fp)bot)$/i.test(command)) {
let bot = conn.user.jid
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (/image/.test(mime)) {
let img = await q.download()
if (!img) return conn.sendWritingText(m.chat, `*[❗INFO❗] NO SE ENCONTRO LA IMAGEN, POR FAVOR RESPONDE A UNA IMAGEN USANDO EL COMANDO ${usedPrefix + command}*`, m)
await conn.updateProfilePicture(bot, img)
return conn.sendWritingText(m.chat, '*[❗INFO❗] SE CAMBIO CON EXITO LA FOTO DE PERFIL DEL NUMERO DEL BOT*', userdb, m)
} else return conn.sendWritingText(m.chat, `*[❗INFO❗] NO SE ENCONTRO LA IMAGEN, POR FAVOR RESPONDE A UNA IMAGEN USANDO EL COMANDO ${usedPrefix + command}*`, m)
}    
}
handler.before = async function before(m, {conn, isOwner, userdb, isROwner}) {
const {userID, sBroadCastID, groupID, lid} = await import('../config.js')
if ((m.chat === sBroadCastID || m.chat.endsWith(groupID)) && m.fromMe) return
if (/^join$/i.test(m.text.trim().toLowerCase()) && m.mtype === 'groupInviteMessage' && !m.fromMe && isROwner) {
const groupJid = m.message?.groupInviteMessage?.groupJid
const nameGroup = m.message?.groupInviteMessage?.groupName ? m.message?.groupInviteMessage?.groupName : await conn.getName(groupJid)
await conn.groupacceptInviteV4(m.chat, m.message.groupInviteMessage)
return conn.sendWritingText(m.chat, `Listo, unido a: ${nameGroup}`, userdb, m)
}
}
handler.help = ["block", "unblock"]
handler.tags = ["owner"]
handler.command = /^((un)?block(list)?|(join|nuevogrupo)|((set|cfg|cambiar)((pp|img|fp)bot|(lastseen|ultimovisto)|(profilepic|foto)|(status|estado)|(groupsadd|addgr(oups|upos))|(online|enlinea)|(readreceipts|confirmaciones)))|(f(etch)|mostrar)?p((riv)?(acity|acidad)?)|(leave|salir|out)(togroup|de(l)?grupo|gc)?)$/i
handler.rowner = true
handler.menu = [
{header: 'WA-SETTINGS', title: "🔒 BLOQUEAR", description: "Bloquea a un usuario mencionado o al dueño del bot si no se menciona a nadie: #block @tag", id: `block`},
{title: "🔓 DESBLOQUEAR", description: "Desbloquea a un usuario mencionado o al dueño del bot si no se menciona a nadie: #unblock @tag", id: `unblock`},
{title: "🔒 LISTA DE BLOQUEADOS", description: "Muestra la lista de números bloqueados", id: `blocklist`},
{ title: "🔗 UNIRSE A GRUPO", description: "Unirse a un grupo usando el enlace", id: `join` },
{title: "👋 SALIR DEL GRUPO", description: "Salir del grupo actual usando el comando #leave", id: `out`},
{title: "👋 SALIR DE UN GRUPO", description: "Salir de un grupo desde la lista del comando #grouplist usando el comando: #leavetogroup <1,2,3,50>", id: `outtogroup`},
{title: "📷 SETPPBOT", description: "Cambiar la foto de perfil del bot", id: `setppbot`},
{header: 'CONFIGURACIÓN DE PRIVACIDAD', title: "🟢 EN LÍNEA", description: "Configura la privacidad del estado en línea del Bot", id: `setonline`},
{title: "👀 EN LÍNEA (Último visto)", description: "Configura quién puede ver el último visto en linea del Bot: todos, contactos, nadie o personalizado", id: `setlastseen`},
{title: "🖼 FOTO DE PERFIL", description: "Configura quién puede ver la foto de perfil del Bot: todos, contactos, nadie o personalizado", id: `setprofilepic`},
{title: "💬 ESTADO", description: "Configura quién puede ver los estados publicados por el Bot: todos, contactos, nadie o personalizado", id: `setstatus`},
{title: "➕ AGREGAR A GRUPOS", description: "Configura quién puede agregar a grupos al bot: todos, contactos o nadie", id: `setgroupsadd`},
{title: "✔ CONFIRMACIONES DE LECTURA", description: "Activa o desactiva las confirmaciones de lectura", id: `setreadreceipts`},
{title: "🔍 PRIVACIDAD", description: "Muestra todas tus configuraciones de privacidad actuales", id: `fetchprivacy`}

];
handler.type = "owners";

handler.disabled = false;

export default handler
