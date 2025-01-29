process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = true;
import path, { join } from 'path'
import * as ws from 'ws';
import { Boom } from '@hapi/boom';
import NodeCache from 'node-cache';
import readline from 'readline';
import fs, { writeFileSync, readdirSync, statSync, unlinkSync, existsSync, readFileSync, copyFileSync, watch, rmSync, readdir, stat, mkdirSync } from 'fs';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import { tmpdir } from 'os';
import { format } from 'util';
import pino from 'pino';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
//import { makeInMemoryStore } from '@whiskeysockets/baileys'
import store, {makeInMemoryStore, storeChatsS, storeContactsS} from './lib/store.js';
import {question, clearTmp, purgeOldFiles, actualizarNumero, waitTwoMinutes, validateJSON, cleanupOnConnectionError, respaldCreds, backupCreds, credsStatus, backupCredsStatus, wait, _quickTest} from './lib/functions.js';
const { proto } = (await import('@whiskeysockets/baileys')).default;
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = await import('@whiskeysockets/baileys');
const { CONNECTING } = ws;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000
import {jddt} from './plugins/jadibot-serbot.js';
const __dirname = global.__dirname(import.meta.url);
protoType();
serialize();

const readJadibtsSession = fs.readdirSync(jadibts); 
if (readJadibtsSession.length == 0) global.aniJdbts = false;
export async function onBot(folderPath) {
const nameFolderBot = path.basename(folderPath)
const msgRetryCounterCache = new NodeCache();
const { state, saveState, saveCreds } = await useMultiFileAuthState(folderPath);
const msgRetryCounterMap = (MessageRetryMap) => { };
const {version} = await fetchLatestBaileysVersion();
const logger = pino({level: 'silent'})
const dbBot = path.join(dataBases, nameFolderBot)
if (!existsSync(dbBot)) mkdirSync(dbBot, { recursive: true })
const storeFile = path.join(dbBot, `${nameFolderBot}-${opts._[0] || 'data'}.store.json`)
const storeReload = makeInMemoryStore()

storeReload.readFromFile(storeFile)
async function getMessage(key) {
if (storeReload) {
const msg = await storeReload.loadMessage(key?.remoteJid, key?.id);
return msg.message || proto.Message.fromObject({}) || undefined;
}
}

async function patchMessageBeforeSending(message) {
const requiresPatch = !!( message.buttonsMessage || message.templateMessage || message.listMessage || message.interactiveMessage );
if (requiresPatch) {
message = {viewOnceMessage: {message: {messageContextInfo: {deviceListMetadataVersion: 2, deviceListMetadata: {}}, ...message}}};
}
return message;
}

const connectionOptions = {
printQRInTerminal: qrTerminal,
patchMessageBeforeSending,
getMessage,
msgRetryCounterCache,
msgRetryCounterMap,
logger,
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, logger),
},
browser: usePairingCode ? ["Ubuntu", "Chrome", "20.0.04"] : ['ANI MX SCANS','Edge','1.0.0'],
version,
defaultQueryTimeoutMs: undefined,
};

global.conn = makeWASocket(connectionOptions)
conn.isInit = false;
conn.well = false;
const botDirRespald = path.join(global.authFolderRespald, sessionNameAni)
const connCreds = conn.authState.creds
// Código de emparejamiento para clientes web
if (!connCreds.registered) {
if (usePairingCode) {
if (useMobile) {
throw new Error('No se puede usar el código de emparejamiento con API móvil');
}

const phoneNumber = await question('Ingrese su número de teléfono móvil:\n', (answer) => /^\d+$/.test(answer));
console.log(`mainCheck: ${phoneNumber}`);
if (/\d+/.test(phoneNumber)) {
const code = await conn.requestPairingCode(conn.formatNumberWA(phoneNumber));
console.log(`Pairing code: ${code}`);
} else {
throw new Error('Número de teléfono no válido\nDeben ser numeros sin espacios');
}
}

// Si se eligió el móvil, solicite el código
if (useMobile) {
 const { registration } = connCreds || { registration: {} };

if (!registration.phoneNumber) {
registration.phoneNumber = await question('Ingrese su número de teléfono móvil:\n');
}

const libPhonenumber = require('libphonenumber-js');
const phoneNumber = libPhonenumber.parsePhoneNumber(registration.phoneNumber);
if (!phoneNumber?.isValid()) {
throw new Error('Número de teléfono no válido: ' + registration.phoneNumber);
}

registration.phoneNumber = phoneNumber.format('E.164');
registration.phoneNumberCountryCode = phoneNumber.countryCallingCode;
registration.phoneNumberNationalNumber = phoneNumber.nationalNumber;
const mcc = PHONENUMBER_MCC[phoneNumber.countryCallingCode];
if (!mcc) {
throw new Error('No pude encontrar MCC para el número de teléfono: ' + registration.phoneNumber + '\nEspecifique el MCC manualmente.');
 }

registration.phoneNumberMobileCountryCode = mcc;

askForOTP(conn, registration);
}
} else {

}
if (!opts['test']) {
if (global.db) {
setInterval(async () => {
if (global.db.data) {
await global.db.write()
}
if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
storeReload.writeToFile(storeFile)
}, 30 * 1000);
}
}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT);


const MAX_CLOSE_COUNT = 10;
const CLOSE_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
const RESET_INTERVAL = 2 * 60 * 1000; // 2 minutes
let consecutiveCloseCount = 0

async function connectionUpdate(update) {
const { connection, lastDisconnect, isNewLogin } = update;
if (isNewLogin) conn.isInit = true;
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
if (code && code !== DisconnectReason.loggedOut && conn?.ws.readyState == null || undefined || CONNECTING) {
await global.reloadHandler(true).catch(console.error);
global.timestamp.connect = new Date;
}
if (global.db.data == null) loadDatabase();
if (qrTerminal && update.qr != 0 && update.qr != undefined) {
console.log(chalk.yellow('🚩ㅤEscanea este codigo QR, el codigo QR expira en 60 segundos.'));
}
if (conn?.ws?.readyState === CONNECTING || conn?.ws?.readyState === undefined) {
console.log(chalk.red(`La conexión se esta estableciendo: ${connection}`));
}
if (connection === undefined) return //conn.ev.removeAllListeners();

let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;

if (connection == 'close') {
if (reason === DisconnectReason.badSession) {
conn.logger.error(`[ ⚠ ] Sesión incorrecta, por favor elimina la carpeta ${global.authFolder} y escanea nuevamente.`);
return global.reloadHandler(true).catch(console.error)
//process.exit();
} else if (reason === DisconnectReason.preconditionRequired){
conn.logger.warn(`[ ⚠ ] Conexión cerrada, reconectando por precondicion...`);
return global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionClosed) {
conn.logger.warn(`[ ⚠ ] Conexión cerrada, reconectando...`);
return global.reloadHandler(true).catch(console.error)
//process.send('reset');
} else if (reason === DisconnectReason.connectionLost) {
conn.logger.warn(`[ ⚠ ] Conexión perdida con el servidor, reconectando...`);
return global.reloadHandler(true).catch(console.error)
 // process.send('reset');
} else if (reason === DisconnectReason.connectionReplaced) {
conn.logger.error(`[ ⚠ ] Conexión reemplazada, se ha abierto otra nueva sesión. Por favor, cierra la sesión actual primero.`);
stopConn(conn)
//process.exit();
} else if (reason === DisconnectReason.loggedOut) {
conn.logger.error(`[ ⚠ ] Conexion cerrada, por favor elimina la carpeta ${global.authFolder} y escanea nuevamente.`);
cleanupOnConnectionError(folderPath, botDirRespald)
//process.exit();
} else if (reason === DisconnectReason.restartRequired) {
conn.logger.info(`[ ⚠ ] Reinicio necesario, reinicie el servidor si presenta algún problema.`);
//process.send('reset');
} else if (reason === DisconnectReason.timedOut) {
conn.logger.warn(`[ ⚠ ] Tiempo de conexión agotado, reconectando...`);
process.send('reset');
} else if (reason === 403) {
conn.logger.warn(`[ ⚠ ] Razón de desconexión: revisión de whatsapp o soporte. ${reason || ''}: ${connection || ''}`);
cleanupOnConnectionError(folderPath, botDirRespald)
global.reloadHandler(true).catch(console.error)
} else if (reason === 405) {
conn.logger.warn(`[ ⚠ ] No alojado. ${reason || ''}: ${connection || ''}`);
if (!connCreds.registered) {
conn.ws.close()
cleanupOnConnectionError(folderPath, botDirRespald)
}
global.reloadHandler(true).catch(console.error)
} else if (code === 503){
} else {
conn.logger.warn(`[ ⚠ ] Razón de desconexión desconocida. ${reason || ''}: ${connection || ''}`);
//process.exit();
consecutiveCloseCount++;
console.log(chalk.yellow(`🚩ㅤConexion cerrada, por favor borre la carpeta ${global.authFolder} y reescanee el codigo QR`));
}
if (consecutiveCloseCount >= MAX_CLOSE_COUNT) {
console.log(chalk.red(`La conexión cerrada ocurrió ${consecutiveCloseCount} veces. Reiniciando el servidor...`));
consecutiveCloseCount = 0;
await wait(RESET_INTERVAL);
} else {
await wait(CLOSE_CHECK_INTERVAL);
}
}
if (connection == 'open') {
loadDatabase(global.conn);
console.log(chalk.yellow(`▣─────────────────────────────···\n│\n│❧ ${state.creds.me.hasOwnProperty('jid') ? state.creds.me.jid.split('@')[0] : state.creds.me.id.split(':')[0]} CONECTADO CORRECTAMENTE AL WHATSAPP ✅\n│✅Sesión: ${path.basename(folderPath)}\n│\n▣─────────────────────────────···`))
if (update.receivedPendingNotifications) { 
actualizarNumero() 
waitTwoMinutes()
return conn.groupAcceptInvite(ganisubbots.replace('https://chat.whatsapp.com/', ''));
}
}
}

process.on('uncaughtException', console.error);

let isInit = true;

async function stopConn(sock) {
isInit = false
sock.ev.removeAllListeners()
sock.ws.close()
}

let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
try {
const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
if (Object.keys(Handler || {}).length) handler = Handler;
} catch (e) {
console.error(e);
}
if (restatConn) {
const oldChats = global.conn.chats;
try {
global.conn.ws.close();
} catch { }
conn.ev.removeAllListeners();
global.conn = makeWASocket(connectionOptions, { chats: oldChats });
isInit = true;
}
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler);
conn.ev.off('group-participants.update', conn.participantsUpdate);
conn.ev.off('groups.update', conn.groupsUpdate);
conn.ev.off('message.delete', conn.onDelete);
conn.ev.off('call', conn.onCall);
conn.ev.off('connection.update', conn.connectionUpdate);
conn.ev.off('creds.update', conn.credsUpdate);
//conn.ev.off('chats.set', conn.storeChatsS)
//conn.ev.off('contacts.set', conn.storeContactsS)

}

conn.handler = handler.handler.bind(global.conn);
conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
conn.onDelete = handler.deleteUpdate.bind(global.conn);
conn.onCall = handler.callUpdate.bind(global.conn);
conn.connectionUpdate = connectionUpdate.bind(global.conn);
conn.credsUpdate = saveCreds.bind(global.conn, true);
//conn.storeChatsS = storeChatsS(global.conn)
//conn.storeContactsS = storeContactsS(global.conn)

conn.ev.on('messages.upsert', conn.handler);
conn.ev.on('group-participants.update', conn.participantsUpdate);
conn.ev.on('groups.update', conn.groupsUpdate);
conn.ev.on('message.delete', conn.onDelete);
conn.ev.on('call', conn.onCall);
conn.ev.on('connection.update', conn.connectionUpdate);
conn.ev.on('creds.update', conn.credsUpdate);
//conn.ev.on('chats.set', conn.storeChatsS)
//conn.ev.on('contacts.set', conn.storeContactsS)
isInit = false;
return true;
};
if (global.aniJdbts) {
for (const session of readJadibtsSession) {
const bot = path.join(jadibts, session)
await jddt(bot, {conn, args: '', usedPrefix: '/', command: 'serbot', m: null })
}
}
const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
async function filesInit() {
for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
try {
let file = global.__filename(join(pluginFolder, filename))
const module = await import(file)
global.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(e)
delete global.plugins[filename]
}}}
filesInit().then(_ => Object.keys(global.plugins)).catch(console.error)

global.reload = async (_ev, filename) => {
if (pluginFilter(filename)) {
let dir = global.__filename(join(pluginFolder, filename), true)
if (filename in global.plugins) {
if (existsSync(dir)) conn.logger.info(`plugin actualizado - '${filename}'`)
else {
conn.logger.warn(`plugin eliminado - '${filename}'`)
return delete global.plugins[filename]
}
} else conn.logger.info(`nuevo plugin - '${filename}'`)
let err = syntaxerror(readFileSync(dir), filename, {
sourceType: 'module',
allowAwaitOutsideFunction: true
})
if (err) conn.logger.error(`Error de sintaxis mientras se carga '${filename}'\n${format(err)}`)
else try {
const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
global.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(`Hay un error que requiere atención en '${filename}\n${format(e)}'`)
} finally {
global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
}}}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()

setInterval(async () => {
backupCreds(authFolder, botDirRespald)
console.log(chalk.whiteBright(`\n▣────────[ BACKUP_CREDS ]───────────···\n│\n▣─❧ RESPALDO EXITOSO ✅\n│\n▣────────────────────────────────────···\n`))
}, 15 * 60 * 1000)
setInterval(async () => {
purgeOldFiles(authFolder)
console.log(chalk.cyanBright(`\n▣────────[ AUTO_PURGE_OLDFILES ]───────────···\n│\n▣─❧ ARCHIVOS ELIMINADOS ✅\n│\n▣────────────────────────────────────···\n`))
}, 1000 * 60 * 60)


_quickTest()
.then(() => conn.logger.info(`CARGANDO．．．\n`))
.catch(console.error)
}

setInterval(async () => {
clearTmp()
console.log(chalk.cyanBright(`\n▣────────[ AUTOCLEARTMP ]───────────···\n│\n▣─❧ ARCHIVOS ELIMINADOS ✅\n│\n▣────────────────────────────────────···\n`))
}, 1000 * 60 * 3)
/**
setInterval(async () => {
purgeSession()
console.log(chalk.cyanBright(`\n▣────────[ AUTOPURGESESSIONS ]───────────···\n│\n▣─❧ ARCHIVOS ELIMINADOS ✅\n│\n▣────────────────────────────────────···\n`))
}, 1000 * 60 * 60)
setInterval(async () => {
purgeSessionSB()
 console.log(chalk.cyanBright(`\n▣────────[ AUTO_PURGE_SESSIONS_SUB-BOTS ]───────────···\n│\n▣─❧ ARCHIVOS ELIMINADOS ✅\n│\n▣────────────────────────────────────···\n`))
}, 1000 * 60 * 60)
 */
async function enterCode(conn, registration) {
try {
const code = await question('Please enter the one time code:\n');
const response = await conn.register(code.replace(/["']/g, '').trim().toLowerCase());
console.log('Registró con éxito su número de teléfono.');
console.log(response);
rl.close();
} catch (error) {
console.error('No se pudo registrar su número de teléfono.Inténtalo de nuevo.\n', error);
await askForOTP(conn, registration);
}
}

async function enterCaptcha(conn, registration) {
const response = await conn.requestRegistrationCode({ ...registration, method: 'captcha' });
const path = __dirname + '/captcha.png';
fs.writeFileSync(path, Buffer.from(response.image_blob, 'base64'));

open(path);
const code = await question('Ingrese el código Captcha:\n');
fs.unlinkSync(path);
registration.captcha = code.replace(/["']/g, '').trim().toLowerCase();
}

async function askForOTP(conn, registration) {
if (!registration.method) {
let code = await question('¿Cómo le gustaría recibir el código único para el registro?"SMS" o "voz"\n');
code = code.replace(/["']/g, '').trim().toLowerCase();
if (code !== 'sms' && code !== 'voice') {
 return await askForOTP(conn, registration);
}

registration.method = code;
}

try {
await conn.requestRegistrationCode(registration);
await enterCode(conn, registration);
} catch (error) {
console.error('No se pudo solicitar el código de registro. Inténtalo de nuevo.\n', error);

if (error?.reason === 'code_checkpoint') {
await enterCaptcha(conn, registration);
}

await askForOTP(conn, registration);
}
}
