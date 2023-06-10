/* By https://github.com/GataNina-Li/GataBot-MD */
/*viewOnce by rey Endymion*/
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let handler  = async (m, { conn, usedPrefix, command }) => {
if (!db.data.chats[m.chat].modohorny && m.isGroup) throw '*[❗INFO❗] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMIN Y DESEA ACTIVARLOS USE EL COMANDO #enable modohorny*'   
let res = await pickRandom(asupan)
conn.sendFile (m.chat, res, null, '*DISFRUTA DEL VIDEO 🥵*', m, null, {viewOnce: true})
    await delay(1 * 10000)
//await conn.sendMessage(m.chat, { text: `*DISFRUTA DEL VIDEO 🥵*`, wm, [['🔄 SIGUIENTE 🔄', `/${command}`]], m)
}
handler.help = ['videoxxxlesbi']
handler.tags = ['random']
handler.command = /^(videoxxxlesbi|videolesbixxx|pornolesbivid|pornolesbianavid|pornolesbiv|pornolesbianav|Pornolesbivid|Pornolesbianavid|pornolesv|Pornolesv)$/i
export default handler

function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]}

const asupan = [
"https://l.top4top.io/m_2257y4pyl0.mp4",
"https://c.top4top.io/m_2274woesg0.mp4",
"https://k.top4top.io/m_2257pdwjy0.mp4",
"https://a.top4top.io/m_2257qulmx0.mp4",
"https://a.top4top.io/m_2257vxzr62.mp4",
"https://b.top4top.io/m_2257wjmbh3.mp4",
"https://b.top4top.io/m_2257sen2a1.mp4",
"https://c.top4top.io/m_2257hpo9v3.mp4",
"https://e.top4top.io/m_2257pye7u1.mp4",
"https://c.top4top.io/m_2257p7xg14.mp4",
"https://c.top4top.io/m_2257p4v9i3.mp4",
"https://l.top4top.io/m_2257jvkrv3.mp4",
"https://b.top4top.io/m_2257pl7wh1.mp4",
"https://e.top4top.io/m_2257fiwnp2.mp4",
"https://b.top4top.io/m_22578b1nk1.mp4",
"https://k.top4top.io/m_22572gv7q1.mp4",
"https://i.top4top.io/m_2257pu90l2.mp4",
"https://d.top4top.io/m_2257vcwiw3.mp4",
"https://j.top4top.io/m_2258joebc2.mp4",
"https://g.top4top.io/m_2258kvnba4.mp4",
"https://f.top4top.io/m_2258nm8pe1.mp4",
"https://g.top4top.io/m_2258af7bc2.mp4",
"https://l.top4top.io/m_2258f0ci92.mp4",
"https://j.top4top.io/m_2258ehqpb2.mp4",
"https://h.top4top.io/m_2258pckkf3.mp4",
"https://e.top4top.io/m_225857rs20.mp4",
"https://k.top4top.io/m_225863kpa0.mp4",
"https://j.top4top.io/m_2258s6we62.mp4",
"https://i.top4top.io/m_2258if6l13.mp4",
"https://b.top4top.io/m_2258lmd2h1.mp4",
"https://j.top4top.io/m_2258a9oah2.mp4",
"https://i.top4top.io/m_22588w3xh0.mp4",
"https://g.top4top.io/m_225885lm14.mp4",
"https://e.top4top.io/m_2258buxc30.mp4",
"https://e.top4top.io/m_2258fvra62.mp4",
"https://l.top4top.io/m_22588mx7k4.mp4",
"https://g.top4top.io/m_2258zhldg1.mp4", 
]
