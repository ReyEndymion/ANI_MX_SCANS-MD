let handler = async (m, { conn, participants, groupMetadata }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
const { antiToxic, antiTraba, antiviewonce, isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, antiLink2, modohorny, autosticker, modoadmin, audios, delete: del, anticall, antiprivado, asistente, gruposrol} = global.db.data.chats[m.chat]
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
conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}
handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(infogrupo|gro?upinfo|info(gro?up|gc))$/i
handler.group = true
export default handler
