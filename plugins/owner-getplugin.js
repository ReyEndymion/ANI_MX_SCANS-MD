import cp, {exec as _exec} from 'child_process';
import {promisify} from 'util';
import fs from 'fs';
const exec = promisify(_exec).bind(cp);
const handler = async (m, {conn, isROwner, usedPrefix, command, text}) => {
  const ar = Object.keys(plugins);
  const ar1 = ar.map((v) => v.replace('.js', ''));
  const bannedPlugins = ['jadibot-serbot', '_pruebasConsoleHandler', '_pruebasConsoleBefore', 'gc_invitamegGC', '_textos'];///jadibot-serbot|_pruebasConsoleHandler|_pruebasConsoleBefore|gc_invitamegGC|_textos$/ig.test(text)
  if (!text) {
    let resp = `*[❗] Ingresa el nombre de algún plugin (archivo) existente*\n\n*—◉ por ejemplo*\n*◉ ${usedPrefix + command}* info-infobot\n\n*—◉ Lista de plugins (archivos) existentes:*\n*◉* ${ar1.map((v) => ' ' + v).join`\n*◉*`}`;
    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 1));
    txt += c;
    count++;
    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , m.chat);
    }
    }

    let contextInfo = {  
    mentionedJid: conn.parseMention(txt),  
    "externalAdReply": {  
    "showAdAttribution": true,  
    "containsAutoReply": true,
    "renderLargerThumbnail": true,  
    "title": wm,   
    "containsAutoReply": true,  
    "mediaType": 1,   
    "thumbnail": imagen1,//apii.res.url,  
    "mediaUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`,  
    "sourceUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`  
    }  
    }  

    return conn.sendMessage(m.chat, {text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt)}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
  }
  if (ar.includes(text + '.js') && bannedPlugins.includes(text.toLowerCase())) {
    let resp = `Lo siento este codigo esta prohibido por el autor`
    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , m.chat);
    }
    }

    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
  }
  if (!ar1.includes(text)) {
    let resp = `*[❗] No se encontró ningún plugin (archivo) llamado "${text}", ingresa alguno existente*\n\n*==================================*\n\n*—◉  Lista de archivos existentes:*\n*◉* ${ar1.map((v) => ' ' + v).join`\n*◉*`}`;
    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 1));
    txt += c;
    count++;
    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , m.chat);
    }
    }

    let contextInfo = {  
    mentionedJid: conn.parseMention(txt),  
    "externalAdReply": {  
    "showAdAttribution": true,  
    "containsAutoReply": true,
    "renderLargerThumbnail": true,  
    "title": wm,   
    "containsAutoReply": true,  
    "mediaType": 1,   
    "thumbnail": imagen1,//apii.res.url,  
    "mediaUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`,  
    "sourceUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`  
    }  
    }  

    return conn.sendMessage(m.chat, {text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt)}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
  }  
let o;
  try {
    o = await exec(`cat ${dirP}plugins/` + text + '.js');
  } catch (e) {
    o = e;
  } finally {
    const {stdout, stderr} = o;
    console.log ('gp: ', o)
    if (stdout.trim()) {
      let resp = stdout
      let txt = '';
      let count = 0;
      for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 1));
      txt += c;
      count++;
      if (count % 10 === 0) {
         await conn.sendPresenceUpdate('composing' , m.chat);
      }
      }
      const aa = await conn.sendMessage(m.chat, {text: txt}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
      await conn.sendMessage(m.chat, {document: fs.readFileSync(dirP + `plugins/${text}.js`), mimetype: 'application/javascript', fileName: `${text}.js`}, {quoted: aa, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
    }
    if (stderr.trim()) {
      const aa2 = await conn.sendMessage(m.chat, {text: stderr}, {quoted: m});
      await conn.sendMessage(m.chat, {document: fs.readFileSync(dirP + `plugins/${text}.js`), mimetype: 'application/javascript', fileName: `${text}.js`}, {quoted: aa2, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
    }
  }
};
handler.help = ['getplugin'].map((v) => v + ' *<nombre>*');
handler.tags = ['owner'];
handler.command = /^(getplugin|gp)$/i;
handler.rowner = true;
export default handler;
