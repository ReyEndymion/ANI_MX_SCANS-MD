import fetch from 'node-fetch'
let handler = async (m, {conn, start, info, usedPrefix, usersdb, userdb, senderJid, objs}) => {
const {imagen2} = objs
const {rpgshop} = await import('../rpg.js')
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : senderJid
else who = senderJid
let name = conn.getName(who) 

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
let resp = `🎟️ P R E M I U M ⇢ ${premium ? '✅' : '❌'}\n👝 ⇢ ${name}\n${recursos}`
const buttons = [[`🎒 inventario`, `${usedPrefix}inventory`], [`🔔 reclamo diario`, `${usedPrefix}daily`]]
if (start.buttons) {
const msgObj = {
text: resp,
footer: info.nanipe
}
return conn.sendButton(m.chat, msgObj, {url: imagen2}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\n\n*PARA VER MÁS RECURSOS VISITE EL INVENTARIO*\n${cmds}`
return conn.sendImageWriting(m.chat, imagen2, resp, userdb, m)
}
 
}
handler.help = ['bal']
handler.tags = ['xp']
handler.command = ['bal2', 'cartera', 'wallet', 'cartera2', 'balance2'] 
handler.menu = [
{title: "👝 CARTERA", description: `Consulta tu cartera actual, usa el comando #cartera`, id: `cartera`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler
