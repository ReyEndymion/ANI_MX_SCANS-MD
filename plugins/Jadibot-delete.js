import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fs} from "fs"
import path, { join } from 'path'
let handler  = async (m, { conn }, args) => {
    let parentw = conn
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
	let uniqid = `${who.split`@`[0]}` //parentw.getName(who)
    if (global.conn.user.jid !== conn.user.jid) conn.sendMessage(m.chat, {text: 'Por qué no vas directamente con el numero del Bot?'}, { quoted: m }) 
    else {
      await conn.sendMessage(m.chat, {text: "Adiós Bot"}, { quoted: m }) 
      }

    try {
        
        fs.rmdir("./jadibts/" + uniqid, { recursive: true, force: true })
        .then(() => {
        console.log('se han eliminado todos los archivos')
        })
        await conn.sendMessage(m.chat, {text : "todos los archivos fueron eliminados" } , { quoted: m })
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

  handler.help = ['delete']
  handler.tags = ['General']
  handler.command = /^(deletebot)$/i
  handler.owner = false
  handler.mods = false
  handler.premium = false
  handler.group = false
  handler.private = false
  
  handler.admin = false
  handler.botAdmin = false
  
  handler.fail = null
  
  export default handler