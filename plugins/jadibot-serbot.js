/*
⚠ DEJA CREDITOS Y APOYA AL AUTOR ⚠

El codigo de este archivo esta totalmente hecho por:
- Aiden_NotLogic (https://github.com/ferhacks)

El codigo de este archivo fue parchado por:
- ReyEndymion (https://github.com/ReyEndymion)
- BrunoSobrino (https://github.com/BrunoSobrino)
Esta personalizado para el bot ANI MX SCANS
*/
import NodeCache from "node-cache"
import fs from "fs"
import path, { join } from 'path';
import pino from 'pino';
const { Boom } = await import('@hapi/boom');
import util from 'util' 
let ws = await import('ws');
import chalk from 'chalk';
const { CONNECTING } = ws
import { makeWASocket } from '../lib/simple.js';
import libstore from '../lib/store.js'
import { dirname, limpCarpetas, purgeOldFiles, wait, backupCreds, backupCredsStatus, validateJSON, credsStatus, respaldCreds, formatNumberWA, opts, dataSubBot } from '../lib/functions.js';
import { creds, timestamp } from '../lib/constants.js';
import { loadDatabase, registrerSubBot, configDinamics, groupFetchAllParticipatingJson } from '../lib/database.js';
import { authFolderRespald, raizPath, dataBases } from '../config.js';
import { Low, JSONFile } from 'lowdb';

if (global.conns instanceof Array) {console.log()} else {global.conns = []}
if (!(global.dataconst instanceof Array)) global.dataconst = [];
let lastConnectionMessageTime = 0;

const data = {}

let handler = async (m, {conn, info, args, usedPrefix, command, isOwner, botdb, db, userdb, senderJid, objs}) => {
const {sessionNameAni, authFolder, botDirRespald, pathBotDBs, func, pluginsPath, anipp, imagen1, imagen2, imagen3, imagen4, stickerAMX, inMstore, storeFile, dbGroups, jadibts} = objs
if (m.isGroup) return
data.usedPrefix = usedPrefix
data.args = args
data.command = command
data.m = m
data.conn = conn
data.userdb = userdb
data.senderJid = senderJid
data.info = info
data.objs = objs
//let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
let uniqid = `${senderJid.split`@`[0]}`//conn.getName(who)
const bot = path.join(jadibts, uniqid)//path.join(authFolderAniMX, uniqid)
if (!botdb.settings.modejadibot) {
let resp = `*[❗INFO❗] ESTE COMANDO ESTA INHABILITADO POR EL ACTUAL OWNER / PROPIETARIO DEL BOT*`
return conn.sendWritingText(m.chat, resp, userdb, m)}
/***
if (conn.user.jid !== global.userBot) {
resp = `*[❗] Este comando solo puede ser usado en un Bot principal!!*\n\n*—◉ Da click aquí o en la imagen para ir:*\n*◉* https://api.whatsapp.com/send/?phone=${global.userBot.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0`;
contextInfo = true
}
*/
verifyBot(bot, data)
}
handler.help = ['jadibot', 'serbot', 'getcode', 'rentbot']
handler.tags = ['jadibot']
handler.command = /^(jadibot|serbot|rentbot)/i
handler.before = async function before(m, {conn, isOwner, userdb, db, objs}) {
const {jadibts} = objs
if (m.text.match(/^initbot/i) && isOwner) {
const args = m.text.split(/initbot/i)
console.log('serbotInitBot: ', args)
const datas = {conn, m, args: args[0], usedPrefix: '/', command: 'serbot'}
const bot = path.join(jadibts, formatNumberWA(args[1]))
jddt(bot, datas)
} else if (m.text.match(/^fullbots/i) && isOwner) {
const args = m.text.split(/^fullbots/i)
const datas = {conn, m, args: args[0], usedPrefix: '/', command: 'serbot'}
const dirSessionsAni = []

const readJadibtsSession = fs.readdirSync(jadibts) //fs.existsSync(jadibts) ?: []; 

// Función para iniciar bots válidos

for (const session of readJadibtsSession) {
const bot = path.join(jadibts, session)
if (!dirSessionsAni.includes(bot)) {
dirSessionsAni.push(bot);
}
}

for (const botPath of dirSessionsAni) {
const readBotPath = fs.readdirSync(botPath)
if (readBotPath.includes(creds)) {
const filePathCreds = path.join(botPath, creds)
try {
const readCreds = JSON.parse(fs.readFileSync(filePathCreds));
const userJid = readCreds && readCreds.me && readCreds.me.jid.split('@')[0]
const currentFolderName = path.basename(botPath);
const botDirRespald = path.join(authFolderRespald, userJid)
const newBotPath = path.join(path.dirname(botPath), userJid);

if (userJid && currentFolderName !== userJid && currentFolderName !== sessionNameAni) {
if (!fs.existsSync(newBotPath)) {
fs.mkdirSync(newBotPath);
}

const files = fs.readdirSync(botPath);
files.forEach(file => {
const oldPath = path.join(botPath, file);
const newPath = path.join(newBotPath, file);
fs.copyFileSync(oldPath, newPath);
//fs.renameSync(oldPath, newPath);
fs.unlinkSync(oldPath);
});

fs.rmdirSync(botPath);
console.log(`Archivos movidos a ${newBotPath} y carpeta original eliminada.`);
}

if (credsStatus(botPath) && validateJSON(filePathCreds)) {
backupCreds(botPath, botDirRespald)
jddt(newBotPath, datas); // Lanzar bot como proceso separado
} else {
const readBotDirBackup = fs.readdirSync(botDirRespald)
if (readBotDirBackup.includes(creds)) {
const fileCredsResp = path.join(botDirRespald, creds)
if (backupCredsStatus(botDirRespald) && validateJSON(fileCredsResp)) {
respaldCreds(botPath, botDirRespald)
jddt(botPath, datas)
} else {
deleteSesionSB(botPath, botDirRespald)
}
} else {
deleteSesionSB(botPath, botDirRespald)
}
}
continue
} catch (error) {
console.log('errorInicializacion: ', error.stack)
const botRespPath = path.join(authFolderRespald, path.basename(botPath))
const fileRespPathCreds = path.join(botRespPath, creds)
if (backupCredsStatus(botRespPath) && validateJSON(fileRespPathCreds)) {
respaldCreds(botPath, botRespPath)
} else {
deleteSesionSB(botPath, botRespPath)
}
}
} else {
limpCarpetas()
}
}

}
}
//handler.private = true 
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler


async function jddt(folderPath, data) {
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, Browsers } = await import('@whiskeysockets/baileys')
const { conn, args, usedPrefix, command, userdb, m, senderJid, info, objs } = data
const {sessionNameAni, pluginsPath, anipp, imagen1, imagen2, imagen3, imagen4, stickerAMX, jadibts} = objs
conn.messageJdb = false
const nameFolderBot = path.basename(folderPath)
const folderDB = path.join(dataBases, sessionNameAni)
const pathBotDBs = path.join(folderDB, nameFolderBot)
if (!fs.existsSync(pathBotDBs)) fs.mkdirSync(pathBotDBs, { recursive: true })
const botRespPath = path.join(authFolderRespald, nameFolderBot)
if (!fs.existsSync(botRespPath)) fs.mkdirSync(botRespPath, { recursive: true })
const pathDB = path.join(pathBotDBs, `SubBot-database.json`)
console.log('jadibotCheck: ', pathDB)
const db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(pathDB));
const dbGFAPFile = path.join(pathBotDBs, 'groupFetchAllParticipatingJson.json')
const createJson = new JSONFile(dbGFAPFile)
const dbGroups = new Low(createJson)
const dbSubBotsFile = path.join(folderDB, 'Subbots_registred.json')
const createSBJson = new JSONFile(dbSubBotsFile)
const dbRegisterSubBot = new Low(createSBJson)

const mcode = args[0] && args[0].includes("--code") ? true : args[1] && args[1].includes("--code") ? true : false 
if (mcode) {
args[0] = args[0].replace("--code", "").trim()
if (args[1]) args[1] = args[1].replace("--code", "").trim()
if (args[0] == "") args[0] = undefined
}
if (!fs.existsSync(folderPath)){
fs.mkdirSync(folderPath, { recursive: true });
}
const credsBot = path.join(folderPath, "creds.json")
args[0] ? fs.writeFileSync(credsBot, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, `\t`)) : ""
try {
const dataJson = fs.readFileSync(credsBot, 'utf8');
let readCreds = JSON.parse(dataJson);
if (!fs.existsSync(credsBot) || !readCreds.hasOwnProperty('platform')) {conn.messageJdb = false} else {conn.messageJdb = true}
} catch (error) {
conn.messageJdb = false
}
let { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetry = (MessageRetryMap) => { }
const msgRetryCounterCache = new NodeCache();
const { state, saveState, saveCreds } = await useMultiFileAuthState(folderPath)
const logger = pino({ level: `silent`})
const inMstore = libstore.makeInMemoryStore({ logger })
const storeFile = path.join(pathBotDBs, `${nameFolderBot}-${opts._[0] || 'data'}.store.json`)
inMstore.readFromFile(storeFile)
async function patchMessageBeforeSending(message) {
const requiresPatch = !!( message.buttonsMessage || message.temlateMessage || message.listMessage );
if (requiresPatch) { message = { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {}, }, ...message, },},};}
return message;
}
function getRandomProperty(obj) {
const keys = Object.keys(obj); // Obtiene un array con las claves
const randomKey = keys[Math.floor(Math.random() * keys.length)]; // Selecciona una clave aleatoria
return obj[randomKey]; // Devuelve la función correspondiente
}
const browserInfo = Object.entries(Browsers).reduce((acc, [browser, getInfo]) => {
acc[browser] = getInfo(browser);
return acc;
}, {});

//BrowsersbrowserInfo, []
console.log('serbot: ', getRandomProperty(browserInfo))
const browser = mcode ? getRandomProperty(browserInfo) : ''

const connectionOptions = {
version,
printQRInTerminal: mcode ? false : true,
logger: logger,
auth: state,
browser: ["Ubuntu", "Chrome", "20.0.04"],
msgRetry,
syncFullHistory: false,
markOnlineOnConnect: false,
receivedPendingNotifications: false,
getMessage: async (key) => (inMstore.loadMessage(key.remoteJid, key.id) || libstore.loadMessage(key.id) || {}).message || null,
cachedGroupMetadata: async (jid) => msgRetryCounterCache.get(jid),connectTimeoutMs: 60_000,
defaultQueryTimeoutMs: 0,
patchMessageBeforeSending,
}
const options = {
storeFile,
inMstore,
libstore
}
let sock = makeWASocket(connectionOptions, options)
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
let qrcode = await import("qrcode")
let i = global.conns.indexOf(sock)
timestamp.connect = new Date
const { connection, lastDisconnect, isNewLogin, qr } = update
if (isNewLogin) sock.isInit = false
if (qr && !mcode) {
const resp = `*${info.nanie}*
*SER SUB-BOT*

*Escanea este codigo QR para convertirte en un Bot (SubBot), puedes usar otro dispositivo para escanear*

*Pasos para escanear:*
*1.- Haga click en los 3 puntos ubicados en la esquina superior derecha en el inicio de su WhatsApp*
*2.- Toca en donde dice WhatsApp web o dispositivos vinculados*
*3.- Escanee este codigo QR*
*El codigo QR expira en 60 segundos!!*

*—◉ ${info.nanie} no se hace respondable del uso, numeros, mensajes, multimedias, etcétera enviado, usado o gestionado por ustedes o el Bot*`
const imagen = await qrcode.toBuffer(qr, { scale: 8 })

if (m === null) return
let q = await conn.sendImageWriting(m.chat, imagen, resp, userdb, m)
if (lastQr) {
await new Promise(resolve => setTimeout(resolve, 20000));
await lastQr.delete() 
}
//lastQr = await conn.sendImageWriting(m.chat, imagen, resp, userdb, q)
errorCount++
} else if (qr && mcode) {
const resp = `*${info.nanie}*
*SER SUB-BOT*

*El codigo a continuacion se usara para convertirte en un Bot (SubBot)*

*Pasos para realizarlo:*
*Whatsapp te notifica*
*1.- Espere a que salga la notificacion de Whatsapp de vinculacion de dispositivo y a continuacion enviare un codigo de 8 digitos, copie el codigo y busque entre sus notificaciones el mensaje de vinculacion y presione sobre la notificacion, se le solicitara ingresar lois 8 digitos y ahi pegara el codigo. Advertencia!! no entre a la notificacion antes de copiar el codigo por que este codigo no funcionara*

O lo puede intentar:

*2.- Haga click en los 3 puntos ubicados en la esquina superior derecha en el inicio de su WhatsApp. Toca en donde dice dispositivos vinculados, vincular nuevo dispositivo y elegir vincular con el numero de telefono y el codigo que copio lo pegas en las casillas*
*El codigo expira en 60 segundos!!*

*—◉ ${info.nanie} no se hace respondable del uso, numeros, mensajes, multimedias, etcétera enviado, usado o gestionado por ustedes o el Bot*`
let q = await conn.sendWritingText(m.chat, resp, userdb, m)
await wait(5000)
const code8 = await sock.requestPairingCode((senderJid.split`@`[0]))
return conn.sendWritingText(m.chat, code8, userdb, q)
}
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (db.data == null) loadDatabase(db)
let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
console.log('jadibotReason: ', reason, conn.messageJdb)
if (connection === 'close') { 
if (code === DisconnectReason.badSession) {
sock.logger.error(`[ ⚠ ] ${code} ${state.creds.me.jid ? state.creds.me.jid.split('@')[0] : state.creds.me.id.split(':')[0]} Sesión incorrecta, por favor elimina la carpeta ${folderPath} y escanea nuevamente.`);
} else if (code === DisconnectReason.connectionClosed) {
sock.logger.warn(`[ ⚠ ] ${code} ${state.creds.me.jid ? state.creds.me.jid.split('@')[0] : state.creds.me.id.split(':')[0]} Conexión cerrada, reconectando...`);
return creloadHandler(true).catch(console.error)
} else if (code === DisconnectReason.connectionLost) {
// && now - lastConnectionMessageTime >= oneDay
sock.logger.warn(`[ ⚠ ] ${code} ${state.creds.me.jid ? state.creds.me.jid.split('@')[0] : state.creds.me.id.split(':')[0]} Conexión perdida con el servidor, reconectando...`);
const resp = "La conexión se perdio, se intentara reconectar automáticamente..."
if (m !== null) {
await conn.sendWritingText(m.chat, resp, userdb, m)}
return creloadHandler(true).catch(console.error)
} else if (code === DisconnectReason.connectionReplaced) {
sock.logger.warn(`[ ⚠ ] ${code} ${state.creds.me.jid ? state.creds.me.jid.split('@')[0] : state.creds.me.id.split(':')[0]} Conexión remplazada, se ha abierto otra nueva sesión. Por favor, cierra la sesión actual primero.`);
sock.ws.close()
//delete global.conns[i]
global.conns.splice(i, 1)
const resp = code + " remplazando conexión actual..."
if (m !== null) {
await conn.sendWritingText(m.chat, resp, userdb, m)}
} else if (code === DisconnectReason.loggedOut) {
sock.logger.error(`[ ⚠ ] ${code} ${state.creds.me.jid ? state.creds.me.jid.split('@')[0] : state.creds.me.id.split(':')[0]} Conexion cerrada, por favor elimina la carpeta ${folderPath} y escanea nuevamente.`);
const resp = `◉sesion cerrada...\nSe usara deletebot automaticamente:\n\n* ${usedPrefix + 'deletebot'}*`
if (m !== null) {
await conn.sendWritingText(m.chat, resp, userdb, m)}
sock.ev.removeAllListeners()
delete global.conns[i]
deleteSesionSB(folderPath, botRespPath)
} else if (code === DisconnectReason.restartRequired) {
sock.logger.info(`[ ⚠ ] ${code} ${state.creds.me.jid ? state.creds.me.jid.split('@')[0] : state.creds.me.id.split(':')[0]} Reinicio necesario, reinicie el servidor si presenta algún problema.`);
global.conns.splice(i, 1)
return creloadHandler(true).catch(console.error)
} else if (code === DisconnectReason.timedOut) {
sock.logger.warn(`[ ⚠ ] ${code} ${state.creds.me.jid ? state.creds.me.jid.split('@')[0] : state.creds.me.id.split(':')[0]} Tiempo de conexión agotado, reconectando...`);
const resp = "La conexión se cerró, Tendras que conectarte manualmente..."
if (m === null) return
await conn.sendWritingText(m.chat, resp, userdb, m)
sock.ev.removeAllListeners()
delete global.conns[i]
await creloadHandler(true).catch(console.error)
global.conns.splice(i, 1)
} else if (code === 403) {
sock.logger.warn(`[ ⚠ ] ${code} ${state.creds.me.jid ? state.creds.me.jid.split('@')[0] : state.creds.me.id.split(':')[0]} Razón de desconexión revisión de whatsapp o soporte. ${code || ''}: ${connection || ''}`);
sock.ev.removeAllListeners()
delete global.conns[i]
deleteSesionSB(folderPath, botRespPath)
} else if (code === (500 || 503)) {
sock.logger.warn(`[ ⚠ ] ${code} ${state.creds.me.jid ? state.creds.me.jid.split('@')[0] : state.creds.me.id.split(':')[0]} Razón de desconexión desconocida. : ${connection || ''}`);
return creloadHandler(true).catch(console.error)
} else if (code === 405 || code == 404 ) {
sock.logger.warn(`[ ⚠ ] ${code} ${state.creds.me.jid ? state.creds.me.jid.split('@')[0] : state.creds.me.id.split(':')[0]} Method Not Allowed solicitud no comatible con el servidor. ${connection || ''}`);
deleteSesionSB(folderPath, botRespPath)
//return jddt()
} else {
sock.logger.warn(`[ ⚠ ] ${state.creds.me.jid ? state.creds.me.jid.split('@')[0] : state.creds.me.id.split(':')[0]} Razón de desconexión desconocida. ${code || ''}: ${connection || ''}`);
errorCount++
sock.ev.removeAllListeners()
delete global.conns[i]
await creloadHandler(true).catch(console.error)
global.conns.splice(i, 1)
}
} 
if (connection == 'open') {
if (!sock.authState.creds.registered) {
deleteSesionSB(folderPath, botRespPath)
}
userdb.ia = false
console.log(chalk.blue(`▣─────────────────────────────···\n│\n│❧ ${state.creds.me.hasOwnProperty('jid') ? state.creds.me.jid.split('@')[0] : state.creds.me.id.split(':')[0]} CONECTADO CORRECTAMENTE AL WHATSAPP ✅\n│✅Sesión: ${folderPath}\n│\n▣─────────────────────────────···`))
global.conns.push(sock)
limpCarpetas(folderPath)
if (!fs.existsSync(botRespPath)) {
fs.mkdirSync(botRespPath, { recursive: true });
}
dataconst[sock.user.id.split('@')] = 1;
sock.isInit = true
let resp = '', q = ''
if (m === null) return
if (conn.messageJdb) {
resp = `*[❗] reconectado con exito, se paciente los mensajes se estan cargando...*`
q = await conn.sendWritingText(m.chat, resp, userdb, m)
console.log('jadibotCheck: ', conn.messageJdb, resp)
} else {
resp = `*[❗] Ya estas conectado, se paciente los mensajes se estan cargando...*\n\n*—◉ Para detener tu Bot debes usar el comando:*\n\n*—◉ ${usedPrefix + 'stop'}*\n\n*—◉ Para dejar de ser Bot puedes usar:*\n\n*◉ ${usedPrefix + 'deletebot'}*\n\n*Nota:* Primero tienes que utilizar el comando ${usedPrefix + 'stop'} para detener tú Bot, y posteriormente debes borrar desde dispositivos vinculados la sesión abierta de WhatsApp\n\n*—◉ Para volver a ser Bot y reescanear el codigo QR puedes usar:*\n\n*◉ ${usedPrefix + command}*\n\n*Nota:* tienes que haber hecho ya el procedimiento para borrar la sesión anterior\n\n*—◉ Si deseas solicitar tu token para conectarlo desde cualquier número puedes usar:*\n*◉ ${usedPrefix + 'codetoken'}*\n\nPara volver a conectarte usa ${usedPrefix + command}*\n\n*Nota:* Esto es temporal\nSi el Bot principal se reinicia o se desactiva, todos los sub-bots se apagaran\n\nPuede iniciar sesión sin el codigo qr con el siguiente mensaje, envialo cuando no funcione el bot....` + `\n\n${timestamp.connect = new Date}`
q = await conn.sendWritingText(m.chat, resp, userdb, m)
if (now - lastConnectionMessageTime >= oneDay) {
} else {
resp = `listo`
if (m === null) return
q = await conn.sendWritingText(m.chat, resp, userdb, m)}
let chatjid = state.creds.me.jid
resp = `*${info.ganisubbots}*\n\n @${chatjid.split`@`[0]} este es el grupo donde daremos avisos para los bots nuevos y sub-bots\n\n`
let qq = await conn.sendWritingText(m.chat, resp, userdb, q)
//chatjid.split`@`[0]
resp = `hello ${await conn.getName(chatjid)}\n\n` + mensajeidioma.trim()
await sock.sendWritingText(chatjid, resp, qq)
try {
wait(40000)
return sock.groupAcceptInvite(info.ganisubbots.replace('https://chat.whatsapp.com/', ''));
} catch (error) {
console.log('Error al enviar invitación del grupo:', error.stack);
}
}
const now = Date.now(); 
const data = await dataSubBot(nameFolderBot, dbRegisterSubBot).catch(await registrerSubBot(nameFolderBot, sock.user, {dbRegisterSubBot}))
const lastGroupFetchAll = data.lastGroupFetchAll
const diff = now - lastGroupFetchAll
if (!lastGroupFetchAll || diff >= 3 * 24 * 60 * 60 * 1000 ) {
await groupFetchAllParticipatingJson(sock, dbGroups, data, nameFolderBot, registrerSubBot)//.catch(await dataBot(nameReg))
}
await registrerSubBot(nameFolderBot, sock.user, {dbRegisterSubBot})
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

libstore.bind(sock)
		 
let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler
																				 
} catch (e) {
console.error(e)
}
if (restatConn) {
try { sock.ws.close() } catch { }
sock.ev.removeAllListeners()
const oldChats = sock.chats;
sock = makeWASocket(connectionOptions, {storeFile, inMstore, libstore, chats: oldChats })
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

let func = {}
try {const {call} = await import('../plugins/_anticall.js') 
const {fail} = await import('../plugins/_dFailMessages.js')
func = {call, fail}
} catch (e) {console.log('Objs: ', e.stack)}
const botObj = {sessionNameAni, authFolder: folderPath, botDirRespald: botRespPath, pathBotDBs, db, func, pluginsPath, anipp, imagen1, imagen2, imagen3, imagen4, stickerAMX, inMstore, storeFile, dbGroups, jadibts}

sock.handler = function(chatUpdate) { return handler.handler.call(sock, chatUpdate, botObj);}//.bind(sock)
sock.participantsUpdate = function(participantUpdate) { return handler.participantsUpdate.call(sock, participantUpdate, botObj)}//bind(sock);
sock.groupsUpdate = function(groupsUpdate) { return handler.groupsUpdate.call(sock, groupsUpdate, botObj)};//bind(sock)
sock.onDelete = function(message) { return handler.deleteUpdate.call(sock, message, botObj)}//bind(sock);
sock.onCall = function(callUpdate) { return handler.callUpdate.call(sock, callUpdate, botObj);}//.bind(sock);
sock.connectionUpdate = connectionUpdate.bind(sock);
sock.credsUpdate = saveCreds.bind(sock, true);

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
inMstore.bind(conn.ev, {
groupMetadata: conn.groupMetadata
})
creloadHandler(false)
}

async function deleteSesionSB(folderPath, respaldPath) {
if (fs.existsSync(folderPath)) {
console.log(chalk.yellow(`🚩ㅤConexion cerrada, borrando la carpeta ${folderPath} automaticamente`));
return fs.rmSync(folderPath, { recursive: true, force: true })
}
if (fs.existsSync(respaldPath)) {
return fs.rmSync(respaldPath, { recursive: true, force: true })
}
}

export async function verifyBot(filePath, datas) {
if (fs.existsSync(filePath)) {
try {
const readBotPath = fs.readdirSync(filePath)
if (readBotPath.includes(creds)) {
const filePathCreds = path.join(filePath, creds)
const readCreds = JSON.parse(fs.readFileSync(filePathCreds));
const userJid = readCreds && readCreds.me && readCreds.me.jid.split('@')[0]
const currentFolderName = path.basename(filePath);
const botDirRespald = path.join(authFolderRespald, userJid)
const newBotPath = path.join(path.dirname(filePath), userJid);

if (userJid && currentFolderName !== userJid && currentFolderName !== sessionNameAni) {
if (!fs.existsSync(newBotPath)) {
fs.mkdirSync(newBotPath);
}

const files = fs.readdirSync(filePath);
files.forEach(file => {
const oldPath = path.join(filePath, file);
const newPath = path.join(newBotPath, file);
fs.copyFileSync(oldPath, newPath);
//fs.renameSync(oldPath, newPath);
fs.unlinkSync(oldPath);
});

fs.rmdirSync(filePath);
console.log(`Archivos movidos a ${newBotPath} y carpeta original eliminada.`);
}

if (credsStatus(filePath) && validateJSON(filePathCreds)) {
backupCreds(filePath, botDirRespald)
jddt(newBotPath, datas); // Lanzar bot como proceso separado
} else {
const readBotDirBackup = fs.readdirSync(botDirRespald)
if (readBotDirBackup.includes(creds)) {
const fileCredsResp = path.join(botDirRespald, creds)
if (backupCredsStatus(botDirRespald) && validateJSON(fileCredsResp)) {
respaldCreds(filePath, botDirRespald)
jddt(filePath, datas)
} else {
deleteSesionSB(filePath, botDirRespald)
}
} else {
deleteSesionSB(filePath, botDirRespald)
}
}
} else {
limpCarpetas(filePath)
}
} catch (error) {
console.log('errorInicializacion: ', error.stack)
const botRespPath = path.join(authFolderRespald, path.basename(filePath))
if (fs.existsSync(botRespPath)) {
try {
const fileRespPathCreds = path.join(botRespPath, creds)
const readBotPathBackUp = fs.readdirSync(filePath)
if (readBotPathBackUp.includes(creds)) {

if (backupCredsStatus(botRespPath) && validateJSON(fileRespPathCreds)) {
respaldCreds(filePath, botRespPath)
} else {
deleteSesionSB(filePath, botRespPath)
}

} else {
deleteSesionSB(filePath, botRespPath)
limpCarpetas(filePath)
}
} catch (error) {
console.log('errorbackup: ', error.stack)
}
} else {
return fs.rmSync(filePath, { recursive: true, force: true })
}
}
} else {
jddt(filePath, datas)
}
}
/**
*/
/*
if (lastDisconnect?.error && lastDisconnect?.error.output && lastDisconnect?.error.output.statusCode === 428 && lastDisconnect?.error.output.error === 'Precondition Required') {
return creloadHandler(true).catch(console.error)
}
if (errorCount >= MAX_CLOSE_COUNT) {
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
&& code !== 401
*/
