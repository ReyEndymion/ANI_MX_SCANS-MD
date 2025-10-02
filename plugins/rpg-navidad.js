import { rpgshop } from '../rpg.js'
import { owner, newsletterID, sBroadCastID, groupID, media} from '../config.js'
import fetch from 'node-fetch'
import { msToTime, pickRandom } from "../lib/functions.js"
let handler = async (m, {conn, start, info, isPrems, usedPrefix, userdb, db, senderJid}) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}
let premium = userdb.premium

let exp = `${pickRandom([1500, 2000, 2500, 3000, 3500, 4500, 5000, 6300, 7500, 10000])}` * 1
let exppremium = `${pickRandom([1000, 1500, 1800, 2100, 2500, 2900, 3300, 3600, 4000, 4500])}` * 1
	
let money = `${pickRandom([800, 1500, 2000, 2500, 3000, 3500, 4500, 5500, 6550, 7500])}` * 1
let moneypremium = `${pickRandom([800, 1300, 1600, 1900, 2200, 2500, 2700, 3000, 3300, 3500])}` * 1

let potion = `${pickRandom([1, 2, 3, 4, 5])}` * 1
let potionpremium = `${pickRandom([2, 4, 6, 9, 12])}` * 1

let tiketcoin = `${pickRandom([1, 0, 0, 2, 0])}` * 1
let tiketcoinpremium = `${pickRandom([2, 1, 1, 3, 4])}` * 1

let eleksirb = `${pickRandom([1, 1, 1, 3, 1, 2, 2, 1, 5, 8])}` * 1
let eleksirbpremium = `${pickRandom([3, 3, 5, 3, 8, 3, 4, 4, 10, 7])}` * 1

let umpan = `${pickRandom([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])}` * 1
let umpanpremium = `${pickRandom([30, 60, 90, 120, 150, 180, 210, 240, 270, 300])}` * 1

//let gata = Math.floor(Math.random() * 2000)

const recompensas = {	
exp: premium ? exppremium : exp,
money: premium ? moneypremium : money,
potion: premium ? potionpremium : potion,
tiketcoin: premium ? tiketcoinpremium : tiketcoin,	
eleksirb: premium ? eleksirbpremium : eleksirb,
umpan: premium ? umpanpremium : umpan,
}
let resp = '', img, texto = ''
let time = userdb.lastclaim + 7200000 //2 Horas 7200000
if (new Date - userdb.lastclaim < 7200000) {
resp = `YA RECLAMASTE TU REGALO 🎁\nVUELVE EN *${msToTime(time - new Date())}* PARA VOLVER A RECLAMAR`
return conn.sendWritingText(m.chat, resp, userdb, m)} else {
for (let reward of Object.keys(recompensas)) {
if (!(reward in userdb)) continue
userdb[reward] += recompensas[reward]
texto += `*+${recompensas[reward]}* ${rpgshop.emoticon(reward)}\n`}
resp = `
╭━━🎅━🎁━🎅━━⬣
┃ ✨ Obtienes un regalo!!
┃ *${premium ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*
╰━━🎁━☃️━🎅━━⬣`
img = 'https://img.freepik.com/vector-gratis/gente-diminuta-enormes-cajas-regalo-ilustracion-vectorial-plana-personas-que-celebran-cumpleanos-envian-o-reciben-regalos-lealtad-o-ideas-brillantes-recompensa-bonificacion-concepto-fiesta_74855-25016.jpg?w=2000'
}
userdb.lastclaim = new Date * 1
const buff = texto.length !== 0 ? texto + `\n\n🎟️ P R E M I U M ⇢ ${premium ? '✅' : '❌'}\n> ${info.nanipe}` : info.nanipe
const buttons = img.length !== 0 ? [['⛰️ _*ABRIR COFRE*_ ⛰️', `${usedPrefix}cofre'`], ['_*Volver al menu*_ ☘️', `${usedPrefix}menu`]] : [['_Volver al menu_ ☘️', `${usedPrefix}menu`]]
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
if (img) {
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
return conn.sendImageWriting(m.chat, img, resp+'\n'+cmds+'\n'+buff, fkontak );
}
} else {
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+buff, fkontak );
}
}
}
handler.command = ['navidad'] 
//handler.level = 7
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
