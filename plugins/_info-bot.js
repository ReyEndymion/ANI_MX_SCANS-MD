export async function before(m, {conn, start, info, chatdb, db, userdb, senderJid, objs}) {
const {imagen1} = objs
const { owner, temp, newsletterID, sBroadCastID, groupID, media} = await import('../config.js');
const fs = await import('fs')
const { default: path } = await import('path');
const {clockString} = await import('../lib/functions.js')
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
if (/^bot$/i.test(m.text) && (!chatdb.isBanned || !chatdb.modoadmin)) { 
let resp = `*HOLA, ¿COMO TE PUEDO AYUDAR?*`
const footer = info.nanipe
const buttons = [['MENÚ DE COMANDOS', `#menu`]]
let q
const estiloProduct = { key: {fromMe: m.key.fromMe, participant: senderJid, ...(m.chat ? { remoteJid: m.chat } : {}) }, message: {orderMessage: { itemCount : -999999, status: 1, surface : 1, message: uptime, orderTitle: 'Bang', thumbnail: fs.readFileSync(imagen1), sellerJid: '0@s.whatsapp.net'}}}
if (start.buttons) {
const messageContent = {
text: resp,
footer: footer
}

q = {key: {remoteJid: m.chat, fromMe: true, id: m.key.id}, message: {extendedTextMessage: {text: await conn.langResponse(resp, userdb)}}}
await conn.sendButton(m.chat, messageContent, {}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
q = await conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+footer, userdb, m )
}
let vn = path.join(media, 'audios/bot.mp3')
const estiloaudio = { key: {fromMe: m.key.fromMe, participant: senderJid, remoteJid: m.chat }, message: {"audioMessage": { "mimetype":"audio/ogg; codecs=opus", "seconds": _uptime, "ptt": "true"}}}
return conn.sendAudioRecording(m.chat, vn, q)
}
}
