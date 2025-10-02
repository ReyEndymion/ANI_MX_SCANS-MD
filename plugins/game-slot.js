/* CREDITOS A https://github.com/FG98F */

let handler = async (m, {conn, args, usedPrefix, command, userdb, db, senderJid}) => {
let resp
let fa = `
*[❗] INGRESA LA CANTIDAD QUE DESEA APOSTAR* 

*📌 EJEMPLO:*
*${usedPrefix + command} 100*`.trim()
if (!args[0] && isNaN(args[0])) {
resp = fa
} else {
let apuesta = parseInt(args[0])
let time = userdb.lastslot + 10000
if (new Date - userdb.lastslot < 10000) return conn.sendWritingText(m.chat, `*⏳ ESPERE ${msToTime(time - new Date())} PARA VOLVER A APOSTAR*`, userdb, m)
if (apuesta < 100) return conn.sendWritingText(m.chat, `*[❗] EL MINIMO PARA APOSTAR ES DE 100 XP*`, userdb, m)
if (userdb.exp < apuesta) {
return conn.sendWritingText(m.chat, `*[❗] TU XP NO ES SUFICIENTE PARA APOSTAR ESA CANTIDAD, JUEGA OTROS JUEGOS O INTERACTUA CON EL BOT PARA GANAR MAS XP*`, m)
}
let emojis = ["🐋", "🐉", "🕊️"];
let a = Math.floor(Math.random() * emojis.length);
let b = Math.floor(Math.random() * emojis.length);
let c = Math.floor(Math.random() * emojis.length);
let x = [],
y = [],
z = [];
for (let i = 0; i < 3; i++) {
x[i] = emojis[a];
a++;
if (a == emojis.length) a = 0;
}
for (let i = 0; i < 3; i++) {
y[i] = emojis[b];
b++;
if (b == emojis.length) b = 0;
}
for (let i = 0; i < 3; i++) {
z[i] = emojis[c];
c++;
if (c == emojis.length) c = 0;
}

if (a == b && b == c) {
resp = `*GANASTE! 🎁 +${apuesta + apuesta} XP*`
userdb.exp += apuesta
} else if (a == b || a == c || b == c) {
resp = `*🔮 CASI LO LOGRAS!, SIGUE INTENTANDO*\n*TOMA +10 XP*`
userdb.exp += 10
} else {
resp = `*❌ PERDISTE -${apuesta} XP*`
userdb.exp -= apuesta
}
userdb.lastslot = new Date * 1
resp = `
🎰 | *SLOTS* 
────────
${x[0]} : ${y[0]} : ${z[0]}
${x[1]} : ${y[1]} : ${z[1]}
${x[2]} : ${y[2]} : ${z[2]}
────────
🎰 | ${resp}`
}


return conn.sendWritingText(m.chat, resp, userdb, m)
}
handler.help = ['slot <apuesta>']
handler.tags = ['game']
handler.command = ['slot']
handler.group = true
handler.menu = [
{title: "🎰 SLOTS", description: "Apuesta XP en el juego de slots", id: `slot`}
];
handler.type = "juegos";
handler.disabled = false;

export default handler

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return minutes + " m " + seconds + " s "
}
