let handler = async (m, {conn, info, start, usedPrefix, db, userdb, senderJid}) => {
const {inventory, menuform} = await import('../lib/constants.js')
const {rpg} = await import('../rpg.js')
 
 const fkontak = {
"key": {
"participants":"0@s.whatsapp.net",
"remoteJid": "status@broadcast",
"fromMe": false,
"id": "Halo"
},
"message": {
"contactMessage": {
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
}
},
"participant": "0@s.whatsapp.net"
}

let banteng = userdb.banteng
let harimau = userdb.harimau
let gajah = userdb.gajah
let kambing = userdb.kambing
let panda = userdb.panda
let cocodrilo = userdb.cocodrilo
let kerbau = userdb.kerbau
let sapi = userdb.sapi
let monyet = userdb.monyet
let babihutan = userdb.babihutan
let cerdo = userdb.cerdo
let pollo = userdb.pollo

let anim = `
*${menuform.htki} ANIMALES ${menuform.htka}*
 
*${rpg.emoticon('toro')} ➡️ ${banteng}*
*${rpg.emoticon('tiger')} ➡️ ${harimau}*
*${rpg.emoticon('elefante')} ➡️ ${gajah}*
*${rpg.emoticon('kambing')} ➡️ ${kambing}*
*${rpg.emoticon('panda')} ➡️ ${panda}*
*${rpg.emoticon('cocodrilo')} ➡️ ${cocodrilo}*
*${rpg.emoticon('kerbau')} ➡️ ${kerbau}*
*${rpg.emoticon('cow')} ➡️ ${sapi}*
*${rpg.emoticon('monyet')} ➡️ ${monyet}*
*${rpg.emoticon('Jabali')} ➡️ ${babihutan}*
*${rpg.emoticon('cerdo')} ➡️ ${cerdo}*
*${rpg.emoticon('pollo')} ➡️ ${pollo}*`.trim()
const footer = `🔖 Animales listos para Cocinar\n> ${info.nanipe}`
const buttons = [['Volver al Menú ☘️', '/menu'], [`🎒 Inventario`, `.inventario`]]
if (start.buttons) {
return conn.sendButton(m.chat, {text: anim, footer}, {}, buttons, userdb, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}: ${b}`).join('\n')
anim += `\n${cmds} ${footer}`
return conn.sendWritingText(m.chat, anim, userdb, fkontak)
}
}
handler.help = ['kandang']
handler.tags = ['rpg']
handler.command = /^(kandang|animales|animals)$/i

handler.menu = [
{title: "🐾 ANIMALES", description: `Consulta los animales que tienes en tu inventario, usa el comando #animales`, id: `animales`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler
