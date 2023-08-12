import path, { join } from 'path'
import fetch from 'node-fetch';
import Jimp from 'jimp';
import fs from 'fs'
let handler = async (m, { conn, participants, groupMetadata, jid, args }) => {
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
    let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => fs.readFileSync('./src/sinFotoG.png') );
    const profilePicture = await Jimp.read(await (await fetch(pp)).buffer());
    
    const lettersImage = await Jimp.read(fs.readFileSync(join(dirP, 'src/invUsers.png')));
    lettersImage.resize(profilePicture.getWidth(), profilePicture.getHeight());
    profilePicture.composite(lettersImage, 0, 0);
    const img = path.join(dirP, `tmp/${randomString(5)}.jpg`);
    await profilePicture.writeAsync(img);
const groupNoAdmins = participants.filter(p => !p.admin && p.id)
const listUsers = groupNoAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    let pesan = args.join` `
    let oi = `*MENSAJE:* ${pesan}`
    let text = `━「 *INVOCANDO USUARIOS* 」━\n\n${oi}\n\n*USUARIOS:*\n${listUsers}\n\n${wm}`.trim()
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
  
  handler.help = ['users <texto>']
  handler.tags = ['group']
  handler.command = /^(users|usuarios)$/i
  handler.admin = true
  handler.group = true
  
  export default handler
  