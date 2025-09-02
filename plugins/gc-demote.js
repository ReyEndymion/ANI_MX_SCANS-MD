import { getCommandVariants } from "../lib/functions.js"
let handler = async (m, {conn, command, args, usedPrefix, text, isBotAdmin, isAdmin, groupMetadata, participants, chatdb, userdb, senderJid}) => {
const { formatNumberWA } = await import('../lib/functions.js');
const {userID, lid, owner} = await import('../config.js');
const _text = (await conn.textTagsLidToJid(text, m.chat)).replace(/\s/g, '')
text = _text
let messageToSend = '';
let usuariosNoRegistrados = [];
let usuariosADegradar = [];
let noAdmins = []
if (isBotAdmin && isAdmin) {
if((!text || isNaN(text)) && (m.quoted?.sender == undefined) && m.mentionedJid.length === 0 ) {
let resp = `*[❗] USO APROPIADO*\n\n*┯┷*\n*┠≽ ${usedPrefix + command} @tag o el numero*\n*NOTA: Si desea quitar de administradores a varios separe cada @tag o numero por una coma*\n*┠≽ ${usedPrefix + command} -> responder a un mensaje*\n*┷┯*`
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
if (mentionedIsAdmin === null) {
noAdmins.push(`@${numero}`)
if (userJid.includes(conn.user.jid)) {
messageToSend = `*[❗] EL BOT ${noAdmins} NO ES ADMIN*`
continue
}
if (owners.includes(userJid)) {
messageToSend += `Ya se habia quitado el Admin al owner @${numero}`
continue
}
if (creator.includes(userJid)) {
messageToSend += `El creador @${numero} ya no era admin`
continue
}
let singularPlural = noAdmins.length > 1 ? `LOS USUARIOS: ${noAdmins.join(', ')} NO SON ADMINISTRADORES DEL GRUPO, NO LOS PUEDO DEGRADAR` : `EL USUARIO ${noAdmins} NO ES ADMINISTRADOR DEL GRUPO, NO LO PUEDO DEGRADAR`
messageToSend = !chatdb.detect ? `*[❗INFO❗] ${singularPlural}*\n\n` : ''
}

if (mentionedIsAdmin === 'admin') {
messageToSend = `*[ ✅ ] ÓRDENES RECIBIDAS*`
usuariosADegradar.push(`@${numero}`)
await conn.groupParticipantsUpdate(m.chat, [userJid], 'demote')
let singularPlural = usuariosADegradar.length > 1 ? `\n\n[❗INFO❗] SE HA DEGRADADO A LOS ADMINISTRADORES: ${usuariosADegradar.join(', ')} A USUARIOS DEL GRUPO` : `\n\n[❗INFO❗] EL ADMINISTRADOR ${usuariosADegradar} SE A DEGRADADO A USUARIO DEL GRUPO`
messageToSend += !chatdb.detect ? `*${singularPlural}*` : ''
}

}
if (usuariosNoRegistrados.length > 0) {
messageToSend += `Los siguientes números no están registrados en WhatsApp:\n${usuariosNoRegistrados.join(', ')}\n\n`;
}

if (!messageToSend) {
messageToSend = 'No se encontraron números válidos para degradar.';
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
handler.help = ['*593xxx*','*@usuario*','*responder chat*'].map(v => 'demote ' + v)
handler.tags = ['group']
handler.command = /^(demote|quitarpoder|quitaradmin)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null
handler.menu = [
{title:"💎 QUITAR ADMIN", description: `Degrada a alguien como admin usando:\n${getCommandVariants(handler.command).map(hc => `#${hc} <tag>`).join('\n')}`, id: `demote`},
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
