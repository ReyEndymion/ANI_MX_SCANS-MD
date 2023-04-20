import fs from 'fs'
let handler = async (m, { conn, text } ) => {  
let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
let teks = text ? text : cc.text
for (let id of groups) { 
conn.sendButton(id, `*╔══❰ COMUNICADO ❱══╗*\n*║*\n*╠❧* ${text}\n*║*\n*╚══════════════╝*`, '*_ESTE ES UN COMUNICADO OFICIAL_*\n' + wm, fs.readFileSync('./src/avatar_contact.png'), [['🤖 OWNER 🤖', '.owner'],['💎 DONAR 💎', '.donasi']], false, { 
contextInfo: { externalAdReply: {
title: '*COMUNICADO OFICIAL A GRUPOS*',
body: ' BY 🌎ANI MX SCANS🌏', 
sourceUrl: md, 
thumbnail: fs.readFileSync('./Menu2.jpg') }}})}
m.reply(`*[❗INFO❗] MENSAJE ENVIADO A ${groups.length} GRUPO/S*\n\n*NOTA: ES POSIBLE QUE ESTE COMANDO TENGA FALLOS Y NO SÉ ENVIÉ A TODOS LOS CHATS, DISCULPE POR EL MOMENTO*`)
}
handler.help = ['broadcastgroup', 'bcgc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(group|grup|gc)$/i
handler.rowner = true
export default handler
