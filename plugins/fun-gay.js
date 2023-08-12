import path, { join } from 'path'
import fetch from 'node-fetch';
import Jimp from 'jimp';
import fs from 'fs'
let handler = async (m, { conn }) => {
    function randomString(length) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
        if (!length) {
          length = Math.floor(Math.random() * chars.length);
        }
        var str = '';
        for (var i = 0; i < length; i++) {
          str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
      }   
let vn = media + '/gay2.mp3'
const stats = fs.statSync(vn).size / 1024;
const fileSizeInMiliSeconds = Math.round((stats / 112) * 1000);
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let sf = dirP + 'src/sinFoto.png'//fs.readFileSync(join(dirP, 'src/sinFoto.png' ))
let pp =  await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png' )//? sf : 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
console.log('y la foto: ', sf)
const profilePicture = await Jimp.read(await (await fetch(pp)).buffer());
const lettersImage = await Jimp.read(fs.readFileSync(join(dirP, 'src/gay.png')));
lettersImage.resize(profilePicture.getWidth(), profilePicture.getHeight());
profilePicture.composite(lettersImage, 0, 0);
const img = path.join(dirP, `tmp/${randomString(5)}.jpg`);
await profilePicture.writeAsync(img);

let txt = '';
let count = 0;
for (const c of '*🏳️‍🌈 MIREN A ESTE GAY 🏳️‍🌈*') {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
conn.sendMessage(m.chat, {image: {url: img}, caption: txt, mentions: conn.parseMention(txt)}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
for (let i = 0; i < fileSizeInMiliSeconds; i++) {
        await new Promise(resolve => setTimeout(resolve, 1));
        
        if ((i + 1) % 10 === 0) {
            conn.sendPresenceUpdate('recording', m.chat);
          }
    }
await await await conn.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true, quoted: m, ephemeralExpiration: 2*60*1000})
}
handler.help = ['gay']
handler.tags = ['maker']
handler.command = /^(gay)$/i
export default handler
