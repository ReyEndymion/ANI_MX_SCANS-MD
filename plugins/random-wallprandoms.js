/*---------------------------------------------------------------------------------------
🍀 • By https://github.com/ALBERTO9883
🍀 • ⚘Alberto Y Ashly⚘
🍀 • https://github.com/ALBERTO9883/NyanCatBot-MD
-----------------------------------------------------------------------------------------*/
import { googleImage } from '../lib/googleMedia.js'
import axios from "axios"
let handler = async (m, {command, conn, db, userdb, senderJid}) => {
const res = await googleImage(`wallpaper ` + command?.replace('wp', ''))
let fgif = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "5215532867844-1600616542@g.us" } : {})},message: {"videoMessage": { "title":`️u`, "h": `Hmm`,'seconds': '99999', 'gifPlayback': 'true', 'caption': info.nanipe, 'jpegThumbnail': false }}}
let apikey = keysxxx
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
let name = await conn.getName[who]
let resp, imagen
if (command == 'wpmontaña') {
imagen = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/mountain?apikey=APIKEY`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'pubg') {
imagen = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/pubg?apikey=APIKEY`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'wpgaming') {
imagen = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/gaming?apikey=APIKEY`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'wpaesthetic') {
imagen = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/wallhp?apikey=APIKEY`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'wprandom') {
//let resAx = await axios("https://meme-api.herokuapp.com/gimme/wallpaper")
//let json = resAx.data
//imagen = json.url
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'coffee') {
imagen = await conn.getFile(`https://coffee.alexflipnote.dev/random`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'pentol') {
imagen = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/pentol?apikey=APIKEY`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'caricatura') {
imagen = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kartun?apikey=APIKEY`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'ciberespacio') {
imagen = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/cyberspace?apikey=APIKEY`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'technology') {
imagen = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/teknologi?apikey=APIKEY`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'doraemon') {
imagen = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/doraemon?apikey=APIKEY`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'hacker') {
imagen = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/hekel?apikey=APIKEY`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'planeta') {
imagen = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/tatasurya?apikey=APIKEY`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'randomprofile') {
imagen = await conn.getFile(`https://zenzapis.xyz/randomimage/profil?apikey=${apikey}`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'wpaesthetic2') {
imagen = await conn.getFile(`https://zenzapis.xyz/randomimage/aesthetic?apikey=${apikey}`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'wpvehiculo') {
imagen = await conn.getFile(`https://zenzapis.xyz/randomimage/mobil?apikey=${apikey}`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'wallhp') {
imagen = await conn.getFile(`https://zenzapis.xyz/randomimage/wallhp?apikey=${apikey}`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}
if (command == 'wpmoto') {
imagen = await conn.getFile(`https://zenzapis.xyz/randomimage/motor?apikey=${apikey}`)
imagen = await res.getRandom()
resp = `*◈•@${who.split("@s.whatsapp.net")[0]}*\n\n` + global.wait
}

let q = await conn.sendWritingText(m.chat, resp, userdb, m)

return conn.sendMessage(m.chat, {image: {url: imagen}, caption: `*Disculpa pero esto encontro este comando*`.trim(), mentions: [who]}, {quoted: q, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
handler.command = ['wpmontaña', 'pubg', 'wpgaming', 'wpaesthetic', 'wprandom', 'coffee', 'pentol', 'caricatura', 'ciberespacio', 'technology', 'doraemon', 'hacker', 'planeta', 'randomprofile', 'wpaesthetic2', 'wpvehiculo', 'wallhp', 'wpmoto']
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "👾 PPCOUPLE", description: "wallpapers de pareja", id: `ppcouple`},
{title: "👾 WPMONTAÑA", description: "wallpapers de montaña", id: `wpmontaña`},
{title: "👾 PUBG", description: "wallpapers de PUBG", id: `pubg`},
{title: "👾 WPGAMING", description: "wallpapers de gaming", id: `wpgaming`},
{title: "👾 WPAESTHETIC", description: "wallpapers estéticos", id: `wpaesthetic`},
{title: "👾 WPAESTHETIC2", description: "wallpapers estéticos", id: `wpaesthetic2`},
{title: "👾 WPRANDOM", description: "wallpapers aleatorios", id: `wprandom`}, 
{title: "👾 WALLHP", description: "wallpapers de teléfonos", id: `wallhp`}, 
{title: "👾 WPVEHICULO", description: "wallpapers de vehículos", id: `wpvehiculo`},
{title: "👾 WPMOTO", description: "wallpapers de motos", id: `wpmoto`},
{title: "👾 COFFEE", description: "wallpapers de café", id: `coffee`}, 
{title: "👾 PENTOL", description: "wallpapers de pentol", id: `pentol`}, 
{title: "👾 CARICATURA", description: "wallpapers de caricatura", id: `caricatura`}, 
{title: "👾 CIBERESPACIO", description: "wallpapers de ciberespacio", id: `ciberespacio`}, 
{title: "👾 TECHNOLOGY", description: "wallpapers de tecnología", id: `technology`}, 
{title: "👾 DORAEMON", description: "wallpapers de doraemon", id: `doraemon`}, 
{title: "👾 HACKER", description: "wallpapers de hacker", id: `hacker`}, 
{title: "👾 PLANETA", description: "wallpapers de planeta", id: `planeta`}, 
{title: "👾 RANDOMPROFILE", description: "wallpapers de perfil aleatorio", id: `randomprofile`},
];
handler.type = "random";
handler.disabled = false;

export default handler
