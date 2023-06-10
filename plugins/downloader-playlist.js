import { youtubeSearch } from '@bochilteam/scraper';

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
  if (!text) throw `*[❗INFO❗] NOMBRE DE LA CANCION FALTANTE, POR FAVOR INGRESE EL COMANDO MAS EL NOMBRE/TITULO DE UNA CANCION*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} Begin you*`;

  try {
    const { video } = await youtubeSearch(text);
    const listSections = [];

    let teks = [...video].map(v => {
      switch (v.type) {
        case 'video': {
          listSections.push(`*Título:* ${v.title}\n\nCopia y usa el comando\n\n'Video 🎥' => ${usedPrefix}ytmp4 ${v.url}\n\n'Videodoc 🎥' => ${usedPrefix}ytmp4doc ${v.url}\n\n'Audio 🎧', => ${usedPrefix}ytmp3 ${v.url}\n\n'Audiodoc 🎧', => ${usedPrefix}ytmp3doc ${v.url}`);
          break;
        }
      }
    }).filter(v => v).join('\n\n========================\n\n');
let resp = `『*MUSICA RELACIONADA* 』\n\nMusica relacionada con: ${args.join(" ")}\n${listSections}\n\n`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
  } catch (e){
    let resp = '*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO CON OTRO NOMBRE DE UNA CANCION*\n\n'
    let txt = '';
    let count = 0;
    for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 5));
        txt += c;
        count++;
    
        if (count % 10 === 0) {
            conn.sendPresenceUpdate('composing' , m.chat);
        }
    }
        await conn.sendMessage(m.chat, { text: txt.trim()+e, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )	
  }
};

handler.command = /^playlist|playlist2$/i;
export default handler;
