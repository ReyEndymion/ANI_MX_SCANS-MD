import { rpg } from "../rpg.js"
import { owner, temp, newsletterID, sBroadCastID, groupID, media} from '../config.js'
let handler = async (m, {conn, start, info, usedPrefix, userdb, db, senderJid}) => {

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

const anim = `
*${htki} ANIMALES ${htka}*

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

const resp = `🔖 Animales listos para cocinar\n${anim}`
//await conn.sendButton(m.chat, ndy, , null, , fkontak, m)
const buff = `NIVEL ACTUAL: *${userdb.level}*\n` + info.nanie
const buttons = [['Volver al menú ☘️', `${usedPrefix}menu'`], [`🎒 Inventario `, `${usedPrefix}inventario`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanie, fkontak );
}
}
handler.help = ['kandang']
handler.tags = ['rpg']
handler.command = /^(kandang|animales|animals)$/i

handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
