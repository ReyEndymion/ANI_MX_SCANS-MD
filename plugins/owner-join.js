import fetch from 'node-fetch';
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text, isMods, isOwner, isPrems }) => {
let resp
let link = (m.quoted ? m.quoted.text ? m.quoted.text : text : text) || text
let [_, code] = link.match(linkRegex) || []
/**
if (!('msgcount' in userInGroup)) userInGroup.msgcount = {};userInGroup.
    */
   console.log(`jid: `, !code && m.mtype === 'groupInviteMessage')
if ( isPrems || isMods || isOwner || m.fromMe) {
if (!code && m.mtype === 'groupInviteMessage') {
return conn.groupAcceptInviteV4(m.chat, m.quoted),
resp = "*El Bot aceptó la invitación a retornar a este  grupo.*";
} else if (!code) {
resp = `*[ ⚠️ ALERTA ⚠️ ] LINK ERRÓNEO O FALTANTE*\n*👉🏻 INGRESE EL ENLACE DE UN GRUPO*\n\n*ejemplo:*\n*#join ${gofwhabot}*\n\n*POR CIERTO ESE ENLACE DE EJEMPLO ES UN GRUPO PARA QUE PUEDAN PEDIR LA SOLICITUD YA QUE LOS PRIVADOS SE ESTARÁN BLOQUEANDO POCO A POCO*\n\n*[❗INFO❗] NO RESPONDA A NINGÚN MENSAJE, PUEDE CAUSAR INTERFERENCIA, ESCRÍBALO ÚNICAMENTE COMO MENSAJE NUEVO*`
} else if (code) {
let tituloG  = await obtenerInformacionGrupo(link)
const grupo = unescape(tituloG.replace(/;/g, ''))
//let links
let chatsGroups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
let inGroup
for (let [jid, chat] of chatsGroups) {
   
if (chat.subject === grupo) inGroup = true
}  
if (inGroup) {
      resp = `El bot ya esta en el grupo crack`
} else {
await conn.groupAcceptInvite(code)//.catch(await conn.groupAcceptInviteV4(m.chat, m.quoted))
resp = `*EL BOT SE UNIÓ CON ÉXITO AL GRUPO ${grupo}, DISFRUTE DEL BOT! ✔️*`
}
}
} else {
if (!code) {
resp = `*[ ⚠️ ALERTA ⚠️ ] LINK ERRÓNEO O FALTANTE*\n*👉🏻 INGRESE EL ENLACE DE UN GRUPO*\n\n*ejemplo:*\n*#join ${gofwhabot}*\n\n*POR CIERTO ESE ENLACE DE EJEMPLO ES UN GRUPO PARA QUE PUEDAN PEDIR LA SOLICITUD YA QUE LOS PRIVADOS SE ESTARÁN BLOQUEANDO POCO A POCO*\n\n*[❗INFO❗] NO RESPONDA A NINGÚN MENSAJE, PUEDE CAUSAR INTERFERENCIA, ESCRÍBALO ÚNICAMENTE COMO MENSAJE NUEVO*`
} else if (!code && m.mtype === 'groupInviteMessage' || code) {
const data = global.owner.filter(([id]) => id)

for (let jid of data.map(([id]) => [id] + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
let resp = '*[❗INFO❗] NUEVA SOLICITUD DEL BOT PARA UN GRUPO [❗INFO❗]*\n\n*—◉ NÚMERO SOLICITANTE:* ' + 'wa.me/' + m.sender.split('@')[0] + '\n*—◉ LINK DEL GRUPO DÓNDE SE SOLICITA EL BOT ' + link
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 1));
txt += c;
count++;
if (count % 10 === 0) {
   await conn.sendPresenceUpdate('composing' , jid);
}
}
await conn.sendMessage(jid, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
resp = '*[❗INFO❗] EL LINK DEL GRUPO FUE ENVIADO A MI PROPIETARIO/A*\n\n*👉🏻 SU GRUPO ESTARÁ EN EVALUACIÓN Y EL PROPIETARIO/A DEL BOD DECIDIRÁ SI LO AGREGA O NO*\n\n*[❗INFO❗] ALGUNAS DE LAS RAZONES POR LAS QUE SU SOLICITUD PUEDE SER RECHAZADA:*\n\n*1.- EL BOT ESTÁ SATURADO*\n*2.- SE ELIMINÓ PREVIAMENTE AL BOT DEL GRUPO DONDE SE ESTÁ SOLICITANDO*\n*3.- EL LINK DEL GRUPO FUE RESTABLECIDO*\n*4.- EL BOT NO SE UNE A GRUPOS POR DECISIÓN DEL PROPIETARIO/A*\N*5.- AÚN NO ESTÁS EN LA ASOCIACIÓN DE GRUPOS*\n\n*👉🏻 TEN EN CUENTA QUE TU SOLICITUD PARA UNIR EL BOT A UN GRUPO PUEDE TARDAR HORAS O DÍAS EN SER RESPONDIDA, TEN PACIENCIA\n\n PARA DAR MÁS RAPIDEZ A ESTE PROCEDIMIENTO PONGA EL COMANDO #RAGOU PARA QUE PUEDAS VER LAS REGLAS DE LA ASOCIACIÓN Y NO SE TE OLVIDE LEER LA DESCRIPCIÓN DEL GRUPO DE PETICIONES PARA OBTENER EL COMANDO QUE TE DA EL GRUPO DE LA ASOCIACIÓN'
}
}
if (resp === undefined) return
    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 10));
    txt += c;
    count++;
    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , m.chat);
    }
    }
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}

handler.help = ['join [chat.whatsapp.com]']
handler.tags = ['premium']
handler.command = /^join|nuevogrupo$/i
export default handler

async function obtenerInformacionGrupo(link) {
   try {
       // Hacer una solicitud HTTP al enlace de invitación
       const response = await fetch(link);
       
       // Verificar si la solicitud fue exitosa (código de estado 200)
       if (response.ok) {
         // Extraer el HTML de la respuesta
         const html = await response.text();
         
         // Buscar el nombre del grupo y la URL de la imagen del grupo en el HTML
         const nombreGrupoMatch = html.match(/<meta property="og:title" content="([^"]+)" \/>/);
         const urlImagenGrupoMatch = html.match(/<meta property="og:image" content="([^"]+)" \/>/);

         // Si se encontraron el nombre del grupo y la URL de la imagen del grupo
         if (nombreGrupoMatch && urlImagenGrupoMatch) {
             const nombreGrupo = nombreGrupoMatch[1]; // Obtener el nombre del grupo
             const urlImagenGrupo = urlImagenGrupoMatch[1]; // Obtener la URL de la imagen del grupo
             return nombreGrupoMatch[1].toString()
             // Aquí puedes comparar el nombre del grupo y la URL de la imagen del grupo con los datos de conn.chats
             // Por ejemplo:
             // Object.entries(conn.chats).forEach(([jid, chat]) => {
             //     if (chat.name === nombreGrupo && chat.profile === urlImagenGrupo) {
             //         console.log('El bot ya está en este grupo:', chat);
             //     }
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
