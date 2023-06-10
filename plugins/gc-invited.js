const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@whiskeysockets/baileys')).default
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
import fetch from 'node-fetch'
import fs from 'fs'

let handler = async (m, { conn, args, participants, text, jid }) => {
  m.reply(`espere un momento... procesando invitacion`)
    // Obtener los usuarios a invitar
    let _participants = participants.map(user => user.id)
    let users = (await Promise.all(
        text.split(',').map(v => v.replace(/[^0-9]/g, ''))
            .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
            .map(async v => [v, await conn.onWhatsApp(v + '@s.whatsapp.net')
            ])
    )).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us')
    const invited = users.map(jid => ({
      tag: 'participant', attrs: { jid } }))

    for (const user of invited) {
      const jid = user.attrs.jid
    let name = (await conn.groupMetadata(m.chat)).subject
    let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)
    const invite_code_exp = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    try {
        var pp = await conn.profilePictureUrl(m.chat, 'image')
        var img = await (await fetch(pp)).buffer()
    } catch {
        var img = fs.readFileSync('./src/avatar_contact.png')
    }
    const inviteMessage = `🌎 Que tal, soy el Bot ${wm} que esta en este grupo, me han pedido que te envié está invitación porque no te pude añadir, esperemos que aceptes... Bienvenido al grupo 🌏🤝🏼`
        /*var messaa = await prepareWAMessageMedia({ image: img }, { upload: conn.waUploadToServer })
        var prep = generateWAMessageFromContent(m.chat, proto.Message.fromObject({ groupInviteMessage: { 
          groupJid: m.chat,  
          inviteCode: link, 
          inviteExpirationTimestamp: invite_code_exp.getTime(), groupName: name, 
          caption: inviteMessage, 
          jpegThumbnail: messaa }}), */
    ///*
    let prep = generateWAMessageFromContent(m.chat, {
        extendedTextMessage: {
            text: inviteMessage,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    body: false,
                    containsAutoReply: true,
                    mediaType: 1,
                    mediaUrl: link,
                    renderLargerThumbnail: true,
                    showAdAttribution: false,
                    sourceId: name,
                    sourceUrl: link,
                    thumbnail: img,
                    thumbnailUrl: img,
                    title: name
                    }
                }
            }
         },//*/
     { userJid: jid, quoted: m })     
      let isBlocked = []
      let devol = isBlocked ? `Listo @${m.sender.split('@')[0]} Se ha enviado la invitación a @${jid.split('@')[0]} pero se tuvieron que desbloquear algunos usuarios seleccionados.` : `Listo @${m.sender.split('@')[0]} Se ha enviado la invitación a @${jid.split('@')[0]} los usuarios seleccionados.`
      if (isBlocked.includes(user)) {
        await conn.updateBlockStatus(m.chat, 'unblock')
        await delay (1 * 40000)
      conn.relayMessage(jid, prep.message, {
        messageId: prep.key.id,
        user: conn.user.jid
      });
        //await conn.sendMessage(user, groupInvite, 'groupInviteMessage', { sendEphemeral: true, ephemeralDuration: 60 * 1000 })
      } else {
        await delay (1 * 40000)
        conn.relayMessage(jid, prep.message, {
          messageId: prep.key.id,
          user: conn.user.jid
        });

       await conn.sendMessage (m.chat, {text: devol}, { mentions: conn.parseMention(devol)})
        //await conn.sendMessage(user, groupInvite, 'groupInviteMessage', { sendEphemeral: true, ephemeralDuration: 60 * 1000 })
        //await conn.sendMessage(m.chat, `*✅ INVITACIÓN ENVIADA A @${user.split('@')[0]}*`)
        }
      }
    }


handler.help = ['invite', 'invitar'].map(v => v + ' número')
handler.tags = ['group']
handler.command = /^(invite|invitar)$/i
handler.admin = handler.group = handler.botAdmin = true
export default handler



/*
const { generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default
import fetch from 'node-fetch'
import fs from 'fs'
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let handler = async (m, { conn, args, text, participants, usedPrefix, command  }) => {
    let name = (await conn.groupMetadata(m.chat)).subject
    let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)

    try {
      let _participants = participants.map(user => user.id)
    let users = (await Promise.all(
      text.split(',')
      .map(v => v.replace(/[^0-9]/g, ''))
      .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
      .map(async v => [v, await conn.onWhatsApp(v + '@s.whatsapp.net')]))).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us')
            
        var pp = await conn.profilePictureUrl(m.chat, 'image')
        var img = await (await fetch(pp)).buffer() || fs.readFileSync('./src/avatar_contact.png')
        
    //for (const user of response.filter(item => item.attrs.error == 403)) {
      //const jid = user.attrs.jid
    let prep = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: `*${link}*`, contextInfo: { externalAdReply: { 
        body: false, 
        containsAutoReply: true, 
        mediaType: 1, 
        mediaUrl: link, 
        renderLargerThumbnail: true, 
        showAdAttribution: false, 
        sourceId: name, 
        sourceUrl: link, 
        thumbnail: img, 
        thumbnailUrl: img, 
        title: name
    }}}}, {userJid: conn.user.jid, quoted: m })
    if (users == conn.updateBlockStatus(m.chat, 'block')) {
      let isBlocked = await conn.getBlockedIds()
      if (isBlocked.includes(users)) {
        await conn.updateBlockStatus(m.chat, 'unblock')
        await conn.sendMessage(user, groupInvite, 'groupInviteMessage', { sendEphemeral: true, ephemeralDuration: 60 * 1000 })
      } else {
        await conn.sendMessage(user, groupInvite, 'groupInviteMessage', { sendEphemeral: true, ephemeralDuration: 60 * 1000 })
await conn.sendMessage(m.chat, `*✅ INVITACIÓN ENVIADA A @${user.split('@')[0]}*`)
}
}
await delay(1 * 20000)  
conn.relayMessage(m.sender, prep.message, { messageId: prep.key.id })
//}
} catch (e) {
  console.log(e)
  throw `[❗] OCURRIÓ UN ERROR ${e}`
  
    }

  }

handler.help = ['invite', 'invitar'].map(v => v + ' número')
handler.tags = ['group']
handler.command = /^(invite|invitar)$/i
handler.admin = handler.group = handler.botAdmin = true
export default handler
*/
/*
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';
import fs from 'fs';

let handler = async (m, { conn, args }) => {
  const number = args[0]; // número del usuario obtenido a través de una expresión regular
  const groupId = m.chat; // ID del grupo en el que se encuentra el bot
  const groupName = (await conn.groupMetadata(groupId)).subject; // Nombre del grupo

  // Generar el enlace de invitación del grupo
  const groupInviteLink = `https://chat.whatsapp.com/${await conn.groupInviteCode(groupId)}`;

  // Descargar la imagen de perfil del grupo
  let img;
  try {
    const pp = await conn.getProfilePicture(groupId);
    img = await (await fetch(pp.imgUrl)).buffer();
  } catch (e) {
    img = fs.readFileSync('./src/avatar_contact.png');
  }
let user = number + '@s.whatsapp.net'
  // Crear el mensaje de WhatsApp
  const message = generateWAMessageFromContent(user, {
    extendedTextMessage: {
      text: `¡Hola! Te estoy enviando el enlace de invitación al grupo *${groupName}*: ${groupInviteLink}`,
      contextInfo: {
        externalAdReply: {
          body: false,
          containsAutoReply: true,
          mediaType: proto.ExternalAdReply.MediaType.IMAGE,
          mediaUrl: groupInviteLink,
          renderLargerThumbnail: true,
          showAdAttribution: false,
          sourceId: groupName,
          sourceUrl: groupInviteLink,
          thumbnail: await prepareWAMessageMedia({ mimetype: 'image/jpeg', buffer: img }),
          title: groupName,
        },
      },
    },
  });

  // Enviar el mensaje al usuario
  conn.relayWAMessage(user, message, { waitForAck: true });
};

handler.command = /^invitar?$/i;
handler.help = ['invitar <número>'];
handler.tags = ['admin'];

export default handler;
*/

/*
let { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@whiskeysockets/baileys')).default
import fetch from 'node-fetch'
let handler = async (m, { conn, text, participants, usedPrefix, command, args }) => {
  if (!global.db.data.settings[conn.user.jid].restrict) throw '*[ ⚠️ ] EL OWNER TIENE RESTRINGIDO (_enable restrict_ / _disable restrict_) EL USO DE ESTE COMANDO*'
  if (!args[0]) throw '*[❗] INGRESE EL USUARIO QUE DESEE INVITAR*'
    
  try {
    let _participants = participants.map(user => user.id)
    let users = (await Promise.all(
      text.split(',')
      .map(v => v.replace(/[^0-9]/g, ''))
      .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
      .map(async v => [v, await conn.onWhatsApp(v + '@s.whatsapp.net')]))).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us')
      const pp = await conn.getProfilePicture(conn.user.jid).catch(_ => null)
      const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0)
      
    const inviteLink = await conn.getGroupInviteLink(m.chat) // Obtener el enlace de invitación al grupo
      
    for (const user of users.filter(item => item.attrs.error == 403)) {
    const jid = user.attrs.jid
    const inviteMessage = `👺 Que tal, soy el 𝓑𝓸𝓽 𝓒𝓸𝓶𝓮𝓭𝓲𝓪 de este grupo y me han pedido que te envié este código de invitación del grupo para invitarte. Para unirte al grupo, ingresa el siguiente código: ${inviteLink}. Bienvenido al grupo 👺🤝🏼`
    const expirationDate =  new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 días a partir de ahora
    const formattedDate = expirationDate.toLocaleString()
    var messaa = await prepareWAMessageMedia({ image: jpegThumbnail }, { upload: conn.waUploadToServer })
        var groupInvite = generateWAMessageFromContent(m.chat, proto.Message.fromObject({ groupInviteMessage: { groupJid: m.chat,  inviteCode: inviteLink, inviteExpiration: formattedDate, groupName: await conn.getName(m.chat), caption: inviteMessage, jpegThumbnail: messaa }}), { userJid: jid })
        conn.relayMessage(jid, groupInvite.message, { messageId: groupInvite.key.id })
          }
    
    for (let user of users) {
      let isBlocked = await conn.getBlockedIds()
      if (isBlocked.includes(user)) {
        await conn.updateBlockStatus(m.chat, 'unblock')
        await conn.sendMessage(user, groupInvite, 'groupInviteMessage', { sendEphemeral: true, ephemeralDuration: 60 * 1000 })
      } else {
        await conn.sendMessage(user, groupInvite, 'groupInviteMessage', { sendEphemeral: true, ephemeralDuration: 60 * 1000 })
await conn.sendMessage(m.chat, `*✅ INVITACIÓN ENVIADA A @${user.split('@')[0]}*`)
}
}

} catch (e) {
console.log(e)
//throw '[❗] OCURRIÓ UN ERROR'
}
}
handler.help = ['invite', 'invitar'].map(v => v + ' número')
handler.tags = ['group']
handler.command = /^(invite|invitar)$/i
handler.admin = handler.group = handler.botAdmin = true
export default handler
*/