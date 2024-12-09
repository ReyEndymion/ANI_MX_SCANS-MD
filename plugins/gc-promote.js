let handler = async (m, { conn, command, args, usedPrefix, text, isBotAdmin, isAdmin, groupMetadata, participants }) => {
let messageToSend = '';
let usuariosNoRegistrados = [];
let usuariosAPromover = [];
let yaAdmins = []
if (isBotAdmin && isAdmin) {
if((!text || isNaN(text)) && (m.quoted?.sender == undefined) && m.mentionedJid.length === 0 && !text.match(conn.user.jid.split('@')[0]).map(u => u)[0] + userID === conn.user.jid) {
let resp = `*[❗] USO APROPIADO*\n\n*┯┷*\n*┠≽ ${usedPrefix + command} @tag*\n*┠≽ ${usedPrefix + command} -> responder a un mensaje*\n*┷┯*`
return conn.sendWritingText(m.chat, resp, m);
} else if ((text && !isNaN(text)) || m.quoted?.sender !== undefined || m.mentionedJid.length > 0 || text.match(conn.user.jid.split('@')[0]).map(u => u)[0] + userID === conn.user.jid) {
let _participants = participants.map(user => user.id)
const creator = groupMetadata.owner || '';
const owners = global.owner.map(([number]) => (conn.formatNumberWA(number) + '@s.whatsapp.net'))
let numeros = args.length > 0 ? args.join((' ' || ',')).split(/[\s,]+/).map(v => v.replace(/@/g, '')).map(v => v.replace(/@[^0-9]/g, '')).filter(v => v.length > 4 && v.length < 20) : [m.quoted?.sender.split('@')[0]];
for (const numero of numeros) {
let userJid = conn.formatNumberWA(numero) + userID
let [isRegistered] = await conn.onWhatsApp(userJid);
if (!isRegistered?.exists) {
usuariosNoRegistrados.push(numeros);
continue;
}

let mentionedIsAdmin = groupMetadata.participants.find(u => u.id === (userJid || m.quoted?.sender)).admin
if (mentionedIsAdmin === 'admin') {
yaAdmins.push(`@${numero}`)
if (userJid.includes(conn.user.jid)) {
messageToSend = `*[❗] EL BOT ${yaAdmins} YA ES ADMIN*`
continue
}
if (owners.includes(userJid)) {
messageToSend += `se ha hecho Admin al owner @${userJid.split('@')[0]}`
continue
}
if (creator.includes(userJid)) {
messageToSend += `El creador @${userJid.split('@')[0]} ya era admin`
continue
}
let singularPlural = yaAdmins.length > 1 ? `LOS USUARIOS: ${yaAdmins.join(', ')} YA SON ADMINISTRADORES DEL GRUPO, NO LOS PUEDO ASCENDER` : `EL USUARIO ${yaAdmins} YA ES ADMINISTRADOR DEL GRUPO, NO LO PUEDO ASCENDER`
messageToSend = `*[❗INFO❗] ${singularPlural}*\n\n`
}

if (mentionedIsAdmin === null) {
messageToSend = `*[ ✅ ] ÓRDENES RECIBIDAS:*\n\n`
usuariosAPromover.push(`@${numero}`)
await conn.groupParticipantsUpdate(m.chat, [userJid], 'promote')
let singularPlural = usuariosAPromover.length > 1 ? `SE HA PROMOVIDO A LOS USUARIOS: ${usuariosAPromover.join(', ')} A ADMINISTRADORES DEL GRUPO` : `EL USUARIO ${usuariosAPromover} SE A PROMOVIDO A ADMINISTRADOR DEL GRUPO`
messageToSend += `*[❗INFO❗] ${singularPlural}*`
}

}
if (usuariosNoRegistrados.length > 0) {
messageToSend += `Los siguientes números no están registrados en WhatsApp:\n${usuariosNoRegistrados.join(', ')}\n\n`;
}

if (!messageToSend) {
messageToSend = 'No se encontraron números válidos para eliminar.';
}
return conn.sendWritingText(m.chat, messageToSend, m);
}
} else if (!isBotAdmin && isAdmin)  {
let resp = `*[❗INFO❗] EL BOT NO ES ADMINISTRADOR DEL GRUPO, NO PUEDE REALIZAR ESTA ACCIÓN HASTA QUE LOD HAGAS ADMIN*`;
return conn.sendWritingText(m.chat, resp, m);
} else {
let resp = `*[❗INFO❗] SOLO UN ADMINISTRADOR DEL GRUPO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, m);
}

}
handler.tags = ['group']
handler.command = /^(promote|daradmin|darpoder)$/i
handler.group = true
export default handler

