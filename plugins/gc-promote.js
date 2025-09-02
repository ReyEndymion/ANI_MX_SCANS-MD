let handler = async (m, {conn, command, args, usedPrefix, text, isBotAdmin, isAdmin, groupMetadata, participants, chatdb, userdb, senderJid}) => {
const { formatNumberWA } = await import('../lib/functions.js');
const {userID, lid, owner} = await import('../config.js');
const _text = (await conn.textTagsLidToJid(text, m.chat)).replace(/\s/g, '')
text = _text
let messageToSend = '';
let usuariosNoRegistrados = [];
let usuariosAPromover = [];
let yaAdmins = []
if (isBotAdmin && isAdmin) {
if((!text || isNaN(text)) && (m.quoted?.sender == undefined) && m.mentionedJid.length === 0 ) {
let resp = `*[❗] USO APROPIADO*\n\n*┯┷*\n*┠≽ ${usedPrefix + command} @tag o el numero*\n*NOTA: Si desea hacer administradores a varios separe cada @tag o numero por una coma*\n*┠≽ ${usedPrefix + command} -> responder a un mensaje*\n*┷┯*`
return conn.sendWritingText(m.chat, resp, userdb, m);
} else if ((text && !isNaN(text)) || m.quoted?.sender !== undefined || m.mentionedJid.length > 0 || text.match(conn.user.jid.split('@')[0]).map(u => u)[0] + userID === conn.user.jid) {
const creator = groupMetadata.owner || '';
const owners = owner.map(([number]) => (formatNumberWA(number) + userID))
let numeros = args.length > 0 ? (await conn.textTagsLidToJid(!isNaN(text) ? text : args.join((' ' || ',').replace(/\s/g, '')), m.chat)).split(/[\s,]+/).map(v => v.replace(/@/g, '')).map(v => v.replace(/@[^0-9]/g, '')).filter(v => v.length > 4 && v.length < 20) : [m.quoted?.sender.split('@')[0]];
for (const numero of numeros) {
let userJid = formatNumberWA(numero) + userID
let [isRegistered] = await conn.onWhatsApp(userJid);
if (!isRegistered?.exists) {
usuariosNoRegistrados.push(numeros);
continue;
}

let mentionedIsAdmin = groupMetadata.participants.find(u => u.id.endsWith(lid) ? u.jid === (userJid || m.quoted?.sender) : u.id === (userJid || m.quoted?.sender)).admin
if (mentionedIsAdmin === 'admin') {
yaAdmins.push(`@${numero}`)
if (userJid.includes(conn.user.jid)) {
messageToSend = `*[❗] EL BOT ${yaAdmins} YA ES ADMIN*`
continue
}
if (owners.includes(userJid)) {
messageToSend += `Ya se habia hecho Admin al owner @${numero}`
continue
}
if (creator.includes(userJid)) {
messageToSend += `El creador @${numero} ya era admin`
continue
}
let singularPlural = yaAdmins.length > 1 ? `LOS USUARIOS: ${yaAdmins.join(', ')} YA SON ADMINISTRADORES DEL GRUPO, NO LOS PUEDO ASCENDER` : `EL USUARIO ${yaAdmins} YA ES ADMINISTRADOR DEL GRUPO, NO LO PUEDO ASCENDER`
messageToSend = `*[❗INFO❗] ${singularPlural}*\n\n`
}

if (mentionedIsAdmin === null) {
messageToSend = `*[ ✅ ] ÓRDENES RECIBIDAS*`
usuariosAPromover.push(`@${numero}`)
await conn.groupParticipantsUpdate(m.chat, [userJid], 'promote')
let singularPlural = usuariosAPromover.length > 1 ? `\n\n[❗INFO❗] SE HA PROMOVIDO A LOS USUARIOS: ${usuariosAPromover.join(', ')} A ADMINISTRADORES DEL GRUPO` : `\n\n[❗INFO❗] EL USUARIO ${usuariosAPromover} SE A PROMOVIDO A ADMINISTRADOR DEL GRUPO`
messageToSend += !chatdb.detect ? `*${singularPlural}*` : ''
}

}
if (usuariosNoRegistrados.length > 0) {
messageToSend += `Los siguientes números no están registrados en WhatsApp:\n${usuariosNoRegistrados.join(', ')}\n\n`;
}

if (!messageToSend) {
messageToSend = 'No se encontraron números válidos para promover.';
}
return conn.sendWritingText(m.chat, messageToSend, userdb, m);
}
} else if (!isBotAdmin && isAdmin) {
let resp = `*[❗INFO❗] EL BOT NO ES ADMINISTRADOR DEL GRUPO, NO PUEDE REALIZAR ESTA ACCIÓN HASTA QUE LOD HAGAS ADMIN*`;
return conn.sendWritingText(m.chat, resp, userdb, m);
} else {
let resp = `*[❗INFO❗] SOLO UN ADMINISTRADOR DEL GRUPO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, userdb, m);
}

}
handler.tags = ['group']
handler.command = /^(promote|daradmin|darpoder)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null
handler.help = [];
handler.menu = [
{title:"💎 DAR ADMIN", description: "promueve a alguien como admin usando #promote", id: `promote`},
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
