import fetch from 'node-fetch'
let handler = async (m, {isPrems, conn, db, userdb, senderJid}) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}
//let grupos = [nna, nn, nnn, nnnt]
let img = [fs.readFileSync(imagen1), fs.readFileSync(fs.readFileSync(imagen2)), fs.readFileSync(imagen3), fs.readFileSync(imagen2)]
//let enlace = { contextInfo: { externalAdReply: {title: info.nanie + ' 🐈', body: 'support group' , sourceUrl: grupos.getRandom(), thumbnail: await(await fetch(img.getRandom())).buffer() }}}
//let enlace2 = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: yt, mediaType: 'VIDEO', description: '', title: info.nanie, body: '😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', thumbnailUrl: await(await fetch(global.img)).buffer(), sourceUrl: yt }}}
//let dos = [enlace, enlace2]

let user = db.data.bot[conn.user.jid].chats.groups[m.chat].users[senderJid]
let premium = user.premium

let exp = `${pickRandom([1000, 1800, 2500, 3000, 3700, 4400, 5000, 5500, 6000, 6500])}` * 1
let exppremium = `${pickRandom([3000, 4500, 6600, 8500, 9999, 10500, 11600, 12650, 13479, 15000])}` * 1

let diamond = `${pickRandom([3, 5, 8, 9, 11, 13, 16, 18, 19, 20])}` * 1
let diamondpremium = `${pickRandom([8, 14, 18, 22, 27, 29, 33, 36, 38, 40])}` * 1

let kyubi = `${pickRandom([5, 8, 15, 16, 25, 28, 30])}` * 1
let kyubipremium = `${pickRandom([12, 19, 25, 34, 44, 50])}` * 1

let sampah = `${pickRandom([3, 3, 5, 7, 9, 14, 15])}` * 1
let sampahpremium = `${pickRandom([5, 8, 16, 21, 25, 30])}` * 1

let sword = `${pickRandom([1, 1, 2, 2, 1])}` * 1
let swordpremium = `${pickRandom([2, 3, 3, 5, 8])}` * 1

let uncoommon = `${pickRandom([2, 2, 2, 3, 3, 3, 4, 4, 4, 5])}` * 1
let uncoommonpremium = `${pickRandom([5, 5, 5, 5, 5, 7, 7, 9, 9, 10])}` * 1

let mythic = `${pickRandom([2, 2, 2, 1, 2, 1, 1, 2, 1, 3])}` * 1
let mythicpremium = `${pickRandom([2, 2, 3, 3, 3, 3, 4, 4, 4, 3])}` * 1

const recompensas = {
exp: premium ? exppremium : exp,
diamond: premium ? diamondpremium : diamond,
kyubi: premium ? kyubipremium : kyubi,
sampah: premium ? sampahpremium : sampah,
sword: premium ? swordpremium : sword,
uncoommon: premium ? uncoommonpremium : uncoommon,
mythic: premium ? mythicpremium : mythic,
}

let time = user.lastweekly + 259200000 //259200000 3 dias
if (new Date - user.lastweekly < 259200000) {
let resp = `Ya recibiste tu recompensa semanal ⛅`+ '\n' + info.nanie + `\n\nVuelve en:\n${clockString(time - new Date() * 1)}`+ '\n' + author

return await conn.sendWritingText(m.chat, resp, userdb, fkontak);
}
let texto = ''
for (let reward of Object.keys(recompensas)) {
if (!(reward in user)) continue
user[reward] += recompensas[reward]
texto += `*+${recompensas[reward]}* ${global.rpgshop.emoticon(reward)}\n`}
let text = `
╭━━⛅━☃️━⛈️━━⬣
┃ ☀️ Recompensa semanal!!
┃ *${premium ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*
╰━━💫━🌈━🌛━━⬣`
let resp = text + texto + `\n\n🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${premium ? '✅' : '❌'}\n${info.nanie}`
//await conn.sendButton(m.chat, text, texto + `\n\n🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${premium ? '✅' : '❌'}\n${info.nanie}`, img.getRandom(), [['🌅 𝙀𝙉𝙏𝙍𝙀𝙂𝘼 𝘿𝙀𝙇 𝙈𝙀𝙎 | 𝙈𝙊𝙉𝙏𝙃 🌠', '/monthly'], ['Volver al menú ☘️', '/menu']], m, enlace) 
await conn.writing(m.chat, resp)
await conn.sendMessage(m.chat, { image: img.getRandom(), caption: resp, mentions: conn.parseMention(resp) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} ); 

user.lastweekly = new Date * 1
}
handler.command = ['weekly', 'semana', 'semanal', 'cadasemana', 'entregasemanal'] 
handler.level = 7
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

function clockString(ms) {
let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return ['┃⇢ ', ye, ' *🗓️ Años : Year*\n', '┃⇢ ', mo, ' *⛅ Mes : Month*\n', '┃⇢ ', d, ' *☀️ Días : Days*\n', '┃⇢ ', h, ' *⏰ Horas : Hours*\n', '┃⇢ ', m, ' *🕐 Minutos : Minutes*\n', '┃⇢ ', s, ' *⏱️ Segundos : Seconds*'].map(v => v.toString().padStart(2, 0)).join('')
}
