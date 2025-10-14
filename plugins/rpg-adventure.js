
const cooldown = 1500000 //25 minutos
let handler = async (m, {conn, info, start, usedPrefix, usersdb, userdb, senderJid}) => {
const {reward, worldbank} = await import('../lib/functionsGames.js')
const {rpg} = await import('../rpg.js')
const {menuform, flaaa, idiomas, ct} = await import('../lib/constants.js')
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }


const randomLang = ct.getRandom()
const alpha2 = randomLang.toUpperCase()
let kt = await worldbank(alpha2)
let imgr = flaaa.getRandom()
let user = usersdb[senderJid]
let timers = (cooldown - (new Date - user.lastadventure))

if (user.health < 80) {
let resp = `${menuform.htki} BAJA SALUD ${menuform.htka}\n\n*@${senderJid.split`@`[0]}*´ TU SALUD 💔 ESTA POR DEBAJO DE *80!!*
POR FAVOR CURATE PRIMERO PARA AVENTURAR DE NUEVO`.trim()
const buttons = [[`❤️ CURAME`, `${usedPrefix}heal`]]
if (start.buttons) {
const msgObj = {
title: 'MALA SALUD',
text: resp,
footer: info.nbcde
}
return conn.sendButton(m.chat, msgObj, {url: imgr}, buttons, userdb, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\n\nUsa el comando:\n${cmds}`
return conn.sendImageWriting(m.chat, imgr, resp, userdb, fkontak)
}
}
if (new Date - user.lastadventure <= cooldown) {
let resp = `${htki} DESCANSANDO ${htka}\n\n*@${senderJid.split`@`[0]}* YA AVENTURASTE, POR FAVOR ESPERA HASTA QUE TERMINE EL TIEMPO DE DESCANSO\n\n⏱️ ${timers.toTimeString()}`
const buttons = [[`🔔 RECLAMO DIARIO`, `${usedPrefix}daily`]]
if (start.buttons) {
const msgObj = {
title: 'DESCANSANDO',
text: resp,
footer: info.nanipe
}
return conn.sendButton(m.chat, msgObj, {url: imgr}, buttons, userdb, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\n\nUsa el comando:\n${cmds}`
return conn.sendImageWriting(m.chat, imgr, resp, userdb, fkontak)
}
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
let resp = `${menuform.htki} AVENTURA ${menuform.htka}\n\n${text.trim()}\n\n🎒 INVENTARIO usa el comando: *${usedPrefix}inventory*`
let img = `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`
const buttons = [[`🎒 inventario`, `${usedPrefix}inventory`], [`🔔 reclamo diario`, `${usedPrefix}daily`]]
if (start.buttons) {
const msgObj = {
text: resp,
footer: info.nanipe
}
return conn.sendButton(m.chat, msgObj, {url: img}, buttons, userdb, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\n\n🔔 RECLAMO DIARIO usa el comando: *${usedPrefix}daily*`
await conn.sendImageWriting(m.chat, img, resp, userdb, fkontak)
user.lastadventure = new Date * 1
}
}
handler.help = ['adventure']
handler.tags = ['rpg']
handler.command = /^(adventure|adv|aventura|aventurar)$/i

handler.cooldown = cooldown
handler.disabled = false

handler.menu = [
{title: "🗺️ AVENTURA", description: `Aventúrate en un lugar aleatorio del mundo y obtén recompensas, usa el comando #adventure`, id: `adventure`},
];
handler.type = "rpg";

export default handler

