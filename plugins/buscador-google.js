import { googleIt } from '@bochilteam/scraper'
import google from 'google-it';
let handler = async (m, { conn, command, args }) => {
const fetch = (await import('node-fetch')).default
let full = /f$/i.test(command)
let text = args.join` `
let url = 'https://google.com/search?q=' + encodeURIComponent(text)
let resp, imagen
if (!text) {
resp = '*[❗INFO❗] INGRESE EL TEXTO O TEMA QUE DESEE BUSCAR*'
} else {
try {
let search = await google({'query': text})//await googleIt(url)
imagen = `https://image.thum.io/get/fullpage/${url}`
//await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url, full }))).arrayBuffer()
resp = `*RESULTADOS DE : _${text}_*\n\n${url}\n\n`
//let msg = search.then(async (res) => {})
for (let g of search) {
resp += `_*${g.title}*_\n_${g.link}_\n_${g.snippet}_\n\n`
} 
} catch (error) {
resp = `${error}`
}
}    
    let txt = '';
    let count = 0;
if (resp === undefined) return
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 10));
    txt += c;
    count++;
    if (count % 10 === 0) {
      
await conn.sendPresenceUpdate('composing' , m.chat);
    }
    }

if (imagen) {
return conn.sendMessage(m.chat, { image: {url: imagen}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});  
} else {
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}		
}
handler.help = ['google', 'googlef'].map(v => v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^googlef?$/i
export default handler
