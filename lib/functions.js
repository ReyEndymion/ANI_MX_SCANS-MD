import { WAMessageStubType } from '@whiskeysockets/baileys';
import PhoneNumber from 'awesome-phonenumber';
import chalk from 'chalk';
import fs, { watchFile } from 'fs';
import path from 'path';

const creds = 'creds.json';

export function validateJSON(filePath) {
let statsCreds = fs.statSync(filePath);
if (statsCreds && statsCreds.size !== 0) {
try {
const data = fs.readFileSync(filePath, 'utf8');
let readCreds = JSON.parse(data);
if (readCreds && readCreds.me && readCreds.me.jid && readCreds.hasOwnProperty('platform')) {
console.log(`El archivo JSON de la carpeta ${filePath} es válido.`);
return true
}
} catch (error) {
console.error('Error de sintaxis en JSON:', error.message);
return false
}
} else {
console.log(`El archivo JSON de la carpeta ${filePath} es inválido.`);
}
}

export async function backupCreds(pathSession, pathBackUp) {
if (!fs.existsSync(pathBackUp)) {
fs.mkdirSync(pathBackUp)
console.log(`Directorio del backup ${pathBackUp} creado exitosamente'`);
}
const credsFilePath = path.join(pathSession, creds)
const backupFilePath = path.join(pathBackUp, creds)
fs.copyFileSync(credsFilePath, backupFilePath);
console.log(`Creado el archivo de respaldo: ${backupFilePath}`);

}
 
export async function respaldCreds(pathSession, pathBackUp) {
if (!fs.existsSync(pathSession)) {
fs.mkdirSync(pathSession);
console.log(`Directorio de la sesion ${pathSession} creado exitosamente'`);
}
const fileCredsResp = path.join(pathBackUp, creds)
const fileCreds = path.join(pathSession, creds)
fs.copyFileSync(fileCredsResp, fileCreds, 2);
console.log(`Restaurado el archivo desde el respaldo: ${fileCredsResp} -> ${fileCreds}`);
process.send('reset')
}

export async function credsStatus(pathSession, userJid) {
try {
const filesSession = fs.readdirSync(pathSession);
if (filesSession.includes(creds)) {
const credsFilePath = path.join(pathSession, creds)
const statsCreds = fs.statSync(credsFilePath);
if (statsCreds && statsCreds.size !== 0) {
try {
const readCreds = JSON.parse(fs.readFileSync(credsFilePath));
if (readCreds && readCreds.me && readCreds.me.jid && readCreds.hasOwnProperty('platform')) {
return `Archivo creds correcto para ${userJid}. Se realizó un backup.`, true;
} else {
return `El Archivo de sesion de ${userJid} no contiene las propiedades correctas, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion`, false;
}
} catch (error) {
return `El Archivo de sesion de ${userJid} no se puede leer en este momento o es ilegible, estos son los detalles actualmente:\n\n${error.stack}`, false;
}
} else {
return `El Archivo de sesion de ${userJid} es incorrecto y tiene 0 bytes, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion`, false;
}
} else {
return `El Archivo de sesion de ${userJid} no existe en la ubicacion esparada, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion`, false;
}
} catch (error) {
return console.log('credsStatusError: ', error)
}
}

export function backupCredsStatus(pathBackUp) {
if (fs.existsSync(pathBackUp)) {
const readDirRespald = fs.readdirSync(pathBackUp);
if (readDirRespald.includes(creds)) {
const backupFilePath = path.join(pathBackUp, creds)
const statBackUpCreds = fs.statSync(backupFilePath);
if (statBackUpCreds.size !== 0) {
try {
const readCredsResp = JSON.parse(fs.readFileSync(backupFilePath));
if (readCredsResp && readCredsResp.me && readCredsResp.me.jid && readCredsResp.hasOwnProperty('platform')) {
return 'Archivo de respaldo es correcto, puede respaldar la sesion si gusta', true
} else {
return 'Archivo de respaldo no contiene las propiedades correctas, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion', false;
}
} catch (error) {
return `El Archivo de respaldo no se puede leer en este momento o es ilegible, estos son los detalles actualmente:\n\n${error.stack}`, false;
}
} else {
return 'Archivo de respaldo es incorrecto y tiene 0 bytes, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion', false;
}
} else {
return 'Archivo de respaldo no existe en la ubicacion esparada, debe ejecutar un respaldo inmediatamente desde la sesion principal o borrar la sesion', false;
}
} else {
return 'La carpeta Backup de credenciales no existe, debe realizar un respaldo desde el archivo original', false;
}
}

export function cleanupOnConnectionError(pathSession, pathBackUp) {

fs.readdirSync(pathSession).forEach(file => {
const credsFilePath = path.join(pathSession, file);
try {
fs.rmSync(pathSession, { recursive: true, force: true });
console.log(`Archivo eliminado: ${credsFilePath}`);
} catch (error) {
console.log(`No se pudo eliminar el archivo: ${credsFilePath}`);
}
});
const backupFilePath = path.join(pathBackUp, creds);
try {
fs.rmSync(pathBackUp, { recursive: true, force: true });
console.log(`Archivo de copia de seguridad eliminado: ${backupFilePath}`);
} catch (error) {
console.log(`No se pudo eliminar el archivo de copia de seguridad o no existe: ${backupFilePath}`);
}
process.send('reset')
}

export async function limpCarpetas() {
//const directories = [SESSION_DIR, SESSION_BACKUP_DIR]
const directories = [authFolderRespald, dataBases, jadibts];
try {
 directories.forEach((dir) => {
const files = fs.readdirSync(dir, { recursive: true });
 //console.log('carpJdbts: ', files)
files.forEach((file) => {
const filePath = path.join(dir, file);
const stats = fs.statSync(filePath);
const tiempoTranscurrido = Date.now() - stats.mtimeMs;

if ( dir === (authFolderRespald && jadibts) ) {
if (stats.isDirectory()) {
const contenidoCarpeta = fs.readdirSync(filePath);

// Si la carpeta está vacía, eliminarla
if (contenidoCarpeta.length === 0) {
//console.log(resp = `La carpeta ${filePath} está vacía. Eliminando...`);
fs.rmSync(filePath, { recursive: true, force: true });
console.log( `Carpeta ${filePath} eliminada.`);
if (filePath.startsWith(authFolderRespald)) {
//process.send('reset')
}
} else {

// Si ha pasado más de 15 días desde la última modificación
if (tiempoTranscurrido > 15 * 24 * 60 * 60 * 1000) {
//console.log(resp = `La carpeta ${filePath} ha pasado más de 15 días de antiguedad. Eliminando...`);
fs.rmSync(filePath, { recursive: true, force: true });
console.log(`Carpeta ${filePath} eliminada.`);
}
}
}
} else if (dir === dataBases ) {
if (stats.isDirectory()) {

// Si ha pasado más de 15 días desde la última modificación
if (tiempoTranscurrido > 15 * 24 * 60 * 60 * 1000) {
//console.log(resp = `La carpeta ${filePath} ha pasado más de 15 días de antiguedad. Eliminando...`);
fs.rmSync(filePath, { recursive: true, force: true });
console.log(`Carpeta ${filePath} eliminada.`);
}
}
}
});
});
// console.log( `Proceso de limpieza completo.\n\nLos directorios de la carpeta ${directories} mas antiguos de 15 dias o vacios fueron eliminados correctamente\n\n${resp}`);
} catch (error) {
console.error(`Error al eliminar directorios:\n\n${error}`);
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
writeFileSync(configPath, updatedGlobalAni && updateSerbotOfc);
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

export function clearTmp() {
const tmp = [temp]
const filename = []
tmp.forEach(dirname => fs.readdirSync(dirname).forEach(file => filename.push(path.join(dirname, file))))
return filename.map(file => {
const stats = fs.statSync(file)
if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return fs.unlinkSync(file) // 3 minutes
return false })
}

export function purgeSession() {

let prekey = []
let directorio = fs.readdirSync(authFolder)
let filesFolderPreKeys = directorio.filter((file) => {
if (file.startsWith('pre-key-')) {
return true 
}
const stats = fs.statSync(path.join(authFolder, file))
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
fs.unlinkSync(path.join(authFolder, files));

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
fs.unlinkSync(join(sessionSB, fileInDir));
});
}
});
}

export function purgeOldFiles(folderBot) {
//const directories = [authFolder, jadibts];
const oneHourAgo = new Date(Date.now() - (60 * 60 * 1000));
 
fs.readdirSync(folderBot, (err, files) => {
if (err) throw err;
files.forEach((file) => {
const filePath = path.join(folderBot, file);
fs.statSync(filePath, (err, stats) => {
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
//directories.forEach((dir) => {});
}

let file = global.__filename(import.meta.url)
watchFile(file, async () => {
fs.unwatchFile(file);
console.log(chalk.redBright("Update 'lib/functions.js'"))
if (global.reloadHandler) console.log(await global.reloadHandler());
})