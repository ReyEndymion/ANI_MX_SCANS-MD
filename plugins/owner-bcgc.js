import fs from 'fs'
import path, { join } from 'path'
let handler = async (m, {conn, text, db, userdb, senderJid}) => { 
let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
let teks = text ? text : cc.text
let contextInfo = { 
mentionedJid: [senderJid], 
"externalAdReply": { 
"showAdAttribution": true, 
"containsAutoReply": true,
"renderLargerThumbnail": true, 
"title": '*COMUNICADO OFICIAL A GRUPOS*',
"containsAutoReply": true, 
"mediaType": 1,
"thumbnail": fs.readFileSync(imagen1), 
"mediaUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`, 
"sourceUrl": info.repoProyect 
} 
}
for (let id of groups) { 
let resp = `*╔══❰ COMUNICADO ❱══╗*\n*║*\n*╠❧* ${text}\n*║*\n*╚══════════════╝*` + '\n\n*_ESTE ES UN COMUNICADO OFICIAL_*\n'

conn.sendWritingText(id, resp, userdb, m)
}
let resp = `*[❗INFO❗] MENSAJE ENVIADO A ${groups.length} GRUPO/S*\n\n*NOTA: ES POSIBLE QUE ESTE COMANDO TENGA FALLOS Y NO SÉ ENVIÉ A TODOS LOS CHATS, DISCULPE POR EL MOMENTO*`

await conn.sendWritingText(m.chat, resp, userdb, m)
}
handler.help = ['broadcastgroup', 'bcgc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(group|grup|gc)$/i
handler.rowner = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

//conn.sendButton(id, `*╔══❰ COMUNICADO ❱══╗*\n*║*\n*╠❧* ${text}\n*║*\n*╚══════════════╝*`, '*_ESTE ES UN COMUNICADO OFICIAL_*\n' + info.nanie, fs.readFileSync(join(media, 'pictures/avatar_contact.png')), [['🤖 OWNER 🤖', '.owner'],['💎 DONAR 💎', '.donasi']], false, { contextInfo: { externalAdReply: {title: '*COMUNICADO OFICIAL A GRUPOS*', body: ' BY 🌎ANI MX SCANS🌏', sourceUrl: info.repoProyect, thumbnail: fs.readFileSync('./Menu2.jpg') }}})
