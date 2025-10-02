let handler = async (m, {conn, participants, groupMetadata, groupsdb, db, userdb, senderJid, isLidGroup}) => {
const {join} = await import('path')
const {media} = await import('../config.js')
if (!m.isGroup) return
const group = groupsdb[m.chat]
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || join(media, 'pictures/sinFoto.png')
const { antiToxic, antiTraba, antiviewonce, isBanned, welcome, bye, detect, sWelcome, sBye, sPromote, sDemote, antiLink, antiLink2, modohorny, autosticker, modoadmin, audios, delete: del, anticall, antiprivado, asistente, gruposrol} = group
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => isLidGroup ? `${i + 1}. @${v.phoneNumber.split('@')[0]}` : `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
const owner = conn.lidToJid(groupMetadata.owner, m.chat) || (isLidGroup ? groupAdmins.find(p => p.admin === 'superadmin')?.phoneNumber : groupAdmins.find(p => p.admin === 'superadmin')?.id) || m.chat.split`-`[0] + '@s.whatsapp.net'
let resp = `*「 INFORMACION DEL GRUPO 」*\n
*IDENTIFICACION DEL GRUPO:* 
${groupMetadata.id}

*NOMBRE:* 
${groupMetadata.subject}

*DESCRIPCION:* 
${groupMetadata.desc?.toString() || 'SIN DESCRIPCION'}

*TOTAL DE PARTICIPANTES:*
${participants.length} Participantes

*CREADOR DEL GRUPO:* 
@${owner.split('@')[0]}

*ADMINS DEL GRUPO:*
${listAdmin}

*OPCIONES AUTOMATICAS:*
—◉ CHATBANNED: ${isBanned ? '✅' : '❌'}
—◉ WELCOME: ${welcome ? '✅' : '❌'}
—◉ BYE: ${bye ? '✅' : '❌'}
—◉ DETECT: ${detect ? '✅' : '❌'} 
—◉ ANTILINK: ${antiLink ? '✅' : '❌'} 
—◉ ANTILINK 𝟸: ${antiLink2 ? '✅' : '❌'} 
—◉ MODO HORNY: ${modohorny ? '✅' : '❌'} 
—◉ AUTOSTICKER: ${autosticker ? '✅' : '❌'} 
—◉ AUDIOS: ${audios ? '✅' : '❌'} 
—◉ ANTIVIEWONCE: ${antiviewonce ? '✅' : '❌'} 
—◉ ANTITOXIC: ${antiToxic ? '✅' : '❌'} 
—◉ ANTITRABA: ${antiTraba ? '✅' : '❌'} 
—◉ ANTICALL: ${anticall ? '✅' : '❌'} 
—◉ ANTIPRIVADO: ${antiprivado ? '✅' : '❌'} 
—◉ ASISTENTE: ${asistente ? '✅' : '❌'} 
—◉ GRUPOSROL: ${gruposrol ? '✅' : '❌'} 
`.trim()
return conn.sendImageWriting(m.chat, pp, resp, userdb, m);
}
handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(info(gr(oup|upo)?|gc)|gro?upinfo)$/i
handler.group = true
handler.menu = [
{title:"💎 INFORMACION DEL GRUPO", description: "envia la informacion del grupo en un mensaje usando #infogroup", id: `infogroup`},
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
