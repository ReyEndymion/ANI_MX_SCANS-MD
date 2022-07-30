import fetch from 'node-fetch'
let handler = async(m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '*[❗INFO❗] INSERTE EL COMANDO MAS EL NOMBRE DE USUARIO DE UN USUARIO DE TIKTOK*', m)
try {
let res = await fetch(`https://api.lolhuman.xyz/api/stalktiktok/${text}?apikey=9b817532fadff8fc7cb86862`)
let res2 = `https://api.lolhuman.xyz/api/pptiktok/${text}?apikey=9b817532fadff8fc7cb86862`
let json = await res.json()
if (res.status !== 200) throw await res.text()
if (!json.status) throw json
let thumb = await (await fetch(json.result.user_picture)).buffer()
let Mystic = `
*USUARIO:* ${json.result.username}
*NOMBRE:* ${json.result.nickname}
*SEGUIDORES:* ${json.result.followers}
*SEGUIDOS:* ${json.result.followings}
*LIKES:* ${json.result.likes}
*VIDEOS:* ${json.result.video}
*DESCRIPCION:* ${json.result.bio}
`.trim()
conn.sendFile(m.chat, res2, 'error.jpg', Mystic, m, false)
} catch (e) {
throw '*[❗INFO❗] ERROR, NO SE ECONTRO EL NOMBRE DE USUARIO INGRESADO*'
}}
handler.help = ['tiktokstalk'].map(v => v + ' <username>')
handler.tags = ['stalk']
handler.command = /^(tiktokstalk|ttstalk)$/i
export default handler
