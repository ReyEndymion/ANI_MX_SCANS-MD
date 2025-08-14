import fetch from 'node-fetch'
let handler = async(m, {conn, text, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, '*[❗INFO❗] INSERTE EL COMANDO MAS EL NOMBRE DE USUARIO DE UN USUARIO DE TIKTOK*', userdb, m)
try {
let res = await fetch(`https://api.lolhuman.xyz/api/stalktiktok/${text}?apikey=${lolkeysapi}`)
let res2 = `https://api.lolhuman.xyz/api/pptiktok/${text}?apikey=${lolkeysapi}`
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
return conn.sendWritingText(m.chat, `*[❗INFO❗] ERROR, NO SE ECONTRO EL NOMBRE DE USUARIO INGRESADO*`, m)
}}
handler.help = ['tiktokstalk'].map(v => v + ' <username>')
handler.tags = ['stalk']
handler.command = /^(tiktokstalk|ttstalk)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
