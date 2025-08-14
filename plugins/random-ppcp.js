import fetch from 'node-fetch'
let handler = async (m, {conn, command, usedPrefix, db, userdb, senderJid}) => {
let res = await fetch(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=${lolkeysapi}`)
if (res.status != 200) throw await res.text()
let json = await res.json()
if (!json.status) throw json
let resp = '', imagen
if (json.result.female) {
resp = 'CHICA CUTE'
imagen = json.result.female
}
if (json.result.male) {
resp = 'CHICO CUTE'
imagen = json.result.male
}
const buff = info.nanie
const buttons = [['🔄 SIGUIENTE 🔄', `/${usedPrefix+command}`]]
if (start.buttons) {
await conn.sendButton( m.chat, resp, buff, imagen, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
await conn.sendImageWriting(m.chat, imagen, resp+'\n'+cmds+'\n'+buff, m );
}
}
handler.help = ['ppcouple']
handler.tags = ['internet']
handler.command = /^(ppcp|ppcouple)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
