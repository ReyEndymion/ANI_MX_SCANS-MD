import fetch from 'node-fetch'
let handler = async (m, {conn, command, args, db, userdb, senderJid}) => {
if (!args[0]) return conn.sendWritingText(m.chat, '*[🔎] POR FAVOR INGRESA LA URL DE LA PÁGINA A LA QUE SE LE TOMARA CAPTURA🔎*', userdb, m)
let ss = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer()
return conn.sendImageWriting(m.chat, ss, args[0], userdb, m)
conn.sendFile(m.chat, ss, 'error.png', args[0], m)
}
handler.help = ['ss', 'ssf'].map(v => v + ' <url>')
handler.tags = ['internet']
handler.command = /^ss(web)?f?$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
