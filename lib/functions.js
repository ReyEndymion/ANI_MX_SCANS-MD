import chalk from 'chalk';
import cfonts from 'cfonts';
import fs from 'fs';
import path from 'path';
import { creds, DEFAULT_HEADERS } from './constants.js';
import { groupID, temp } from '../config.js';
import { createRequire } from 'module'; 
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import yargs from 'yargs';
import chokidar from 'chokidar'
import crypto from 'crypto'
import { exec } from 'child_process'
import fetch from 'node-fetch'
import axios from 'axios'
import { promisify } from 'util'
import PhoneNumber from 'awesome-phonenumber';

export async function runAnimation(name, nameProyect, author, description) {
const { say, render } = cfonts
console.log(chalk.cyan.bold('\n🌎 Preparando entorno para Bots... 🌏\n'));

const {ANIFramesAnimation} = await import('./constants.js')
const consoleWidth = process.stdout.columns || 80
let lastFrame = ANIFramesAnimation[ANIFramesAnimation.length - 1].split('\n').map(line => line.trimEnd())
const maxWidth = Math.max(...lastFrame.map(line => line.length))
const padding = Math.floor((consoleWidth - maxWidth) / 2)
const centeredFrames = ANIFramesAnimation.map(frame => {
return frame.split('\n').map(line => ' '.repeat(padding > 0 ? padding : 0) + line.trimEnd()).join('\n')}
)
let i = 0;
await new Promise(resolve => {
const interval = setInterval(() => {
console.clear();
console.log(chalk.magentaBright('\nCargando entorno...'));
console.log(chalk.blueBright(centeredFrames[i]));
i = (i + 1) % ANIFramesAnimation.length;
}, 250);
setTimeout(() => {
clearInterval(interval);
console.clear();
lastFrame = lastFrame.map(line => ' '.repeat(padding > 0 ? padding : 0) + line)
const rendered = render(nameProyect, {font: 'tiny', align: 'center', colors: ['cyan', 'blue'], space: false, lineHeight: 1}).string.split('\n')

const mid = Math.floor((lastFrame.length - rendered.length) / 2)
lastFrame.splice(mid, 0, ...rendered)
setTimeout(() => {
console.log(chalk.blueBright(lastFrame.join('\n')))
console.log('✅ㅤIniciando...')
say(`${nameProyect}\nWhatsApp - Bots`, {
font: 'chrome',
align: 'center',
gradient: ['red', 'magenta']
})
say(`${description} By @${author.name || author}`, {
font: 'console',
align: 'center',
gradient: ['red', 'magenta']
})
setTimeout(() => resolve(), 500)
}, 80)
}, 2000);
})
}
export const execAsync = promisify(exec)

export let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());

export let prefix = new RegExp('^[' + (opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®?&.\\-.@').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

export function __filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { 
return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; 
export function dirname(pathURL) { return path.dirname(__filename(pathURL, true)) }; 
export const __require = function require(dir = import.meta.url) { return createRequire(dir) }
export const libPath = dirname(import.meta.url)
export const require = createRequire(libPath)


export async function question(text, validate) {
return new Promise((resolve) => {
const ask = () => {
process.send({ type: 'ask', text });
process.once('message', (response) => {
if (response.type === 'response') {
const answer = response.answer.trim()
if (validate(answer)) {
resolve(answer); 
} else {
ask();
}
}
});
};
ask(); 
});
}
//await 
/*
*/
/**
* Código de emparejamiento para clientes web
*/
export async function terminalQuestion(conn) {
let { configDinamics } = await import('./database.js')

const start = (await configDinamics()).start
const connCreds = conn.authState.creds

if (!connCreds.registered) {
if (start.usePairingCode) {
if (start.useMobile) {
throw new Error('No se puede usar el código de emparejamiento con API móvil');
}

const phoneNumber = await question('Ingrese su número de teléfono móvil\n*Debe ir sin espacios y con el codigo del país completo:\n', (answer) => /^\d+$/.test(answer));
if (/\d+/.test(phoneNumber)) {
const code = await conn.requestPairingCode(formatNumberWA(phoneNumber));
console.log(`Pairing code: ${code}`);
} else {
throw new Error('Número de teléfono no válido\nDeben ser numeros sin espacios');
}
}

if (start.useMobile) {
const { registration } = connCreds || { registration: {} };

if (!registration.phoneNumber) {
registration.phoneNumber = await question('Ingrese su número de teléfono móvil:\n');
}

const phoneNumber = new PhoneNumber(registration.phoneNumber);
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

}
async function enterCode(conn, registration) {
try {
const code = await question('Ingrese el código de tiempo:\n');
const response = await conn.register(code.replace(/["']/g, '').trim().toLowerCase());
console.log('Registró con éxito su número de teléfono.');
console.log(response);
} catch (error) {
console.error('No se pudo registrar su número de teléfono. Por favor intente de nuevo.\n', error);
await askForOTP(conn, registration);
}
}

async function enterCaptcha(conn, registration) {
const response = await conn.requestRegistrationCode({ ...registration, method: 'captcha' });

const path = path.join(temp, '/captcha.png');
fs.writeFileSync(path, Buffer.from(response.image_blob, 'base64'));

open(path);
const code = await question('Ingrese el código Captcha:\n');
fs.unlinkSync(path);
registration.captcha = code.replace(/["']/g, '').trim().toLowerCase();
}

async function askForOTP(conn, registration) {
if (!registration.method) {
let code = await question('¿Cómo le gustaría recibir el código único para el registro? "SMS" o "voz"\n');
code = code.replace(/["']/g, '').trim().toLowerCase();
if (code !== 'sms' && code !== 'voice') {
return await askForOTP();
}
registration.method = code;
}

try {
await conn.requestRegistrationCode(registration);
await enterCode(conn, registration);
} catch (error) {
console.error('No se pudo solicitar el código de registro. Por favor intente de nuevo.\n', error);

if (error?.reason === 'code_checkpoint') {
await enterCaptcha(conn, registration);
}

await askForOTP(conn, registration);
}
}

export function splitInternationalNumbers(str) {
const results = [];
let i = 0;

while (i < str.length) {
let found = null;

for (let len = 5; len <= 15 && i + len <= str.length; len++) {
const candidate = str.slice(i, i + len);
const pn = new PhoneNumber('+' + candidate);

if (pn.isValid()) {
found = pn.getNumber('e164');
i += len;
break;
}
}

if (found) {
results.push(found);
} else {
i++;
}
}

return results;
}

export const printQRIfNecessaryListener = (ev, logger) => {
ev.on('connection.update', async ({ qr }) => {
if (qr) {
const QR = await import('qrcode-terminal')
.then(m => m.default || m)
.catch(() => {
logger.error('QR code terminal not added as dependency');
});
QR === null || QR === void 0 ? void 0 : QR.generate(qr, { small: true });
}
});
};

export async function sessionCheck(pathSession, pathRespald, onBot) {
if (!fs.existsSync(pathSession)) {
fs.mkdirSync(pathSession);
console.log(`Directorio ${pathSession} creado exitosamente`);
}
if (!fs.existsSync(pathRespald)) {
fs.mkdirSync(pathRespald);
console.log(`Directorio ${pathRespald} creado exitosamente`);
}
const readBotPath = fs.readdirSync(pathSession)
const readBotDirBackup = fs.readdirSync(pathRespald)
const fileCredsResp = path.join(pathRespald, creds)
if (readBotPath.includes(creds)) {
const filePathCreds = path.join(pathSession, creds)
try {
const readCreds = JSON.parse(fs.readFileSync(filePathCreds));
const userJid = readCreds && readCreds.me && readCreds.me.jid.split('@')[0]
const {statusCreds, msg: msgC} = await credsStatus(pathSession, userJid)
const {validate, msg: msjJ} = validateJSON(filePathCreds)
console.info(`${msgC}\n${msjJ}`)
if (statusCreds && validate) {
backupCreds(pathSession, pathRespald)
onBot(pathSession)
} else {
if (readBotDirBackup.includes(creds)) {
const {statusCredsBackup} = await backupCredsStatus(pathRespald)
const {validate} = validateJSON(fileCredsResp)
if (statusCredsBackup && validate) {
respaldCreds(pathSession, pathRespald)
} else {
cleanupOnConnectionError(pathSession, pathRespald)
}
}
}
} catch (error) {
console.log('errorInicializacion: ', error)
const {statusCredsBackup} = await backupCredsStatus(pathRespald)
const {validate} = validateJSON(fileCredsResp)
if (statusCredsBackup && validate) {
respaldCreds(pathSession, pathRespald)
} else {
cleanupOnConnectionError(pathSession, pathRespald)
}
}
} else {
onBot(pathSession)
}
}

export async function getBot(name, maxAgeMs = 2*60*100) {
const {dbRegisterBot} = await import('./database.js')
await dbRegisterBot.read()
const bot = dbRegisterBot.data.bots?.[name]
if (bot.name && bot.user && bot.user?.jid) return bot.user
if (!bot || Date.now() - bot.updated > maxAgeMs) return null
console.log('getBot', bot.user)
}

export async function dataBot(name) {
const {dbRegisterBot} = await import('./database.js')
await dbRegisterBot.read()
return dbRegisterBot.data.bots[name]
}

export async function listAciveBots(maxAgeMs = 2*60*100) {
const {dbRegisterBot} = await import('./database.js')
await dbRegisterBot.read()
const now = Date.now()
return Object.entries(dbRegisterBot.data.bots || {}).filter(([_, bot]) => now - bot.updated <= maxAgeMs).map(([name, bot]) => ({name, ...bot}))
}

export function validateJSON(filePath) {
try {
let statsCreds = fs.statSync(filePath);
var msg
if (statsCreds && statsCreds.size !== 0) {
const data = fs.readFileSync(filePath, 'utf8');
let readCreds = JSON.parse(data);
if (readCreds && readCreds.me && (readCreds.me.id || readCreds.me.jid) && readCreds.hasOwnProperty('platform')) {
msg = `El archivo JSON de la carpeta ${filePath} es válido.`;
return {validate: true, msg}
}
} else {
msg = `El archivo JSON de la carpeta ${filePath} es inválido.`;
return {validate: false, msg}
}
} catch (error) {
msg = 'Error de sintaxis en JSON:', error.message;
return {validate: false, msg}
}
}

export async function backupCreds(pathSession, pathBackUp) {
if (!fs.existsSync(pathBackUp)) {
fs.mkdirSync(pathBackUp)
console.log(`Directorio del backup ${pathBackUp} creado exitosamente'`);
}
const credsFilePath = path.join(pathSession, creds)
const backupFilePath = path.join(pathBackUp, creds)
if (fs.existsSync(backupFilePath)) {
const {validate, msg} = validateJSON(backupFilePath)
if (validate) {
const statsCreds = fs.statSync(credsFilePath);
const statBackUpCreds = fs.statSync(backupFilePath);
if (statsCreds.mtimeMs > statBackUpCreds.mtimeMs) {
fs.copyFileSync(credsFilePath, backupFilePath);
return `${msg} Se actualizo el archivo de respaldo.`
} else {
return `${msg} pero no se actualizo el archivo de respaldo debido a que la fecha del archivo original es igual o inferior al respaldo.`
}
} else {
return `${msg} Necesita ser remplazado.`
}
} else {
fs.copyFileSync(credsFilePath, backupFilePath);
console.log(`Creado el archivo de respaldo: ${backupFilePath}`);
}
}

export async function respaldCreds(pathSession, pathBackUp) {
if (!fs.existsSync(pathSession)) {
fs.mkdirSync(pathSession);
console.log(`Directorio de la sesion ${pathSession} creado exitosamente'`);
}
const fileCredsResp = path.join(pathBackUp, creds)
const fileCreds = path.join(pathSession, creds)
if (fs.existsSync(fileCredsResp)) {
const {validate, msg} = validateJSON(fileCredsResp)
if (validate) {
fs.copyFileSync(fileCredsResp, fileCreds, 2);
return `${msg}\nRestaurado el archivo desde el respaldo: ${fileCredsResp} -> ${fileCreds}`;
}
} 
}

export async function credsStatus(pathSession, userJid) {
try {
const filesSession = fs.readdirSync(pathSession);
var msg
if (filesSession.includes(creds)) {
const credsFilePath = path.join(pathSession, creds)
const statsCreds = fs.statSync(credsFilePath);
if (statsCreds && statsCreds.size !== 0) {
try {
const readCreds = JSON.parse(fs.readFileSync(credsFilePath));
if (readCreds && readCreds.me && (readCreds.me.id || readCreds.me.jid) && readCreds.hasOwnProperty('platform')) {
msg = `Archivo creds correcto para ${userJid}.`
return {statusCreds: true, msg};
} else {
msg = `El Archivo de sesion de ${userJid} no contiene las propiedades correctas, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion`
return {statusCreds: false, msg};
}
} catch (error) {
console.error(`El Archivo de sesion de ${userJid} no se puede leer en este momento o es ilegible, estos son los detalles actualmente:\n\n${error.stack}`)
return {statusCreds: false, msg};
}
} else {
msg = `El Archivo de sesion de ${userJid} es incorrecto y tiene 0 bytes, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion`
return {statusCreds: false, msg};
}
} else {
msg = `El Archivo de sesion de ${userJid} no existe en la ubicacion esparada, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion`
return {statusCreds: false, msg};
}
} catch (error) {
msg = error.stack
return {statusCreds: false, msg};
}
}

export async function backupCredsStatus(pathBackUp) {
var msg
if (fs.existsSync(pathBackUp)) {
const readDirRespald = fs.readdirSync(pathBackUp);
if (readDirRespald.includes(creds)) {
const backupFilePath = path.join(pathBackUp, creds)
const statBackUpCreds = fs.statSync(backupFilePath);
if (statBackUpCreds.size !== 0) {
try {
const readCredsResp = JSON.parse(fs.readFileSync(backupFilePath));
if (readCredsResp && readCredsResp.me && (readCredsResp.me.id || readCredsResp.me.jid) && readCredsResp.hasOwnProperty('platform')) {
msg = 'Archivo de respaldo es correcto, puede respaldar la sesion si gusta'
return {statusCredsBackup: true, msg}
} else {
msg = 'Archivo de respaldo no contiene las propiedades correctas, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion'
return {statusCredsBackup: false, msg};
}
} catch (error) {
msg = `El Archivo de respaldo no se puede leer en este momento o es ilegible, estos son los detalles actualmente:\n\n${error.stack}`
return {statusCredsBackup: false, msg};
}
} else {
msg = 'Archivo de respaldo es incorrecto y tiene 0 bytes, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion'
return {statusCredsBackup: false, msg};
}
} else {
msg = 'Archivo de respaldo no existe en la ubicacion esparada, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion'
return {statusCredsBackup: false, msg};
}
} else {
msg = 'La carpeta Backup de credenciales no existe, debe realizar un respaldo desde el archivo original'
return {statusCredsBackup: false, msg};
}
}

export async function cleanupOnConnectionError(pathSession, pathBackUp) {
let { configDinamics } = await import('./database.js')

const start = (await configDinamics()).start
const {jadibts} = await import('../config.js')
fs.readdirSync(pathSession).forEach(file => {
const sessionFilePath = path.join(pathSession, file);
try {
fs.rmSync(pathSession, { recursive: true, force: true });
console.log(`Archivo eliminado: ${sessionFilePath}`);
} catch (error) {
console.log(`No se pudo eliminar el archivo: ${sessionFilePath}`);
}
});
if (fs.existsSync(pathBackUp)) {
const backupFilePath = path.join(pathBackUp, creds);
try {
fs.rmSync(pathBackUp, { recursive: true, force: true });
console.log(`Archivo de copia de seguridad eliminado: ${backupFilePath}`);
} catch (error) {
console.log(`No se pudo eliminar el archivo de copia de seguridad o no existe: ${backupFilePath}`);
}
}
if (fs.existsSync(jadibts)) {
if (!start.aniJdbts || fs.readdirSync(jadibts).length === 0) {
process.send(`reset`)
}
} else process.send(`reset`)

}

export async function getSubBot(name, dbRegisterSubBot, maxAgeMs = 2*60*100) {
await dbRegisterSubBot.read()
const bot = dbRegisterSubBot.data.bots?.[name]
if (bot.name && bot.user && bot.user?.jid) return bot.user
if (!bot || Date.now() - bot.updated > maxAgeMs) return null
console.log('getBot', bot.user)
}

export async function dataSubBot(name) {
const {dbRegisterSubBot} = await import('./database.js')
await dbRegisterSubBot.read()
return dbRegisterSubBot.data.bots[name]
}

export async function listAciveSubBots(dbRegisterSubBot, maxAgeMs = 2*60*100) {
await dbRegisterSubBot.read()
const now = Date.now()
return Object.entries(dbRegisterSubBot.data.bots || {}).filter(([_, bot]) => now - bot.updated <= maxAgeMs).map(([name, bot]) => ({name, ...bot}))
}

export async function delSubBot(name, dbRegisterSubBot) {
await dbRegisterSubBot.read()
const bot = dbRegisterSubBot.data.bots?.[name]
if (bot.name && bot.user && bot.user?.jid) delete bot.user
if (!bot || Date.now() - bot.updated > maxAgeMs) return null
console.log('delSubBot', bot.user)
}

export async function clearTmp(time) {
const tmp = [temp]
let files = []
let msg
if (time) {
tmp.forEach(dirname => fs.readdirSync(dirname).forEach(file => files.push(path.join(dirname, file))))
files.forEach((file, i) => {
try {
const stats = fs.statSync(file)
if (stats.isFile() && (Date.now() - stats.mtimeMs >= time)) {
fs.unlinkSync(file)
files = files.slice(i + 1); 
} else {
msg = setTimeout(() => {
clearTmp()
}, time)
if (files.length === 0) {
clearTimeout(msg)
}
}
} catch (error) {
clearTmp()}
})
console.log(chalk.cyanBright(`\n▣────────[ AUTOCLEARTMP ]───────────···\n│\n▣─❧ ${files.length} ARCHIVOS ELIMINADOS DE MAS DE ${ajusteTiempo(time)}✅\n│\n▣────────────────────────────────────···\n`))
if (files.length === 0) {
clearTimeout(msg)
}
} else {
tmp.forEach(dirname => {
fs.readdirSync(dirname).forEach(file => {
files.push(path.join(dirname, file))
const filePath = path.join(dirname, file);
try {
if (fs.statSync(filePath).isFile()) {
fs.unlinkSync(filePath);
}
} catch (e) {
console.error(`No se pudo borrar ${filePath}:`, e);
}
});
});
console.info(chalk.cyanBright(`\n▣────────[ AUTOCLEARTMP ]───────────···\n│\n▣─❧ ${files.length} ARCHIVOS ELIMINADOS ✅\n│\n▣────────────────────────────────────···\n`))}
}

export async function limpCarpetas(dirPath) {
try {
const files = fs.readdirSync(dirPath, { recursive: true });
if (files.length !== 0) {
files.forEach((file) => {
const filePath = path.join(dirPath, file);
const stats = fs.statSync(filePath);
const tiempoTranscurrido = Date.now() - stats.mtimeMs;

if (stats.isDirectory()) {
const contenidoCarpeta = fs.readdirSync(filePath);

if (contenidoCarpeta.length === 0) {
fs.rmSync(filePath, { recursive: true, force: true });
console.log(chalk.cyanBright(`\n▣────────[ LIMPIAR CARPETAS ]───────────···\n│\n▣─❧ Carpeta ${filePath} vacia eliminada.✅\n│\n▣────────────────────────────────────···\n`))
} else if (tiempoTranscurrido > 15 * 24 * 60 * 60 * 1000) {
fs.rmSync(filePath, { recursive: true, force: true });
console.log(chalk.cyanBright(`\n▣────────[ LIMPIAR CARPETAS ]───────────···\n│\n▣─❧ Carpeta ${filePath} de antigüedad 15 dias sin actividad eliminada. ✅\n│\n▣────────────────────────────────────···\n`))
}
} else if (filePath.length === 0) {
}
});
} else {
console.log(chalk.cyanBright(`\n▣────────[ LIMPIAR CARPETAS ]───────────···\n│\n▣─❧ Carpeta ${dirPath} vacia eliminada.✅\n│\n▣────────────────────────────────────···\n`))
fs.rmSync(dirPath, { recursive: true, force: true });
}
} catch (error) {
console.error(`Error al eliminar directorios:\n\n${error.stack}`);
}
}

export function actualizarNumero() {
const configPath = path.join(dirP, 'config.js');
const configData = fs.readFileSync(configPath, 'utf8');
const archivoCreds = fs.readFileSync(path.join(dirP, 'sesionRespaldo/creds.json'));
const numero = JSON.parse(archivoCreds).me.id.split(':')[0];
const updatedGlobalAni = configData.replace(/(global\.animxscans\s*=\s*\[\s*\[')[0-9]+'(,\s*'Bot principal\s*-\s*ANI MX SCANS',\s*'ANI MX SCANS'\]\s*\])/, function(match) {
return `global.animxscans = [['${numero}', 'Bot principal - ANI MX SCANS', 'ANI MX SCANS']]`;
});
const updateSerbotOfc = configData.replace(/(global\.serbot\s*=\s*`https:\/\/api\.whatsapp\.com\/send\/\?phone=)[0-9]+(&text=.serbot&type=phone_number&app_absent=0`)/, function(match) {
return `global.serbot = 'https://api.whatsapp.com/send/?phone=${numero}&text=.serbot&type=phone_number&app_absent=0'`

});
fs.writeFileSync(configPath, updatedGlobalAni && updateSerbotOfc);
}

export function waitTwoMinutes() {
return new Promise(resolve => {
setTimeout(() => {
resolve();
}, 2 * 60 * 1000); 
});
}

export function wait(ms) {
return new Promise((resolve) => setTimeout(resolve, ms));
}


export function purgeSession(folderPath) {

let prekey = []
let directorio = fs.readdirSync(folderPath)
let filesFolderPreKeys = directorio.filter((file) => {
if (file.startsWith('pre-key-')) {
return true 
}
const stats = fs.statSync(path.join(folderPath, file))
const mtime = new Date(stats.mtime);
const now = new Date();
const hourAgo = new Date(now - 60 * 60 * 1000);
return (
(file.startsWith('sender-key-') ||
file.startsWith('sender-key-memory-') ||
file.startsWith('sender-key-status@broadcast') ||
file.startsWith('session')) &&
mtime <= hourAgo
)
})
if (filesFolderPreKeys.length === 0) {
console.log("Ningún archivo encontrado");
} else {
filesFolderPreKeys.forEach((files) => {
prekey.push(files);
fs.unlinkSync(path.join(folderPath, files));

})
}
}

export function purgeSessionSB() {
const listaDirectorios = fs.readdirSync(jadibts);
let SBprekey = [];

listaDirectorios.forEach((filesInDir) => {
const sessionSB = path.join(jadibts, filesInDir)
const directorio = fs.readdirSync(sessionSB);
const DSBPreKeys = directorio.filter((fileInDir) => {
if (fileInDir.startsWith('pre-key-')) {
return true;
}
const stats = fs.statSync(path.join(sessionSB, fileInDir));
const mtime = new Date(stats.mtime);
const now = new Date();
const hourAgo = new Date(now - 60 * 60 * 1000);
return (
(fileInDir.startsWith('sender-key-') ||
fileInDir.startsWith('sender-key-memory-') ||
fileInDir.startsWith('sender-key-status@broadcast') ||
fileInDir.startsWith('session')) &&
mtime <= hourAgo
);
});
if (DSBPreKeys.length === 0) {
console.log('Ningún archivo encontrado');
} else {
SBprekey = [...SBprekey, ...DSBPreKeys];
DSBPreKeys.forEach((fileInDir) => {
fs.unlinkSync(path.join(sessionSB, fileInDir));
});
}
});
}

export async function purgeOldFiles(folderPath) {
if (!fs.existsSync(folderPath)) return;
const oneHourAgo = new Date(Date.now() - (60 * 60 * 1000));
fs.readdirSync(folderPath, (err, files) => {
if (err) throw err;
files.forEach((file) => {
const filePath = path.join(dir, file);
statSync(filePath, (err, stats) => {
if (err) throw err;
const createTime = new Date(stats.birthtimeMs);
const modTime = new Date(stats.mtimeMs);
const isOld = createTime < oneHourAgo || modTime < oneHourAgo;
const isCreds = file === 'creds.json';
if (stats.isFile() && isOld && !isCreds) {
fs.unlinkSync(filePath, (err) => {
if (err) throw err;
});
} else {
}
});
});
});
}

export function tempFile(ext = '.bin') {
return path.join(temp, `jimp-${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`)
}

export function formatNumberWA(string) {
if (isNaN(string)) return string
let rawNumber = string.replace(/[^\d]/g, '')
let numero;
if (rawNumber.startsWith(52) && !rawNumber.startsWith('521')) {
numero = rawNumber.replace(/^52/, '521');
} else {
numero = rawNumber;
}
let newFormat = numero.replace(/\s+/g, '').match(/\d+/i).toString();
return newFormat
}


export let plugins = new Map()
const pluginCache = new WeakMap()
const pluginFilter = (filename) => /\.js$/.test(filename);
export async function filesInit(pluginFolder, conn) {
const readFolder = fs.readdirSync(pluginFolder)
for (let filename of readFolder.filter(pluginFilter)) {
let file = __filename(path.join(pluginFolder, filename), platform !== 'win32')
try {
const module = await import(file)
plugins.set(file, module.default || module)
} catch (e) {
conn.logger.error(`❌ Error al cargar '${filename}' en ${path.basename(pluginFolder)}:\n${e.stack}`)
plugins.delete(file)
}
}
for (const namedir of readFolder) {
const subFolder = path.join(pluginFolder, namedir)
if (fs.statSync(subFolder).isDirectory()) {
const readsubdir = fs.readdirSync(subFolder)
for (const filename of readsubdir.filter(pluginFilter) ) {
let filesub = __filename(path.join(subFolder, filename), platform !== 'win32')
try {
const module = await import(filesub)
plugins.set(filesub, module.default || module)
} catch (error) {
conn.logger.error(`❌ Error al cargar '${filename}' en ${path.basename(subFolder)} de ${path.basename(pluginFolder)}:\n${error.stack}`)
}
}
}
}
}
export let reload = async (_ev, filename, conn, pluginFolder, botName) => {
const syntaxerror = (await import('syntax-error')).default;
const { format } = await import('util');
let systemPath = path.resolve(path.join(pluginFolder, filename));
const filePath = __filename(systemPath, platform !== 'win32')

try {
if (fs.existsSync(systemPath)) {
if (pluginFilter(filename) && fs.statSync(systemPath).isFile()) {
let err = syntaxerror(fs.readFileSync(systemPath), filename, {
sourceType: 'module',
allowAwaitOutsideFunction: true,
});
if (err) {
conn.logger.error(`(${botName}) Error de sintaxis mientras se carga '${filename}'\n${format(err)}`);
return;
}
const module = await import(`${filePath}?update=${Date.now()}`);
plugins.set(filePath, module.default || module)
conn.logger.info(`(${botName}) Plugin actualizado - '${filename}'`);
} else if (fs.statSync(filePath).isDirectory()) {
conn.logger.info(`(${botName}) Carpeta añadida - '${filename}'`);
await filesInit(filePath, conn); 
}
} else {
if (plugins.has(filePath) && _ev === 'unlink') {
conn.logger.warn(`(${botName}) Plugin eliminado - '${filename}'`);
plugins.delete(filePath)
}
if (_ev === 'unlinkDir') {
const filesToDelete = Array.from(plugins.keys()).filter((key) => key.startsWith(filePath));

if (filesToDelete.length > 0) {
for (let file of filesToDelete) {
conn.logger.warn(`(${botName}) Plugin eliminado por carpeta eliminada - '${file}'`);
plugins.delete(file);
}
} else {
conn.logger.warn(`(${botName}) Carpeta eliminada - '${filename}'`);
}
}
}
} catch (e) {
conn.logger.error(`(${botName}) Error al actualizar '${filename}':\n${format(e)}`);
} finally {

}
plugins = new Map([...plugins.entries()].sort(([a], [b]) => a.localeCompare(b)))
};

/**
* Observa cambios en archivos y subdirectorios.
* @param {string} folder Directorio principal de plugins
*/
export async function watchPluginsDirs (pluginFolder, conn) {
const botName = path.basename(pluginFolder);

await filesInit(pluginFolder, conn).then(() => {
conn.logger.info(`${botName} cargados: ${plugins.size}`);
}).catch(console.error);
const watcher = chokidar.watch(pluginFolder, {
persistent: true,
ignoreInitial: true,
depth: Infinity,
awaitWriteFinish: {
stabilityThreshold: 200,
pollInterval: 100
}
})
watcher.on('add', (file) => { 
const filename = path.relative(pluginFolder, file) 
reload('add', filename, conn, pluginFolder, botName) 
}).on('change', (file) => { 
const filename = path.relative(pluginFolder, file) 
reload('change', filename, conn, pluginFolder, botName) 
}).on('unlink', (file) => { 
const filename = path.relative(pluginFolder, file) 
reload('unlink', filename, conn, pluginFolder, botName) 
}).on('addDir', (dir) => { 
const dirname = path.relative(pluginFolder, dir) 
reload('addDir', dirname, conn, pluginFolder, botName) 
}).on('unlinkDir', (dir) => { 
const dirname = path.relative(pluginFolder, dir) 
reload('unlinkDir', dirname, conn, pluginFolder, botName) 
})
}
export async function _quickTest() {
const { spawn } = await import('child_process');
let test = await Promise.all([
spawn('ffmpeg'),
spawn('ffprobe'),
spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
spawn('convert'),
spawn('magick'),
spawn('gm'),
spawn('find', ['--version'])
].map(p => {
return Promise.race([
new Promise(resolve => {
p.on('close', code => {
resolve(code !== 127)
})}),
new Promise(resolve => {
p.on('error', _ => resolve(false))
})])}))
let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
return { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find }
}

export async function findJidInAllGroups(conn, inMstore, dbGroups, lid) {
await dbGroups.read()
const allGroupsConn = Object.values(conn.chats || {}).filter((jid) => jid.id.endsWith('@g.us'))
const allGroupsIMS = Object.values(inMstore.chats || {}).filter(jid => jid.id.endsWith('@g.us'))
const rawAllGroupsJsonGFAP = Object.values(dbGroups || {})
let allGroupsJsonGFAP = [];
const allParticipating = []
for (let entry of allGroupsConn) {
allParticipating.push(entry.participants)
}
for (let entry of allGroupsIMS) {
allParticipating.push(entry.participants)
}
for (let entry of rawAllGroupsJsonGFAP) {
if (typeof entry === 'object' && !Array.isArray(entry)) {
allGroupsJsonGFAP.push(...Object.values(entry));
}
}
for (const values of allGroupsJsonGFAP) {
allParticipating.push(values.participants)
}
for (let users of allParticipating.flat()) {
if (!users || typeof users !== 'object') continue
if (users.lid === lid) return users.id;

if (users.id === lid) return users.phoneNumber;

if (users.phoneNumber === lid) return users.phoneNumber;
}

return null;
}

export function cleanDBlid(conn, groupsdb) {
for (const groupID in groupsdb || {}) {
const group = groupsdb[groupID];
const users = group.users;
for (const uid of Object.keys(users)) {
if (uid.endsWith('@lid')) {
const jid = conn.lidToJid(uid, groupID);
if (jid && typeof users[jid] !== 'object') {
users[jid] = users[uid];
delete users[uid];
console.log(`✔️ Migrado ${uid} ➜ ${jid}`);
}
}
}
}
}

export async function syncGroupsFrom(sourceChats, dbGroups) {
await dbGroups.read()
let updated = false
for (const chat of Object.values(sourceChats).filter(jid => jid.id.endsWith('@g.us'))) {
const id = chat.id;
const meta = chat.metadata;
if (!meta || !meta.participants) continue;

const old = dbGroups.data[id];

if (!old || (JSON.stringify(old) !== JSON.stringify(meta))) {
dbGroups.data[id] = meta;
updated = true
console.log(`✅ Grupo actualizado en dbGroups: ${id}`)
break;
}
}
if (updated) await dbGroups.write()
}

export function enumGetKey(a) {
return a.jid
}

export function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return hours + " Horas " + minutes + " Minutos"
}

export function ajusteTiempo(ms) {
var segundos = Math.floor(ms / 1000);
var minutos = Math.floor(segundos / 60);
var horas = Math.floor(minutos / 60);
var días = Math.floor(horas / 24);

segundos %= 60;
minutos %= 60;
horas %= 24;

var resultado = "";
if (días !== 0) {
resultado += días + " días ";
}
if (horas !== 0) {
resultado += horas + " horas ";
}
if (minutos !== 0) {
resultado += minutos + " minutos ";
}
if (segundos !== 0) {
resultado += segundos + " segundos";
}

return resultado;
}

export function parseDuration(raw) {
if (!raw) return 0;
raw = String(raw).trim().toLowerCase();

if (/^\d+:\d+$/.test(raw)) {
const [mm, ss] = raw.split(':').map(Number);
return (mm * 60 + ss) * 1000;
}

const m = raw.match(/^(\d+(?:\.\d+)?)(s|sec|seg|m|min|h|hr|d)?$/);
if (!m) return NaN;

const num = Number(m[1]);
const unit = m[2] || 'h';

const mult =
unit === 's' || unit === 'sec' || unit === 'seg' ? 1000 :
unit === 'm' || unit === 'min'? 60_000 :
unit === 'd'? 86_400_000 :
3_600_000;

return num * mult;
}


export function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

export function isNumber(number) { 
return typeof number === 'number' && !isNaN(number) || typeof number === 'string' && !isNaN(number) && number.trim() !== '';}

export function containsNumber(string) {
return /\d/.test(string)
}
export function isNumericString(string) {
return /^\d+$/.test(string)
}
export function soloNumeros(texto) {
return texto?.replace(/\D/g, '') || '';
}
export function toNumber(property, _default = 0) {
if (property) return (a, i, b) => {
return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
}
else return a => a === undefined ? _default : a
}

export function sort(property, ascending = true) {
if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

export function MilesNumber(number) {
const exp = /(\d)(?=(\d{3})+(?!\d))/g;
const rep = '$1.';
const arr = number.toString().split('.');
arr[0] = arr[0].replace(exp, rep);
return arr[1] ? arr.join('.') : arr[0];
}

export function secondString(seconds) {
seconds = Number(seconds);
const d = Math.floor(seconds / (3600 * 24));
const h = Math.floor((seconds % (3600 * 24)) / 3600);
const m = Math.floor((seconds % 3600) / 60);
const s = Math.floor(seconds % 60);
const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
return dDisplay + hDisplay + mDisplay + sDisplay;
}

export function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

export async function delay(ms) { 
return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
* Comprueba si un enlace está accesible.
*/
export async function checkLink(url) {
try {
const response = await fetch(url, { method: "HEAD" });
return response.ok;
} catch (error) {
return false;
}
}

/**

*/
export async function filterValidLinks(links) {
const results = await Promise.all(
links.map(async (url) => (await checkLink(url)) ? url : null)
);
return results.filter(Boolean);
}
export async function cleanLinks(list, file, ) {
const validLinks = await Promise.all(list.map(async (url) => (await checkLink(url)) ? url : null));
const filteredLinks = validLinks.filter(Boolean);
const newContent = `export const asupan = ${JSON.stringify(filteredLinks, null, 2)};`;
fs.writeFile("enlaces.js", newContent);
console.log("Archivo actualizado, enlaces inválidos eliminados.");
}

export async function obtenerPaginaYouTube(urlP) {
const respuesta = await fetch(urlP);
const cookies = respuesta.headers.raw()['set-cookie'];
return cookies;
}

export async function realizarSolicitudConCookies(urlP, cookies) {
const headers = {
'Cookie': cookies.join('; ')
};
const respuesta = await fetch(urlP, { headers });
if (respuesta.ok) {
} else {
throw new Error('Error al realizar la solicitud: ' + respuesta.status);
}
}

/** @param {string} folder Directorio principal de plugins*/
export async function genMath(mode) {
const { modesMath, operators } = await import("./constants.js");
let [a1, a2, b1, b2, ops, time, bonus] = modesMath[mode];
let a = randomInt(a1, a2);
let b = randomInt(b1, b2);
let op = pickRandom([...ops]);
let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))();

if (op == '/') {
[a, result] = [result, a];
}

return {
str: `${a} ${operators[op]} ${b}`,
mode,
time,
bonus,
result
};
}

export function randomInt(from, to) {
if (from > to) [from, to] = [to, from];
from = Math.floor(from);
to = Math.floor(to);
return Math.floor((to - from) * Math.random() + from);
}

export function randomString(length) {
var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
if (!length) {
length = Math.floor(Math.random() * chars.length);
}
var str = '';
for (var i = 0; i < length; i++) {
str += chars[Math.floor(Math.random() * chars.length)];
}
return str;
}

export function getRandom(ext) {
return `${Math.floor(Math.random() * 10000)}${ext}`
}

export function getCommandVariants(regex) {
if (!(regex instanceof RegExp)) return [];

const src = regex.source.replace(/^\^|\$$/g, '');

function parse(str) {
const stack = [];
let current = [''];
let i = 0;

while (i < str.length) {
if (str[i] === '(') {
const groupStart = i;
let depth = 1;
i++;
let groupContent = '';

while (i < str.length && depth > 0) {
if (str[i] === '(') depth++;
else if (str[i] === ')') depth--;
if (depth > 0) groupContent += str[i];
i++;
}

const isOptional = str[i] === '?';
if (isOptional) i++;

const parts = parseGroup(groupContent);
const options = isOptional ? [...parts, ''] : parts;

const combined = [];
for (const prefix of current) {
for (const option of options) {
combined.push(prefix + option);
}
}
current = combined;
} else {
let literal = '';
while (i < str.length && str[i] !== '(') {
literal += str[i++];
}
current = current.map(x => x + literal);
}
}

return current;
}

function parseGroup(group) {
const options = [];
let buffer = '';
let depth = 0;

for (let i = 0; i < group.length; i++) {
const char = group[i];
if (char === '|' && depth === 0) {
options.push(...parse(buffer));
buffer = '';
} else {
if (char === '(') depth++;
else if (char === ')') depth--;
buffer += char;
}
}

if (buffer) options.push(...parse(buffer));
return options;
}

return parse(src).filter(Boolean);
}

export function wrapText(text, maxCharsPerLine) {
const result = [];

for (const originalLine of text.split('\n')) {
if (originalLine.length <= maxCharsPerLine) {
result.push(originalLine);
continue;
}

const words = originalLine.split(/(\s+)/);
let currentLine = '';

for (const word of words) {
if (word.trim().length > maxCharsPerLine) {
if (currentLine.trim()) {
result.push(currentLine.trim());
currentLine = '';
}

for (let i = 0; i < word.length; i += maxCharsPerLine) {
result.push(word.slice(i, i + maxCharsPerLine));
}
continue;
}

if ((currentLine + word).length > maxCharsPerLine) {
result.push(currentLine.trim());
currentLine = word.trimStart();
} else {
currentLine += word;
}
}

if (currentLine.trim()) {
result.push(currentLine.trim());
}
}

return result.join('\n');
}

export function queryURL(queries) {
return new URLSearchParams(Object.entries(queries))
}

export const isUrl = (text) => {
return text.match(new RegExp(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'))}


function getFileHash(filePath) {
if (!fs.existsSync(filePath)) return null
const buffer = fs.readFileSync(filePath)
return crypto.createHash('sha1').update(buffer).digest('hex')
}

function shouldReplaceFile(localPath, newPath) {
const localHash = getFileHash(localPath)
const newHash = getFileHash(newPath)
return localHash === newHash
}

export function replaceFiles(temp_folder, target_folder) {
const files = fs.readdirSync(temp_folder)
for (let file of files) {
if (file === '.git') continue

const from = path.join(temp_folder, file)
const to = path.join(target_folder, file)

if (fs.existsSync(to)) {
if (!shouldReplaceFile(to, from)) {
console.log(`⚠️ Archivo modificado localmente: ${file}. Se omite la actualización.`)
continue
}
fs.rmSync(to, { recursive: true, force: true })
}

fs.cpSync(from, to, { recursive: true })
}

fs.rmSync(temp_folder, { recursive: true, force: true })
}

export function cloneRepo(repoURL, temp_folder, branch = 'main') {
return new Promise((resolve, reject) => {
exec(`git clone --depth=1 -b ${branch} ${repoURL} ${temp_folder}`, (err, stdout, stderr) => {
if (err) return reject(stderr)
resolve(stdout)
})
})
}

export async function search(query, options = {}) {
let { default: yts } = await import('yt-search');
const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
return search.videos;
}

export async function axiosJson(url, options = {}, headersToUse = 'all') {
try {
let headers;

if (headersToUse === 'all') {
headers = { ...DEFAULT_HEADERS }; // todos
} else if (Array.isArray(headersToUse)) {
headers = {};
for (const key of headersToUse) {
if (DEFAULT_HEADERS[key]) headers[key] = DEFAULT_HEADERS[key];
}
} else if (typeof headersToUse === 'object' && headersToUse !== null) {
headers = { ...headersToUse }; // headers personalizados
} else {
headers = {}; // sin headers
}

const res = await axios({
method: 'GET',
url,
headers,
...options
});

return res.data;
} catch (err) {
return err;
}
}

export async function fetchJson(url, options = {}, headersToUse = 'all') {
let headers;

if (headersToUse === 'all') {
headers = { ...DEFAULT_HEADERS };
} else if (Array.isArray(headersToUse)) {
headers = {};
for (const key of headersToUse) {
if (DEFAULT_HEADERS[key]) headers[key] = DEFAULT_HEADERS[key];
}
} else if (typeof headersToUse === 'object' && headersToUse !== null) {
headers = { ...headersToUse };
} else {
headers = {};
}

const finalOptions = { ...options, headers };

const response = await fetch(url, finalOptions);
if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
return await response.json();
}

export function tts(text, lang = 'es') {
console.log(lang, text)
return new Promise((resolve, reject) => {
try {
let tts = gtts(lang)
let filePath = join(temp, (1 * new Date) + '.wav')
tts.save(filePath, text, () => {
resolve(readFileSync(filePath))
unlinkSync(filePath)
})
} catch (e) { reject(e) }
})}

export function sanitizeSpeedtestOutput(txt) {
txt = txt.replace(
/\b(\d{1,3}\.){3}\d{1,3}\b/g,
ip => ip.replace(/\.\d+$/,' .xxx').replace(/\.\d+\.xxx$/,' .xxx.xxx')
)

txt = txt.replace(/^Testing from.*$/mi, 'Testing from [oculto]')

txt = txt.replace(/Hosted by .*?:/mi, 'Hosted by [servidor oculto]:')

return txt
}

