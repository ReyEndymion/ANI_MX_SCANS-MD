import { resolve, dirname as _dirname } from 'path'
import _fs, { existsSync, readFileSync } from 'fs'
import path from 'path';
import { Low, JSONFile } from 'lowdb';
import lodash from 'lodash';
import { __filename, opts} from './functions.js';
import {dataBases} from '../config.js'
const { chain } = lodash;

const { promises: fs } = _fs

class Database {
/**
* Create new Database
* @param {String} filepath Path to specified json database
* @param{...any} args JSON.stringify arguments
*/
constructor(filepath, ...args) {
console.log(`Instancia de Database creada para ${filepath}`);
this.file = resolve(filepath)
this.logger = console

this._load()

this._jsonargs = args
this._state = false
this._queue = []
this._interval = setInterval(async () => {
if (!this._state && this._queue && this._queue[0]) {
this._state = true
await this[this._queue.shift()]().catch(this.logger.error)
this._state = false
}
}, 1000)

}

get data() {
return this._data
}

set data(value) {
this._data = value
this.save()
}

/**
* Queue Load
*/
load() {
this._queue.push('_load')
}

/**
* Queue Save
*/
save() {
this._queue.push('_save')
}

_load() {
try {
return this._data = existsSync(this.file) ? JSON.parse(readFileSync(this.file)) : {}
} catch (e) {
this.logger.error(e)
return this._data = {}
}
}

async _save() {
let dirname = _dirname(this.file)
if (!existsSync(dirname)) await fs.mkdir(dirname, { recursive: true })
await fs.writeFile(this.file, JSON.stringify(this._data, ...this._jsonargs))
return this.file
}
}

export default Database

//export let db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`));

//global.DATABASE = db;
export async function loadDatabase(db) {
if (db.READ) {
return new Promise((resolve) => setInterval(async function() {
if (!db.READ) {
clearInterval(this);
resolve(db.data == null ? loadDatabase() : db.data);
}
}, 1 * 1000));
}
if (db.data !== null) return;
db.READ = true;
await db.read().catch(console.error);
db.READ = null;
db.data = {
bot: {},
...(db.data || {}),
};
db.chain = chain(db.data);
};

const dbBotsFile = path.join(dataBases, 'bots_registred.json')
const createJson = new JSONFile(dbBotsFile)
export const dbRegisterBot = new Low(createJson)

export async function registrerBot(name, user, options) {

await dbRegisterBot.read()
const now = new Date()
const timestamp = now.getTime()
const dateCal = now.toLocaleDateString('en-CA')
const uptime = process.uptime(); // en segundos
const prevLastGroupFetchAll = typeof options?.lastGroupFetchAll === 'number' ? options?.lastGroupFetchAll : dbRegisterBot.data?.bots?.[name]?.lastGroupFetchAll || 0
dbRegisterBot.data ||= {bots: {}}
dbRegisterBot.data.bots[name] = {
user,
name, 
updated: now,
timestamp,
dateCal,
uptime,
lastGroupFetchAll: prevLastGroupFetchAll
}
await dbRegisterBot.write()
return dbRegisterBot
}

export async function configDinamics(update = {}) {
const {raizPath} = await import('../config.js')
const dbConfigPath = path.join(raizPath, 'configDynamics.json')
const createJson = new JSONFile(dbConfigPath)
const dbconfig = new Low(createJson)
await dbconfig.read()
dbconfig.data ||= {}
const isFirstRun = !dbconfig.data.info && !dbconfig.data.start;
dbconfig.data.info ||= {
ganisubbots: '',
ganicmd: '',
lobby: '',
community: '',
gaportes: ''
}
dbconfig.data.start ||= {
restartClean: false,
doReplies: process.argv.includes('--no-reply') ? process.argv.includes('--no-reply') : false,
qrTerminal: false,
usePairingCode: process.argv.includes('--pairing-code') ? process.argv.includes('--pairing-code') : true,
useMobile: process.argv.includes('--mobile') ? process.argv.includes('--mobile') : false,
useStore: process.argv.includes('--no-store') ? process.argv.includes('--no-store') : false,
aniJdbts: false,
buttons: true,
}
let hasUpdate = false
if (update.info) {
Object.assign(dbconfig.data.info, update.info)
hasUpdate = true
}
if (update.start) {
Object.assign(dbconfig.data.start, update.start)
hasUpdate = true
}
if (isFirstRun || hasUpdate) await dbconfig.write()

return dbconfig.data // por si quieres acceder luego a lo actualizado
}

export async function groupFetchAllParticipatingJson(conn, db, data, name, funcregistrerBot) {
await db.read()
const now = Date.now()
//const data = await dataBot(name)
const lastGroupFetchAll = data.lastGroupFetchAll || 0
if (now - lastGroupFetchAll < 3 * 24 * 60 * 60 * 1000 && lastGroupFetchAll !== 0) return;
console.log('groupFetchAllParticipatingJson', data, name)
const groups = await conn.groupFetchAllParticipating();
await funcregistrerBot(name, conn.user, {lastGroupFetchAll: now})
db.data = groups
await db.write()
}

export async function registrerSubBot(name, user, options) {
await options.dbRegisterSubBot.read()
const now = new Date()
const timestamp = now.getTime()
const dateCal = now.toLocaleDateString('en-CA')
const uptime = process.uptime(); // en segundos
const prevLastGroupFetchAll = typeof options?.lastGroupFetchAll === 'number' ? options?.lastGroupFetchAll : options?.dbRegisterSubBot.data?.bots?.[name]?.lastGroupFetchAll || 0
options.dbRegisterSubBot.data ||= {bots: {}}
options.dbRegisterSubBot.data.bots[name] = {
user,
name, 
updated: now,
timestamp,
dateCal,
uptime,
lastGroupFetchAll: prevLastGroupFetchAll
}
await options.dbRegisterSubBot.write()
return options.dbRegisterSubBot
}
