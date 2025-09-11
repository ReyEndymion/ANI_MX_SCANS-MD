import { mediafiredl } from '../lib/mediafiredl.js'
import {getCommandVariants, wrapText} from '../lib/functions.js'
import { owner, info, temp, newsletterID, sBroadCastID, groupID, media } from '../config.js'
let handler = async (m, {conn, args, usedPrefix, command, db, userdb, senderJid}) => {
let resp, document, fileName, mimetype, fileLength
if (!args[0]) {
resp = `*[❗INFO❗] INGRESE UN ENLACE VALIDO DE MEDIAFIRE, EJEMPLO: ${usedPrefix + command} https://www.mediafire.com/file/zrx6r0jlui6gb0e/FREE_FIRE_Actualizado_1.103.2_by_TelleZ.apk/file*`
return conn.sendWritingText(m.chat, resp, userdb, m)
} else {
try {
let res = await mediafiredl(args[0])
let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
console.log('mediafire: ', filesize)
if (filesize > 999) {resp = '*[ ⛔ ] El archivo es demasiado pesado por lo que no se enviará.*';
return conn.sendWritingText(m.chat, resp, userdb, m)
} else {
resp = `
*NOMBRE:* ${filename}
*PESO:* ${filesizeH}
*TIPO:* ${ext}

*⏳ ESPERE EN LO QUE ENVIO SU ARCHIVO. . . .* 
*_- ARCHIVOS MAYORES A 100 MB PUEDE QUE NO SEAN ENVIADOS_* 
`

return conn.sendDocumentWriting(m.chat, document , {caption: txt.trim(), mimetype: mimetype, fileName: fileName}, userdb, m);
}
} catch (e) {
resp = `*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*\n\n*- CORROBORE QUE EL ENLACE SEA SIMILAR A:*\n*◉https://www.mediafire.com/file/0j2hmyq7hgb2uqn/Bully_Anniversary_Edition_2022.zip/file*\n\n${e.stack}`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
}
handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^mediafire(dl)?$/i
handler.menu = [
{title: "📥 MEDIAFIRE", description: `Descargar de mediafire utiliza:\n${getCommandVariants(handler.command).map(hc => `#${hc} <enlace.link/url>`).join('\n')}`, id: `mediafire`},
];
handler.type = "descargas";
handler.disabled = false;

export default handler
