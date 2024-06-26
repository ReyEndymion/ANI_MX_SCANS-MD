import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch';
let handler = async (m, { conn, args }) => {
if (!args[0]) {
    let resp = '*[❗𝐈𝐍𝐅𝐎❗] INSERTE EL COMANDO MAS EL ENLACE / LINK DE UN VIDEO DE YOUTUBE*'
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
try {
    let url = args[0]
    let q = args[1] + 'p'
    const yt = await youtubedl(url).catch(async _ => await youtubedlv2(url))
    const ttl = yt.title
    let dl_url, size, lengthSize
    if (yt.video['144p'] && yt.video['144p'].fileSize > 0 && yt.video['144p'].fileSizeH !== 'MB' ) {
        size =  yt.video['144p'].fileSizeH
        dl_url = await yt.video['144p'].download()
        lengthSize =  yt.video['144p'].fileSize
    } else if (yt.video['360p'] && yt.video['360p'].fileSize > 0 && yt.video['360p'].fileSizeH !== 'MB' ) {
        size =  yt.video['360p'].fileSizeH
        dl_url = await yt.video['360p'].download()
        lengthSize =  yt.video['360p'].fileSize
    } else if (yt.video['480p'] && yt.video['480p'].fileSize > 0 && yt.video['480p'].fileSizeH  !== 'MB') {
        size = yt.video['480p'].fileSizeH
        dl_url = await yt.video['480p'].download()
        lengthSize = yt.video['480p'].fileSize
    } else if (yt.video['720p'] && yt.video['720p'].fileSize > 0 && yt.video['720p'].fileSizeH  !== 'MB') {
        size = yt.video['720p'].fileSizeH
        dl_url = await yt.video['720p'].download()
        lengthSize = yt.video['720p'].fileSize
    } else if (yt.video['1080p'] && yt.video['1080p'].fileSize > 0 && yt.video['1080p'].fileSizeH  !== 'MB') {
        size = yt.video['1080p'].fileSizeH
        dl_url = await yt.video['1080p'].download()
        lengthSize = yt.video['1080p'].fileSize
    } else if (args[1]) {
        size = yt.video[q].fileSizeH
        dl_url = await yt.video[q].download()
    } else {
    let resp = `Este video no pose medios de descarga o esta protegido`
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
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
    }
    
    if (lengthSize > 200000) {
        let resp = `Este video es muy pesado para ser enviado`
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
        return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
        }
let resp = `*_⏳SE ESTA PROCESANDO SU VIDEO...⏳_*\n\n*◉ SI SU VIDEO NO ES ENVIADO, PRUEBE CON EL COMANDO #playdoc O #play.2 ᴏ #ytmp4doc ◉*`
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

let c = await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
let cap = `▢ TITULO: ${ttl}\n▢ PESO DEL VIDEO: ${size}`
for (const c of cap) {
await new Promise(resolve => setTimeout(resolve, 5));
txt += c;
count++;
if (count % 10 === 0) {
  
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
return conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: txt, thumbnail: await fetch(yt.thumbnail) }, { quoted: c, ephemeralExpiration: 2*60*1000 })
} catch (e) {
let resp = `*[❗] ERROR: ${e} NO FUE POSIBLE DESCARGAR EL VIDEO*`
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
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
}
handler.command = /^fgmp4|dlmp4|getvid|yt(v|mp4)?$/i
export default handler
