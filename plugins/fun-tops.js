import path, { join } from 'path'
import fs from 'fs'
let user = a => '@' + a.split('@')[0]
async function handler(m, { groupMetadata, command, conn, participants, db, userdb, senderJid, isLidGroup }) {
const {media, lid} = await import('../config.js')
let ps = participants.map(v => isLidGroup ? v.phoneNumber : v.id)
let a = ps.getRandom()
let b = ps.getRandom()
let c = ps.getRandom()
let d = ps.getRandom()
let e = ps.getRandom()
let f = ps.getRandom()
let g = ps.getRandom()
let h = ps.getRandom()
let i = ps.getRandom()
let j = ps.getRandom()

let resp = `*_1.- ${user(a)}_*
*_2.- ${user(b)}_*
*_3.- ${user(c)}_*
*_4.- ${user(d)}_*
*_5.- ${user(e)}_*
*_6.- ${user(f)}_*
*_7.- ${user(g)}_*
*_8.- ${user(h)}_*
*_9.- ${user(i)}_*
*_10.- ${user(j)}_*`

if (command == 'topgays') {
let vn = join(media, 'audios/gay2.mp3')
let top = `*🌈TOP 10 GAYS/LESBIANAS DEL GRUPO🌈*\n\n${resp}`
let q = await conn.sendWritingText(m.chat, top, userdb, m );
return conn.sendAudioRecording(m.chat, vn, q)
}

if (command == 'topotakus') {
let vn = join(media, 'audios/otaku.mp3')
let top = `*🌸 TOP 10 OTAKUS DEL GRUPO 🌸*\n\n${resp}`
let q = await conn.sendWritingText(m.chat, top, userdb, m );
return conn.sendAudioRecording(m.chat, vn, q)
}
}
handler.help = handler.command = ['topgays','topotakus']
handler.tags = ['games']
handler.group = true
handler.menu = [
{title: "🎖️ JODA TOP GAYS", description: "Top gays usa #topgays ", id: `topgays`}, 
{title: "🎖️ JODA TOP OTAKUS", description: "Top otakus usa #topotakus ", id: `topotakus`}, 
];
handler.type = "fun";
handler.disabled = false;

export default handler
