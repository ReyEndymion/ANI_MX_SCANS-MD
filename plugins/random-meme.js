import axios from "axios"
import { googleImage } from '@bochilteam/scraper'
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let handler = async (m, {command, conn, text}) => {
    try{
let res = await axios(pickRandom(meme))
let json = res.data
let url = json.url
conn.sendMessage(m.chat, {image:{url: url}, caption: `_${command}_`.trim()}, wm, url, [['SIGUIENTE', `/${command}`]], m)
}catch {
    const res = await googleImage(command)
let image = await res.getRandom()
let link = image
let captionn = `soy random 👺👍🏼`
conn.sendFile (m.chat, link, null, captionn, m, null, {viewOnce: false})
    await delay(1 * 3000)
conn.sendMessage(m.chat, { text: `_${command}_`.trim()}, wm, [['🔄 SIGUIENTE 🔄', `/${command}`]], m)
}
}
handler.help = ['meme']
handler.tags = ['random']
handler.command = /^(meme)$/i
export default handler

function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]}

const meme = [
"https://meme-api.herokuapp.com/gimme/memesmexico",
"https://meme-api.herokuapp.com/gimme/mememexico",
"https://meme-api.herokuapp.com/gimme/memeslatam",
"https://meme-api.herokuapp.com/gimme/memeslatinoamerica",
"https://meme-api.herokuapp.com/gimme/latammemes",
"https://meme-api.herokuapp.com/gimme/memeslatinoamerica",
"https://meme-api.herokuapp.com/gimme/latammemes",
"https://meme-api.herokuapp.com/gimme/memesmexico",
"https://meme-api.herokuapp.com/gimme/mememexico",
"https://meme-api.herokuapp.com/gimme/memeslatam",
"https://meme-api.herokuapp.com/gimme/memesmexico",
"https://meme-api.herokuapp.com/gimme/mememexico",
"https://meme-api.herokuapp.com/gimme/memeslatam",
"https://meme-api.herokuapp.com/gimme/memeslatinoamerica",
"https://meme-api.herokuapp.com/gimme/latammemes",
"https://meme-api.herokuapp.com/gimme/memeslatinoamerica",
"https://meme-api.herokuapp.com/gimme/latammemes",
"https://meme-api.herokuapp.com/gimme/memesmexico",
"https://meme-api.herokuapp.com/gimme/mememexico",
"https://meme-api.herokuapp.com/gimme/memeslatam"
]
