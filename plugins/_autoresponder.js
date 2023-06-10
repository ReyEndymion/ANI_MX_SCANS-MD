import { sticker } from '../lib/sticker.js'
let handler = m => m

handler.before = async function (m, {conn}) {
let chat = global.db.data.chats[m.chat]
    
if (m.mentionedJid.includes(this.user.jid) && m.isGroup && !chat.isBanned) {
let stiker = await sticker(stickerAMX, false, global.packname, global.author)  
this.sendFile(m.chat, stiker, 'sticker.webp', null, m, false, { 
contextInfo: { externalAdReply: { title: wm, body: author, sourceUrl: md, thumbnail: imagen2}}})
}
if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Abre este enlace')) && !m.isBaileys && !m.isGroup) {
let join = `*< UNE EL BOT A TU GRUPO />*\n\n*HOLA USUARIO/A\n*𝙿PARAo SOLICITAR UN BOT A TU GRUPO USA EL COMANDO #join MAS EL ENLACE DE INVITACION DE TU GRUPO*\n\n*—◉ EJEMPLO:*\n*◉ #join* https://chat.whatsapp.com/J11cCrX3DBoGJJGN3SKqn1`.trim() 
this.sendMessage(m.chat, {image: imagen4, caption: join + '\n\n' + wm + '\n\n' + urlgofc}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )}
    
    
return !0 }
export default handler
