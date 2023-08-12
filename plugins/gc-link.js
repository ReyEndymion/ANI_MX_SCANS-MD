const { generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default
import fetch from 'node-fetch'
import path, { join } from 'path'
import fs from 'fs'
let handler = async (m, { conn, args }) => {
    let name = (await conn.groupMetadata(m.chat)).subject
    let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)
    try {
        var pp = await conn.profilePictureUrl(m.chat, 'image')
        var img = await (await fetch(pp)).buffer()
    } catch {
        var img = fs.readFileSync(join(dirP, 'src/sinFotoG.jpg'))
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
    }}}}, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
    let txt = '';
    let count = 0;
    for (const c of link) {
        await new Promise(resolve => setTimeout(resolve, 5));
        txt += c;
        count++;
        if (count % 10 === 0) {
            conn.sendPresenceUpdate('composing' , m.chat);
        }
    }
    conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
}
handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^link(gro?up)?$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler

/*import fs from 'fs'
let handler = async (m, { conn, args }) => {
let group = m.chat
getPreviewFromContent('https://chat.whatsapp.com/' + await conn.groupInviteCode(group))
//let detectedlink = { contextInfo: { externalAdReply: {title: null, body: null, sourceUrl: 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group), thumbnail: img }}}
conn.reply(m.chat, img, getLinkPreview, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: 'LINK DEL GRUPO',
body: wm,         
previewType: 0, thumbnail: fs.readFileSync("./Menu2.jpg"),
sourceUrl: `https://www.facebook.com/ANIMxSCANS`}}})   
}
handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^link(gro?up)?$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler*/
