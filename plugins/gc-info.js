import path, {join} from 'path';
let handler = async (m, {conn, participants, groupMetadata, groupsdb, db, userdb, senderJid}) => {
if (!m.isGroup) return
const group = groupsdb[m.chat]
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || join(media, 'pictures/avatar_contact.png')
const { antiToxic, antiTraba, antiviewonce, isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, antiLink2, modohorny, autosticker, modoadmin, audios, delete: del, anticall, antiprivado, asistente, gruposrol} = group
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let text = `*「 INFORMACION DEL GRUPO 」*\n
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
—◉ WELCOME: ${welcome ? '✅' : '❌'}
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
//, false, { mentions: [...groupAdmins.map(v => v.id), owner] }
return conn.sendImageWriting(m.chat, pp, text, userdb, m)
}
handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(infog(rupo|roup)?|ginfo)$/i
handler.group = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
