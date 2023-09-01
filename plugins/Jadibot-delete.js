import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fs} from "fs"
import path, { join } from 'path'
let handler  = async (m, { conn }, args) => {
    let parentw = conn
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
	let uniqid = `${who.split`@`[0]}` //parentw.getName(who)
    if (global.conn.user.jid !== conn.user.jid) {
      let resp = `Por qué no vas directamente con el numero del Bot @${uniqid}?`
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
  await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} else {
    try {
        fs.rm(jadibts + '/' + uniqid, { recursive: true, force: true })
        .then(async () => {
        console.log('se han eliminado todos los archivos')
        let resp = "Adiós Bot\n\nTodos los archivos fueron eliminados"
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
      await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
  conn.isInit = false
//  parentw.ws.close()
        }).catch( async () => {
       let resp = `Usted ya no es un miembro de los Sub-Bots de este Bot(${wm}).\n\nPara poder ser Sub-bot use el comando *${usedPrefix + 'jadibot'}*\n\n En caso de que tu sesion no la puedas iniciar otra vez, borra la sesion creada en dispositivos vinculados y usa el comando *${usedPrefix + 'deletebot'}* para poder solicitar una nueva sesion`    
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
       await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
   
          
        })
             /*fs.unlink("./jadibts/" + uniqid + "/creds.json")
        console.log('File removed')
        await conn.sendMessage(m.chat, {text : "la session fue eliminada " } , { quoted: m })
        await fs.unlink("./jadibts/" + uniqid).md
        console.log('Folder removed')
        await conn.sendMessage(m.chat, {text : "la carpeta fue eliminada " } , { quoted: m })*/
        } catch(err) {
        console.error('La carpeta o archivo de sesion no existen ', err)
      }
       }        
  }
  handler.help = ['delete']
  handler.tags = ['General']
  handler.command = /^(deletebot)$/i
  handler.owner = false
  handler.group = false
  handler.private = true
  export default handler