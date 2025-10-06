let { default: ws } = await import('ws');
import fs, { writeFileSync, readdirSync, statSync, unlinkSync, existsSync, readFileSync, copyFileSync, watch, rmSync, readdir, stat, mkdirSync, rename } from 'fs';
import path, { join } from 'path'
import {limpCarpetas, ajusteTiempo} from '../lib/functions.js'
let confirm = {}
let handler = async (m, {conn, info, usedPrefix, args, db, userdb, senderJid})=> {
var resp = ''
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
const txto = await Promise.all(users.map(async (v, index) => {
let uptime = ajusteTiempo(Date.now() - v.uptime)
return `*${index + 1}. 👉🏻* @${v.user.jid.replace(/[^0-9]/g, '')}\n*Uptime:* ${uptime}`}))//.join('\n\n');
let message = txto.join('\n\n')
const replyMessage = (message.length === 0 || message.length === undefined) ? '*—◉ No hay Sub-Bots activos en estos momentos.*' : message;
let totalUsers
if (global.conns === undefined) {
totalUsers = '0'
} else {
totalUsers = users.length;
}

resp = `*🤖 Aquí tienes la lista de algunos Sub-Bots (jadibot/serbot) de ${info.nanip} 🤖️*\n\n*👉🏻 Puedes contactarlos para ver si se unen a tu grupo*\n\n*Te pedimos de favor que:*\n*1.- Seas amable ✅*\n*2.- No insistas ni discutas ✅*\n\n*_⚠ NOTA: ️ELLOS SON PERSONAS QUE NO CONOCEMOS.. POR LO QUE EL EQUIPO DE ${info.nanipe} NO SE HACE RESPONSABLE DE LO QUE PUEDA OCURRIR AHI.._*\nSi la lista anterior te sale vacía puedes probar con cualquiera de los bots que inician mencionando la palabra botsmain después de que salga el mensaje`
let SB = `*Sub-Bots Conectados:* ${totalUsers || '0'}\n\n${replyMessage.trim()}`
let q = await conn.sendWritingText(m.chat, resp, userdb, m)
let qq = await conn.sendWritingText(m.chat, SB, userdb, q)
confirm[senderJid] = {
sender: senderJid,
q: qq,
totalUsers: totalUsers,
time: setTimeout(async () => {
delete confirm[senderJid]
}, 60 * 1000)
}
}
handler.command = handler.help = ['listjadibot','bots','subsbots']
handler.tags = ['jadibot']
handler.before = async function before (m, {conn, db}) {
if (m.text.toLowerCase() === 'botsmain') {
await limpCarpetas(jadibts)
const confirmacion = Object.values(confirm).find(c => c.sender === senderJid);
if (!confirmacion) return;
//const {sender, q, totalUsers} = confirmacion
let bots = '';
for (let i of readdirSync(jadibts)) {
var bot = i.match(/\d+/g);
if (bot) {
bots += `@${bot[0]}\n`;
}
}
bots = bots.trim();
const resp = `Bots actuales:\n${bots}`
return conn.sendWritingText(m.chat, resp, userdb, m)}
}
handler.menu = [
{title: 'SERBOT-LIST', description: 'Utiliza Este comando para Mostrar la lista de subbots\nComando: #bots', id: 'bots'}
];
handler.type = "menubots";
handler.disabled = false;

export default handler
