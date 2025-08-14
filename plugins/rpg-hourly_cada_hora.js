import { owner, temp, newsletterID, sBroadCastID, groupID, media} from '../config.js'
import { rpgshop } from '../rpg.js'
import fetch from 'node-fetch'
import { isNumber, msToTime, pickRandom } from '../lib/functions.js'
let handler = async (m, {conn, start, info, isPrems, usedPrefix, userdb, db, senderJid}) => {
let resp, imagen
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}
//let grupos = [nna, nn, nnn, nnnt]
//let gata = [img5, img6, img7, img8, img9]
//let enlace = { contextInfo: { externalAdReply: {title: info.nanie + ' 🐈', body: 'support group' , sourceUrl: grupos.getRandom(), thumbnail: await(await fetch(gata.getRandom())).buffer() }}}
//let enlace2 = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: yt, mediaType: 'VIDEO', description: '', title: info.nanie, body: '😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', thumbnailUrl: await(await fetch(global.img)).buffer(), sourceUrl: yt }}}
//let dos = [enlace, enlace2]

let premium = userdb.premium

let botol = `${pickRandom([1, 1, 2, 3, 3, 0, 0])}` * 1
let botolpremium = `${pickRandom([3, 3, 7, 7, 5, 5])}` * 1
	
let batu = `${pickRandom([2, 2, 1, 1, 1, 1, 3])}` * 1
let batupremium = `${pickRandom([4, 4, 3, 7, 7, 5])}` * 1

let potion = `${pickRandom([1, 2, 3, 4, 5])}` * 1
let potionpremium = `${pickRandom([2, 4, 6, 9, 12])}` * 1

let common = `${pickRandom([1, 0, 0, 2, 0, 1, 1, 1])}` * 1
let commonpremium = `${pickRandom([2, 2, 1, 3, 4])}` * 1

const recompensas = {
botol: premium ? botolpremium : botol,
batu: premium ? batupremium : batu,
common: premium ? commonpremium : common,
}

let time = userdb.lasthourly + 3600000 //1 Hora //3600000
if (new Date - userdb.lasthourly < 3600000) {
const resp = `Ya recibiste tu entrega de cada hora ♻️\nVuelve en *${msToTime(time - new Date())}* para recibir otra entrega.`
const buff = info.nanie
const buttons = [[`Menu`, `${usedPrefix}menu`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanie, m );
}
} else {
let texto = ''
for (let reward of Object.keys(recompensas)) {
if (!(reward in userdb)) continue
userdb[reward] += recompensas[reward]
texto += `*+${recompensas[reward]}* ${rpgshop.emoticon(reward)}\n`
}
const resp = `
╭━━🕐━🕑━🕒━━⬣
┃ ♻️ Entrega a cada hora!!
┃ *${premium ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*
╰━━🕕━🕔━🕓━━⬣\n\n` + texto + `\n\n🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${premium ? '✅' : '❌'}\n`

userdb.lasthourly = new Date * 1
const buff = info.nanie
const buttons = [['🎁 REGALO 🎁', `${usedPrefix}claim`], ['VOLVER AL MENÚ ☘️', `${usedPrefix}menu`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanie, m );
}
}
}
handler.help = ['hourly']
handler.tags = ['xp']
handler.command = ['hourly', 'entega', 'cadahora', 'recibirentrega'] 
handler.level = 4 
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
