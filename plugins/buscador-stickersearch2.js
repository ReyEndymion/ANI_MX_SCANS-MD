/* Created By https://github.com/ALBERTO9883 */
import fs from 'fs'
import fetch from 'node-fetch'
import { googleImage } from '@bochilteam/scraper'
let handler = async (m, {text, usedPrefix, command, conn}) => {
if (!text) throw `*[❗] INGRESE EL NOMBRE DEL PAQUETE QUE DESEE BUSCAR*`
try {
const res2 = await googleImage(text)
let sfoto = res2.getRandom()
let json = await fetch(`https://api.lolhuman.xyz/api/stickerwa?apikey=${lolkeysapi}&query=${text}`)
let jsons = await json.json()
let { stickers } = jsons.result[0]
let res = jsons.result.map((v, index) => `🌅 • Resultado: ${1 + index}\n*🥗 • Nombre:* ${v.title}\n*🐢 • Autor:* ${v.author}\n*🍂 • Url:* ${v.url}`).join`\n\n───\n\n`
await conn.sendFile(m.chat, sfoto, 'error.jpg', res, m)
} catch {
await m.reply('*[❗] ERROR, POR FAVOR VUELVA A INTENTARLO*')}}
handler.command = ['stickersearch2', 'searchsticker2', 'stickerssearch2', 'searchstickers2']
export default handler
