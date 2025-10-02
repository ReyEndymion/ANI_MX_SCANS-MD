let handler = async (m, {conn, command, args, usedPrefix, text, isBotAdmin, isAdmin, groupMetadata, participants, chatdb, userdb, senderJid, isLidGroup}) => {
const { formatNumberWA, splitInternationalNumbers } = await import('../lib/functions.js');
const {userID, lid, owner, groupID} = await import('../config.js');
const _text = (await conn.textTagsLidToJid(text, m.chat)).replace(/\s/g, '')
text = _text
let messageToSend = '', q;
let usuariosNoRegistrados = [];
let usuariosADegradar = [];
let usuariosAPromover = [];
let yaAdmins = []
let noAdmins = []
let noGrupo = []
if (isBotAdmin && isAdmin) {
if((!text) && (m.quoted?.sender == undefined) && m.mentionedJid.length === 0 ) {
let resp = `*[❗] USO APROPIADO*\n\n*┯┷*\n*┠≽ ${usedPrefix + command} @tag o el numero*\n*NOTA: Si desea ${/^(promote|daradmin|darpoder)$/i.test(command) ? 'promover a' :'quitar de'} administradores a varios separe cada @tag o numero por una coma*\n*┠≽ ${usedPrefix + command} -> responder a un mensaje*\n*┷┯*`
return conn.sendWritingText(m.chat, resp, userdb, m);
} else if ((text) || m.quoted?.sender !== undefined || m.mentionedJid.length > 0 ) {
const creator = groupMetadata.owner || '';
const owners = owner.map(([number]) => (formatNumberWA(number) + userID))

let numeros = args.length > 0 ? splitInternationalNumbers(args.map(n => n.replace(/@/g, '')).join(' ').replace(/\s/g, '').split('@' || ' ')[0]).map(n => formatNumberWA(n.replace(/\+/g, ''))) : [m.quoted?.sender.split('@')[0]];
q = await conn.sendWritingText(m.chat, `Un Momento espere...`, userdb, m)

const participant = participants.sort(p => isLidGroup ? p.phoneNumber : p.id)
if (/^(demote|quitarpoder|quitaradmin)$/i.test(command)) {
for (const numero of numeros) {
let userJid = formatNumberWA(numero) + userID

const participantes = participants.find(u => isLidGroup ? u.phoneNumber === (userJid || m.quoted?.sender) : u.id === (userJid || m.quoted?.sender))
let [isRegistered] = await conn.onWhatsApp(numero);
if (!isRegistered?.exists) {
usuariosNoRegistrados.push(numero);
continue;
}
if (!participantes) {
noGrupo.push(`@${numero}`)
messageToSend = `*[❗] EL USUARIO @${numero} NO SE ENCUENTRA EN ESTE GRUPO*`
q = await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m)
continue
}
let mentionedIsAdmin = participantes.admin


if (mentionedIsAdmin === 'superadmin') {
if (userJid.includes(conn.user.jid)) {
messageToSend = `*[❗] EL BOT @${numero} ES CREADOR DE ESTE GRUPO*`
q = await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m)
continue
}
messageToSend = `*[❗] EL BOT NO PUEDE DEGRADAR AL CREADOR ${numero} DE ESTE GRUPO*`
q = await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m)
continue
}
if (mentionedIsAdmin === 'admin') {
if (userJid.includes(conn.user.jid)) {
messageToSend = `*[❗] EL BOT @${numero} NO PUEDE DEGRADARSE A SÍ MISMO*`
q = await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m)
continue
}
if (owners.includes(userJid) && !chatdb.modocomedia) {
q = await conn.sendEditWritingText(m.chat, `no se puede eliminar al owner @${numero} mientras sea admin`, q.key, userdb, m)
continue
}
usuariosADegradar.push(`@${numero}`)
await conn.groupParticipantsUpdate(m.chat, [userJid], 'demote')
}

if (mentionedIsAdmin === null) {
noAdmins.push(`@${numero}`)
if (owners.includes(userJid)) {
messageToSend = `Ya se habia quitado el Admin al owner @${numero}`
q = await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m)
continue
}
if (creator.includes(userJid)) {
messageToSend = `El creador @${numero} ya no era admin`
q = await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m)
continue
}
}

}

if (noGrupo.length > 0) {
messageToSend = `Los números ${noGrupo.join((', '))} No se encuentran en este grupo.`;
q = await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m)
}
if (usuariosNoRegistrados.length > 0) {
messageToSend = `Los siguientes números no están registrados en WhatsApp:\n${usuariosNoRegistrados.join(', ')}`;
q = await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m)
}
if (noAdmins.length > 0) {
let singularPlural = noAdmins.length > 1 ? `LOS USUARIOS: ${noAdmins.join(', ')} NO SON ADMINISTRADORES DEL GRUPO, NO LOS PUEDO DEGRADAR` : `EL USUARIO ${noAdmins} NO ES ADMINISTRADOR DEL GRUPO, NO LO PUEDO DEGRADAR`
messageToSend = `*[❗INFO❗] ${singularPlural}*` 
q = await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m)
}
if (usuariosADegradar.length > 0) {
messageToSend = `*[ ✅ ] ÓRDENES RECIBIDAS*`
let singularPlural = usuariosADegradar.length > 1 ? `\n\n[❗INFO❗] SE HA DEGRADADO A LOS ADMINISTRADORES: ${usuariosADegradar.join(', ')} A USUARIOS DEL GRUPO` : `\n\n[❗INFO❗] EL ADMINISTRADOR ${usuariosADegradar} SE A DEGRADADO A USUARIO DEL GRUPO`
messageToSend = !chatdb.detect ? `*${singularPlural}*` : ''
q = await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m)
}
if (!messageToSend) {
messageToSend = 'No se encontraron números válidos para degradar.';
q = await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m)
}
}
if (/^(promote|daradmin|darpoder)$/i.test(command)) {
for (const numero of numeros) {
let userJid = formatNumberWA(numero) + userID
let [isRegistered] = await conn.onWhatsApp(numero);
if (!isRegistered?.exists) {
usuariosNoRegistrados.push(numero);
continue;
}
if (!participant) continue

let mentionedIsAdmin = groupMetadata.participants.find(u => isLidGroup ? u.phoneNumber === (userJid || m.quoted?.sender) : u.id === (userJid || m.quoted?.sender)).admin
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
}
} else if (!isBotAdmin && isAdmin) {
let resp = `*[❗INFO❗] EL BOT NO ES ADMINISTRADOR DEL GRUPO, NO PUEDE REALIZAR ESTA ACCIÓN HASTA QUE LOD HAGAS ADMIN*`;
return conn.sendWritingText(m.chat, resp, userdb, m);
} else {
let resp = `*[❗INFO❗] SOLO UN ADMINISTRADOR DEL GRUPO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, userdb, m);
}

}
handler.help = ['*593xxx*','*@usuario*','*responder chat*'].map(v => 'demote ' + v)
handler.tags = ['group']
handler.command = /^(de|pro)mote|(quitar|dar)poder|(quitar|dar)admin$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null
handler.menu = [
{title:"💎 DEGRADAR/QUITAR ADMIN", description: `Degrada a alguien como admin usando #demote`, id: `demote`},
{title:"💎 PROMOVER/DAR ADMIN", description: "promueve a alguien como admin usando #promote", id: `promote`},
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
