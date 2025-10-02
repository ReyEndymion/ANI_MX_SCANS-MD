import { API } from '../api.js'
import fetch from 'node-fetch'
import { lyrics, lyricsv2 } from '../lib/lyricsscraper.js'
import { owner, info, temp, newsletterID, sBroadCastID, groupID, media } from '../config.js'
import { googleImage } from '../lib/googleMedia.js'
let handler = async (m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
let { configDinamics } = await import('../lib/database.js')
const {start} = await configDinamics()
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
if (!teks) return conn.sendWritingText(m.chat, `*[❗INFO❗] EJEMPLO DE USO CORRECTO DEL COMANDO: ${usedPrefix + command} beret ojala*`, userdb, m)
try {
const result = await lyricsv2(teks).catch(async _ => await lyrics(teks))
let res = await fetch(API('https://some-random-api.ml', '/lyrics', {
title: result.author + result.title}))
if (!res.ok) throw await res.text()
let json = await res.json()
if (!json.thumbnail.genius) throw json
let linkresult = monospace + result.link + monospace
let resp =`TITULO: *${result.title}*\nAUTOR *${result.author}*\nLETRA${result.lyrics}\nURL: ${linkresult}\n> ${info.nanipe}, json.thumbnail.genius, [['🎵 DESCARGAR AUDIO 🎵', '#play.1 ${text}'], ['🎥 DESCARGAR VIDEO 🎥', '#play.2 ${text}'`.trim()
return conn.sendWritingText(m.chat, resp, userdb, m)

} catch (e) {
console.log('el error dice: ', e.stack)
return conn.sendWritingText(m.chat, `*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*`, m)
}
}
handler.help = ['lirik','letra'].map(v => v + ' <Apa>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric|letra)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
let mono = '`' + '`' + '`'
global.monospace = mono
