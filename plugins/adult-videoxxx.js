let handler = async (m, { conn, usedPrefix, command, chatdb }) => {
let { delay, pickRandom, filterValidLinks } = await import("../lib/functions.js")
const {  xxx: asupan  } = await import('../src/enlaces.js');
if (!chatdb.modohorny && m.isGroup) {return conn.sendWritingText(m.chat, '*[ ⚠️ ] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMINISTRADOR DE ESTE GRUPO Y DESEA ACTIVARLOS ESCRIBA #enable modohorny*', m)
} else {
// Ejecuta la limpieza de la lista de enlaces
let verifityLink = false
filterValidLinks(asupan).then((validLinks) => {
console.log("Enlaces accesibles:", validLinks.length);
if (validLinks.length === 0) verifityLink = true
});
console.log('xxx: ', verifityLink)
if (verifityLink) return conn.sendWritingText(m.chat, `Lo sentimos, no hay ningun video accesible`, m)
let res = await pickRandom(asupan)

let resp = '*DISFRUTA DEL VIDEO 🥵*'
let q = await conn.sendMessage(m.chat, { image: {url: res}, caption: resp.trim(), mentions: conn.parseMention(resp), viewOnce: true }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await delay(1 * 2000)
return conn.sendWritingText(m.chat, resp, q)
}
}
handler.help = ['videoxxx']
handler.tags = ['random']
handler.command = /^videoxxx|vídeoxxx$/i
export default handler
