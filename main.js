process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = true;
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { opts, __filename, dirname, terminalQuestion, question, clearTmp, purgeOldFiles, actualizarNumero, waitTwoMinutes, cleanupOnConnectionError, backupCreds, wait, _quickTest, reload, filesInit, plugins, dataBot, sessionCheck, watchPluginsDirs} from './lib/functions.js';
import { dataBases, authFolderRespald, raizPath, media } from './config.js';
import { Low, JSONFile } from 'lowdb';
export const anidir = `ANI_MX_SCANS`
export const dirP = !fs.existsSync(anidir) ? raizPath : path.join(raizPath, anidir) //Solo si quieres arrancar el bot desde una carpeta diferente, por ejemplo: /ANI_MX_SCANS
export const sessionNameAni = `ANIMXSCANS`
export const authFolder = path.join(dirP, sessionNameAni)
const botDirRespald = path.join(authFolderRespald, sessionNameAni)
const nameReg = 'ani'
export const jadibts = path.join(dirP, 'jadibts')
const anipp = path.join(media,`pictures/ANI.jpg`)
const imagen1 = path.join(media,`pictures/Menu.png`)
const imagen2 = path.join(media,`pictures/Menu2.jpg`)
const stickerAMX = path.join(media,`stickers/ANIMXSCANS.webp`)
export async function onBot(folderPath) {
let { loadDatabase, registrerBot, configDinamics, groupFetchAllParticipatingJson } = await import('./lib/database.js')
const { makeWASocket, protoType, serialize } = await import('./lib/simple.js');
const {start, info} = (await configDinamics())
protoType();
serialize();
const { timestamp } = await import('./lib/constants.js');
const { proto } = (await import('@whiskeysockets/baileys')).default;
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = await import('@whiskeysockets/baileys');

const nameFolderBot = path.basename(folderPath)

const pathBotDBs = path.join(dataBases, nameFolderBot)
if (!fs.existsSync(pathBotDBs)) fs.mkdirSync(pathBotDBs, { recursive: true })
if (!fs.existsSync(botDirRespald)) fs.mkdirSync(botDirRespald, { recursive: true })
const db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}${pathBotDBs}/database.json`));
const dbGFAPFile = path.join(pathBotDBs, 'groupFetchAllParticipatingJson.json')
const createJson = new JSONFile(dbGFAPFile)
const dbGroups = new Low(createJson)

const { state, saveState, saveCreds } = await useMultiFileAuthState(folderPath);
const {default: NodeCache} = await import('node-cache');
const {default: libstore} = await import('./lib/store.js');
const msgRetryCounterCache = new NodeCache();
const {pino} = await import('pino');
const logger = pino({ level: 'silent'})
const {version} = await fetchLatestBaileysVersion();
const inMstore = libstore.makeInMemoryStore({ logger })
const storeFile = path.join(pathBotDBs, `${nameFolderBot}-${opts._[0] || 'data'}.store.json`)
try {
inMstore.readFromFile(storeFile)
} catch (error) {
inMstore.writeToFile(storeFile)
}

async function patchMessageBeforeSending(message) {
const requiresPatch = !!( message.buttonsMessage || message.templateMessage || message.listMessage || message.interactiveMessage );
if (requiresPatch) {
message = {viewOnceMessage: {message: {messageContextInfo: {deviceListMetadataVersion: 2, deviceListMetadata: {}}, ...message}}};
}
return message;
}

const connectionOptions = {
printQRInTerminal: start.qrTerminal,
logger,
version,
syncFullHistory: false,
markOnlineOnConnect: true,
connectTimeoutMs: 60_000,
getMessage: async (key) => (inMstore.loadMessage(key.remoteJid, key.id) || libstore.loadMessage(key.id) || {}).message || null,
cachedGroupMetadata: async (jid) => msgRetryCounterCache.get(jid),
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, logger),
},
patchMessageBeforeSending,
browser: start.usePairingCode ? ["Ubuntu", "Chrome", "20.0.04"] : ['ANI MX SCANS','Edge','1.0.0'],
defaultQueryTimeoutMs: undefined,
};
const options = {
storeFile,
inMstore,
libstore,
dbGroups
}

let conn = makeWASocket(connectionOptions, options)
conn.isInit = false;
conn.well = false;
terminalQuestion(conn)
if (!opts['test']) {
if (db) {
setInterval(async () => {
if (db.data) {
}
}, 30 * 1000);
}
}

const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;
if (opts['server']) (await import('./server.js')).default(conn, PORT);

const MAX_CLOSE_COUNT = 10;
const CLOSE_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
const RESET_INTERVAL = 2 * 60 * 1000; // 2 minutes
let consecutiveCloseCount = 0

async function connectionUpdate(update) {
const { CONNECTING } = await import('ws');
const { connection, lastDisconnect, isNewLogin } = update;
if (isNewLogin) conn.isInit = true;
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
if (code && code !== DisconnectReason.loggedOut && conn?.ws.readyState == null || undefined || CONNECTING) {
await global.reloadHandler(true).catch(console.error);
timestamp.connect = new Date;
}
if (db.data == null) await loadDatabase(db);
if (start.qrTerminal && update.qr != 0 && update.qr != undefined) {
console.log(chalk.yellow('🚩ㅤEscanea este codigo QR, el codigo QR expira en 60 segundos.'));
const QR = await import('qrcode-terminal').then(m => m.default || m).catch(() => {
conn.logger.error('El terminal de código QR no se agregó como dependencia');
});
QR === null || QR === void 0 ? void 0 : QR.generate(update.qr, { small: true });
}
if (conn?.ws?.readyState === CONNECTING || conn?.ws?.readyState === undefined) {
console.log(chalk.red(`La conexión se esta estableciendo: ${connection}`));
}
if (connection === undefined) return //conn.ev.removeAllListeners();
console.log(chalk.red(`La conexión se esta estableciendo: ${connection}`));
const { Boom } = await import('@hapi/boom');
let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
if (connection == 'close') {
if (reason === DisconnectReason.badSession) {
conn.logger.error(`[ ⚠ ] Sesión incorrecta, por favor elimina la carpeta ${folderPath} y escanea nuevamente.`);
return global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.preconditionRequired){
conn.logger.warn(`[ ⚠ ] Conexión cerrada, reconectando por precondicion...`);
return global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionClosed) {
conn.logger.warn(`[ ⚠ ] Conexión cerrada, reconectando...`);
return global.reloadHandler(true).catch(console.error)
//428
} else if (reason === DisconnectReason.connectionLost) {
conn.logger.warn(`[ ⚠ ] Conexión perdida con el servidor, reconectando...`);
return global.reloadHandler(true).catch(console.error)// process.send('reset');
} else if (reason === DisconnectReason.connectionReplaced) {
conn.logger.error(`[ ⚠ ] Conexión reemplazada, se ha abierto otra nueva sesión. Por favor, cierra la sesión actual primero.`);
stopConn(conn)
} else if (reason === DisconnectReason.loggedOut) {
conn.logger.error(`[ ⚠ ] Conexion cerrada, por favor elimina la carpeta ${folderPath} y escanea nuevamente.`);
cleanupOnConnectionError(folderPath, botDirRespald)
} else if (reason === DisconnectReason.restartRequired) {
conn.logger.info(`[ ⚠ ] Reinicio necesario, reinicie el servidor si presenta algún problema.`);
} else if (reason === DisconnectReason.timedOut) {
conn.logger.warn(`[ ⚠ ] Tiempo de conexión agotado, reconectando...`);
process.send('reset');
} else if (reason === 403) {
conn.logger.warn(`[ ⚠ ] Razón de desconexión: revisión de whatsapp o soporte. ${reason || ''}: ${connection || ''}`);
cleanupOnConnectionError(folderPath, botDirRespald)
global.reloadHandler(true).catch(console.error)
} else if (reason === 405) {
conn.logger.warn(`[ ⚠ ] No alojado. ${reason || ''}: ${connection || ''}`);
if (!conn.authState.creds.registered) {
conn.ws.close()
cleanupOnConnectionError(folderPath, botDirRespald)
}
global.reloadHandler(true).catch(console.error)
} else if (code === 503){
} else {
conn.logger.warn(`[ ⚠ ] Razón de desconexión desconocida. ${reason || ''}: ${connection || ''}`);
consecutiveCloseCount++;
console.log(chalk.yellow(`🚩ㅤConexion cerrada, por favor borre la carpeta ${folderPath} y reescanee el codigo QR`));
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
global.userBot = conn.user.jid
loadDatabase(db);
console.log(chalk.yellow(`▣─────────────────────────────···\n│\n│❧ ${state.creds.me.hasOwnProperty('jid') ? state.creds.me.jid.split('@')[0] : state.creds.me.id.split(':')[0]} CONECTADO CORRECTAMENTE AL WHATSAPP ✅\n│✅Sesión: ${path.basename(folderPath)}\n│\n▣─────────────────────────────···`))
if (update.receivedPendingNotifications) { 
actualizarNumero() 
waitTwoMinutes()
return conn.groupAcceptInvite(info.ganisubbots.replace('https://chat.whatsapp.com/', ''));
}
const now = Date.now(); 
const data = await dataBot(nameReg).catch(await registrerBot(nameReg, conn.user))
const lastGroupFetchAll = data.lastGroupFetchAll
const diff = now - lastGroupFetchAll
if (!lastGroupFetchAll || diff >= 3 * 24 * 60 * 60 * 1000 ) {
await groupFetchAllParticipatingJson(conn, dbGroups, data, nameReg, registrerBot)
}
await registrerBot(nameReg, conn.user)
}
}

process.on('uncaughtException', console.error);

let isInit = true;

async function stopConn(sock) {
isInit = false
sock.ev.removeAllListeners()
sock.ws.close()
}


const oldChats = (Object.assign(conn.chats, inMstore.chats));
const pluginFolder = dirname(path.join(raizPath, './plugins/index'));
let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
try {
const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
if (Object.keys(Handler || {}).length) handler = Handler;
} catch (e) {
console.error(e);
}
if (restatConn) {
conn.ev.removeAllListeners();
conn.ws.close();
try {
conn = makeWASocket(connectionOptions, Object.assign(options, {chats: oldChats }));
isInit = true;
} catch { 
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler);
conn.ev.off('group-participants.update', conn.participantsUpdate);
conn.ev.off('groups.update', conn.groupsUpdate);
conn.ev.off('message.delete', conn.onDelete);
conn.ev.off('call', conn.onCall);
conn.ev.off('connection.update', conn.connectionUpdate);
conn.ev.off('creds.update', conn.credsUpdate);

}
onBot(folderPath).catch(console.error)
}
}

const pluginsPath = pluginFolder.replace('/index', '')
let func = {}
try {const {call} = await import('./plugins/_anticall.js') 
const {fail} = await import('./plugins/_dFailMessages.js')
func = {call, fail}
} catch (e) {console.log('Objs: ', e.stack)}
const botObj = {sessionNameAni, nameReg, authFolder, botDirRespald, pathBotDBs, db, func, pluginsPath, anipp, imagen1, imagen2, stickerAMX, inMstore, storeFile, dbGroups, jadibts, dataBot, registrerBot}

conn.handler = function(chatUpdate) { return handler.handler.call(conn, chatUpdate, botObj);}
conn.participantsUpdate = function(participantUpdate) { return handler.participantsUpdate.call(conn, participantUpdate, botObj)}//bind(conn);
conn.groupsUpdate = function(groupsUpdate) { return handler.groupsUpdate.call(conn, groupsUpdate, botObj)};
conn.onDelete = function(message) { return handler.deleteUpdate.call(conn, message, botObj)}
conn.onCall = function(callUpdate) { return handler.callUpdate.call(conn, callUpdate, botObj);}
conn.connectionUpdate = connectionUpdate.bind(conn);
conn.credsUpdate = saveCreds.bind(conn, true);

conn.ev.on('messages.upsert', conn.handler);
conn.ev.on('group-participants.update', conn.participantsUpdate);
conn.ev.on('groups.update', conn.groupsUpdate);
conn.ev.on('message.delete', conn.onDelete);
conn.ev.on('call', conn.onCall);
conn.ev.on('connection.update', conn.connectionUpdate);
conn.ev.on('creds.update', conn.credsUpdate);
inMstore.bind(conn.ev, {
groupMetadata: conn.groupMetadata
})

isInit = false;
return conn;
};
let readJadibtsSession = []
if (fs.existsSync(jadibts)) {
readJadibtsSession = fs.readdirSync(jadibts);
if (readJadibtsSession.length == 0) start.aniJdbts = false;
}
if (start.aniJdbts) {
const {verifyBot} = await import('./plugins/jadibot-serbot.js');
for (const session of readJadibtsSession) {
const bot = path.join(jadibts, session)
await verifyBot(bot, {conn, args: '', usedPrefix: '/', command: 'serbot', m: null })
}
}
await global.reloadHandler()
setInterval(async () => {
backupCreds(authFolder, botDirRespald)
console.log(chalk.whiteBright(`\n▣────────[ BACKUP_CREDS ]───────────···\n│\n▣─❧ RESPALDO EXITOSO ✅\n│\n▣────────────────────────────────────···\n`))
}, 15 * 60 * 1000)
setInterval(async () => {
purgeOldFiles(authFolder)
console.log(chalk.cyanBright(`\n▣────────[ AUTO_PURGE_OLDFILES ]───────────···\n│\n▣─❧ ARCHIVOS ELIMINADOS ✅\n│\n▣────────────────────────────────────···\n`))
}, 1000 * 60 * 60)

_quickTest().then(() => conn.logger.info(`CARGANDO．．．\n`)).catch(console.error)
return watchPluginsDirs(pluginFolder, conn)
}

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
const path = raizPath + '/captcha.png';
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
if (code !== 'sms' && code !== 'voice') {return await askForOTP(conn, registration);
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
