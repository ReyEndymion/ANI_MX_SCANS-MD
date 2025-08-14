import { owner, temp, newsletterID, sBroadCastID, groupID, media} from '../config.js'
import {rpgshop} from '../rpg.js'
import fetch from 'node-fetch'
let handler = async (m, {conn, start, info, usedPrefix, usersdb, userdb, db, senderJid}) => {	
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : senderJid
else who = senderJid
let name = conn.getName(who) 
//let grupos = [nna, nn, nnn, nnnt]
//let gata = [img5, img6, img7, img8, img9]
//let enlace = { contextInfo: { externalAdReply: {title: info.nanie + ' 🐈', body: 'support group' , sourceUrl: grupos.getRandom(), thumbnail: await(await fetch(gata.getRandom())).buffer() }}}
//let enlace2 = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: yt, mediaType: 'VIDEO', description: '', title: info.nanie, body: info.nanie, thumbnailUrl: await(await fetch(global.img)).buffer(), sourceUrl: yt }}}
//let dos = [enlace, enlace2]

let user = usersdb[who]
let premium = userdb.premium
const cartera = {
economia: {
exp: true,
limit: true,
money: true,
},
}
const recursos = Object.keys(cartera.economia).map(v => user[v] && `*${rpgshop.emoticon(v)} ⇢ ${user[v]}*`).filter(v => v).join('\n').trim()
let resp = `🎟️ *PREMIUM* ⇢ ${premium ? '✅' : '❌'}\n👝 ⇢ ${name}\n${recursos}\n\n*PARA VER MÁS RECURSOS VISITE EL INVENTARIO*\n`
const buff = info.nanie
const buttons = [['Inventario 🎒', `${usedPrefix}inventario`], ['Volver al menú ☘️', `${usedPrefix}menu`]]
if (start.buttons) {
await conn.sendHydrated(m.chat, resp, buff, null, info.repoProyect, info.nanie, null, null, buttons, m,)
return conn.sendButton( m.chat, resp, buff + info.nanie, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanie, m );
}
// 
}
handler.help = ['bal']
handler.tags = ['xp']
handler.command = ['bal2', 'cartera', 'wallet', 'cartera2', 'balance2'] 
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
