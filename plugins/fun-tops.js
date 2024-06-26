import path, { join } from 'path'
import fs from 'fs'
let user = a => '@' + a.split('@')[0]
async function handler(m, { groupMetadata, command, conn, participants }) {
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b = ps.getRandom()
let c = ps.getRandom()
let d = ps.getRandom()
let e = ps.getRandom()
let f = ps.getRandom()
let g = ps.getRandom()
let h = ps.getRandom()
let i = ps.getRandom()
let j = ps.getRandom()

let resp = `*_1.- ${user(a)}_*
*_2.- ${user(b)}_*
*_3.- ${user(c)}_*
*_4.- ${user(d)}_*
*_5.- ${user(e)}_*
*_6.- ${user(f)}_*
*_7.- ${user(g)}_*
*_8.- ${user(h)}_*
*_9.- ${user(i)}_*
*_10.- ${user(j)}_*`

if (command == 'topgays') {
let vn = join(media, 'audios/gay2.mp3')
let top = `*🌈TOP 10 GAYS/LESBIANAS DEL GRUPO🌈*\n\n${resp}`
let txt = '';
let count = 0;
for (const c of top) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , m.chat);
    }
}
   let q = await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
    const stats = fs.statSync(vn).size / 1024;
    const fileSizeInMiliSeconds = Math.round((stats / 112) * 1000);
    for (let i = 0; i < fileSizeInMiliSeconds; i++) {
          await new Promise(resolve => setTimeout(resolve, 1));
          
          if ((i + 1) % 10 === 0) {
             await conn.sendPresenceUpdate('recording', m.chat);
            }
      }
 return conn.sendMessage(m.chat, { audio: {url: vn}, ptt: true, mimetype: 'audio/mpeg', fileName: vn }, { quoted: q, ephemeralExpiration: 2*60*1000 })
}
    
if (command == 'topotakus') {
let vn = join(media, 'audios/otaku.mp3')
let top = `*🌸 TOP 10 OTAKUS DEL GRUPO 🌸*\n\n${resp}`
let txt = '';
let count = 0;
for (const c of top) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    let q = await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
    const stats = fs.statSync(vn).size / 1024;
    const fileSizeInMiliSeconds = Math.round((stats / 112) * 1000);
    for (let i = 0; i < fileSizeInMiliSeconds; i++) {
          await new Promise(resolve => setTimeout(resolve, 1));
          
          if ((i + 1) % 10 === 0) {
             await conn.sendPresenceUpdate('recording', m.chat);
            }
      }
 return conn.sendMessage(m.chat, { audio: {url: vn}, ptt: true, mimetype: 'audio/mpeg', fileName: vn }, { quoted: q, ephemeralExpiration: 2*60*1000 })
}    
}
handler.help = handler.command = ['topgays','topotakus']
handler.tags = ['games']
handler.group = true
export default handler  
