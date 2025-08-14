import fetch from 'node-fetch'
let handler = async (m, {conn, text, db, userdb, senderJid}) => {
try {
let res = await fetch('https://cataas.com/gato')
let img = await res.buffer()
let caption = `
${info.nanie}
`.trim()
conn.sendFile(m.chat, img, 'gato.jpg', caption, m)
} catch (e) {
console.log(e)
return conn.sendWritingText(m.chat, `*Error!*`, userdb, m)
}}
handler.help = ['gato']
handler.tags = ['random']
handler.command = /^gato$/i
handler.fail = null
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
