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
conn.sendMessage(m.chat, {sticker: {url: stiker}? stiker : {url: stiker},mimetype: 'image/webp', asSticker: true}, { quoted: m, ephemeralExpiration: 24 * 60 * 1000 });
 
} catch (e) { }}
handler.command = /^(kiss|skiss|kis|besos|beso)$/i
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "?? BESOS", description: `Envía un beso a alguien`, id: `kiss`},
];
handler.type = "stickermenu";
handler.disabled = false;

export default handler
