import fs from 'fs'
import path, { join } from 'path'
let handler = async (m, {conn, text, db, userdb, senderJid}) => { 
let chatsall = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0])
let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
let teks = text ? text : cc.text
let contextInfo = { 
mentionedJid: [senderJid], 
"externalAdReply": { 
"showAdAttribution": true, 
"containsAutoReply": true,
"renderLargerThumbnail": true, 
"title": 'COMUNICADO OFICIAL A TODOS LOS CHATS',
body: info.npe, 
"containsAutoReply": true, 
"mediaType": 1,
"thumbnail": fs.readFileSync(imagen1), 
"mediaUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`, 
"sourceUrl": info.hp_animxscans 
} 
} 
for (let id of chatsall) { 
let resp = `*╔═══❰ COMUNICADO ❱═══╗*\n*║*\n*╠❧* ${text}\n*║*\n*╚══════════════════╝*`

await conn.sendWritingText(id, resp, userdb, m); 
}
let resp = `*[❗INFO❗] MENSAJE ENVIADO A TODOS LOS CHATS*\n\n*NOTA: ES POSIBLE QUE ESTE COMANDO TENGA FALLOS Y NO SÉ ENVIÉ A TODOS LOS CHATS, DISCULPE POR EL MOMENTO*`

await conn.sendWritingText(m.chat, resp, userdb, m)
}
handler.help = ['broadcast', 'bc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)$/i
handler.rowner = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

//, '*_ESTE ES UN COMUNICADO OFICIAL_*\n' + info.nanie, fs.readFileSyncjoin(media, 'pictures/sinFoto.png'), [['🤖 OWNER 🤖', '.owner'],['💎 DONAR 💎', '.donasi']], false, { contextInfo: { externalAdReply: {title: 'COMUNICADO OFICIAL A TODOS LOS CHATS',body: info.npe, sourceUrl: info.hp_animxscans, thumbnail: fs.readFileSync('./Menu2.jpg') }}})
