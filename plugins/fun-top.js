import util from 'util'
import path from 'path'
import fs from 'fs'
let { default: axios } = await import('axios');
let user = a => '@' + a.split('@')[0]
async function handler(m, {conn, participants, command, text, usedPrefix, db, userdb, senderJid, isLidGroup }) {
if (!text) return conn.sendWritingText(m.chat, `Ejemplo de uso:\n.top *texto*`, userdb, m)
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
let k = Math.floor(Math.random() * 70);
let x = `${pickRandom(['🤓','😅','😂','😳','😎', '🥵', '😱', '🤑', '🙄', '💩','🍑','🤨','🥴','🔥','👇🏻','😔', '👀','🌚'])}`
let l = Math.floor(Math.random() * x.length);
let top = `*${x} Top 10 ${text} ${x}*

*1. ${user(a)}*
*2. ${user(b)}*
*3. ${user(c)}*
*4. ${user(d)}*
*5. ${user(e)}*
*6. ${user(f)}*
*7. ${user(g)}*
*8. ${user(h)}*
*9. ${user(i)}*
*10. ${user(j)}*`
return conn.sendWritingText(m.chat, top, userdb, m );
}
handler.help = handler.command = ['top']
handler.tags = ['fun']
handler.group = true
handler.limit = 2
handler.menu = [
{title: "🎖️ TOP", description: "Top del grupo usa #top <tema a eleccion>", id: `top`}, 
];
handler.type = "fun";
handler.disabled = false;

export default handler
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}
