import { exec } from 'child_process'
let handler = async (m, {conn, args, isROwner, command, db, userdb, senderJid}) => {
const {getBot} = await import('../lib/functions.js')
const processMap = {
[conn.user.jid]: 'ANIMXSCANS',
comedia: 'BotComedia',
relojeria: 'BotService'
};
if (!process.send) return conn.sendWritingText(m.chat, `Dont: node main.js\nDo: node index.js`, userdb, m)
if (/^rest(art)?$/.test(command)) {
if (!args[0]) {
let resp = '``Reiniciando el Bot. . .``'
await conn.sendWritingText(m.chat, resp, userdb, m)
return process.send(`reset ${processMap[conn.user.jid]}`)
} else {
const bot = args[0].toLowerCase()
const {jid} = await getBot(bot)
console.log('restartC: ', jid)

const resp = `Reiniciando a @${jid.split('@')[0]}...\n Espere un momento...`
await conn.sendWritingText(m.chat, resp, userdb, m)
return process.send(`reset ${processMap[bot]}`)

}
} 
if (/^fullrest(art)?$/.test(command)) {
let resp = 'Reiniciando todo...'
await conn.sendWritingText(m.chat, resp, userdb, m)
return process.send(`fullreset`)
}
if (/^startbot$/.test(command)) {
const bot = args[0].toLowerCase()
const {jid} = await getBot(bot)
const resp = `Reanimando a @${jid.split('@')[0]}...\n Espere un momento...`
await conn.sendWritingText(m.chat, resp, userdb, m)
return process.send({start: `start`, bot: processMap[bot]})
}
}
handler.help = ['restart']
handler.tags = ['owner']
handler.command = /^((full)?(rest(art)?|startbot)$)/i
handler.owner = true

handler.menu = [
{ title: "🔄 REINICIAR BOT", description: "Reiniciar el bot o un bot especifico", id: `restart` },
{ title: "🔄 REINICIAR TODO", description: "Reiniciar todo el sistema", id: `restart` },
{ title: "🔄 REANIMAR BOT CAIDO", description: "Re-animar bot que sufrio un cierre total sin reiniciar nada", id: `restart` }
];
handler.type = "owners";
handler.disabled = false;

export default handler
