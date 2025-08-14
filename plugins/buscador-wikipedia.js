import axios from "axios"
import fetch from "node-fetch"
import * as cheerio from 'cheerio'
async function wikipedia(querry) {
try {
const link = await axios.get(`https://es.wikipedia.org/wiki/${querry}`)
const $ = cheerio.load(link.data)
let judul = $('#firstHeading').text().trim()
let thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`
let isi = []
$('#mw-content-text > div.mw-parser-output').each(function (rayy, Ra) {
let penjelasan = $(Ra).find('p').text().trim() 
isi.push(penjelasan)})
for (let i of isi) {
const data = {
status: link.status,
result: {
judul: judul,
thumb: 'https:' + thumb,
isi: i}}
return data}
} catch (err) {
var notFond = {
status: link.status,
Pesan: err}
return notFond}}
let handler = async (m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `*[❗️INFO❗️] ESTAS USANDO MAL EL COMANDO!!*\n*USO CORRECTO:*\n*${usedPrefix + command} palabra clave a buscar*\n\n*EJEMPLO:*\n*${usedPrefix + command} Estrellas*`, userdb, m)
wikipedia(`${text}`).then(res => {
conn.sendWritingText(m.chat, `*AQUI TIENES LA INFORMACION ENCONTRADA:*\n\n` + res.result.isi, userdb, m)
}).catch(() => { conn.sendWritingText(m.chat, '*[❗️INFO❗️] NO SE ENCONTRO NINGUNA INFORMACION, PRUEBA QUE HAYAS ESCRITO UNA SOLA PALABRA Y LO HAYAS ESCRITO CORRECTAMENTE*', m)
})}
handler.help = ['wikipedia'].map(v => v + ' <apa>')
handler.tags = [ 'internet']
handler.command = /^(wiki|wikipedia)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
