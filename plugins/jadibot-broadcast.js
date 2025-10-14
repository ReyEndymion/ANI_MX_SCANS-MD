let handler = async (m, {conn, info, usedPrefix, text, db, userdb, senderJid, objs}) => {
const {imagen2} = objs
const {default: fs} = await import('fs')
const picture = fs.readFileSync(imagen2)
const {delay} = await import('../lib/functions.js')
const {} = await import('../config.js')
if (conn.user.jid !== global.userBot) throw false
let users = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user.jid)])]
let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
let teks = text ? text : cc.text
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let resp = `*〔 DIFUSION A SUB BOTS 〕*\n\n> ${teks}`
for (let id of users) {
await delay(1500)
await conn.sendWritingText(id, resp, userdb, fkontak)

}
const difusion = `*Difusión enviada con éxito a ${users.length} sub bots*

${users.map((v, i) => `${i+1}.- @${v.split('@')[0]}\n👉🏻 wa.me/${v.split('@')[0]}?text=${encodeURIComponent(usedPrefix)}estado`).join('\n')}
\n*Se finalizo con el envió en ${users.length * 1.5} segundos aproximadamente*`.trim()
let contextInfo = {
mentionedJid: conn.parseMention(difusion),
"externalAdReply": {
"containsAutoReply": true,
"renderLargerThumbnail": false,
"title": info.nanipe, 
"containsAutoReply": false,
"mediaType": 2, 
"thumbnail": picture,
"mediaUrl": `wa.me/${conn.user.jid.split('@')[0]}?text=${encodeURIComponent(usedPrefix)}estado`,
"sourceUrl": `wa.me/${conn.user.jid.split('@')[0]}?text=${encodeURIComponent(usedPrefix)}estado`
}
}
return conn.sendWritingTextCI(m.chat, difusion, contextInfo, userdb, m)

}
handler.command = /^bcbot$/i
handler.rowner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

handler.help = [];
handler.tags = [];
handler.menu = [
{title: 'SERBOT/JADIBOT-BROADCAST', description: 'Utiliza Este comando Para enviar un mensaje a todos los subbots\nComando: #bcbot', id: 'bcbot'}
];
handler.type = "menubots";
handler.disabled = false;

export default handler
