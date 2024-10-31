import util from 'util'
import path from 'path'
import fs from 'fs'
import axios from 'axios';
let user = a => '@' + a.split('@')[0]
async function handler(m, { groupMetadata, command, conn, text, usedPrefix}) {
if (!text) return conn.sendWritingText(m.chat, `Ejemplo de uso:\n.top *texto*`, m) 
let ps = groupMetadata.participants.map(v => v.id)
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
return conn.sendWritingText(m.chat, top, m );
}
handler.help = handler.command = ['top']
handler.tags = ['fun']
handler.group = true
handler.limit = 2
export default handler
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}
