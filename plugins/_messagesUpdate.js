import { WAMessageStubType } from '@whiskeysockets/baileys'

export async function before(m, { conn }) {
    let chat = global.db.data.chats[m.chat] || {};

	if (!m.messageStubType || !m.isGroup) return
    let user = m.sender.split`@`[0]
	let usuario = `@${user}`
	let pp = dirP + 'src/avatar_contact.png';
		try {
		pp = await this.profilePictureUrl(m.messageStubParameters[0], 'image');
		  } catch (e) {}
	let apii = await conn.getFile(pp)
	let fkontak = { key: { participants: "0@s.whatsapp.net", remoteJid: "status@broadcast", fromMe: false, id: "Halo" }, message: { contactMessage: { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${user}:${user}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, participant: "0@s.whatsapp.net" }
    let groupMetadata = (await this.groupMetadata(m.chat)) || (conn.chats[m.chat] || {}).metadata;

	if (m.messageStubType == 21 && chat.detect) {
		let resp = `${usuario} Ha cambiado el nombre del grupo a:\n*${m.messageStubParameters[0]}*`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

	} else if (m.messageStubType == 22) {
		let resp = `${usuario} Ha cambiado la foto del grupo`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
 
	} else if (m.messageStubType == 1 || m.messageStubType == 23 || m.messageStubType == 132) {
		let resp = `${usuario} cambio el enlace del grupo\nAhora hay un nuevo enlace del grupo!!\n\n`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

	} else if (m.messageStubType == 24) {
		let resp = `${usuario} 𝙉Ha cambiado la descripcion del grupo, ahora dice:\n\n${m.messageStubParameters[0]}`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

	} else if (m.messageStubType == 25) {
		let resp = `🔒 ${usuario} AHORA *${m.messageStubParameters[0] == 'on' ? 'SOLO ADMINS' : 'TODOS'}* PUEDE EDITAR LAS INFORMACION DEL GRUPO.`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

	} else if (m.messageStubType == 26) {
		let resp = `🔓 ${usuario} EL GRUPO *${m.messageStubParameters[0] == 'on' ? 'ESTA CERRADO' : 'ESTA ABIERTO'}*\n ${m.messageStubParameters[0] == 'on' ? 'SOLO ADMINS' : 'TODOS'} PUEDEN ENVIAR MENSAJES.`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

	} else if (m.messageStubType == 27 && chat.welcome) {

	let inv = /\d+@g.us/.test(m.sender) ? 'DESDE EL ENLACE DE INVITACION SE' : usuario;
	let resp = `${inv} AÑADIO A @${m.messageStubParameters[0].split`@`[0]}\n\n*╔══════════════*\n*╟❧ ${await this.getName(m.chat)}*\n*╠══════════════*\n*╟❧ @${m.messageStubParameters[0].split`@`[0]}*\n*╟❧ BIENVENIDO/A* \n*║*\n*╟❧ DESCRIPCIÓN DEL GRUPO:*\n*╟❧* ${groupMetadata.desc?.toString() || '*SIN DESCRIPCION*'} \n*║*\n*╟❧ DISFRUTA TU ESTANCIA!!*\n*╚══════════════*`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { image: {url: pp}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );  
   	} else if (m.messageStubType == 28 && chat.welcome) {
   let resp = `╔══════════════*\n*║〘 *EXPULSADO* 〙*\n*╠══════════════*\n║*_☠ ${usuario} ELIMINO A @${m.messageStubParameters[0].split`@`[0]}, si lo Sacaron tendran sus motivos_*\n║*_Si no regresa..._*\n║ *_Nadie l@ va a extrañar 😇👍🏼_*\n*╚══════════════*`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { image: {url: pp}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );  
	} else if (m.messageStubType == 29) {
		let resp = `AHORA ES ADMIN EN ESTE GRUPO @${m.messageStubParameters[0].split`@`[0]}\n\n🌎🫵ACCIÓN REALIZADA POR: ${usuario}`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
	} else if (m.messageStubType == 30) {
		let resp = `DEJA DE SER ADMIN EN ESTE GRUPO @${m.messageStubParameters[0].split`@`[0]}\n\n🌎🫵ACCION REALIZADA POR: ${usuario}`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
    } else if (m.messageStubType ==  32 && chat.welcome) {
		let resp = `╔══════════════*\n*║〘 *ADIÓS*〙*\n*╠══════════════*\n║*_Se fue @${m.messageStubParameters[0].split`@`[0]} del Grupo_*\n║*_Tal vez alguien si lo extrañe o nada mas vino a mirar..._*\n║ *_Esperamos que le vaya bien 😇👍🏼_*\n*╚══════════════*`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { image: {url: pp}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

	} else if (m.messageStubType == 72) {
		let resp = `${usuario} CAMBIO LAS DURACIÓN DEL LOS MENSAJE TEMPORALES A *@${m.messageStubParameters[0]}*`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

	} else if (m.messageStubType == 123) {
		let resp = `${usuario} *DESACTIVÓ* LOS MENSAJE TEMPORAL..`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

	} else {
		console.log({
			messageStubType: m.messageStubType,
	    messageStubParameters: m.messageStubParameters,
	    type: WAMessageStubType[m.messageStubType], 
		});
	}
}
