const { generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';
import { join } from 'path';
import fs from 'fs';
const __dirname = global.__dirname(import.meta.url);
let handler = async (m, { conn, args }) => {
  let groupInvitations = [];
  for (let [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) {
    let name = await conn.getName(jid);
    let link;
    let img;
console.log('laconsola dice: ' + jid, chat)

    try {
      link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(jid);
      var pp = await conn.profilePictureUrl(jid, 'image');
      img = await (await fetch(pp)).buffer();
    } catch {
      link = '';
      img = fs.readFileSync(join(__dirname, '../src/avatar_contact.png'));
    }

    groupInvitations.push({ jid, name, link, img });
  }

  for (let group of groupInvitations) {
    if (group.link) {
      let prep = generateWAMessageFromContent(m.chat, {
        extendedTextMessage: {
          text: `*${group.link}*`,
          contextInfo: {
            externalAdReply: {
              body: false,
              containsAutoReply: true,
              mediaType: 1,
              mediaUrl: group.link,
              renderLargerThumbnail: true,
              showAdAttribution: false,
              sourceId: group.name,
              sourceUrl: group.link,
              thumbnail: group.img,
              thumbnailUrl: group.img,
              title: group.name,
            },
          },
        },
      }, { userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });
      let txt = '';
         let count = 0;
         for (const c of group.link) {
             await new Promise(resolve => setTimeout(resolve, 15));
             txt += c;
             count++;
         
             if (count % 10 === 0) {
                 conn.sendPresenceUpdate('composing' , m.chat);
             }
         }
      conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id });
    } else {
      let resp = `No puedo enviar el enlace de invitación del grupo *${group.name}* porque no soy administrador.`
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
          await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );      
    }
  }
};

handler.help = ['invitame'];
handler.tags = ['group'];
handler.command = /^invitame$/i;
handler.admin = false;
handler.group = false;
handler.botAdmin = false;

export default handler;
