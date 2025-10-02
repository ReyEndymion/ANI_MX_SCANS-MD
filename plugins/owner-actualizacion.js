const handler = async (m, {conn, text, usedPrefix, command, db, objs, userdb, senderJid}) => {
let { default: axios } = await import('axios');
const fs = await import('fs')
const {info, temp, dirP} = await import('../config.js');
const {cloneRepo, replaceFiles} = await import('../lib/functions.js')
let previousCommitSHA = '';
let previousUpdatedAt = '';
const url = info.repoProyect.replace('.git', '');
const regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)/;
const match = url.match(regex);
let owner = '';
let repo = '';
if (match) {
owner = match[1];
repo = match[2];
}
const {imagen1} = objs
// async function checkRepoUpdates() {
console.log('actualizar/Check: ', temp, dirP)
if (command === 'actualizaciones') {
try {
const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`);
const {sha, commit: {message}, html_url} = response.data[0];

if (sha !== previousCommitSHA || message !== previousUpdatedAt) {
previousCommitSHA = sha;
previousUpdatedAt = message;
let resp = `*[❗] ¡El repositorio ha sido actualizado recientemente!*\n*- Repositorio:* ${html_url}\n*- Mensaje de commit:* ${message}`

const documentMessage = {
mentionedJid: conn.parseMention(resp), 
forwardingScore: 200,
isForwarded: false,
externalAdReply: {
mediaUrl: html_url,
mediaType: 2,
previewType: 'pdf',
title: `Bot exclusivo de: ${author}`,
body: info.nanipe,
thumbnail: fs.readFileSync(imagen1),
sourceUrl: `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`
},
}
return conn.sendDocumentWriting(m.chat, info.hp_otkstogthr, {caption: resp, mimetype: `application/zip`, fileName: info.namerepre, fileLength: 99999999999999, pageCount: 200, contextInfo: documentMessage}, userdb, m);
}
} catch (error) {
let resp = `*[❗] Error al verificar el repositorio:* ${error.message}`;
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
if (command === 'actualizar') {
try {
await conn.sendWritingText(m.chat, '*🔄 Clonando repositorio...*', userdb, m)
await cloneRepo(url, temp)

await conn.sendWritingText(m.chat, '*📁 Reemplazando archivos...*', userdb, m)
replaceFiles(temp, dirP)

return conn.sendWritingText(m.chat, '*✅ Repositorio actualizado correctamente! Reinicia el bot si es necesario.*', userdb, m)
} catch (e) {
return conn.sendWritingText(m.chat, `❌ Error al actualizar: ${e}`, userdb, m)
}

}
//}
//return checkRepoUpdates()
//setInterval(checkRepoUpdates, 60000);
};
handler.command = /^(actualiza(r|ciones))/i;
handler.rowner = true;
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler;
