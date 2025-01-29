import fs from 'fs'
import path from 'path'
import './config.js';
import pino from 'pino'
import { createRequire } from 'module'; 
import yargs from 'yargs';
import { Low, JSONFile } from 'lowdb';
import lodash from 'lodash';
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js';
import { onBot } from './main.js';
const { chain } = lodash;
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'

import {question, clearTmp, purgeOldFiles, actualizarNumero, waitTwoMinutes, validateJSON, cleanupOnConnectionError, respaldCreds, backupCreds, credsStatus, backupCredsStatus, wait} from './lib/functions.js';

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
};
global.__dirname = function dirname(pathURL) {
return path.dirname(global.__filename(pathURL, true));
};
global.__require = function require(dir = import.meta.url) {
return createRequire(dir);
};

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '');

global.timestamp = { start: new Date };
const __dirname = global.__dirname(import.meta.url);

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp('^[' + (opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®?&.\\-.@').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`));

global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) {
return new Promise((resolve) => setInterval(async function() {
if (!global.db.READ) {
clearInterval(this);
resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
}
}, 1 * 1000));
}
if (global.db.data !== null) return;
global.db.READ = true;
await global.db.read().catch(console.error);
global.db.READ = null;
global.db.data = {
bot: {},
...(global.db.data || {}),
};
global.db.chain = chain(global.db.data);
};

const creds = 'creds.json';

const readBotPath = fs.readdirSync(global.authFolder)
if (readBotPath.includes(creds)) {
const filePathCreds = path.join(authFolder, creds)
const botDirRespald = path.join(global.authFolderRespald, sessionNameAni)
const fileCredsResp = path.join(botDirRespald, creds)
try {
const readCreds = JSON.parse(fs.readFileSync(filePathCreds));
console.log('mainCheck: ', readCreds && readCreds.me && readCreds.me.hasOwnProperty('jid'))
const userJid = readCreds && readCreds.me && readCreds.me.hasOwnProperty('jid') ? readCreds && readCreds.me && readCreds.me.jid.split('@')[0] : readCreds && readCreds.me && readCreds.me.id.split(':')[0]

if (credsStatus(authFolder, userJid) && validateJSON(filePathCreds)) {
backupCreds(authFolder, botDirRespald)
onBot(authFolder)
} else {
const readBotDirBackup = fs.readdirSync(botDirRespald)
if (readBotDirBackup.includes(creds)) {
if (backupCredsStatus(botDirRespald) && validateJSON(fileCredsResp)) {
respaldCreds(authFolder, botDirRespald)
} else {
cleanupOnConnectionError(authFolder, botDirRespald)
}
} else {
cleanupOnConnectionError(authFolder, botDirRespald)
}
}
} catch (error) {
console.log('errorInicializacion: ', error)
const readBotDirBackup = fs.readdirSync(botDirRespald)
if (readBotDirBackup.includes(creds)) {
if (backupCredsStatus(botDirRespald) && validateJSON(fileCredsResp)) {
respaldCreds(authFolder, botDirRespald)
process.send('reset')
} else {
cleanupOnConnectionError(authFolder, botDirRespald)
}
} else {
cleanupOnConnectionError(authFolder, botDirRespald)
}
}
} else {
if (!aniJdbts) {
const bienvenida = await question('Bienvenido a ANIMXSCANS\n\n¿Deseas iniciar el bot con el codigo de emparejamiento para conectarte?  Marca 1\n¿Deseas usar el QR clasico para conectarte? Marca 2\n\nRespuesta: ', (answer) => ['1', '2'].includes(answer));	
if (bienvenida === '1') {
console.log('Iniciando las preguntas para el emparejamiento...');
global.usePairingCode = true
onBot(authFolder)
} else if (bienvenida === '2') {
console.log('Iniciando el codigo QR...');
global.qrTerminal = true
onBot(authFolder)
} else {
console.log('No has seleccionado una opcion valida, reiniciando...');
//await bienvenida()
//process.exit(0)
}
} else {
onBot(authFolder)
}

}
