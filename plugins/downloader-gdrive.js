import fetch from 'node-fetch'
import { sizeFormatter } from 'human-readable'
let formatSize = sizeFormatter({
std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B` })
let handler = async (m, {conn, args, db, userdb, senderJid}) => {
if (!args[0]){ 
let resp = '*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*\n\n*- CORROBORE QUE EL ENLACE SEA SIMILAR A:*\n*◉ https://drive.google.com/file/d/1dmHlx1WTbH5yZoNa_ln325q5dxLn1QHU/view*' 

return await conn.sendWritingText(m.chat, resp, userdb, m);
} 
if (!(args[0] && args[0].match(/drive\.google/i))) return conn.sendWritingText(m.chat, `Invalid URL`, userdb, m)
let id = (args[0].match(/\/?id=(.+)/i) || args[0].match(/\/d\/(.*?)\//))[1]
if (!id) return conn.sendWritingText(m.chat, `ID Not Found`, userdb, m)

try {
GDriveDl(args[0]).then(async (res) => {
let resp = '_Descargando su archivo, espere un momento..._\n\n_El tiempo de espera puede variar dependiendo del peso del archivo, si el peso supera los 100 MB puede que su archivo no sea enviado'

await conn.sendWritingText(m.chat, resp, userdb, m);
//conn.sendWritingText(m.chat,  , userdb, m)
if (!res) throw res
await conn.sendFile(m.chat, res.downloadUrl, res.fileName, '', m, null, { mimetype: res.mimetype, asDocument: true })
if (!res.downloadUrl) return conn.sendWritingText(m.chat, `Link Download Limit!`, userdb, m)

})
} catch(e) {
let resp = '*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*\n\n*- CORROBORE QUE EL ENLACE SEA SIMILAR A:*\n*◉ https://drive.google.com/file/d/1dmHlx1WTbH5yZoNa_ln325q5dxLn1QHU/view*'

await conn.sendWritingText(m.chat, resp, userdb, m);
console.log(e)
}
}
handler.command = /^(gdrive)$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
async function GDriveDl(url) {
let id
id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
let res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
method: 'post',
headers: {
'accept-encoding': 'gzip, deflate, br',
'content-length': 0,
'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
'origin': 'https://drive.google.com',
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
'x-drive-first-party': 'DriveWebUi',
'x-json-requested': 'true' }})

let { fileName, sizeBytes, downloadUrl } = JSON.parse((await res.text()).slice(4))

let data = await fetch(downloadUrl)
if (data.status !== 200) throw data.statusText
return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type')}
}
