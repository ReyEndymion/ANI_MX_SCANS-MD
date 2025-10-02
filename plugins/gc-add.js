let { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@whiskeysockets/baileys')).default
import fetch from 'node-fetch'
const { getBinaryNodeChild, getBinaryNodeChildren } = (await import('@whiskeysockets/baileys')).default
let handler = async (m, {conn, text, participants, usedPrefix, command, args, isAdmin, isBotAdmin, isOwner, isROwner, botdb, userdb, senderJid, objs, isLidGroup}) => {
const { userID, lid, groupID } = await import('../config.js');
const {inMstore, dbGroups} = objs
const {findJidInAllGroups} = await import('../lib/functions.js')
if (!botdb.settings.restrict) {
return conn.sendWritingText(m.chat, `*[ ⚠️ ] EL OWNER TIENE RESTRINGIDO (_enable restrict_ / _disable restrict_) EL USO DE ESTE COMANDO*`, userdb, m)
} else {
if (isBotAdmin && (isAdmin || isOwner || isROwner)) {
if (!args[0]) {
return conn.sendWritingText(m.chat, `*[❗] INGRESE EL USUARIO QUE DESEE AGREGAR*\n\nAhora en caso de que el usuario tenga activadas las configuraciones de proteccion de grupos, use *${usedPrefix+command} el numero y un mensaje personalizado* para que se envie la invitacion a su privado\n\nEjemplo: ${usedPrefix+command} 54321678900 tienes que entrar a este grupo`, userdb, m)
} else {
let textPersonal = text.split(args[0])[1]
try {
let _participants = participants.map(user => isLidGroup ? user.phoneNumber : user.id)
let users = (await Promise.all(text.split(',').map(v => conn.formatNumberWA(v).replace(/[^0-9]/g, '')).filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + userID)).map(async v => [v, await conn.onWhatsApp(v + userID)]))).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us')
const response = await conn.query({ tag: 'iq', attrs: { type: 'set', xmlns: 'w:g2', to: m.chat }, content: users.map(jid => ({ tag: 'add', attrs: {}, content: [{ tag: 'participant', attrs: { jid } }]}))})
const pp = await conn.profilePictureUrl(m.chat).catch(_ => null)
const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0)
const add = getBinaryNodeChild(response, 'add')
const participant = getBinaryNodeChildren(add, 'participant')
for (const user of participant.filter(item => item.attrs.error == 403)) {
if (user.attrs.error) {
const jid = user.attrs.jid
const content = getBinaryNodeChild(user, 'add_request')
const invite_code = content.attrs.code
const invite_code_exp = content.attrs.expiration
const groupName = await conn.getName(m.chat)
let resp = `*[❗INFO❗] no fue posible añadir el numero del usuario @${jid.split('@')[0]} que ingreso, esto puede ocurrir porque el numero este incorrecto, la persona se haya salido recientemente del grupo o la persona haya configurado su privacidad de grupos, pero se envió una invitación privada!!*`
await conn.sendWritingText(m.chat, resp, userdb, m)
const inviteMessage = textPersonal !== '' ? textPersonal : `🌎 Que tal, soy el Bot ANI MX SCANS y vengo del grupo (${groupName}), me han pedido que te envié está invitación porque no te pude añadir, esperemos que aceptes... Bienvenido al grupo 🌏🤝🏼`
var messaa = await prepareWAMessageMedia({ image: jpegThumbnail }, { upload: conn.waUploadToServer })
var groupInvite = generateWAMessageFromContent(m.chat, proto.Message.create({ groupInviteMessage: { groupJid: m.chat, inviteCode: invite_code, inviteExpiration: invite_code_exp, groupName: groupName, caption: inviteMessage, jpegThumbnail: messaa }}), { userJid: jid })
await conn.writing(jid, inviteMessage)
return conn.relayMessage(jid, groupInvite.message, { messageId: groupInvite.key.id })
}
}
} catch (e) {
let resp = `*[❗INFO❗] NO FUE POSIBLE AÑADIR EL NUMERO QUE INGRESO, ESTO PUEDE OCURRIR PORQUE EL NUMERO ESTE INCORRECTO, LA PERSONA SE HAYA SALIDO RECIENTEMENTE DEL GRUPO O LA PERSONA HAYA CONFIGURADO SU PRIVACIDAD DE GRUPOS, TE ACONSEJAMOS ENVIALE LA INVITACION MANUALMENTE!!*\n el codigo es ${e.stack}`
return conn.sendWritingText(m.chat, resp, userdb, m)
///**/
}
}
} else {
return conn.sendWritingText(m.chat, `*[❗] NO SOY ADMIN EN ESTE GRUPO*`, userdb, m)
}
}
}
handler.help = ['add', '+'].map(v => v + ' número')
handler.tags = ['group']
handler.command = /^(add|agregar|añadir|\+)$/i
handler.admin = handler.group = handler.botAdmin = true
handler.menu = [
{title: "💎 AGREGAR", description: "añadir a alguien al grupo usando #add", id: `add`},
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
