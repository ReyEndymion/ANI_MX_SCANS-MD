import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import axiox from 'axios'
let handler = async (m, {conn, args, command, usedPrefix, chatdb, db, userdb, senderJid}) => {
if (!chatdb.modohorny && m.isGroup) {
return conn.sendWritingText(m.chat, '*[❗INFO❗] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMIN Y DESEA ACTIVARLOS USE EL COMANDO #enable modohorny*', m)
} else {
if (!args[0]) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESE UN ENLACE VALIDO DE XNXX, EJEMPLO: ${usedPrefix + command} https://www.xnxx.com/video-14lcwbe8/rubia_novia_follada_en_cuarto_de_bano*`, m)
try {
await conn.sendWritingText(m.chat, '[❗] El video esta siendo procesado, espere un momento en lo que es enviado..\n\n﹣ EL TIEMPO DE ENVIO DEPENDE DEL PESO Y DURACIÓN DEL VIDEO', m)
let res = await fetch(`https://zenzapis.xyz/downloader/xnxx?apikey=${keysxxx}&url=`+args[0])
let json = await res.json()
return conn.sendDocumentWriting(m.chat, json.result.files.high , {mimetype: 'video/mp4', fileName: json.result.title }, userdb, m )
} catch (e) {
return conn.sendWritinText(m.chat, '*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*\n\n*- CORROBORE QUE EL ENLACE SEA SIMILAR A:*\n*◉ https://www.xnxx.com/video-14lcwbe8/rubia_novia_follada_en_cuarto_de_bano*', m)
}}}
handler.command = /^(xnxxdl)$/i
handler.register = true
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
