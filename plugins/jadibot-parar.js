  let handler  = async (m, { conn }) => {
    let parentw = conn
    let resp
    let contextInfo = {  
      mentionedJid: [m.sender],  
      "externalAdReply": {  
      "showAdAttribution": true,  
      "containsAutoReply": true,
      "renderLargerThumbnail": true,  
      "title": `Serbot Stop`,   
      "containsAutoReply": true,  
      "mediaType": 1,   
      "thumbnail": imagen1,  
      "mediaUrl": `https://chat.whatsapp.com/HbC4vaYsvYi0Q3i38diybA`,  
      "sourceUrl": `https://api.whatsapp.com/send/?phone=${m.sender[0]}&text=.stop&type=phone_number&app_absent=0`  
      }  
      }  
 if (global.conn.user.jid != conn.user.jid && m.sender != global.conn.user.jid){ 
      resp = 'Me apagare :\')'
     let i = global.conns.indexOf(conn)		
      global.conns.splice(i, 1)
      conn.isInit = false
       if (i < 0) return
      delete global.conns[i]
      conn.ev.removeAllListeners()
      conn.ws.close()
      if (!conn.user) {
        try { conn.ws.close() } catch (e) { console.log(e)}
        conn.ev.removeAllListeners()
      }/****/          
    } else if (!conn.user.jid) {
    resp = `Este numero no es un Sub-Bot de ${wm}, por lo tanto no lo puedo detener`
} else if (global.conn.user.jid == (m.chat || m.sender)) {
  resp = `El bot principal no se apaga asi`
     } else {
    resp = 'Por qué no vas directamente al chat privado del Sub-Bot?'
    } 
      let txt = '';
      let count = 0;
      for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 20));
      txt += c;
      count++;
  
      if (count % 10 === 0) {
         await conn.sendPresenceUpdate('composing' , m.chat);
      }
      }
      return conn.sendMessage(m.chat, {text: txt, contextInfo: contextInfo, mentions: conn.parseMention(txt)}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
  }
  handler.help = ['berhenti','stop']
  handler.tags = ['General']
  handler.command = /^(berhenti|stop)$/i
  handler.owner = true
  handler.mods = false
  handler.premium = false
  handler.group = false
  handler.private = true
  
  handler.admin = false
  handler.botAdmin = false
  
  handler.fail = null
  
  export default handler
/*
import { Low, JSONFile } from 'lowdb'

const adapter = new JSONFile('./jadibts/stop.json');
const db = new Low(adapter);
await db.read();
db.data = db.data || { stop: {} };
await db.write();

let handler  = async (m, { conn }) => {

    if (global.conn.user.jid == conn.user.jid) {
    let resp = 'Por qué no vas directamente con el numero del Bot?'
    await conn.sendPresenceUpdate('composing' , m.chat);

    let int = '';
    let count = 0;
    for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 50));
        int += c;
        count++;
    
        if (count % 10 === 0) {
           await conn.sendPresenceUpdate('composing' , m.chat);
        }
    }
    await db.read();
    if (!db.data.stop) {
      db.data.stop = {};
    }
    db.data.stop[m.sender] = true;
    await db.write();
    await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m}, { disappearingMessagesInChat: 1 * 1000} )
    } else {
      let resp = 'Me apagare :\')'
      let int = '';
    for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 50));
        int += c;
    }
    await db.read();
    if (!db.data.stop) {
      db.data.stop = {};
    }
db.data.stop[conn.user.jid] = true;
await db.write();
await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m}, { disappearingMessagesInChat: 1 * 1000} )
      conn.ws.close()
      db.set('used', true).write();
}
  }
  handler.help = ['berhenti','stop']
  handler.tags = ['General']
  handler.command = /^(berhenti|stop)$/i
  handler.owner = false
  handler.mods = false
  handler.premium = false
  handler.group = false
  handler.private = true
  
  handler.admin = false
  handler.botAdmin = false
  
  handler.fail = null
  
  export default handler
  */
