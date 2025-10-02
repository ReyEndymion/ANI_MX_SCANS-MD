import fetch from 'node-fetch'
let handler = async (m, {conn, info, isPrems, db, userdb, senderJid, objs}) => {
const {imagen1} = objs
const {rpgshop} = await import('../rpg.js')
const {default: fs} = await import('fs')
const {pickRandom, clockString} = await import('../lib/functions.js')
let resp, imagen
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}

let premium = userdb.premium

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

let time = userdb.halloween + 18000000
if (new Date - userdb.halloween < 18000000) {
resp = `Ya recibiste tu recompensa 🎃\n\nVuelve en:\n${clockString(time - new Date() * 1)}`
return conn.sendWritingText(m.chat, resp, userdb, fkontak);
} else {
imagen = [fs.readFileSync(imagen1)].getRandom()
let texto = ''
for (let reward of Object.keys(recompensas)) {
if (!(reward in userdb)) continue
userdb[reward] += recompensas[reward]
texto += `*+${recompensas[reward]}* ${rpgshop.emoticon(reward)}\n`}
resp = `
╭━━👻━🏰━🎃━━⬣
┃ 🔮 RECOMPENSA SEMANAL!!
┃ *${premium ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*\n\n${texto}
╰━━🕯️━🍬━🕸️━━⬣\n\n🎟️ PREMIUM ⇢ ${premium ? '✅' : '❌'}\n> ${info.nanie}`
userdb.halloween = new Date * 1
return conn.sendImageWriting(m.chat, imagen, resp, userdb, fkontak)
}
}
handler.command = ['halloween'] 
handler.level = 7
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "🎃 HALLOWEEN", description: `Recibe tu recompensa semanal de Halloween, usa el comando #halloween`, id: `halloween`}
];
handler.type = "rpg";
handler.disabled = false;

export default handler
