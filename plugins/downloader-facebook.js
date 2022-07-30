import { facebookDl } from './scraper.js'
import { savefrom } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `*[❗INFO❗] INGRESE UN ENLACE DE FACEBOOK, EJEMPLO: ${usedPrefix + command} https://www.facebook.com/watch?v=636541477595139*`
try {
m.reply(`*[❗] DESCARGANDO SU VIDEO, AGUARDE UN MOMENTO POR FAVOR, ESTE PROCESO PUEDE DURAR ENTRE 2 Y 10 MINUTOS DEPENDIENDO DE LA DURACIÓN DEL VIDEO...`)
let res = await facebookDl(args[0]).catch(async _ => await savefrom(args[0])).catch(_ => null)
let url = res?.url?.[0]?.url || res?.url?.[1]?.url || res?.['720p'] || res?.['360p']
conn.sendMessage(m.chat, { video: { url }, caption: res?.meta?.title || '*AQUI ESTA SU VIDEO*' }, { quoted: m })
} catch (e) {
await m.reply('*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*\n\n*- CORROBORE QUE EL ENLACE SEA SIMILAR A:*\n*◉ https://www.facebook.com/watch?v=636541477595139*')
}}
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
export default handler
