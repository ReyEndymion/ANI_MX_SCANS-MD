import { instagramStalk } from '@bochilteam/scraper'

let handler= async (m, { args, usedPrefix, command }) => {
if (!args[0]) throw `*[❗INFO❗] INGRESE EL NOMBRE DE USUARIO DE UN USUARIO DE INSTAGRAM, EJEMPLO: ${usedPrefix + command} luisitocomunica*`
const {
username,
name,
description,
followersH,
followingH,
postsH,
} = await instagramStalk(args[0])
m.reply(`
${name} *(${username})*
https://instagram.com/${username.replace(/^@/, '')}
*${followersH}* SEGUIDORES
*${followingH}* SEGUIDOS
*${postsH}* PUBLICACIONES
*BIO:* ${description}
`.trim())
}
handler.help = ['igstalk'].map(v => v + ' <username>')
handler.tags = ['downloader']
handler.command = /^(igstalk)$/i
export default handler
