import fs from 'fs'
import path, {join} from 'path';

let handler = async (m, {conn, text, db, userdb, senderJid}) => { 
let chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map(v => v[0])
let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
let teks = text ? text : cc.text
for (let id of chats) { 
conn.sendButton(id, `*╔══❰ COMUNICADO ❱══╗*\n*║*\n*╠❧* ${text}\n*║*\n*╚══════════════╝*`, '*_ESTE ES UN COMUNICADO OFICIAL_*\n' + info.nanie, fs.readFileSync(join(media, 'pictures/avatar_contact.png')), [['🤖 OWNER 🤖', '.owner'],['💎 DONAR 💎', '.donasi']], false, { 
contextInfo: { externalAdReply: {
title: '*COMUNICADO OFICIAL A LOS CHATS PRIVADOS*',
body: info.npe, 
sourceUrl: info.hp_animxscans, 
thumbnail: fs.readFileSync('./Menu2.jpg') }}})}
conn.sendWritingText(m.chat, `*[❗INFO❗] MENSAJE ENVIADO Achats.lengthCHATS PRIVADOS*\n\n*NOTA: ES POSIBLE QUE ESTE COMANDO TENGA FALLOS Y NO SÉ ENVIÉ A TODOS LOS CHATS, DISCULPE POR EL MOMENTO*`, m)
}
handler.help = ['broadcastchats', 'bcchats'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcastchats?|bcc(hats?)?)$/i
handler.rowner = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
