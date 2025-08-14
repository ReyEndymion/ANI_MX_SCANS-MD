let handler = async (m, {conn, db, userdb, senderJid}) => {
const { axiosJson } = await import('../lib/functions.js')
try {
if(m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
if(!m.mentionedJid.length) m.mentionedJid.push(senderJid)
const fetch = await import('node-fetch')
let res = await fetch('https://nekos.life/api/kiss')
let json = await res.json()
let { url } = json
const { sticker } = await import('../lib/sticker.js')
let stiker = await sticker(null, url, `+${senderJid.split('@')[0]} le dio besos a ${m.mentionedJid.map((user)=>(user === senderJid)? 'alguien ': `+${user.split('@')[0]}`).join(', ')}`)
conn.sendFile(m.chat, stiker, null, { asSticker: true })
} catch (e) { }}
handler.command = /^(kiss|skiss|kis|besos|beso)$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
