import path, { join } from 'path'
import fetch from 'node-fetch';
import Jimp from 'jimp';
import fs from 'fs'
let handler = m => m
handler.all = async function (m) {
let vn = fs.readFileSync(join(dirP, 'media/bot.mp3'))
let chat = global.db.data.chats[m.chat]
const estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "5215517489568-1625305606@g.us" } : {}) }, message: {orderMessage: { itemCount : -999999, status: 1, surface : 1, message: igfg, orderTitle: 'Bang', thumbnail: imagen1, sellerJid: '0@s.whatsapp.net'}}}
//const estiloaudio = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "5215517489568-1625305606@g.us" } : {}) }, message: {"audioMessage": { "mimetype":"audio/ogg; codecs=opus", "seconds": "99569", "ptt": "true"}}}  
if (/^bot$/i.test(m.text) && !chat.isBanned) { 
conn.sendPresenceUpdate('recording', m.chat)    
let resp = '*HOLA, ¿COMO TE PUEDO AYUDAR?*\n\nMENU DE COMANDOS\n=> *#menu*'
let txt = '';
       let count = 0;
       for (const c of resp) {
           await new Promise(resolve => setTimeout(resolve, 5));
           txt += c;
           count++;
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
           await conn.sendMessage(m.chat, { text: txt.trim()+'\n\n'+wm, mentions: conn.parseMention(txt) }, {quoted: estilo, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
conn.sendFile(m.chat, vn, 'bot.mp3', null, m, true, { type: 'audioMessage', seconds: '4556', ptt: true, sendEphemeral: true, quoted: m /*estiloaudio*/})}
return !0
}
export default handler
