let handler = async (m, {conn, info, command, participants, groupMetadata, args, db, userdb, senderJid}) => {
const path = await import('path')
const fs = await import('fs')
const { temp, media, userID, lid } = await import('../config.js')
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => v.id.endsWith(lid) ? `${i + 1}. @${v.jid.split('@')[0]}` : `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
if (/^(admins|@admins|dmins)$/i.test(command)) {
const { randomString } = await import('../lib/functions.js');
let { default: fetch } = await import('node-fetch');
let { default: Jimp } = await import('jimp');
let pp = await conn.profilePictureUrl(m.chat, 'image');
const profilePicture = await Jimp.read(await (await fetch(pp)).buffer());

const lettersImage = await Jimp.read(fs.readFileSync(path.join(media, 'pictures/invAdmins.png')));
lettersImage.resize(profilePicture.getWidth(), profilePicture.getHeight());
profilePicture.composite(lettersImage, 0, 0);
const img = path.join(temp, `${randomString(5)}.jpg`);
await profilePicture.writeAsync(img);


let msg = args.join` `
let oi = `*MENSAJE:* ${msg}`
let text = `*━「*INVOCANDO ADMINS*」━*\n\n${oi}\n\n*ADMINS:*\n${listAdmin}\n\n*[ ⚠ ️] USAR ESTE COMANDO SOLO CUANDO SE TRATE DE UNA EMERGENCIA!!*\n\n${info.nanie}`.trim()
return conn.sendImageWriting(m.chat, img, text, userdb, m );
}
if (/^ownergroup$/i.test(command)) {
const owner = groupMetadata?.owner
let text = '', ownertag
if (owner) {
const isOwnerGroup = groupAdmins.find(p => owner.endsWith(lid) ? owner === p.jid : owner === p.id)
if (isOwnerGroup) {
ownertag = owner.split('@')[0]
if (isOwnerGroup.admin === 'superadmin') {
text = `*━「*INVOCANDO AL CREADOR DEL GRUPO*」━*\n\n${oi}\n\n*CREADORGP:*\n@${ownertag}\n\n*[ ⚠ ️] USAR ESTE COMANDO SOLO CUANDO SE TRATE DE UNA EMERGENCIA!!*\n\n${wmbc}`.trim()
}
if (isOwnerGroup.admin === 'admin') {
text = `*EL CREADOR DEL GRUPO* @${ownertag} esta presente, pero da lo mismo que hablar con otro admin ya que no es inmutable`
}
} else {
text = `EL CREADOR DEL GRUPO esta ausente, pero el admin que ha hecho cambios al grupo @${(groupMetadata.subjectOwner.endsWith(lid) ? conn.lidToJid(groupMetadata.subjectOwner, m.chat) : groupMetadata.subjectOwner).split('@')[0]} u otro admin pueden ayudarte`
}
} else {
text = `EL CREADOR DEL GRUPO *no existe*\n\nPide ayuda a cualquiera de los siguientes admins:\n${listAdmin}`
}
return conn.sendWritingText(m.chat, text, userdb, m );
}
}
handler.help = ['admins <texto>']
handler.tags = ['group']
handler.command = /^(admins|@admins|dmins|ownergroup)$/i
handler.group = true
handler.menu = [
{title:"💎 INVOCAR A ADMINS", description: "invoca a los administradores del grupo usando #admins <mensaje>", id: `admins`},
{title:"💎 INVOCAR AL OWNER DEL GRUPO", description: "invoca al owner del grupo usando #ownergroup <mensaje>", id: `ownergroup`}
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
