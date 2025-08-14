import fetch from 'node-fetch'
let handler = async (m, {conn, args, command, usedPrefix, chatdb, db, userdb, senderJid}) => {
if (!chatdb.modohorny && m.isGroup) return conn.sendWritingText(m.chat, '*[❗INFO❗] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMIN Y DESEA ACTIVARLOS USE EL COMANDO #enable modohorny*', m)
if (!args[0]) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESE UN ENLACE VALIDO DE XVIDEOS, EJEMPLO: ${usedPrefix + command} https://www.xvideos.com/video70389849/pequena_zorra_follada_duro*`, m)
try {
await conn.sendWritingText(m.chat, '[❗] El video esta siendo procesado, espere un momento en lo que es enviado..\n\n﹣ EL TIEMPO DE ENVIO DEPENDE DEL PESO Y DURACIÓN DEL VIDEO', m)
let res = await fetch(`https://zenzapis.xyz/downloader/xvideos?apikey=${keysxxx}&url=`+args[0])
let json = await res.json()
return conn.sendDocumentWriting(m.chat, json.result.files.high , {mimetype: 'video/mp4', fileName: json.result.title }, userdb, m )
} catch (e) {
return conn.sendWritingText(m.chat, '*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*\n\n*- CORROBORE QUE EL ENLACE SEA SIMILAR A:*\n*◉ https://www.xvideos.com/video70389849/pequena_zorra_follada_duro*', m)
}}
handler.command = /^(xvideosdl)$/i
handler.register = true
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
