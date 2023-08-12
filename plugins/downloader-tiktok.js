import fetch from 'node-fetch'
import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import { tiktokdl } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command, args }) => {
if (!text) {
    let resp =  `*[❗INFO❗] ENLACE DE TIKTOK FALTANTE, POR FAVOR INGRESE EN ENLACE/LINK DE ALGUN VIDEO DE TIKTOK*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} https://vm.tiktok.com/ZML42vSnn/*`
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
         return await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
    }
if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) {
    let resp = `*[❗INFO❗] ENLACE DE TIKTOK INCORRECTO, POR FAVOR INGRESE UN ENLACE/LINK DE ALGÚN VÍDEO DE TIKTOK*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} https://vm.tiktok.com/ZML42vSnn/*`
    let txt = '';
    let count = 0;
    for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 50));
        txt += c;
        count++;
        if (count % 10 === 0) {
            conn.sendPresenceUpdate('composing' , m.chat);
        }
    }
        return await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
    }
let texto = `*[❗] @${m.sender.split`@`[0]} AGUARDE UN MOMENTO EN LO QUE ENVIO SU VIDEO DE TIKTOK*`
try {
let prep = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: texto, contextInfo: { externalAdReply: { title: `${wm}`, body: null, thumbnail: imagen1, sourceUrl: `${animxscansmd}` }, mentionedJid: [m.sender]}}}, { quoted: m, userJid: conn.user.jid })
const { author: { nickname }, video, description } = await tiktokdl(args[0])//.catch(async _ => await tiktokdlv2(args[0]))
const url = video.no_watermark_raw || video.no_watermark || video.no_watermark_hd || video.with_watermark
await conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id, mentions: [m.sender] })
//let buttons = [{ buttonText: { displayText: 'AUDIO' }, buttonId: `${usedPrefix}tomp3` }]
let resp = `_${igfg}_\n\nPara convertirlo en audio conteste este mensaje usando:\n*${usedPrefix}tomp3*`
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
return conn.sendMessage(m.chat, { video: { url: url}, caption: txt.trim(), footer: await shortUrl(url)}, { quoted: m, ephemeralExpiration: 2*60*1000 })
} catch {
let resp = '*[❗INFO❗] LO LAMENTO, OCURRIÓ UN ERROR AL DESCARGAR SU VIDEO, POR FAVOR VUELVA A INTENTARLO*'
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
  
}
}
handler.help = ['tiktok']
handler.tags = ['downloader']
handler.alias = ['tiktok', 'tikdl', 'tiktokdl', 'tiktoknowm']
handler.command = /^(tt|tiktok)(dl|nowm)?$/i
export default handler

async function getInfo(url) {
let id = url.split('?')[0].split('/')
let res = await (await fetch(`https://www.tiktok.com/node/share/video/${id[3]}/${id[5]}/`)).json()
return res?.seoProps?.metaParams}
async function shortUrl(url) {
return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text()}
