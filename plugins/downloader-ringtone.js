import fetch from 'node-fetch'
let handler = async(m, {conn, groupMetadata, usedPrefix, text, args, command, db, userdb, senderJid}) => {
let resp = '', audio
if (!text) {
resp = `*[❗] INGRESE EL TEXTO QUE DESEE BUSCAR, EJEMPLO: ${usedPrefix + command} Hola*`
} else {
try {
let vn = await fetch(`https://fatiharridho.herokuapp.com/api/search/ringtone?query=${text}`)
let x = await vn.json()
audio = x.result[0].audio
} catch (error) {
resp = `No encontrado\n\n${error.stack}`
}
}

if (audio !== undefined) {
return conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mp4' }, {quoted: m, ephemeralExpiration: 2*60*1000})
} else {
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
handler.command= ['ringtone']
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
