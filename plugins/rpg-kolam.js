import { owner, temp, newsletterID, sBroadCastID, groupID, media} from '../config.js'
import fetch from 'node-fetch'
let handler = async (m, {conn, start, info, userdb, db, senderJid}) => {
let grupos = [info.ganisubbots, info.ganicmd]
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png' )
//let enlace = { contextInfo: { externalAdReply: {title: info.nanie, body: 'support group' , sourceUrl: grupos.getRandom(), thumbnail: await(await fetch(img.getRandom())).buffer() }}}
//let enlace2 = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: paypal, mediaType: 'VIDEO', description: '', title: info.nanie, body: info.nanie, thumbnailUrl: await(await fetch(img)).buffer(), sourceUrl: paypal }}}
//let dos = [enlace, enlace2]

let name = userdb.name
let level = userdb.level
let exp = userdb.exp
let paus = userdb.paus
let kepiting = userdb.kepiting
let gurita = userdb.gurita
let cumi = userdb.cumi
let buntal = userdb.buntal
let dory = userdb.dory
let lumba = userdb.lumba
let lobster = userdb.lobster
let hiu = userdb.hiu
let udang = userdb.udang
let ikan = userdb.ikan
let orca = userdb.orca
//let info.nanie = info.nanie 

const resp = `🌊🌊 PISCINA DE PECES 🌊🌊
👤» *${name}*

╭━━━━━━━━━⬣ 
┃ *PISCINA DE PECES*
┃ *╸╸╸╸╸╸╸╸╸╸╸╸╸╸*
┃ 🦈 *Tiburón » ${hiu}*
┃ 🐟 *Pez » ${ikan}*
┃ 🐠 *Dory » ${dory}*
┃ 🐋 *Orca » ${orca}*
┃ 🐳 *Ballena » ${paus}*
┃ 🦑 *Calamar » ${cumi}*
┃ 🐙 *Pulpo » ${gurita}*
┃ 🐡 *Pez Globo » ${buntal}*
┃ 🦐 *Camarón » ${udang}*
┃ 🐬 *Delfín » ${lumba}*
┃ 🦞 *Langosta » ${lobster}*
┃ 🦀 *Cangrejo » ${kepiting}*
╰━━━━━━━━━⬣
🎏 *Total: ${paus + kepiting + gurita + cumi + buntal + dory + lumba + lobster + hiu + udang + ikan + orca}*`.trim()
const buff = `NIVEL ACTUAL: *${userdb.level}*\n` + info.nanie
const buttons = [['Volver al menú ☘️', '/menu'], ['Pasar', '#pasar']]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanie, m );
}
}
handler.help = ['kotakikan', 'kolam', 'kolamikan']
handler.tags = ['rpg']
handler.command = /^(picina|piscina|peces|kotak(ikan)?|kolam(ikan)?)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler 
//handler.register = true
