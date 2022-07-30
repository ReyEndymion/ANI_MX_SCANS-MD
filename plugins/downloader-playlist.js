/* Created by https://github.com/BrunoSobrino */
       /* Diseño by Yameko-Bot V1*/

import yts from "yt-search"
import fs from 'fs'
let handler = async (m, { text, conn, args, command, usedPrefix }) => {
if (!text) throw `*[❗INFO❗] NOMBRE DE LA CANCION FALTANTE, POR FAVOR INGRESE EL COMANDO MAS EL NOMBRE/TITULO DE UNA CANCION*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} Begin you*`    
try {
let imagen1 = fs.readFileSync('./src/nuevobot.jpg') 
let search = await yts(args.join(" "))
let listSerch = []
let listSerch2 = []
let teskd = `Musica relacionada con: ${args.join(" ")}`
const sections = [{
title: `|－－－－－{ *AUDIO* }－－－－－|`,
rows: listSerch },
{              
title: `|－－－－－{ *VIDEO* }－－－－－|`,
rows: listSerch2 }]
const listMessage = {
text: teskd,
footer: 'Elija una opcion y precione Enviar',
title: " 『 MUSICA RELACIONADA 』",
buttonText: "[♦ RESULTADOS ♦]",
sections}
const fake = { quoted: {
key : {
remoteJid: '6283136505591-1614953337@g.us',
participant : '0@s.whatsapp.net'},
message: {
orderMessage: {
itemCount: 9999999,
status: 1,
surface: 1,
message: '🌎ANI MX SCANS🌏', 
orderTitle: `Mystic`,
thumbnail: imagen1, 
sellerJid: '0@s.whatsapp.net'}}}}
for (let i of search.all) {
listSerch.push({title: i.title, description: `Autor: ${i.author.name} / ${i.timestamp}`, rowId: `${usedPrefix}ytmp3 ${i.url}`})
listSerch2.push({title: i.title, description: `Autor: ${i.author.name} / ${i.timestamp}`, rowId: `${usedPrefix}ytmp4 ${i.url}`})} 
conn.sendMessage(m.chat, listMessage, fake)
} catch (e) {
m.reply('*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO CON OTRO NOMBRE DE UNA CANCION*')
}}
handler.command = /^playlist|playlist2$/i
export default handler
