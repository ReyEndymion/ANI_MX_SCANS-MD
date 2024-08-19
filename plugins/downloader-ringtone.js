import fetch from 'node-fetch'
let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, command }) => {
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
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 1));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
if (audio !== undefined) {
return conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mp4' }, {quoted: m, ephemeralExpiration: 2*60*1000})
} else {
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
}
handler.command= ['ringtone']
export default handler
