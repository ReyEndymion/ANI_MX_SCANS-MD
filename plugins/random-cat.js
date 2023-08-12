import fetch from 'node-fetch'
let handler  = async (m, { conn, text }) => {
try {
let res = await fetch('https://cataas.com/gato')
let img = await res.buffer()
let caption = `
${wm}
`.trim()
conn.sendFile(m.chat, img, 'gato.jpg', caption, m)
} catch (e) {
console.log(e)
throw '*Error!*'
}}
handler.help = ['gato']
handler.tags = ['random']
handler.command = /^gato$/i
handler.fail = null
export default handler
