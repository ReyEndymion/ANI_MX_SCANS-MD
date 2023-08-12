import util from 'util'
import path from 'path'

let handler = async (m, { conn }) => {
if (!db.data.chats[m.chat].audios && m.isGroup) throw 0
let vn = media + 'toma.mp3'
const stats = fs.statSync(vn).size / 1024;
const fileSizeInMiliSeconds = Math.round((stats / 112) * 1000);
for (let i = 0; i < fileSizeInMiliSeconds; i++) {
        await new Promise(resolve => setTimeout(resolve, 1));
        
        if ((i + 1) % 10 === 0) {
            conn.sendPresenceUpdate('recording', m.chat);
          }
    }
        await conn.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true, quoted: m, ephemeralExpiration: 2*60*1000})
}
handler.command = /^(:c|:\(\))$/i
handler.fail = null
handler.exp = 100
export default handler