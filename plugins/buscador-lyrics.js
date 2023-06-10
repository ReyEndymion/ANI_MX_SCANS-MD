import fetch from 'node-fetch'
import { lyrics, lyricsv2 } from '@bochilteam/scraper'
import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
if (!teks) throw `*[❗INFO❗] EJEMPLO DE USO CORRECTO DEL COMANDO: ${usedPrefix + command} beret ojala*`
try {
const result = await lyricsv2(teks).catch(async _ => await lyrics(teks))
let res = await fetch(global.API('https://some-random-api.ml', '/lyrics', {
title: result.author + result.title}))
if (!res.ok) throw await res.text()
let json = await res.json()
if (!json.thumbnail.genius) throw json
let linkresult = monospace + result.link + monospace
let letratexto =`TITULO: *${result.title}*\nAUTOR *${result.author}*\nLETRA${result.lyrics}\n𝚄𝚁𝙻: ${linkresult}\n${wm}, json.thumbnail.genius, [['🎵 DESCARGAR AUDIO 🎵', '#play.1 ${text}'], ['🎥 DESCARGAR VIDEO 🎥', '#play.2 ${text}'`.trim()
let txt = '';
let count = 0;
for (const c of letratexto) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
conn.sendMessage(m.chat, { text: txt, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch (e) {
console.log('el error dice: ', e)
await m.reply('*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*')
}
}
handler.help = ['lirik','letra'].map(v => v + ' <Apa>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric|letra)$/i
export default handler
let mono = '`' + '`' + '`'
global.monospace = mono
