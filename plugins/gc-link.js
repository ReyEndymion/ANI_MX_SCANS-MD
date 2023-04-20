const { generateWAMessageFromContent } = (await import('@adiwajshing/baileys')).default
import fetch from 'node-fetch'
import fs from 'fs'
let handler = async (m, { conn, args }) => {
    let name = (await conn.groupMetadata(m.chat)).subject
    let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)
    try {
        var pp = await conn.profilePictureUrl(m.chat, 'image')
        var img = await (await fetch(pp)).buffer()
    } catch {
        var img = fs.readFileSync('./src/avatar_contact.png')
    }
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
    conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
}

/*import fs from 'fs'
let handler = async (m, { conn, args }) => {
let group = m.chat
conn.reply(m.chat, 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group), m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: 'LINK DEL GRUPO',
body: '🌎ANI MX SCANS🌏',         
previewType: 0, thumbnail: fs.readFileSync("./Menu2.jpg"),
sourceUrl: `https://www.facebook.com/ANIMxSCANS`}}})   
}*/
handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^link(gro?up)?$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler
