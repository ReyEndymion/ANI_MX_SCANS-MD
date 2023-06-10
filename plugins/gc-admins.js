import path, { join } from 'path'
import fetch from 'node-fetch';
import Jimp from 'jimp';
import fs from 'fs'
let handler = async (m, { conn, participants, groupMetadata, args }) => {
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
    let pp = await conn.profilePictureUrl(m.chat, 'image');
    const profilePicture = await Jimp.read(await (await fetch(pp)).buffer());
    
    const lettersImage = await Jimp.read(fs.readFileSync(join(dirP, 'src/invAdmins.png')));
    
    // Redimensionar la imagen de las letras para que coincida con el tamaño de la imagen del perfil
    lettersImage.resize(profilePicture.getWidth(), profilePicture.getHeight());
    
    // Superponer las imágenes
    profilePicture.composite(lettersImage, 0, 0);
    
    // Guardar la imagen combinada en un archivo local
    const img = path.join(dirP, `tmp/${randomString(5)}.jpg`);
    await profilePicture.writeAsync(img);
 
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let pesan = args.join` `
let oi = `*MENSAJE:* ${pesan}`
let text = `*━「* INVOCANDO ADMINS *」━*\n\n${oi}\n\n*ADMINS:*\n${listAdmin}\n\n*[ ⚠ ️] USAR ESTE COMANDO SOLO CUANDO SE TRATE DE UNA EMERGENCIA!!*\n\n${wm}`.trim()
let txt = text;
let count = 0;
for (const c of text) {
    await new Promise(resolve => setTimeout(resolve, 50));
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
await conn.sendMessage(m.chat, {image: {url: img}, caption: txt, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
handler.help = ['admins <texto>']
handler.tags = ['group']
handler.command = /^(admins|@admins|dmins)$/i
handler.group = true
export default handler
