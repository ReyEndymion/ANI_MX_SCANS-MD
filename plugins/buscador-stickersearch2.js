/* Created By https://github.com/ALBERTO9883 */
import fs from 'fs'
import fetch from 'node-fetch'
import { owner, info, temp, newsletterID, sBroadCastID, groupID, media } from '../config.js'
import { googleImage } from '../lib/googleMedia.js'
let handler = async (m, {text, usedPrefix, command, conn, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `*[❗] INGRESE EL NOMBRE DEL PAQUETE QUE DESEE BUSCAR*`, userdb, m)
try {
const res2 = await googleImage(text)
let sfoto = res2.getRandom()
let json = await fetch(`https://api.lolhuman.xyz/api/stickerwa?apikey=${lolkeysapi}&query=${text}`)
let jsons = await json.json()
let { stickers } = jsons.result[0]
let res = jsons.result.map((v, index) => `🌅 • Resultado: ${1 + index}\n*🥗 • Nombre:* ${v.title}\n*🐢 • Autor:* ${v.author}\n*🍂 • Url:* ${v.url}`).join`\n\n───\n\n`
await conn.sendFile(m.chat, sfoto, 'error.jpg', res, m)
} catch {
return conn.sendWritingText(m.chat, `*[❗] ERROR, POR FAVOR VUELVA A INTENTARLO*`, m)
}}
handler.command = ['stickersearch2', 'searchsticker2', 'stickerssearch2', 'searchstickers2']
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
