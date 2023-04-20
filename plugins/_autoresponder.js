import { sticker } from '../lib/sticker.js'
let handler = m => m

handler.before = async function (m, {conn}) {
let chat = global.db.data.chats[m.chat]
    
if (m.mentionedJid.includes(this.user.jid) && m.isGroup && !chat.isBanned) {
let stiker = await sticker(stickerBC, false, global.packname, global.author)  
this.sendFile(m.chat, stiker, 'sticker.webp', null, m, false, { 
contextInfo: { externalAdReply: { title: '🌎ANI MX SCANS🌏', body: '©𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷', sourceUrl: `https://github.com/ReyEndymion/ANI_MX_SCANS-MD`, thumbnail: imagen2}}})}
    
return !0 }
export default handler
