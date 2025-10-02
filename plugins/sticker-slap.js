let handler = async (m, {conn, text, db, userdb, senderJid}) => {
const fetch = await import('node-fetch')
const { googleMotions } = await import('../lib/googleMedia.js')
const { sticker, createSticker } = await import('../lib/sticker.js')
try {
const bofGif = (await googleMotions('bofetada slap gif'))
console.log('Sslap: ', m.mentionedJid, m.quoted?.sender, m.sender, senderJid)
let packname
let wm
if(!m.mentionedJid.length && !m.quoted?.sender) {
packname = `le da una cachetada\n`
wm = `Si quiere abofetear a alguien más debe contestar a un mensaje O Mencionarlo con @ en el Grupo`
} else if (m.quoted?.sender) {
m.mentionedJid.push(m.quoted.sender)
packname = `${await conn.getName(senderJid)}\nle dio una bofetada a\n`
wm = `${await conn.getName(m.quoted.sender)}`
} else {
const normalizetext = await conn.textTagsLidToJid(text, m.chat)
const isMentionBot = normalizetext.includes('@' + conn.user.jid.split('@')[0])
m.mentionedJid.push(senderJid)
packname = `${await conn.getName(senderJid)}\nle dio una bofetada a\n`
wm = `${await m.mentionedJid.map((user) => `${conn.getName(user)}`).join('\n')}`
if (isMentionBot) {packname = `le da una cachetada\n`;wm = 'Si quiere abofetear a alguien más debe contestar a un mensaje O Mencionarlo con @ en el Grupo'}
}

await conn.sendSticker(m.chat, bofGif.getRandom(), {packname, wm}, m)
} catch (e) {
console.log(e)
}
}
handler.help = ['slap']
handler.tags = ['General']
handler.command = /^slap$/i
handler.menu = [
{ title: "💥 Bofetada", description: "Bofetea a alguien", id: `slap` }
];
handler.type = "stickermenu";

handler.disabled = false;

export default handler
