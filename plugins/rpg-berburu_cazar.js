let handler = async (m, {conn, usedPrefix, usersdb, userdb, db, senderJid}) => {
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
let hsl = `
*✧ Resultados de la caza ${conn.getName(senderJid)} ✧*

*🐂 ${ar1} ${anti1}*			 *🐃 ${ar7} ${anti7}*
*🐅 ${ar2} ${anti2}*			 *🐮 ${ar8} ${anti8}*
*🐘 ${ar3} ${anti3}*			 *🐒 ${ar9} ${anti9}*
*🐐 ${ar4} ${anti4}*			 *🐗 ${ar10} ${anti10}*
*🐼 ${ar5} ${anti5}*			 *🐖 ${ar11} ${anti11}*
*🐊 ${ar6} ${anti6}*		*🐓 ${ar12} ${anti12}*`.trim()
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
	
let time = userdb.lastberburu + 2700000 //45 Minutos
if (new Date - userdb.lastberburu < 2700000){ 
let resp = `POR FAVOR DESCANSA UN MOMENTO PARA SEGUIR CAZANDO\n\n⫹⫺ TIEMPO ${clockString(time - new Date())}\n${info.nanie}\n\nPara:\n\n🏞️ ANIMALES CAPTURADOS usa: *${usedPrefix}kandang*\n🎒 INVENTARIO usa: *${usedPrefix}inventario*`

return conn.sendWritingText(m.chat, resp, userdb, m);
}
setTimeout(async () => {

return conn.sendWritingText(m.chat, resp, userdb, m);

//conn.sendMessage(m.chat, {text: hsl + '\n\n' + info.nanie + '\n\n' + null + '\n\n' + info.repoProyect + '\n\n' +`GITHUB` + '\n\n' + null + '\n\n' + null}[[null, null]], null)
}, 20000)
	
setTimeout(async () => {
let resp = `@${senderJid.split("@s.whatsapp.net")[0]} *${['OBJETIVO FIJADO 🎯','Carnada en Marcha 🍫 🍇 🍖','ANIMALES DETECTADOS!! 🐂 🐅 🐘 🐼','ANIMALES DETECTADOS!! 🐖 🐃 🐮 🐒'].getRandom()}*`

return conn.sendWritingText(m.chat, resp, userdb, m);

//conn.sendWritingText(m.chat, txt, null, { mentions: [senderJid]}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
//conn.sendHydrated(m.chat, `${conn.getName(senderJid)} *${['OBJETIVO FIJADO`${conn.getName(senderJid)} *${['OBJETIVO FIJADO 🎯','Carnada en Marcha 🍫 🍇 🍖','ANIMALES DETECTADOS!! 🐂 🐅 🐘 🐼','ANIMALES DETECTADOS!! 🐖 🐃 🐮 🐒'].getRandom()}*` 🎯','Carnada en Marcha 🍫 🍇 🍖','ANIMALES DETECTADOS!! 🐂 🐅 🐘 🐼','ANIMALES DETECTADOS!! 🐖 🐃 🐮 🐒'].getRandom()}*`, info.nanie, null, null, null, null, null, [
//[null, null]], null)
}, 18000)

setTimeout(async () => {
let resp = `@${senderJid.split("@s.whatsapp.net")[0]} *${['Armas lista para la Caza!!','Probando Armas 🔫 💣 🪓 🏹','CARROS PARA LA CAZA!! 🚗 🏍️ 🚜','TIEMPO BUENO PARA LA CAZA 🧤'].getRandom()}*`

return conn.sendWritingText(m.chat, resp, userdb, m);
//conn.sendWritingText(m.chat, resp, null, { mentions: [senderJid]}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
//conn.sendHydrated(m.chat, `${conn.getName(senderJid)} *${['Armas lista para la Caza!!','Probando Armas 🔫 💣 🪓 🏹','CARROS PARA LA CAZA!! 🚗 🏍️ 🚜','TIEMPO BUENO PARA LA CAZA 🧤'].getRandom()}*`, info.nanie, null, null, null, null, null, [
//[null, null]], null)
}, 15000)

setTimeout(async () => {
let resp = `@${senderJid.split("@s.whatsapp.net")[0]} *${['Buscando implementos de caza...','Alistando todo para la caza!!','Estableciendo Lugar de la Caza...','PREPARANDO LUGAR DE CAZA!!'].getRandom()}*`

return conn.sendWritingText(m.chat, resp, userdb, m);
//conn.sendWritingText(m.chat, resp, m, m.mentionedJid ? { mentions: [senderJid] } : {})
//conn.sendHydrated(m.chat, `${conn.getName(senderJid)} *${['Buscando implementos de caza...','Alistando todo para la caza!!','Estableciendo Lugar de la Caza...','PREPARANDO LUGAR DE CAZA!!'].getRandom()}*`, info.nanie, null, null, null, null, null, [
//[null, null]], null)
}, 0)	
userdb.lastberburu = new Date * 1	
							 
}
handler.help = ['berburu']
handler.tags = ['rpg']
handler.command = /^(hunt|berburu|caza(r)?)$/i
//handler.group = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

function clockString(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
console.log({ms,h,m,s})
return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')}
