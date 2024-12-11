import ws from 'ws';
import fs, { writeFileSync, readdirSync, statSync, unlinkSync, existsSync, readFileSync, copyFileSync, watch, rmSync, readdir, stat, mkdirSync, rename } from 'fs';
import path, { join } from 'path'
import {limpCarpetas} from '../lib/functions.js'
let confirm = {}
let handler = async (m, { conn, usedPrefix, args, participants })=> {
var resp = ''
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
const txto = await Promise.all(users.map(async (v, index) => {
let uptime = await ajusteTiempo(Date.now() - v.uptime)
return `*${index + 1}. 👉🏻* @${v.user.jid.replace(/[^0-9]/g, '')}\n*Uptime:* ${uptime}`}))//.join('\n\n');
let message = txto.join('\n\n')
const replyMessage = (message.length === 0 || message.length === undefined) ? '*—◉ No hay Sub-Bots activos en estos momentos.*' : message;
let totalUsers
if (global.conns === undefined) {
totalUsers = '0'
} else {
totalUsers = users.length;
}

resp = `*🤖 Aquí tienes la lista de algunos Sub-Bots (jadibot/serbot) de ${igfg} 🤖️*\n\n*👉🏻 Puedes contactarlos para ver si se unen a tu grupo*\n\n*Te pedimos de favor que:*\n*1.- Seas amable ✅*\n*2.- No insistas ni discutas ✅*\n\n*_⚠ NOTA: ️ELLOS SON PERSONAS QUE NO CONOCEMOS.. POR LO QUE EL EQUIPO DE ${wm} NO SE HACE RESPONSABLE DE LO QUE PUEDA OCURRIR AHI.._*\nSi la lista anterior te sale vacía puedes probar con cualquiera de los bots que inician mencionando la palabra botsmain después de que salga el mensaje`
let SB = `*Sub-Bots Conectados:* ${totalUsers || '0'}\n\n${replyMessage.trim()}`
let q = await conn.sendWritingText(m.chat, resp, m)
let qq = await conn.sendWritingText(m.chat, SB, q)
confirm[m.sender] = {
sender: m.sender,
q: qq,
totalUsers: totalUsers,
time: setTimeout(async () => {
delete confirm[m.sender]
}, 60 * 1000)
}
}
handler.command = handler.help = ['listjadibot','bots','subsbots']
handler.tags = ['jadibot']
handler.before = async function before (m, {conn}) {
if (m.text.toLowerCase() === 'botsmain') {
await limpCarpetas(jadibts)
const confirmacion = Object.values(confirm).find(c => c.sender === m.sender);
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
return conn.sendWritingText(m.chat, resp, m)
}
}
export default handler
async function ajusteTiempo(ms) {
var segundos = Math.floor(ms / 1000);
var minutos = Math.floor(segundos / 60);
var horas = Math.floor(minutos / 60);
var días = Math.floor(horas / 24);

segundos %= 60;
minutos %= 60;
horas %= 24;

var resultado = "";
if (días !== 0) {
resultado += días + " días, ";
}
if (horas !== 0) {
resultado += horas + " horas, ";
}
if (minutos !== 0) {
resultado += minutos + " minutos, ";
}
if (segundos !== 0) {
resultado += segundos + " segundos";
}

return resultado;
}
