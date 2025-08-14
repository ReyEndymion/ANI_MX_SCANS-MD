let handler = async (m, {conn, db, userdb, senderJid}) => {
const { axiosJson } = await import('../lib/functions.js')
try {
if(m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
if(!m.mentionedJid.length) m.mentionedJid.push(senderJid)
const fetch = await import('node-fetch')
let res = await fetch('https://api.waifu.pics/sfw/pat')
let json = await res.json()
let { url } = json
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
let mentionedNames = m.mentionedJid.map(user => {let userName = conn.getName(user);
return user === who ? userName : userName.split('@')[0] ;
}).join(', ');
let stickerText = `${conn.getName(senderJid)} le dio palmaditas a ${mentionedNames}`

const { sticker } = await import('../lib/sticker.js')
let stiker = await sticker(null, url, stickerText)

//let stiker = await sticker(null, url, `${conn.getName(senderJid)} le dio palmaditas a ${m.mentionedJid.map((user)=>(user === senderJid)? 'alguien ': `+${user.split('@')[0]}`).join(', ')}`)
//conn.sendFile(m.chat, stiker, null, { asSticker: true })
conn.sendMessage(m.chat, {sticker: {url: stiker}? stiker : {url: stiker},mimetype: 'image/webp', asSticker: true}, { quoted: m, ephemeralExpiration: 24 * 60 * 1000 });
} catch (e) {
let resp = `Se detecto un error al realizar la solicitud: ${e}`
return conn.sendWritingText(m.chat, resp, userdb, m) }
}
handler.command = /^(pat|palmaditas|cariños|mimos|patt)$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
