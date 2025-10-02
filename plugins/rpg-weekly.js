import fs from 'fs'
let handler = async (m, {conn, info, start, isPrems, usedPrefix, db, userdb, senderJid, objs}) => {
const {imagen1, imagen2} = objs
const {rpgg, rpg, rpgshop, rpgshopp} = await import('../rpg.js')
const {pickRandom, clockString} = await import('../lib/functions.js')
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}
let img = [fs.readFileSync(imagen1), fs.readFileSync(imagen2)]

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

let time = userdb.lastweekly + 259200000 //259200000 3 dias
if (new Date - userdb.lastweekly < 259200000) {
let resp = `Ya recibiste tu recompensa semanal ⛅\n\nVuelve en:\n${clockString(time - new Date() * 1)}\n> ${info.nanie}`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
let texto = ''
for (let reward of Object.keys(recompensas)) {
if (!(reward in userdb)) continue
userdb[reward] += recompensas[reward]
texto += `*+${recompensas[reward]}* ${rpgshop.emoticon(reward)}\n`
}
const image = img.getRandom()
let text = `
╭━━⛅━☃️━⛈️━━⬣
┃ ☀️ Recompensa semanal!!
┃ *${premium ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*
╰━━💫━🌈━🌛━━⬣`
let resp = text + texto + `\n\n🎟️ P R E M I U M ⇢ ${premium ? '✅' : '❌'}`
let footer = texto + `\n\n🎟️ P R E M I U M ⇢ ${premium ? '✅' : '❌'}\n> ${info.nanie}`
const buttons = [['🌅 ENTREGA DEL MES 🌠', `${usedPrefix}monthly`], ['Volver al Menú ☘️', `${usedPrefix}menu`]]
userdb.lastweekly = new Date * 1
if (!start.buttons) {
return conn.sendButton(m.chat, {title: resp, text, footer}, {url: image}, buttons, userdb, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp = `${text}\n\n${texto}\n> ${info.nanie}\n\n${cmds}`
return conn.sendImageWriting(m.chat, image, resp, userdb, fkontak);  
}
}
handler.command = ['weekly', 'semana', 'semanal', 'cadasemana', 'entregasemanal'] 
handler.level = 7
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "⛅ SEMANAL", description: `Recompensa semanal, usa el comando #weekly`, id: `weekly`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler
