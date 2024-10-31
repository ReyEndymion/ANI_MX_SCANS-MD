import fetch from 'node-fetch'
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, {conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESE UN ENLACE DE GITHUB, EJEMPLO: ${usedPrefix + command} ${md}*`, m)
if (!regex.test(args[0])) return conn.sendWritingText(m.chat, '*[❗INFO❗] LINK INCORRECTO!*', m)
let [_, user, repo] = args[0].match(regex) || []
repo = repo.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
await conn.sendWritingText(m.chat, `*[❗INFO❗] ESPERE UN MOMENTO EN LO QUE ENVIO SU ARCHIVO, SI ESTE NO ES ENVIADO PUEDE DEBERSE A QUE EL REPOSITORIO ES MUY PESADO*`, m)
return conn.sendFile(m.chat, url, filename, null, m)
}
handler.help = ['gitclone <url>']
handler.tags = ['downloader']
handler.command = /gitclone/i
export default handler
