import fetch from 'node-fetch'
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { args, usedPrefix, command }) => {
if (!args[0]) throw `*[❗INFO❗] INGRESE UN ENLACE DE GITHUB, EJEMPLO: ${usedPrefix + command} ${md}*`
if (!regex.test(args[0])) throw '*[❗INFO❗] LINK INCORRECTO!*'
let [_, user, repo] = args[0].match(regex) || []
repo = repo.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
m.reply(`*[❗INFO❗] ESPERE UN MOMENTO EN LO QUE ENVIO SU ARCHIVO, SI ESTE NO ES ENVIADO PUEDE DEBERSE A QUE EL REPOSITORIO ES MUY PESADO*`)
conn.sendFile(m.chat, url, filename, null, m)
}
handler.help = ['gitclone <url>']
handler.tags = ['downloader']
handler.command = /gitclone/i
export default handler
