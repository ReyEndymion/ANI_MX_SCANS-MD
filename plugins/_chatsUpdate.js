import { WAMessageStubType } from '@whiskeysockets/baileys'
import path, {join} from 'path'

export async function before(m, { conn, groupMetadata }) {
if (!m.isGroup) return  
let chats = global.db.data.bot[conn.user.jid].chats || {}
let chat = chats.groups[m.chat] || {}
    let resp, imagen
	if (!m.messageStubType || !m.isGroup || resp === '' || chat.isBanned) return

    let sender = m.sender.split`@`[0]
    let user = `@${sender}`
    let who = m.messageStubParameters[0]
    let whoUser = `@${who.split`@`[0]}`
    let contact, parti
    if (m.sender.endsWith('@g.us')) {
        parti = m.messageStubParameters[0]
        contact = `${m.messageStubParameters}`.split`@`[0]
    } else {
        parti = m.sender
        contact = sender
    }
	let fkontak = { key: { participants: parti, remoteJid: await conn.getName(m.chat), fromMe: false, id: "" }, message: { contactMessage: { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${contact}:${contact}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, participant: parti }
//console.log('chatUpdate: ', m.sender.endsWith('@g.us'), fkontak)
    if (chat.detect && (m.messageStubType === 21 || m.messageStubType === 22 || m.messageStubType === 23 || m.messageStubType === 24 || m.messageStubType === 25 || m.messageStubType === 26 || m.messageStubType === 29 || m.messageStubType === 30 || m.messageStubType === 72 || m.messageStubType === 123)) {
	if (m.messageStubType === 21) {
		resp = `${user} Ha cambiado el nombre del grupo a:\n*${m.messageStubParameters[0]}*`
	} 
    if (chat.detect && m.messageStubType === 22) {
		resp = `${user} Ha cambiado la foto del grupo`
	}
    if (chat.detect && m.messageStubType === 23) {
		resp = `${user} cambio el enlace del grupo\nAhora hay un nuevo enlace del grupo!!\n\n`
	}
    if (chat.detect && m.messageStubType === 24) {
		resp = `${user} Ha cambiado la descripcion del grupo, ahora dice:\n\n${m.messageStubParameters[0]}`
	}
    if (chat.detect && m.messageStubType === 25) {
		resp = `🔒 ${user} AHORA *${m.messageStubParameters[0] === 'on' ? 'SOLO ADMINS' : 'TODOS'}* PUEDEN EDITAR LAS INFORMACION DEL GRUPO.`
	}
    if (m.messageStubType === 26) {
		resp = `🔓 ${user} EL GRUPO *${m.messageStubParameters[0] === 'on' ? 'ESTA CERRADO' : 'ESTA ABIERTO'}*\n ${m.messageStubParameters[0] === 'on' ? 'SOLO ADMINS' : 'TODOS'} PUEDEN ENVIAR MENSAJES.`
	}
    if (chat.detect && m.messageStubType === 29) {
		resp = `AHORA ES ADMIN EN ESTE GRUPO @${m.messageStubParameters[0].split`@`[0]}\n\n🌎🫵ACCIÓN REALIZADA POR: ${user}`
	}
    if (chat.detect && m.messageStubType === 30) {
		resp = `DEJA DE SER ADMIN EN ESTE GRUPO @${m.messageStubParameters[0].split`@`[0]}\n\n🌎🫵ACCION REALIZADA POR: ${user}`
    }
    if (chat.detect && m.messageStubType === 72) {
		resp = `${user} CAMBIO LAS DURACIÓN DEL LOS MENSAJE TEMPORALES A *@${m.messageStubParameters[0]}*`
	}
    if (chat.detect && m.messageStubType === 123) {
		resp = `${user} *DESACTIVÓ* LOS MENSAJE TEMPORALES..`
    }
    }

    if ((m.messageStubType == 27 || m.messageStubType == 28 || m.messageStubType ==  32) && chat.welcome) {
    //let groupMetadata = (await conn.groupMetadata(m.chat)) || (conn.chats[m.chat] || {}).metadata;
	let pp = await this.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => null) || join(media, 'pictures/sinFoto.png');
    if (m.messageStubType == 27 && chat.welcome) {
    imagen = pp
	let inv = /\d+@g.us/.test(m.sender) ? 'DESDE EL ENLACE DE INVITACION SE' : user;
    let welcomeUsers = '';
    for (let param of m.messageStubParameters) {
        welcomeUsers += `@${param.split('@')[0]}, `;
    }
    welcomeUsers = welcomeUsers.slice(0, -2); // Eliminar la coma extra al final

    let sWelcome = chat.sWelcome.replace('@user', `${m.messageStubParameters[0].split`@`[0]}`).replace('@group', `${await conn.getName(m.chat)}`).replace('@desc', `${groupMetadata.desc?.toString() || '*SIN DESCRIPCION*'}`)
	let welcome = `${inv} AÑADIO A @${m.messageStubParameters[0].split`@`[0]}\n\n*╔══════════════*\n*╟❧ ${await conn.getName(m.chat)}*\n*╠══════════════*\n*╟❧ @${m.messageStubParameters[0].split`@`[0]}*\n*╟❧ BIENVENIDO/A* \n*║*\n*╟❧ DESCRIPCIÓN DEL GRUPO:*\n*╟❧* ${groupMetadata.desc?.toString() || '*SIN DESCRIPCION*'} \n*║*\n*╟❧ DISFRUTA TU ESTANCIA!!*\n*╚══════════════*`
    resp = m.messageStubType == 27 ? sWelcome : welcome
   	}
    if (m.messageStubType == 28 && chat.welcome) {
    imagen = pp
    resp = `╔══════════════*\n*║〘 *EXPULSADO* 〙*\n*╠══════════════*\n║*_☠ ${user} ELIMINO A @${m.messageStubParameters[0].split`@`[0]}, si lo Sacaron tendran sus motivos_*\n║*_Si no regresa..._*\n║ *_Nadie l@ va a extrañar 😇👍🏼_*\n*╚══════════════*`
	}
    if (m.messageStubType ==  32 && chat.welcome) {
    imagen = pp
	resp = `╔══════════════*\n*║〘 *ADIÓS*〙*\n*╠══════════════*\n║*_Se fue @${m.messageStubParameters[0].split`@`[0]} del Grupo_*\n║*_Tal vez alguien si lo extrañe o nada mas vino a mirar..._*\n║ *_Esperamos que le vaya bien 😇👍🏼_*\n*╚══════════════*`
	}
    }
let txt = '';
let count = 0;
if (resp === undefined) return
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;
    if (count % 10 === 0) {
        await conn.sendPresenceUpdate('composing' , m.chat);
    }
}
if (resp && imagen) {
return conn.sendMessage(m.chat, { image: {url: imagen}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
if (resp && !imagen) {
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
}