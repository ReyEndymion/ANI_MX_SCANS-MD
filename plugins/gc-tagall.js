import path, { join } from 'path'
import fetch from 'node-fetch';
import Jimp from 'jimp';
import fs from 'fs'
let handler = async(m, {conn, isOwner, isAdmin, text, participants, args, command }) => {
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
    let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => fs.readFileSync('./src/sinFotoG.jpg') );
    const profilePicture = await Jimp.read(await (await fetch(pp)).buffer());
    const lettersImage = await Jimp.read(fs.readFileSync(join(dirP, 'src/invAll.png')));
    lettersImage.resize(profilePicture.getWidth(), profilePicture.getHeight());
    profilePicture.composite(lettersImage, 0, 0);
    const img = path.join(dirP, `tmp/${randomString(5)}.jpg`);
    await profilePicture.writeAsync(img);

if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
let pesan = args.join` `
let oi = `*MENSAJE:* ${pesan}`
let teks = `*⺀INVOCANDO - GRUPO⺀*\n\n❏ ${oi}\n\n❏ *ETIQUETAS:*\n`
for (let mem of participants) {
teks += `┣➥ @${mem.id.split('@')[0]}\n`}
teks += `*└* BY ${wm}\n\n*▌│█║▌║▌║║▌║▌║▌║█*`
let txt = teks;
        let count = 0;
        for (const c of teks) {
            await new Promise(resolve => setTimeout(resolve, 50));
            count++;
        
            if (count % 10 === 0) {
                conn.sendPresenceUpdate('composing' , m.chat);
            }
        }
        await conn.sendMessage(m.chat, {image: {url: img}, caption: txt, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
handler.help = ['tagall <mesaje>','invocar <mesaje>']
handler.tags = ['group']
handler.command = /^(tagall|invocar|invocacion|todos|invocación)$/i
handler.admin = true
handler.group = true
export default handler
