import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
import MessageType from '@whiskeysockets/baileys'
let handler = async (m, { conn}) => {
try {
if(m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
if(!m.mentionedJid.length) m.mentionedJid.push(m.sender)
let res = await fetch('https://api.waifu.pics/sfw/pat')
let json = await res.json()
let { url } = json
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedNames = m.mentionedJid.map(user => {let userName = conn.getName(user);
    return user === who ? userName : userName.split('@')[0] ;
        }).join(', ');
    let stickerText = `${conn.getName(m.sender)} le dio palmaditas a ${mentionedNames}`
        
let stiker = await sticker(null, url, stickerText)

//let stiker = await sticker(null, url, `${conn.getName(m.sender)} le dio palmaditas a ${m.mentionedJid.map((user)=>(user === m.sender)? 'alguien ': `+${user.split('@')[0]}`).join(', ')}`)
//conn.sendFile(m.chat, stiker, null, { asSticker: true })
conn.sendMessage(m.chat, {sticker: {url: stiker}? stiker : {url: stiker},  mimetype: 'image/webp', asSticker: true}, { quoted: m, ephemeralExpiration: 24 * 60 * 1000 });
} catch (e) {
    let resp = `Se detecto un error al realizar la solicitud: ${e}`
    let txt = '';
    let count = 0;
    for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 15));
        txt += c;
        count++;
    
        if (count % 10 === 0) {
            conn.sendPresenceUpdate('composing' , m.chat);
        }
    }
        return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
 }
}
handler.command = /^(pat|palmaditas|cariños|mimos|patt)$/i
export default handler
