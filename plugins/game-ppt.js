const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let pptUsage = {}
let handler = async (m, {conn, info, start, text, command, usedPrefix, args, db, userdb, senderJid}) => {
const buff = info.nanipe

if (pptUsage[senderJid] && pptUsage[senderJid].bannedUntil > Date.now()) {
let timeLeft = Math.ceil((pptUsage[senderJid].bannedUntil - Date.now()) / 1000 / 60)
return conn.sendWritingText(m.chat, `Lo siento, estás baneado del uso de este comando durante ${timeLeft} minutos.`, m)
}

if (!pptUsage[senderJid]) {
pptUsage[senderJid] = { count: 0 }
}
pptUsage[senderJid].count++

if (pptUsage[senderJid].count > 10) {
pptUsage[senderJid].bannedUntil = Date.now() + 20 * 60 * 1000
let resp = `Has sido baneado del uso de este comando durante 20 minutos.`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
let pp = 'https://www.bighero6challenge.com/images/thumbs/Piedra,-papel-o-tijera-0003318_1584.jpeg'
if (!args[0]) {
let resp = `*_PIEDRA, PAPEL O TIJERA vs BOT_*\n\n`
const buttons = [['*_Piedra_* 🪨', `${usedPrefix + command} piedra`],
['*_Papel_* 📄', `${usedPrefix + command} papel`],
['*_Tijera_* ✂️', `${usedPrefix + command} tijera`]]
if (start.buttons) {
resp += `_Puedes usar los siguientes *BOTONES* para jugar_`
const messageObj = {
text: resp,
footer: buff
}
return conn.sendButton(m.chat, messageObj, {url: pp}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `puedes usar estos comandos_:\n${cmds}\n`
return conn.sendImageWriting(m.chat, pp, resp+'\n'+cmds+'\n'+''+buff, userdb, m)
}
}
var astro = Math.random()
if (astro < 0.34) {
astro = 'piedra' 
} else if (astro > 0.34 && astro < 0.67) {
astro = 'tijera' 
} else {
astro = 'papel'
}
const ganaA = {
piedra: 'tijera',
papel: 'piedra',
tijera: 'papel'
}

let result

if (text === astro) {
userdb.exp += 500
result = `🔰 Empate!\n\n*👉🏻 Tu: ${text}\n👉🏻 El Bot: ${astro}\n🎁 Premio +500 XP*`
} else if (ganaA[text] === astro) {
userdb.exp += 1000
result = `🥳 Tú ganas! 🎉\n\n*👉🏻 Tu: ${text}\n👉🏻 El Bot: ${astro}\n🎁 Premio +1000 XP*`
} else {
userdb.exp -= 300
result = `☠️ Tú pierdes! ❌\n\n*👉🏻 Tu: ${text}\n👉🏻 El Bot: ${astro}\n❌ Premio -300 XP*`
}

return conn.sendWritingText(m.chat, result, userdb, m)
}
handler.help = ['ppt']
handler.tags = ['games']
handler.command = /^(ppt)$/i
handler.menu = [
{title: "🎖️ PIEDRA, PAPEL O TIJERA", description: "Juega al piedra, papel o tijera con el bot", id: `ppt`}
];
handler.type = "juegos";
handler.disabled = false;

export default handler

