import axios from 'axios';
let previousCommitSHA = '';
let previousUpdatedAt = '';
const url = md;
const regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)/;
const match = url.match(regex);
let owner = '';
let repo = '';
if (match) {
owner = match[1];
repo = match[2];
}
const handler = async (m, {conn, text, usedPrefix, command}) => {
 // async function checkRepoUpdates() {
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`);
      const {sha, commit: {message}, html_url} = response.data[0];

      if (sha !== previousCommitSHA || message !== previousUpdatedAt) {
        previousCommitSHA = sha;
        previousUpdatedAt = message;
        let resp = `*[❗] ¡El repositorio ha sido actualizado recientemente!*\n*- Repositorio:* ${html_url}\n*- Mensaje de commit:* ${message}`
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
      const documentMessage = {
        mentionedJid: conn.parseMention(txt), 
        forwardingScore: 200,
        isForwarded: false,
        externalAdReply: {
          mediaUrl: html_url,
          mediaType: 2,
          previewType: 'pdf',
          title: `Bot exclusivo de: ${author}`,
          body: wm,
          thumbnail: imagen1,
          sourceUrl: `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`
        },
      }
      return conn.sendMessage(m.chat, {document: { url: hp_otkstogthr }, caption: txt, mimetype: `application/zip`, fileName: namerepre, fileLength: 99999999999999, pageCount: 200, contextInfo: documentMessage}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});  
    }
    } catch (error) {
      console.log('error: ', error)
      let resp = `*[❗] Error al verificar el repositorio:* ${error.message}`;
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
      return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
    }
//  }
  //return checkRepoUpdates()
  //setInterval(checkRepoUpdates, 60000);
};
handler.command = /^(actualizaciones)/i;
handler.rowner = true;
export default handler;
