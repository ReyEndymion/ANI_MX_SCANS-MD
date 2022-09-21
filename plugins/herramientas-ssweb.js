import fetch from 'node-fetch'
let handler = async (m, { conn, command, args }) => {
if (!args[0]) return conn.reply(m.chat, '*[🔎] POR FAVOR INGRESA LA URL DE LA PÁGINA A LA QUE SE LE TOMARA CAPTURA🔎*', m)
let ss = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer()
conn.sendFile(m.chat, ss, 'error.png', args[0], m)}
handler.help = ['ss', 'ssf'].map(v => v + ' <url>')
handler.tags = ['internet']
handler.command = /^ss(web)?f?$/i
export default handler
