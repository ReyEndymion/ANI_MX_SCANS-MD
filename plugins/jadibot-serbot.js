/*
⚠ DEJA CREDITOS Y APOYA AL AUTOR ⚠

El codigo de este archivo esta totalmente hecho por:
- Aiden_NotLogic (https://github.com/ferhacks)

El codigo de este archivo fue parchado por:
- ReyEndymion (https://github.com/ReyEndymion)
- BrunoSobrino (https://github.com/BrunoSobrino)
Esta personalizado para el bot ANI MX SCANS
*/
const { generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = await import('@whiskeysockets/baileys')
import qrcode from "qrcode"
import fetch from 'node-fetch';
import NodeCache from "node-cache"
import fs from "fs"
import path, { join } from 'path';
import pino from 'pino';
import {Boom} from '@hapi/boom';
import util from 'util' 
import * as ws from 'ws';
import chalk from 'chalk';
const { child, spawn, exec } = await import('child_process');
const { CONNECTING } = ws
import { makeWASocket } from '../lib/simple.js';
import { makeInMemoryStore } from '@whiskeysockets/baileys'
import {onBot} from '../main.js'
import { limpCarpetas, purgeOldFiles } from "../lib/functions.js";

if (global.conns instanceof Array) {console.log()} else {global.conns = []}
if (!(global.dataconst instanceof Array)) global.dataconst = [];
let lastConnectionMessageTime = 0;
let usdePrefix = '', args = [], command = '', m = ''

const data = {}

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
if (m.isGroup) return
data.usedPrefix = usedPrefix
data.args = args
data.command = command
data.m = m
data.conn = conn
console.log('serbot: ', args[0])
//let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let uniqid = `${m.sender.split`@`[0]}`//conn.getName(who)
const bot = path.join(jadibts, uniqid)//path.join(authFolderAniMX, uniqid)
if (!global.db.data.bot[conn.user.jid].settings.modejadibot) {
let resp = `*[❗INFO❗] ESTE COMANDO ESTA INHABILITADO POR EL ACTUAL OWNER / PROPIETARIO DEL BOT*`
return conn.sendWritingText(m.chat, resp, m)
}
/***
if (conn.user.jid !== global.conn.user.jid) {
resp = `*[❗] Este comando solo puede ser usado en un Bot principal!!*\n\n*—◉ Da click aquí o en la imagen para ir:*\n*◉* https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0`;
contextInfo = true
}
 */
jddt(bot, data)
}
handler.help = ['jadibot', 'serbot', 'getcode', 'rentbot']
handler.tags = ['jadibot']
handler.command = /^(jadibot|serbot|rentbot)/i
handler.before = async function before(m, {conn, isOwner}) {
if (m.text.match(/initbot/i) && isOwner) {
const args = m.text.split(/initbot/i)
console.log('serbotInitBot: ', args)
const datas = {conn, m, args: args[0], usedPrefix: '/', command: 'serbot'}
const bot = path.join(jadibts, conn.formatNumberWA(args[1]))
jddt(bot, datas)
}
}
//handler.private = true 
export default handler
async function jddt(folderPath, data) {
const { conn, args, usedPrefix, command, m } = data
const mcode = args[0] && args[0].includes("--code") ? true : args[1] && args[1].includes("--code") ? true : false 
// stoled from aiden hehe
if (mcode) {
args[0] = args[0].replace("--code", "").trim()
if (args[1]) args[1] = args[1].replace("--code", "").trim()
if (args[0] == "") args[0] = undefined
}
if (!fs.existsSync(folderPath)){
fs.mkdirSync(folderPath, { recursive: true });
} else {

}
const credsBot = path.join(folderPath, "creds.json")
args[0] ? fs.writeFileSync(credsBot, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, `\t`)) : ""
let { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()
const { state, saveState, saveCreds } = await useMultiFileAuthState(folderPath)
const logger = pino({ level: `silent`})
const useStore = !process.argv.includes('--no-store');
const store = useStore ? makeInMemoryStore({ logger }) : undefined;
async function getMessage(key) {
if (store) {
const msg = await store.loadMessage(key?.remoteJid, key?.id);
return msg?.message || undefined;
}
}
async function getMessage2 (key) {
if (store) {
const msg = await store.loadMessage((key.remoteJid), key.id) 
return msg.message || undefined
} else if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id);
return conn.chats[key.remoteJid] && conn.chats[key.remoteJid].messages[key.id] ? conn.chats[key.remoteJid].messages[key.id].message : undefined;
}
return { conversation: 'recargando mensaje' } || proto.Message.fromObject({})
}
async function patchMessageBeforeSending(message) {
const requiresPatch = !!( message.buttonsMessage || message.temlateMessage || message.listMessage );
if (requiresPatch) { message = { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {}, }, ...message, },},};}
return message;
}
const connectionOptions = {
version,
printQRInTerminal: true,
logger: logger,
auth: state,
browser: ["Ubuntu", "Chrome", "20.0.04"],
msgRetry,
msgRetryCache,
syncFullHistory: false,
markOnlineOnConnect: false,
receivedPendingNotifications: false,
getMessage: (getMessage || getMessage2),
connectTimeoutMs: 60_000,
defaultQueryTimeoutMs: 0,
patchMessageBeforeSending,
}
const sock = makeWASocket(connectionOptions)
sock.isInit = false
sock.uptime = Date.now();
let isInit = true

let now = Date.now();
const oneDay = 24 * 60 * 60 * 1000; // 1 día en milisegundos

const MAX_CLOSE_COUNT = 10;
const CLOSE_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
const RESET_INTERVAL = 2 * 60 * 1000; // 2 minutes
let lastQr, shouldSendLogin, errorCount = 0;

async function connectionUpdate(update) {
let i = global.conns.indexOf(sock)
global.timestamp.connect = new Date
const { connection, lastDisconnect, isNewLogin, qr } = update
if (isNewLogin) sock.isInit = false
if (qr && !mcode) {
const resp = `*${wm}*
 *SER SUB-BOT*

*Escanea este codigo QR para convertirte en un Bot (SubBot), puedes usar otro dispositivo para escanear*

*Pasos para escanear:*
*1.- Haga click en los 3 puntos ubicados en la esquina superior derecha en el inicio de su WhatsApp*
*2.- Toca en donde dice WhatsApp web o dispositivos vinculados*
*3.- Escanee este codigo QR*
*El codigo QR expira en 60 segundos!!*

*—◉ ${wm} no se hace respondable del uso, numeros, mensajes, multimedias, etcétera enviado, usado o gestionado por ustedes o el Bot*`
const imagen = await qrcode.toBuffer(qr, { scale: 8 })
let q = await conn.sendWritingImage(m.chat, imagen, resp, m)
if (lastQr) {
await new Promise(resolve => setTimeout(resolve, 20000));
await lastQr.delete() 
}
//lastQr = await conn.sendWritingImage(m.chat, imagen, resp, q)
errorCount++
} else if (qr && mcode) {
const resp = `*${wm}*
*SER SUB-BOT*

*El codigo a continuacion se usara para convertirte en un Bot (SubBot)*

*Pasos para realizarlo:*
*Whatsapp te notifica*
*1.- Espere a que salga la notificacion de Whatsapp de vinculacion de dispositivo y a continuacion enviare un codigo de 8 digitos, copie el codigo y busque entre sus notificaciones el mensaje de vinculacion y presione sobre la notificacion, se le solicitara ingresar lois 8 digitos y ahi pegara el codigo. Advertencia!! no entre a la notificacion antes de copiar el codigo por que este codigo no funcionara*

O lo puede intentar:

*2.- Haga click en los 3 puntos ubicados en la esquina superior derecha en el inicio de su WhatsApp. Toca en donde dice dispositivos vinculados, vincular nuevo dispositivo y elegir vincular con el numero de telefono y el codigo que copio lo pegas en las casillas*
*El codigo expira en 60 segundos!!*

*—◉ ${wm} no se hace respondable del uso, numeros, mensajes, multimedias, etcétera enviado, usado o gestionado por ustedes o el Bot*`
let q = await conn.sendWritingText(m.chat, resp, m)
await wait(5000)
const code8 = await sock.requestPairingCode((m.sender.split`@`[0]))
return conn.sendWritingText(m.chat, code8, q)
}
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (global.db.data == null) loadDatabase()
let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
console.log('jadibotReason: ', reason)
if (connection === 'close') { 
if (code === DisconnectReason.badSession) {
sock.logger.error(`[ ⚠ ] ${code} Sesión incorrecta, por favor elimina la carpeta ${authFolderAniMX + '/' + uniqid} y escanea nuevamente.`);
} else if (code === DisconnectReason.connectionClosed) {
sock.logger.warn(`[ ⚠ ] ${code} Conexión cerrada, reconectando...`);
if (lastDisconnect?.error && lastDisconnect?.error.output && lastDisconnect?.error.output.statusCode === 428 && lastDisconnect?.error.output.error === 'Precondition Required') {
return creloadHandler(true).catch(console.error)
}
return creloadHandler(true).catch(console.error)
} else if (code === DisconnectReason.connectionLost) {
// && now - lastConnectionMessageTime >= oneDay
sock.logger.warn(`[ ⚠ ] ${code} Conexión perdida con el servidor, reconectando...`);
resp = "La conexión se perdio, se intentara reconectar automáticamente..."
await sock.sendWritingText(sock.user.jid, resp, m)
return creloadHandler(true).catch(console.error)
} else if (code === DisconnectReason.connectionReplaced) {
sock.logger.error(`[ ⚠ ] ${code} Conexión reemlazada, se ha abierto otra nueva sesión. Por favor, cierra la sesión actual primero.`);
sock.ws.close()
//delete global.conns[i]
global.conns.splice(i, 1)
const resp = code + " remlazando conexión actual..."
await conn.sendWritingText(m.chat, resp, m)
} else if (code === DisconnectReason.loggedOut) {
sock.logger.error(`[ ⚠ ] ${code} Conexion cerrada, por favor elimina la carpeta ${bot} y escanea nuevamente.`);
const resp = `◉sesion cerrada...\nSe usara deletebot automaticamente:\n\n* ${usedPrefix + 'deletebot'}*`
await conn.sendWritingText(m.chat, resp, m)
sock.ev.removeAllListeners()
delete global.conns[i]
return deleteSesionSB()
} else if (code === DisconnectReason.restartRequired) {
sock.logger.info(`[ ⚠ ] ${code} Reinicio necesario, reinicie el servidor si presenta algún problema.`);
global.conns.splice(i, 1)
return creloadHandler(true).catch(console.error)
} else if (code === DisconnectReason.timedOut) {
sock.logger.warn(`[ ⚠ ] Tiemo de conexión agotado, reconectando...`);
const resp = "La conexión se cerró, Tendras que conectarte manualmente..."
await conn.sendWritingText(m.chat, resp, m)
sock.ev.removeAllListeners()
delete global.conns[i]
await creloadHandler(true).catch(console.error)
global.conns.splice(i, 1)
} else if (code === 403) {
sock.logger.warn(`[ ⚠ ] ${code} Razón de desconexión revisión de whatsapp o soporte. ${code || ''}: ${connection || ''}`);
sock.ev.removeAllListeners()
delete global.conns[i]
deleteSesionSB()
} else if (code === (500 || 503)) {
sock.logger.warn(`[ ⚠ ] ${code} Razón de desconexión desconocida. : ${connection || ''}`);
return creloadHandler(true).catch(console.error)
} else if (code === 405 || code == 404 ) {
sock.logger.warn(`[ ⚠ ] ${code} Method Not Allowed solicitud no comatible con el servidor. ${connection || ''}`);
deleteSesionSB()
//return jddt()
} else {
sock.logger.warn(`[ ⚠ ] Razón de desconexión desconocida. ${code || ''}: ${connection || ''}`);
errorCount++
sock.ev.removeAllListeners()
delete global.conns[i]
await creloadHandler(true).catch(console.error)
global.conns.splice(i, 1)
}
} 
if (connection == 'open') {
let resp = ''
sock.isInit = true
global.conns.push(sock)
limpCarpetas()
//if (now - lastConnectionMessageTime >= oneDay) {
dataconst[sock.user.id.split('@')] = 1;
resp = `*[❗] Ya estas conectado, se paciente los mensajes se estan cargando...*\n\n*—◉ Para detener tu Bot debes usar el comando:*\n\n*—◉ ${usdePrefix + 'stop'}*\n\n*—◉ Para dejar de ser Bot puedes usar:*\n\n*◉ ${usdePrefix + 'deletebot'}*\n\n*Nota:* Primero tienes que utilizar el comando ${usdePrefix + 'stop'} para detener tú Bot, y posteriormente debes borrar desde dispositivos vinculados la sesión abierta de WhatsApp\n\n*—◉ Para volver a ser Bot y reescanear el codigo QR puedes usar:*\n\n*◉ ${usdePrefix + command}*\n\n*Nota:* tienes que haber hecho ya el procedimiento para borrar la sesión anterior\n\n*—◉ Si deseas solicitar tu token para conectarlo desde cualquier número puedes usar:*\n*◉ ${usdePrefix + 'codetoken'}*\n\nPara volver a conectarte usa ${usdePrefix + command}*\n\n*Nota:* Esto es temoral\nSi el Bot principal se reinicia o se desactiva, todos los sub-bots tambien lo haran\n\nPuede iniciar sesión sin el codigo qr con el siguiente mensaje, envialo cuando no funcione el bot....` + `\n\n${global.timestamp.connect = new Date}`
let q = await conn.sendWritingText(m.chat, resp, m)
let chatjid = state.creds.me.jid
console.log('jadibotCheck: ', chatjid)
resp = `*${ganisubbots}*\n\n @${chatjid.split`@`[0]} este es el grupo donde daremos avisos para los bots nuevos y sub-bots\n\n`
let qq = conn.sendWritingText(m.chat, resp, q)
resp = `hello ${chat.split`@`[0]}\n\n` + mensajeidioma.trim()
await sock.sendWritingText(chatjid, resp, qq)
try {
wait(40000)
return sock.groupAcceptInvite(ganisubbots.replace('https://chat.whatsapp.com/', ''));
} catch (error) {
console.log('Error al enviar invitación del grupo:', error.stack);
}
//} 
//if (update.receivedPendingNotifications === true) return wait (10000)
//onBots(authFolderAniMX + '/' + uniqid)
wait(8000000)
//process.send('reset');
}
lastConnectionMessageTime = now;

}
setInterval(async () => {
purgeOldFiles(folderPath)
if (!sock.user) {
try { sock.ws.close() } catch { }
sock.ev.removeAllListeners()

let i = global.conns.indexOf(sock)
						
 if (i < 0) return
delete global.conns[i]
global.conns.splice(i, 1)
}}, 60000)


async function deleteSesionSB() {
console.log(chalk.yellow(`🚩ㅤConexion cerrada, borrando la carpeta ${bot} automaticamente`));
return fs.rmSync(bot, { recursive: true, force: true })
}
		 
let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler
																				 
} catch (e) {
console.error(e)
}
if (restatConn) {
//const oldChats = sock.chats
try { sock.ws.close() } catch { }
sock.ev.removeAllListeners()
const oldChats = sock.chats;
sock = makeWASocket(connectionOptions, { chats: oldChats })
sock.uptime = Date.now();
isInit = true
}
if (!isInit) {
sock.ev.off('messages.upsert', sock.handler)
sock.ev.off('group-participants.update', sock.participantsUpdate)
sock.ev.off('groups.update', sock.groupsUpdate)
sock.ev.off('message.delete', sock.onDelete)
sock.ev.off('call', sock.onCall)
sock.ev.off('connection.update', sock.connectionUpdate)
sock.ev.off('creds.update', sock.credsUpdate)
}

sock.handler = handler.handler.bind(sock)
sock.participantsUpdate = handler.participantsUpdate.bind(sock)
sock.groupsUpdate = handler.groupsUpdate.bind(sock)
sock.onDelete = handler.deleteUpdate.bind(sock)
sock.onCall = handler.callUpdate.bind(sock)
sock.connectionUpdate = connectionUpdate.bind(sock)
sock.credsUpdate = saveCreds.bind(sock, true)

sock.ev.on('messages.upsert', sock.handler)
sock.ev.on('group-participants.update', sock.participantsUpdate)
sock.ev.on('groups.update', sock.groupsUpdate)
sock.ev.on('message.delete', sock.onDelete)
sock.ev.on('call', sock.onCall)
sock.ev.on('connection.update', sock.connectionUpdate)
sock.ev.on('creds.update', sock.credsUpdate)
isInit = false
wait(3000)
//process.send('reset');
return true
}
creloadHandler(false)
}
/**
*/
/*if (errorCount >= MAX_CLOSE_COUNT) {
console.log(chalk.red(`La conexión cerrada ocurrió ${errorCount} veces. Reiniciando el servidor...`));
errorCount = 0;
await wait(RESET_INTERVAL);
} else {
await wait(CLOSE_CHECK_INTERVAL);
}
conn.ev.removeAllListeners()
delete global.conns[i]
global.conns.splice(i, 1)
errorCount++
 && code !== 401*/
function wait(ms) {
return new Promise((resolve) => setTimeout(resolve, ms));
}
