async function handler(m, {conn, args, usedPrefix, command, db, userdb, senderJid}) {
const {idiomas} = await import('../lib/constants.js')
const {info} = await import('../config.js')
const codeIdiomas = idiomas.map(([nombre, codigo]) => [codigo.toLowerCase()])
const lista = idiomas.map(([nombre, codigo], index) => `${index+1}. ${nombre} -> (${codigo})`).join('\n')
const user = senderJid.split('@')[0]
let resp = ''
if (!args[0]) {
resp = `Hola @${user}\nBienvenido al menú de idiomas del bot ${info.nanip}\nHello @${user}\nWelcome to the ${info.nanip} bot language menu\n\n Mi idioma es español por defecto, si deseas que te responda en un idioma específico por favor usa este comando con el indicador (codigo de idioma) de la siguiente lista:\n\nMy language is Spanish by default, if you want me to respond in a specific language please use this command with the indicator (language code) from the following list:\n\nEjemplo/Example\n${usedPrefix+command} es\n\n${lista}`
resp = await conn.langResponse(resp, userdb)
} else {
const idiomasMap = Object.fromEntries(idiomas.map(([nombre, codigo]) => [nombre.toLowerCase().normalize("NFD").replace(/[\u300-\u36f]/g, '')]))
const codigosValidos = new Set(idiomas.map(([nombre, codigo]) => codigo.toLowerCase()))
const langSelect = codigosValidos.has(args[0]) ? args[0] : idiomasMap[args[0]]
if (!langSelect) {
resp = ` Idioma no reconocido, por favor use uno de los idiomas de la lista:\n${lista}`
resp = await conn.langResponse(resp, userdb)
} else {
let langdb = userdb.lang
const langName = idiomas.find(([nombre, comando]) => comando === langSelect)?.[0]
resp = ` El idioma a mostrar para ti en este chat ha cambiado a ${langName}`
langdb = langSelect
db.write()
userdb.lang = langSelect
resp = await conn.langResponse(resp, userdb)
console.log('lang: ', langSelect, userdb.lang, langdb)
} 
}
return conn.sendWritingText(m.chat, resp, userdb, m)
}
handler.command = /mylang|milenguaje/i
handler.help = [];
handler.tags = [];
handler.menu = [
{title: 'Lenguaje/lang del Bot', description: 'cambia el idioma en que solo a ti te respondera el bot/Change the language in which the bot will only respond to you.', id: 'mylang'}
];
handler.type = "herramientas";
handler.disabled = false;

export default handler