import fetch from 'node-fetch';
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text, isMods, isOwner, isPrems }) => {
let link = (m.quoted ? m.quoted.text ? m.quoted.text : text : text) || text
let [_, code] = link.match(linkRegex) || []
/**
if (!('msgcount' in userInGroup)) userInGroup.msgcount = {};userInGroup.
if (!code && m.mtype === 'groupInviteMessage') {
return conn.groupAcceptInviteV4(m.chat, m.message.groupInviteMessage),
resp = "*El Bot aceptó la invitación a retornar a estegrupo.*";
} else */
if ( isPrems || isMods || isOwner || m.fromMe) {
if (!code) {
let resp = `*[ ⚠️ ALERTA ⚠️ ] LINK ERRÓNEO O FALTANTE*\n*👉🏻 INGRESE EL ENLACE DE UN GRUPO*\n\n*ejemplo:*\n*#join ${ganicmd}*\n\n*[❗INFO❗] NO RESPONDA A NINGÚN MENSAJE, PUEDE CAUSAR INTERFERENCIA, ESCRÍBALO ÚNICAMENTE COMO MENSAJE NUEVO*`
return conn.sendWritingText(m.chat, resp, m)
} else if (code) {
let tituloG = await obtenerInformacionGrupo(link)
const grupo = decodeEntity(tituloG)
//let links.replace(/;/g, '')conn.chats////
let chatsGroups = Object.entries(await conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
console.log(`join: `, chatsGroups )
let inGroup
for (let [jid, chat] of chatsGroups) {
if (chat.subject === grupo) inGroup = true
}
if (inGroup) {
let resp = `El bot ya esta en el grupo crack`
return conn.sendWritingText(m.chat, resp, m)
} else {
await conn.groupAcceptInvite(code)//.catch(await conn.groupAcceptInviteV4(m.chat, m.quoted))
let resp = `*EL BOT SE UNIÓ CON ÉXITO AL GRUPO ${grupo}, DISFRUTE DEL BOT! ✔️*`
return conn.sendWritingText(m.chat, resp, m)
}
}
} else {
if (!code) {
let resp = `*[ ⚠️ ALERTA ⚠️ ] LINK ERRÓNEO O FALTANTE*\n*👉🏻 INGRESE EL ENLACE DE UN GRUPO*\n\n*ejemplo:*\n*#join ${gofwhabot}*\n\n*POR CIERTO ESE ENLACE DE EJEMPLO ES UN GRUPO PARA QUE PUEDAN PEDIR LA SOLICITUD YA QUE LOS PRIVADOS SE ESTARÁN BLOQUEANDO POCO A POCO*\n\n*[❗INFO❗] NO RESPONDA A NINGÚN MENSAJE, PUEDE CAUSAR INTERFERENCIA, ESCRÍBALO ÚNICAMENTE COMO MENSAJE NUEVO*`
return conn.sendWritingText(m.chat, resp, m)
} else if (code) {
const data = global.owner.filter(([id]) => id)

for (let jid of data.map(([id]) => [id] + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
let resp = '*[❗INFO❗] NUEVA SOLICITUD DEL BOT PARA UN GRUPO [❗INFO❗]*\n\n*—◉ NÚMERO SOLICITANTE:* ' + 'wa.me/' + m.sender.split('@')[0] + '\n*—◉ LINK DEL GRUPO DÓNDE SE SOLICITA EL BOT ' + link
await conn.sendWritingText(jid, resp, m)
}
let resp = '*[❗INFO❗] EL LINK DEL GRUPO FUE ENVIADO A MI PROPIETARIO/A*\n\n*👉🏻 SU GRUPO ESTARÁ EN EVALUACIÓN Y EL PROPIETARIO/A DEL BOD DECIDIRÁ SI LO AGREGA O NO*\n\n*[❗INFO❗] ALGUNAS DE LAS RAZONES POR LAS QUE SU SOLICITUD PUEDE SER RECHAZADA:*\n\n*1.- EL BOT ESTÁ SATURADO*\n*2.- SE ELIMINÓ PREVIAMENTE AL BOT DEL GRUPO DONDE SE ESTÁ SOLICITANDO*\n*3.- EL LINK DEL GRUPO FUE RESTABLECIDO*\n*4.- EL BOT NO SE UNE A GRUPOS POR DECISIÓN DEL PROPIETARIO/A*\N*5.- AÚN NO ESTÁS EN LA ASOCIACIÓN DE GRUPOS*\n\n*👉🏻 TEN EN CUENTA QUE TU SOLICITUD PARA UNIR EL BOT A UN GRUPO PUEDE TARDAR HORAS O DÍAS EN SER RESPONDIDA, TEN PACIENCIA\n\n PARA DAR MÁS RAPIDEZ A ESTE PROCEDIMIENTO PONGA EL COMANDO #RAGOU PARA QUE PUEDAS VER LAS REGLAS DE LA ASOCIACIÓN Y NO SE TE OLVIDE LEER LA DESCRIPCIÓN DEL GRUPO DE PETICIONES PARA OBTENER EL COMANDO QUE TE DA EL GRUPO DE LA ASOCIACIÓN'
return conn.sendWritingText(m.chat, resp, m)
}
}
}

handler.help = ['join [chat.whatsapp.com]']
handler.tags = ['premium']
handler.command = /^join|nuevogrupo$/i
export default handler
handler.before = async function before(m, {conn, isOwner}) {
if ((m.chat.endsWith(sBroadCastID) || m.chat.endsWith(groupID) || m.chat.endsWith(lid)) && m.fromMe) return

if (/join/i.test(m.text) && m.mtype === 'groupInviteMessage' && !m.fromMe) {
const groupJid = m.message.groupInviteMessage.groupJid
const nameGroup = await conn.getName(groupJid)
console.log('NUEVA SOLICITUD DE GRUPO: ', nameGroup)
await conn.groupAcceptInviteV4(m.chat, m.message.groupInviteMessage)
return conn.sendWritingText(m.chat, `Listo, unido a: ${nameGroup}`, m)
}
}
/**Creditos a SinName https://wa.me/50246028932 por la pista que necesitanba para terminar este comando de aceptacion*/
async function obtenerInformacionGrupo(link) {
 try {
 const response = await fetch(link);
 if (response.ok) {
 const html = await response.text();
 
 const nombreGrupoMatch = html.match(/<meta property="og:title" content="([^"]+)" \/>/);
 const urlImagenGrupoMatch = html.match(/<meta property="og:image" content="([^"]+)" \/>/);

 if (nombreGrupoMatch && urlImagenGrupoMatch) {
 const nombreGrupo = nombreGrupoMatch[1]; // Obtener el nombre del grupo
 const urlImagenGrupo = urlImagenGrupoMatch[1]; // Obtener la URL de la imagen del grupo
 return nombreGrupoMatch[1].toString()
 // Aquí puedes comparar el nombre del grupo y la URL de la imagen del grupo con los datos de conn.chats
 // Por ejemplo:
 // Object.entries(conn.chats).forEach(([jid, chat]) => {
 // if (chat.name === nombreGrupo && chat.profile === urlImagenGrupo) {
 // console.log('El bot ya está en este grupo:', chat);
 // }
 // });
 } else {
 console.log('No se encontró la información del nombre del grupo o la URL de la imagen del grupo en el HTML.');
 }
 } else {
 console.log(`Error: ${response.statusText}`);
 }
 } catch (error) {
 console.error('Hubo un error al obtener la información del grupo:', error);
 }
}

function decodeEntity(input) {
return input.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
return String.fromCodePoint(parseInt(hex, 16));
});
}
