import { rpgshop, rpgshopp } from "../rpg.js"
import { msToTime, pickRandom } from "../lib/functions.js"
import { owner, temp, newsletterID, sBroadCastID, groupID, media} from '../config.js'
let handler = async (m, {conn, start, info, isPrems, usedPrefix, userdb, db, senderJid}) => { //lastmiming
let resp, imagen
const q = {
"key": {
"participants":"0@s.whatsapp.net",
"remoteJid": "status@broadcast",
"fromMe": false,
"id": "Halo"
},
"message": {
"contactMessage": {
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
}
},
"participant": "0@s.whatsapp.net"
}

let premium = userdb.premium
let minar = `${pickRandom(['Que pro 😎 has minado',
'🌟✨ Genial!! Obtienes',
'WOW!! eres un(a) gran Minero(a) ⛏️ Obtienes',
'Has Minado!!',
'😲 Lograste Minar la cantidad de',
'Tus Ingresos subiran gracias a que minaste',
'⛏️⛏️⛏️⛏️⛏️ Minando',
'🤩 SII!!! AHORA TIENES',
'La minaria esta de tu lado, por ello obtienes',
'😻 La suerte de Minar',
'♻️ Tu Mision se ha cumplido, lograste minar',
'⛏️ La Mineria te ha beneficiado con',
'🛣️ Has encontrado un Lugar y por minar dicho lugar Obtienes',
'👾 Gracias a que has minado tus ingresos suman',
'Felicidades!! Ahora tienes','⛏️⛏️⛏️ Obtienes'])}`


let aqua = `${pickRandom([0, 2, 3, 1, 5])}` * 1
let aquapremium = `${pickRandom([2, 4, 6, 7, 5, 9])}` * 1

let rock = `${pickRandom([6, 9, 0, 12, 2])}` * 1
let rockpremium = `${pickRandom([13, 9, 17, 20, 25])}` * 1

let pancingan = `${pickRandom([1, 0, 2, 1, 0, 0, 0])}` * 1
let pancinganpremium = `${pickRandom([1, 3, 4, 9, 2, 5, 8])}` * 1

const recompensas = {	
aqua: premium ? aquapremium : aqua,
rock: premium ? rockpremium : rock,
pancingan: premium ? pancinganpremium : pancingan,
}
//let xp = Math.floor(Math.random() * 2000)
let money = `${pickRandom([100, 200, 250, 300, 370, 400, 450, 480, 500, 510, 640, 680, 704, 760, 800, 840, 880, 900, 1000, 1059, 1080, 1100, 1190, 1230, 1380, 1399, 1290, 1300, 1340, 1350, 1590, 1400, 1450, 1700, 1800, 1900, 2000, 0, 0, 10, 1, 99, 999, 1789, 1430])}` * 1
let moneypremium = `${pickRandom([500, 600, 700, 800, 900, 1000, 1050, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1950, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3400, 3500, 3600, 3700, 3800, 3850, 3900, 3950, 4000])}` * 1

let time = userdb.lastcoins + 600000 //10 min
userdb.money += premium ? moneypremium : money
if (new Date - userdb.lastcoins < 600000) {
resp = `*⏱️ _Vuelve en_ ${msToTime(time - new Date())} _para continuar minando_ ${rpgshopp.emoticon('money')}⛏️*`
} else {
let texto = ''
for (let reward of Object.keys(recompensas)) {
if (!(reward in userdb)) continue
userdb[reward] += recompensas[reward]
texto += `+${recompensas[reward]} ${rpgshop.emoticon(reward)}\n`}
imagen = fs.readFileSync(anipp)
resp = `*${premium ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*\n*${minar}*\n*${money} ${rpgshop.emoticon('money')}*` + '\n\n' + `🍁 BONO\n` + texto + `\n\n🎟️ PREMIUM ⇢ ${premium ? '✅' : '❌'}\n${info.nanie}`
userdb.lastcoins = new Date * 1
}
//conn.sendHydrated(m.chat, '', pp, info.repoProyect, 'ANI MX SCANS-MD', null, null, , m,)
const buff = info.nanie
const buttons = [['_Minar Diamantes_ 💎', `${usedPrefix}minar3`], ['_Volver al menu_ ☘️', `${usedPrefix}menu`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
if (imagen) {
return conn.sendImageWriting(m.chat, imagen, resp+'\n'+cmds+'\n'+buff, m );
} else {
return conn.sendWritingText(m.chat, resp, userdb, q);
}
}
}
handler.help = ['minar2']
handler.tags = ['ANI']
handler.command = ['minar2', 'miming2', 'mine2', 'minarAMXcoins', 'minarcoins', 'minarAMX'] 
handler.fail = null
handler.exp = 0
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
