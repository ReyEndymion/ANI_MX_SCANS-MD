let handler = async (m, {conn, start, info, usedPrefix, usersdb, userdb, senderJid}) => {
const {clockString} = await import('../lib/functions.js')
let randomaku1 = `${Math.floor(Math.random() * 5)}`
let randomaku2 = `${Math.floor(Math.random() * 5)}`
let randomaku4 = `${Math.floor(Math.random() * 5)}`
let randomaku3 = `${Math.floor(Math.random() * 5)}`
let randomaku5 = `${Math.floor(Math.random() * 5)}`
let randomaku6 = `${Math.floor(Math.random() * 5)}`
let randomaku7 = `${Math.floor(Math.random() * 5)}`
let randomaku8 = `${Math.floor(Math.random() * 5)}`
let randomaku9 = `${Math.floor(Math.random() * 5)}`
let randomaku10 = `${Math.floor(Math.random() * 5)}`
let randomaku11 = `${Math.floor(Math.random() * 5)}`
let randomaku12 = `${Math.floor(Math.random() * 5)}`.trim()
let rbrb1 = (randomaku1 * 1)
let rbrb2 = (randomaku2 * 1)
let rbrb3 = (randomaku3 * 1)
let rbrb4 = (randomaku4 * 1)
let rbrb5 = (randomaku5 * 1)
let rbrb6 = (randomaku6 * 1)
let rbrb7 = (randomaku7 * 1)
let rbrb8 = (randomaku8 * 1)
let rbrb9 = (randomaku9 * 1)
let rbrb10 = (randomaku10 * 1)
let rbrb11 = (randomaku11 * 1)
let rbrb12 = (randomaku12 * 1)
let anti1 = `${rbrb1}`
let anti2 = `${rbrb2}`
let anti3 = `${rbrb3}`
let anti4 = `${rbrb4}`
let anti5 = `${rbrb5}`
let anti6 = `${rbrb6}`
let anti7 = `${rbrb7}`
let anti8 = `${rbrb8}`
let anti9 = `${rbrb9}`
let anti10 = `${rbrb10}`
let anti11 = `${rbrb11}`
let anti12 = `${rbrb12}`	
let ar1 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`
let ar2 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`
let ar3 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`
let ar4 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`
let ar5 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`
let ar6 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`
let ar7 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`
let ar8 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`
let ar9 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`
let ar10 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`
let ar11 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`
let ar12 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`
userdb.banteng += rbrb1
userdb.harimau += rbrb2
userdb.gajah += rbrb3
userdb.kambing += rbrb4
userdb.panda += rbrb5
userdb.cocodrilo += rbrb6
userdb.kerbau += rbrb7
userdb.sapi += rbrb8
userdb.monyet += rbrb9
userdb.babihutan += rbrb10
userdb.cerdo += rbrb11
userdb.pollo += rbrb12
	
let time = usersdb[senderJid].lastberburu + 2700000 //45 Minutos
if (new Date - usersdb[senderJid].lastberburu < 2700000){ 
let resp = `POR FAVOR DESCANSA UN MOMENTO PARA SEGUIR CAZANDO\n\n⫹⫺ TIEMPO ${clockString(time - new Date())}`
const buttons = [['🏞️ Animales capturados ', `${usedPrefix}kandang`], [`🎒 Inventario`, `${usedPrefix}inventario`]]
if (start.buttons) {
const msgObj = {
text: resp,
footer: info.nanipe
}
return conn.sendButton(m.chat, msgObj, {}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\n\n*${cmds}*\n> ${info.nanipe}`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
}
let q
setTimeout(async () => {
let resp = `@${senderJid.split("@")[0]} *${['Buscando implementos de caza...','Alistando todo para la caza!!','Estableciendo Lugar de la Caza...','PREPARANDO LUGAR DE CAZA!!'].getRandom()}*`
q = await conn.sendWritingText(m.chat, resp, userdb, m);
}, 0)

setTimeout(async () => {
let resp = `@${senderJid.split("@")[0]} *${['Armas lista para la Caza!!','Probando Armas 🔫 💣 🪓 🏹','CARROS PARA LA CAZA!! 🚗 🏍️ 🚜','TIEMPO BUENO PARA LA CAZA 🧤'].getRandom()}*`
q = await conn.sendEditWritingText(m.chat, resp, q.key, userdb, m);

}, 15000)
setTimeout(async () => {
let resp = `@${senderJid.split("@")[0]} *${['OBJETIVO FIJADO 🎯','Carnada en Marcha 🍫 🍇 🍖','ANIMALES DETECTADOS!! 🐂 🐅 🐘 🐼','ANIMALES DETECTADOS!! 🐖 🐃 🐮 🐒'].getRandom()}*`
q = await conn.sendEditWritingText(m.chat, resp, q.key, userdb, m);

}, 18000)

setTimeout(async () => {
let hsl = `
*✧ Resultados de la caza ${conn.getName(senderJid)} ✧*

*🐂 ${ar1} ${anti1}*			 *🐃 ${ar7} ${anti7}*
*🐅 ${ar2} ${anti2}*			 *🐮 ${ar8} ${anti8}*
*🐘 ${ar3} ${anti3}*			 *🐒 ${ar9} ${anti9}*
*🐐 ${ar4} ${anti4}*			 *🐗 ${ar10} ${anti10}*
*🐼 ${ar5} ${anti5}*			 *🐖 ${ar11} ${anti11}*
*🐊 ${ar6} ${anti6}*		    *🐓 ${ar12} ${anti12}*`.trim()
return conn.sendEditWritingText(m.chat, hsl, q.key, userdb, m);

}, 20000)

userdb.lastberburu = new Date * 1	
}
handler.help = ['berburu']
handler.tags = ['rpg']
handler.command = /^(hunt|berburu|caza(r)?)$/i
handler.group = true
handler.menu = [
{title: "🐾 CAZA", description: `Caza animales y gana recursos, usa el comando #berburu`, id: `berburu`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler
