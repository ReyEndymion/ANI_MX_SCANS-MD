import fs from 'fs'
import path from 'path'
import {question, clearTmp, purgeOldFiles, actualizarNumero, waitTwoMinutes, validateJSON, cleanupOnConnectionError, respaldCreds, backupCreds, credsStatus, backupCredsStatus, wait, formatNumberWA} from './lib/functions.js';
import { creds } from './lib/constants.js';
import { temp, dataBases, authFolderRespald } from './config.js';
import { onBot, authFolder, sessionNameAni, jadibts } from './main.js';

if (!fs.existsSync(authFolder)) {
fs.mkdirSync(authFolder);
console.log('Directorio ANIMXSCANS creado exitosamente');
}
if (!fs.existsSync(jadibts)) {
fs.mkdirSync(jadibts);
console.log('Directorio jadibts creado exitosamente');
}
//console.log('startCheck: ', onBot)

const readBotPath = fs.readdirSync(authFolder)
if (readBotPath.includes(creds)) {
const filePathCreds = path.join(authFolder, creds)
const botDirRespald = path.join(authFolderRespald, sessionNameAni)
const fileCredsResp = path.join(botDirRespald, creds)
try {
const readCreds = JSON.parse(fs.readFileSync(filePathCreds));
//readCreds && readCreds.me && readCreds.me.hasOwnProperty('jid')
const userJid = readCreds && readCreds.me && readCreds.me.hasOwnProperty('jid') ? readCreds && readCreds.me && readCreds.me.jid.split('@')[0] : readCreds && readCreds.me && readCreds.me.id.split(':')[0]

if (credsStatus(authFolder, userJid) && validateJSON(filePathCreds)) {
backupCreds(authFolder, botDirRespald)
onBot(authFolder)
} else {
if (fs.existsSync(botDirRespald)) {
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
} else {
fs.rmSync(authFolder, { recursive: true, force: true })
process.send('reset')
}
}
} catch (error) {
console.log('errorInicializacion: ', error)
if (fs.existsSync(botDirRespald)) {
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
} else {
fs.rmSync(authFolder, { recursive: true, force: true })
process.send('reset')
}

}
} else {
let { configDinamics } = await import('./lib/database.js')

const start = (await configDinamics()).start
if (!start.aniJdbts) {
const bienvenida = await question('Bienvenido a ANIMXSCANS\n\n¿Deseas iniciar el bot con el codigo de emparejamiento para conectarte? Marca 1\n¿Deseas usar el QR clasico para conectarte? Marca 2\n\nRespuesta: ', (answer) => ['1', '2'].includes(answer));	
if (bienvenida === '1') {
console.log('Iniciando las preguntas para el emparejamiento...');
start.usePairingCode = true
onBot(authFolder)
} else if (bienvenida === '2') {
console.log('Iniciando el codigo QR...');
start.qrTerminal = true
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
