
const confirmation = {}
let handler = async (m, {conn, start, info, usedPrefix, command, userdb, senderJid}) => {
const {raizPath, media} = await import('../config.js')
const {default: fetch} = await import('node-fetch')
const {default: fs} = await import('fs')
const path = await import('path')
const {googleImage, googleVideos} = await import('../lib/googleMedia.js')
const {parseDuration} = await import('../lib/functions.js')
let image, resp = ''
if (command == 'waifu') {
try {
let res = await fetch('https://api.waifu.pics/sfw/waifu')
if (!res.ok) throw await res.text()
let json = await res.json()
//if (!json.url) return conn.sendWritingText(m.chat, `Error!`, userdb, m)
image = json.url
} catch (error) {
const res = await googleImage(command)
image = await res.getRandom()
//return conn.sendMessage(m.chat, {image:{url: image}, caption: `\n\n${info}`}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [['🔄 SIGUIENTE 🔄', `/${command}`]], m)
}
resp = `A-ARA ARA SEMPAI~~`
}
if (command == 'akira') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'akiyama') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'anna') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'asuna') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'ayuzawa') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'boruto') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'chiho') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
} 
if (command == 'chitoge') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'deidara') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'erza') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'elaina') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'eba') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'emilia') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'hestia') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'hinata') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'inori') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'isuzu') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
} 
if (command == 'itachi') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'itori') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'kaga') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'kagura') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'kaori') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'keneki') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
} 
if (command == 'kotori') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'kurumi') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'madara') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'mikasa') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'miku') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'minato') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
} 
if (command == 'naruto') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'nezuko') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'sagiri') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'sasuke') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
} 
if (command == 'sakura') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'cosplay') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (command == 'blackpink') {
image = await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/blackpink.txt').then(res => res.text()).then(body => {
let randomkpop = body.split('\n')
return randomkpop[Math.floor(Math.random() * randomkpop.length)]})
resp = `_${command}_`.trim()
}
if (command == 'cristianoronaldo') {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (/^(cat|gato|mishi|neko)$/i.test(command)) {
try {
let res = await fetch('https://cataas.com/cat')
image = await res.buffer()
resp = `😽 miau`.trim()
} catch (e) {
console.log(e)
return conn.sendWritingText(m.chat, `*Error!*`, userdb, m)
}
}
if (/^(itzy|kpopitzy)$/i.test(command)) {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (/^(kpop)$/i.test(command)) {
const kpopers = ['blackpink', 'exo', 'bts'].getRandom()
image = await fetch(`https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/${kpopers}.txt`).then(res => res.text()).then(body => {
let randomkpop = body.split('\n')
return randomkpop[Math.floor(Math.random() * randomkpop.length)]
}).catch(() => {
conn.reply(m.chat, 'Ocurrio un error, vuelve a intentar, si el fallo continua avisar a mi creador', m)
})
resp = `_${command} ${kpopers}_`.trim()
}
if (/^(loli)$/i.test(command)) {
//const file = fs.readFileSync(path.join(raizPath, '/src/JSON/nsfwloli.json'), 'utf-8')
//image = JSON.parse(file)
const folder = path.join(media, 'pictures/lolis')
const files = fs.readdirSync(folder)
image = files.map(f => path.join(folder, f)).getRandom();
resp = `_${command}_`.trim()
}
if (/^(meme)$/i.test(command)) {
  const res = await googleImage(command+' '+userdb.lang)
image = await res.getRandom()
let link = image
resp = `soy random 👺👍🏼\n\n${link}`
}
if (/^(messi)$/i.test(command)) {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (/^(navidad)$/i.test(command)) {
const res = await googleImage(command)
image = await res.getRandom()
resp = `_${command}_`.trim()
}
if (/^(nekoanime)$/i.test(command)) {
let ne = await (await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')).text()
let nek = ne.split('\n')
image = nek.getRandom()
resp = `Nyaww~ 🐾💗`
}
if (/^(ppcp|ppcouple)$/i.test(command)) {
const chic = ['chica cute', 'chico cute', 'pareja cute'].getRandom()
image = (await googleImage(chic)).getRandom()
console.log('randomsImage: ', image)
resp = `_${chic}_`.trim()
}
const buttons = [['🔄 SIGUIENTE 🔄', `${usedPrefix+command}`]]
if (start.buttons) {
const objMsg = {
text: resp,
footer: info.nanipe
}
await conn.sendButton(m.chat, objMsg, {url: image}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
const q = await conn.sendImageWriting(m.chat, image, `${resp}\n\nPara ${cmds} o la palabra siguiente`.trim(), userdb, m)
confirmation[m.chat] = {
command,
usedPrefix,
senderJid,
q, 
timeout: setTimeout(() => {
delete confirmation[m.chat]
}, parseDuration('1m'))
}

}
}
handler.before = async function before(m, {conn, start, info, userdb, senderJid}) {
if (!confirmation[m.chat]) return
const {q, usedPrefix, command, senderJid: user, timeout} = confirmation[m.chat]
if (/^siguiente$/i.test(m.text.toLowerCase())) {
clearTimeout(timeout)
await handler(q, {conn, start, info, usedPrefix, command, userdb, senderJid})
}
}
handler.command = /^(akira|akiyama|anna|asuna|ayuzawa|boruto|chiho|chitoge|deidara|erza|elaina|eba|emilia|hestia|hinata|inori|isuzu|itachi|itori|kaga|kagura|kaori|keneki|kotori|kurumi|madara|mikasa|miku|minato|naruto|nezuko|sagiri|sasuke|sakura|cosplay|blackpink|cristianoronaldo|(cat|gato|mishi|neko)|(itzy|kpopitzy)|(kpop)|(loli)|(meme)|messi|navidad|nekoAnime|(ppcp|ppcouple)|waifu)$/i
handler.help = ['akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura', 'cosplay']
handler.tags = ['anime']
handler.menu = [
{title: "👾 WAIFU", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo waifu", id: `waifu`},
{title: "👾 AKIRA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo akira", id: `akira`},
{title: "👾 AKIYAMA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo akiyama", id: `akiyama`},
{title: "👾 ANNA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo anna", id: `anna`},
{title: "👾 ASUNA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo asuna", id: `asuna`},
{title: "👾 AYUZAWA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo ayuzawa", id: `ayuzawa_`},
{title: "👾 BORUTO", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo boruto", id: `boruto`},
{title: "👾 CHIHO", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo chiho", id: `chiho`},
{title: "👾 CHITOGE", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo chitoge", id: `chitoge`},
{title: "👾 DEIDARA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo deidara", id: `deidara`},
{title: "👾 ERZA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo erza", id: `erza`},
{title: "👾 ELAINA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo elaina", id: `elaina`},
{title: "👾 EBA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo eba", id: `eba`},
{title: "👾 EMILIA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo emilia", id: `emilia_`},
{title: "👾 HESTIA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo hestia", id: `hestia`},
{title: "👾 HINATA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo hinata", id: `hinata`}, 
{title: "👾 INORI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo inori", id: `inori`}, 
{title: "👾 ISUZU", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo isuzu", id: `isuzu`},
{title: "👾 ITACHI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo itachi", id: `itachi`},
{title: "👾 ITORI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo itori", id: `itori`}, 
{title: "👾 KAGA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo kaga", id: `kaga`}, 
{title: "👾 KAGURA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo kagura", id: `kagura`}, 
{title: "👾 KAORI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo kaori", id: `kaori`}, 
{title: "👾 KENEKI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo keneki", id: `keneki`}, 
{title: "👾 KOTORI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo kotori", id: `kotori`}, 
{title: "👾 KURUMI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo kurumi", id: `kurumi`}, 
{title: "👾 MADARA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo madara", id: `madara`}, 
{title: "👾 MIKASA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo mikasa", id: `mikasa`},
{title: "👾 MIKU", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo miku", id: `miku`},
{title: "👾 MINATO", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo minato", id: `minato`}, 
{title: "👾 NARUTO", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo naruto", id: `naruto`}, 
{title: "👾 NEZUKO", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo nezuko", id: `nezuko`}, 
{title: "👾 SAGIRI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo sagiri", id: `sagiri`}, 
{title: "👾 SASUKE", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo sasuke", id: `sasuke`}, 
{title: "👾 SAKURA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo sakura", id: `sakura`},
{title: "👾 COSPLAY", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo cosplay", id: `cosplay`},
{title: "🖼 BLACKPINK", description: `Muestra una imagen de BLACKPINK`, id: `blackpink`},
{title: "⚽ CRISTIANO RONALDO", description: `Muestra una imagen de Cristiano Ronaldo`, id: `cristianoronaldo`},
{title: "🐱 RANDOM CAT", description: `Muestra una imagen de un gato aleatorio`, id: `cat`},
{title: "🎤 ITZY RANDOM", description: `Muestra una imagen aleatoria de Itzy`, id: `itzy`},
{title: "🎤 KPOP RANDOM", description: `Muestra una imagen aleatoria de Kpop`, id: `kpop`},
{title: "👧 LOLI RANDOM", description: `Muestra una imagen aleatoria de loli`, id: `loli`},
{title: "🖼 RANDOM-MEME", description: `Muestra un meme al azar`, id: `meme`},
{title: "⚽ RANDOM-MESSI", description: `Muestra una imagen de Messi al azar`, id: `messi`},
{title: "🎄 NAVIDAD", description: `utiliza el comando #navidad para ver memes navideños`, id: `navidad`},
{title: "🐾 NEKO", description: `utiliza el comando #neko para ver una imagen de un personaje de anime neko`, id: `nekoanime`},
{title: "👫 PAREJA CUTE", description: `utiliza el comando #ppcouple para ver una pareja cute`, id: `ppcouple`}
];
handler.type = "random";

handler.disabled = false;

export default handler
//{title: "🖼️ WALLPAPERS ANIME", description: `Utiliza los siguientes comandos para obtener wallpapers de anime:\n${handler.command.map(hc => `#${hc}`).join('\n')}`, id: `wallpapersanime`}
