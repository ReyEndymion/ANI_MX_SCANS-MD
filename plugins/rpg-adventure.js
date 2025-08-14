import fetch from 'node-fetch'
import {rpg} from '../rpg.js'
const cooldown = 1500000 //25 minutos
let handler = async (m, {usedPrefix, conn, userdb, db, senderJid}) => {
if (m.chat == 'status@broadcast') return
if (userdb.banned) return
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let ct = ['AF','AX','AL','DZ','AS','AD','AO','AI','AQ','AG','AR','AM','AW','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ','BM','BT','BO','BQ','BA','BW','BV','BR','IO','BN','BG','BF','BI','KH','CM','CA','CV','KY','CF','TD','CL','CN','CX','CC','CO','KM','CG','CD','CK','CR','CI','HR','CU','CW','CY','CZ','DK','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','ET','FK','FO','FJ','FI','FR','GF','PF','TF','GA','GM','GE','DE','GH','GI','GR','GL','GD','GP','GU','info.kom','GG','GN','GW','GY','HT','HM','VA','HN','HK','HU','IS','IN','ID','IR','IQ','IE','IM','IL','IT','JM','JP','JE','JO','KZ','KE','KI','KP','KR','XK','KW','KG','LA','LV','LB','LS','LR','LY','LI','LT','LU','MO','MK','MG','MW','MY','MV','ML','MT','MH','MQ','MR','MU','YT','MX','FM','MD','MC','MN','ME','MS','MA','MZ','MM','NA','NR','NP','NL','AN','NC','NZ','NI','NE','NG','NU','NF','MP','NO','OM','PK','PW','PS','PA','PG','PY','PE','PH','PN','PL','PT','PR','QA','RS','RE','RO','RU','RW','BL','SH','KN','LC','MF','PM','VC','WS','SM','ST','SA','SN','CS','SC','SL','SG','SX','SK','SI','SB','SO','ZA','GS','SS','ES','LK','SD','SR','SJ','SZ','SE','CH','SY','TW','TJ','TZ','TH','TL','TG','TK','TO','TT','TN','TR','XT','TM','TC','TV','UG','UA','AE','GB','US','UM','UY','UZ','VU','VE','VN','VG','VI','WF','EH','YE','ZM','ZW']

let ke = await fetch(`https://api.worldbank.org/v2/country/${ct.getRandom()}?format=json`)
let kt = await ke.json()
let imgr = flaaa.getRandom()
let timers = (cooldown - (new Date - userdb.lastadventure))

if (userdb.health < 80) {
let resp = `${htki} BAJA SALUD ${htka}\n\n*@${senderJid.split`@`[0]}*´ TU SALUD 💔 ESTA POR DEBAJO DE *80!!*
POR FAVOR CURATE PRIMERO PARA AVENTURAR DE NUEVO\n\n❤️ CURAME usa el comando: *${usedPrefix}heal*`.trim()
//return conn.sendWritingText(m.chat, resp, m );
return conn.sendImageWriting(m.chat, {image: {url: imgr + 'MALA SALUD'}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [[`❤️ CURAME`, `${usedPrefix}heal`]])
}
if (new Date - userdb.lastadventure <= cooldown) {
let resp = `${htki} DESCANSANDO ${htka}\n\n*@${senderJid.split`@`[0]}* YA AVENTURASTE, POR FAVOR ESPERA HASTA QUE TERMINE EL TIEMPO DE DESCANSO\n\n⏱️ ${timers.toTimeString()}\n\nPara 🔔 RECLAMO DIARIO usa el comando: *${usedPrefix}daily*`

return conn.sendMessage(m.chat, {image: {url: imgr + 'DESCANSANDO'}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [
[`🔔 RECLAMO DIARIO`, `${usedPrefix}daily`]]) 
}
const rewards = reward(user)

let text = `🛫 *@${senderJid.split`@`[0]}* ESTAS AVENTURANDO EN*» ${kt[1][0].name}*

${cmenut}
${cmenub} *ID:* ${kt[1][0].id}
${cmenub} *CIUDAD:* ${kt[1][0].capitalCity}
${cmenub} *LONGITUD:* ${kt[1][0].longitude}
${cmenub} *LATITUD:* ${kt[1][0].latitude}
${cmenuf}

🏞️ AVENTURA FINALIZADA
${cmenua}`

for (const lost in rewards.lost) if (user[lost]) {
const total = rewards.lost[lost].getRandom()
user[lost] -= total * 1
if (total) text += `\n${rpg.emoticon(lost)} ${total}`
}
text += '\n\n✨ RECOMPENSAS DE LA AVENTURA'
for (const rewardItem in rewards.reward) if (rewardItem in user) {
const total = rewards.reward[rewardItem].getRandom()
user[rewardItem] += total * 1
if (total) text += `\n» ${rpg.emoticon(rewardItem)} ${total}`
}
let resp = `${htki} AVENTURA ${htka}\n\n${text.trim()}\n\n🎒 INVENTARIO usa el comando: *${usedPrefix}inventory*\n\n🔔 RECLAMO DIARIO usa el comando: *${usedPrefix}daily*`
let img = `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`

await conn.sendMessage(m.chat, {image: {url: img}, caption: resp, mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [[`🎒 inventario`, `${usedPrefix}inventory`], [`🔔 reclamo diario`, `${usedPrefix}daily`]])
userdb.lastadventure = new Date * 1
}
handler.help = ['adventure']
handler.tags = ['rpg']
handler.command = /^(adventure|adv|aventura|aventurar)$/i

handler.cooldown = cooldown
handler.disabled = false

handler.menu = [];
handler.type = "";

export default handler

function reward(user = {}) {
let rewards = {
reward: {
money: 400,
exp: 300,
trash: 150,
potion: 3,
rock: 2,
	joincount: 2,
wood: 3,
string: 2,
common: 2 * (user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2 || 1),
uncoommon: [0, 0, 0, 1, 0].concat(
new Array(5 - (
(user.dog > 2 && user.dog < 6 && user.dog) || (user.dog > 5 && 5) || 2
)).fill(0)
),
mythic: [0, 0, 0, 0, 0, 1, 0, 0, 0].concat(
new Array(8 - (
(user.dog > 5 && user.dog < 8 && user.dog) || (user.dog > 7 && 8) || 3
)).fill(0)
),
legendary: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0].concat(
new Array(10 - (
(user.dog > 8 && user.dog) || 4
)).fill(0)
),
gato: [0, 1, 0, 0, 0],
centauro: [0, 1, 0, 0, 0],
dog: [0, 1, 0, 0, 0],
dragon: [0, 1, 0, 0, 0],
emerald: [0, 1, 0, 0, 0],
zorro: [0, 1, 0, 0, 0],
griffin: [0, 1, 0, 0, 0],
horse: [0, 1, 0, 0, 0],
kyubi: [0, 1, 0, 0, 0],
lion: [0, 1, 0, 0, 0],
pet: [0, 1, 0, 0, 0],
phonix: [0, 1, 0, 0, 0],
rhinoceros: [0, 1, 0, 0, 0],
robo: [0, 1, 0, 0, 0],
wolf: [0, 1, 0, 0, 0],
iron: [0, 0, 0, 1, 0, 0],
gold: [0, 0, 0, 0, 0, 1, 0],
diamond: [0, 0, 0, 0, 0, 0, 1, 0].concat(
new Array(5 - (
(user.zorro < 6 && user.zorro) || (user.zorro > 5 && 5) || 0
)).fill(0)
),
},
lost: {
health: 101 - user.gato * 4,
armordurability: (15 - user.armor) * 7
}
}
return rewards
}
