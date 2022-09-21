import fetch from 'node-fetch'
let handler = async (m, { text, usedPrefix, command }) => {
if (!text) throw `*[❗] INGRESE UN TEXTO PARA HABLAR CON SIMSIMI O EL BOT*\n\n*EJEMPLO: ${usedPrefix + command} Hola bot*`
let res = await fetch(`https://api.simsimi.net/v2/?text=${text}&lc=es`)
let json = await res.json()
m.reply(json.success)}
handler.help = ['simi', 'bot'].map(v => v + ' <teks>')
handler.tags = ['fun']
handler.command = /^((sim)?simi|bot|alexa|cortana)$/i
export default handler
