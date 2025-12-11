import fs from 'fs';
import chalk from 'chalk';
import {loadDatabase, configDinamics} from './lib/database.js'
import { __filename, opts } from './lib/functions.js';
import { userID, groupID, lid, owner, prems, mods, newsletterID, sBroadCastID } from './config.js';
/**
 * @type {import('@whiskeysockets/baileys')}
 */
const { proto } = (await import('@whiskeysockets/baileys')).default;
const isNumber = (x) => typeof x === 'number' && !isNaN(x);
const delay = (ms) =>
isNumber(ms) &&
new Promise((resolve) =>
setTimeout(function () {
clearTimeout(this);
resolve();
}, ms)
);
let timeNow = new Date(Date.now()).toString()
let time = timeNow
/**
 * Handle messages upsert
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['messages.upsert']} groupsUpdate
 */
export async function handler(chatUpdate, objs) {
const {db, inMstore, storeFile} = objs
if (db.data === null) await loadDatabase(db);
const path = await import('path');
const { format } = await import('util');
const { smsg } = await import('./lib/simple.js');
const {dataPrivsChats, dataGroupsChats, dataGroupUsers} = await import('./DataBaseINIFunc.js')
this.msgqueque = this.msgqueque || [];
if (!chatUpdate) {
return;
}
this.pushMessage(chatUpdate.messages).catch(console.error);
let m = chatUpdate.messages[chatUpdate.messages.length - 1];
if (!m) {
return;
}
const data = {}
try {
m = smsg(this, m) || m;
if (!m) {
return;
}
await inMstore.loadMessage(m.key.remoteJid, m.key.id)
m.exp = 0;
m.money = false;
m.limit = false;
const groupMetadata = (m.isGroup ? (inMstore.chats[m.chat] || this.chats[m.chat] || {}).metadata || (await this.groupMetadata(m.chat).catch((_) => null)) : {}) || {};
const participants = (m.isGroup ? groupMetadata.participants : []) || [];
const addressingMode = groupMetadata?.addressingMode 
const isLidGroup = addressingMode === 'lid'
const participantFind = participants.find((u) => isLidGroup ? (this.decodeJid(u.jid) === m.sender || this.decodeJid(u.phoneNumber) === m.sender) : this.decodeJid(u.id) === m.sender)|| {}
const isCommunityAnnounce = groupMetadata?.isCommunityAnnounce
const isAnnounce = groupMetadata?.announce 


const userFind = m.isGroup ? participantFind || {} : {}; // User Data()
const botGroup = (m.isGroup ? isLidGroup ? participants.find((u) => this.decodeJid(u.id).split('@')[0] == this.user.lid.split(':')[0]) : participants.find(p => this.decodeJid(p.id) === this.user.jid) : {}) || {}; // Your Data
const senderJid = m.isGroup ? isLidGroup ? m.sender === userFind.id ? userFind.jid : botGroup.id === m.sender ? botGroup.jid : m.sender : m.sender === userFind.id ? userFind.id : botGroup.id === m.sender ? botGroup.id : m.sender : m.fromMe ? m.sender : m.chat
const isRAdmin = m.isGroup ? userFind?.admin === 'superadmin' || false : false
const isAdmin = m.isGroup ? isRAdmin || userFind?.admin === 'admin' || false : false // Is User Admin?
const isBotAdmin = m.isGroup ? botGroup?.admin === 'admin' || botGroup?.admin === 'superadmin' || false : false; // Are you Admin or SuperAdmin?
const isROwner = m.isGroup ? isLidGroup ? [ this.decodeJid(this.user.jid), ...owner.map(([number]) => number), ].map((v) => v.replace(/[^0-9]/g, '') + userID).includes(senderJid) : [ this.decodeJid(this.user.id), ...owner.map(([number]) => number), ].map((v) => v.replace(/[^0-9]/g, '') + userID).includes(m.sender) : [ this.decodeJid(this.user.id), ...owner.map(([number]) => number), ].map((v) => v.replace(/[^0-9]/g, '') + userID).includes(senderJid);
const isOwner = isROwner || m.fromMe;
const isMods = isOwner || mods.map((v) => v.replace(/[^0-9]/g, '') + userID).includes(senderJid);
const isPrems = isROwner || prems.map((v) => v.replace(/[^0-9]/g, '') + userID).includes(senderJid);
if (senderJid === undefined) return
try {
// TODO: use loop to insert data instead of this
let bot = db.data.bot[this.user.jid]
if (typeof bot !== 'object')
db.data.bot[this.user.jid] = {};
if (bot) {
let chats = db.data.bot[this.user.jid].chats
if (typeof chats !== 'object')
db.data.bot[this.user.jid].chats = {};
if (chats) {
let chat = ''
if (m.chat.endsWith(userID)) {
let privs = db.data.bot[this.user.jid].chats.privs
if (typeof privs !== 'object')
db.data.bot[this.user.jid].chats.privs = {};
if (privs) {
chat = privs[m.chat]
if (typeof chat !== 'object')
db.data.bot[this.user.jid].chats.privs[m.chat] = {};
if (chat) {
dataPrivsChats(this, db, m.chat, senderJid)
} else {
db.data.bot[this.user.jid].chats.privs[m.chat] = {}
}

} else {
db.data.bot[this.user.jid].chats.privs = {}
}
}

if (m.chat.endsWith(groupID)) {
let groups = db.data.bot[this.user.jid].chats.groups
if (typeof groups !== 'object')
db.data.bot[this.user.jid].chats.groups = {};
if (groups) {
chat = groups[m.chat]
if (typeof chat !== 'object')
db.data.bot[this.user.jid].chats.groups[m.chat] = {};
if (chat) {
dataGroupsChats(this, db, m.chat)
let users = chat.users
if (typeof users !== 'object')
db.data.bot[this.user.jid].chats.groups[m.chat].users = {};
if (users) {
for (let p of participants) {
let jid = isLidGroup ? this.decodeJid(p.phoneNumber) : this.decodeJid(p.id)
if (!jid) continue
const user = users[jid]
if (typeof user !== 'object') 
db.data.bot[this.user.jid].chats.groups[m.chat].users[jid] = {}
if (!user) dataGroupUsers(this, db, m.chat, jid) 
else continue

}
let user = users[senderJid]
if (typeof user !== 'object')
db.data.bot[this.user.jid].chats.groups[m.chat].users[senderJid] = {};
if (user) {
dataGroupUsers(this, db, m.chat, senderJid)
} else {
db.data.bot[this.user.jid].chats.groups[m.chat].users[senderJid] = {}
}
} else {
db.data.bot[this.user.jid].chats.groups[m.chat].users = {}
}
} else {
db.data.bot[this.user.jid].chats.groups[m.chat] = {}
}

} else {
db.data.bot[this.user.jid].chats.groups = {}
}
}
} else {
db.data.bot[this.user.jid].chats = {}
}
const msgs = bot.msgs
if (msgs) {

} else {
db.data.bot[this.user.jid].msgs = {}
}
const sticker = bot.sticker
if (sticker) {

} else {
db.data.bot[this.user.jid].sticker = {}
}
const stats = bot.stats
if (stats) {

} else {
db.data.bot[this.user.jid].stats = {}
}
const settings = bot.settings
if (settings) {
if (!('self' in settings)) settings.self = false;
if (!('autoread' in settings)) settings.autoread = false;
if (!('restrict' in settings)) settings.restrict = false;
if (!('antiCall' in settings)) settings.antiCall = false;
if (!('antiPrivate' in settings)) settings.antiPrivate = false;
if (!('modejadibot' in settings)) settings.modejadibot = true;
if (!('antispam' in settings)) settings.antispam = false;
if (!('audios_bot' in settings)) settings.audios_bot = true;
if (!('modoia' in settings)) settings.modoia = false;
if (!('deleteUpdate' in settings)) settings.deleteUpdate = false;
} else {
db.data.bot[this.user.jid].settings = {
self: false,
autoread: false,
restrict: false,
antiCall: false,
antiPrivate: false,
modejadibot: true,
antispam: false,
audios_bot: true,
modoia: false,
deleteUpdate: false
}
}
} else {
db.data.bot[this.user.jid] = {}
}
db.write()
} catch (e) {
console.error(e);
}
const bot = db.data.bot[this.user.jid]
const chats = bot.chats || {}
const privs = chats.privs || {}
const groups = chats.groups || {}
const chat = m.isGroup ? groups[m.chat] || {} : privs[m.chat] || {}
const users = m.isGroup ? chat.users || {} : privs || {}
const user = m.isGroup ? users[senderJid] || {} : privs[senderJid] || {}

let {plugins, opts, prefix } = await import('./lib/functions.js');
const properPrint = {
chat,
senderJid,
isCommunityAnnounce,
isAnnounce
}
try {
if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this, properPrint);
} catch (e) {
console.log('ErrorPrint:', e.stack);
}
if (opts['nyimak']) return;
if (!m.fromMe && opts['self']) return;
if (opts['pconly'] && m.chat.endsWith('g.us')) return;
if (opts['gconly'] && !m.chat.endsWith('g.us')) return;
if (opts['swonly'] && m.chat !== 'status@broadcast') return;
if (typeof m.text !== 'string') m.text = '';

if (opts['queque'] && m.text && !(isMods || isPrems)) {
let queque = this.msgqueque,
time = 1000 * 5;
const previousID = queque[queque.length - 1];
queque.push(m.id || m.key.id);
setInterval(async function () {
if (queque.indexOf(previousID) === -1) clearInterval(this);
await delay(time);
}, time);
}

if (m.isBaileys) return;
m.exp += Math.ceil(Math.random() * 10);

let {info: configInfo} = await import('./config.js')
const {start, info: infojson} = await configDinamics()
const info = Object.assign(configInfo, infojson)

const {pluginsPath} = objs
const textAjustedTags = await this.textTagsLidToJid(m.text, m.chat)
for (let [name, plugin] of plugins.entries()) {
if (!plugin) continue;
if (plugin.disabled) continue;
const __filename = path.join(pluginsPath, path.basename(name));
const proper = {
chatUpdate,
pluginsPath,
plugins,
__filename,
info,
start,
objs,
db,
botdb: bot,
chatsdb: chats,
privsdb: privs,
groupsdb: groups,
chatdb: chat,
usersdb: users,
userdb: user,
isLidGroup,
senderJid
}
if (typeof plugin.all === 'function') {
try {
await plugin.all.call(this, m, proper);
} catch (e) {
console.error(e);
for (let [jid] of owner.filter(
([number, _, isDeveloper]) => isDeveloper && number
)) {
let data = (await this.onWhatsApp(jid))[0] || {};
if (data.exists) {
let resp = `*[REPORTE DE COMANDO CON FALLOS]*\n\n*PLUGIN:* ${__filename}\n*USUARIO:* ${senderJid}\n*COMANDO:* ${m.text}\n\n*ERROR:*\n\`\`\`${format(e)}\`\`\`\n\n*[!] REPORTELO AL CREADOR, EL TRATARA DE DARLE SOLUCIÓN, PUEDE USAR EL COMANDO #reporte*`.trim()
await this.sendWritingText(data.jid, resp, user, m )
}
}
}
}
if (!opts['restrict'])
if (plugin.tags && plugin.tags.includes('admin')) {
continue;
}
const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
let _prefix = plugin.customPrefix ? plugin.customPrefix : this.prefix ? this.prefix : prefix;
// RegExp Mode? : Array?
let match = ( _prefix instanceof RegExp ? [[_prefix.exec(m.text), _prefix]] : Array.isArray(_prefix) ? _prefix.map((p) => {
// RegExp in Array? : String?
let re = p instanceof RegExp ? p : new RegExp(str2Regex(p));
return [re.exec(m.text), re];
}) : typeof _prefix === 'string' ? [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix)), ],] : [[[], new RegExp()]]).find((p) => p[1]);
const properBefore = Object.assign(proper, {
match,
conn: this,
text: textAjustedTags,
groupMetadata,
participants,
participantFind,
userFind,
botGroup,
isROwner,
isOwner,
isRAdmin,
isAdmin,
isBotAdmin,
isPrems,
})
if (typeof plugin.before === 'function') {
if (
await plugin.before.call(this, m, properBefore)
)
continue;
}
if (typeof plugin !== 'function') continue;
let usedPrefix;
if ((usedPrefix = (match[0] || '')[0])) {
let noPrefix = textAjustedTags.replace(usedPrefix, '');
let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
args = args || [];
let _args = noPrefix.trim().split` `.slice(1);
let text = _args.join` `;
command = (command || '').toLowerCase();
const {func} = objs
let isAccept =
plugin.command instanceof RegExp // RegExp Mode?
? plugin.command.test(command)
: Array.isArray(plugin.command) // Array?
? plugin.command.some((cmd) =>
cmd instanceof RegExp // RegExp in Array?
? cmd.test(command)
: cmd === command
)
: typeof plugin.command === 'string' // String?
? plugin.command === command
: false;

if (!isAccept) {
continue;
}
m.plugin = name;
if (m.chat in chat || senderJid in users) {

if (!['owner-(ban-desban)chat.js', 'gc-link.js', 'gc-hidetag.js', 'info-creator.js'].includes(name) && chat && chat.isBanned && !isROwner) return; // Except this

if (name != 'owner-(ban-desban)chat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && chat?.isBanned && !isROwner) return;
if (user.banned) return
}

let adminMode = m.isGroup ? chat.modoadmin : false;
let hl = _prefix;
let animxscans = `${plugin.botAdmin || plugin.admin || plugin.group || plugin || noPrefix || hl || m.text.slice(0, 1) == hl || plugin.command}`;
if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && animxscans) return;
/***/
if (!isPrems && plugin.limit && user.limit < plugin.limit * 1) {
let resp = `*[! INFO!] SUS DIAMANTES SE HAN AGOTADO, PUEDE COMPRAR MÁS USANDO EL COMANDO ${usedPrefix}buy <cantidad>*`;
await this.sendWritingText(m.chat, resp, user, m )
continue; // Limit habis
}
if (plugin.level > user.level) {
let resp = `*[❗INFO ❗] SE REQUIERE EL NIVEL ${plugin.level} PARA USAR ESTE COMANDO. TU NIVEL ES ${user.level}*`;
this.sendWritingText(m.chat, resp, user, m )
continue; // If the level has not been reached
}
if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
func.fail('owner', m, this, user);
continue;
}
if (plugin.rowner && !isROwner) { // Real Owner
func.fail('rowner', m, this, user);
continue;
}
if (plugin.owner && !isOwner) { // Number Owner
func.fail('owner', m, this, user);
continue;
}
if (plugin.mods && !isMods) { // Moderator
func.fail('mods', m, this, user);
continue;
}
if (plugin.premium && !isPrems) { // Premium
func.fail('premium', m, this, user);
continue;
}
if (plugin.group && !m.isGroup) { // Group Only
func.fail('group', m, this, user);
continue;
} else if (plugin.botAdmin && !isBotAdmin) { // You Admin
func.fail('botAdmin', m, this, user);
continue;
} else if (plugin.admin && !isAdmin) { // User Admin
func.fail('admin', m, this, user);
continue;
}
if (plugin.private && m.isGroup) { // Private Chat Only
func.fail('private', m, this, user);
continue;
}
if (plugin.register == true && user.registered == false) { // Butuh daftar?
func.fail('unreg', m, this, user);
continue;
}
properPrint.isCommand = true;
let properHandler = Object.assign(properBefore, {
usedPrefix,
noPrefix,
_args,
args,
command,
text,
});
try {
await plugin.call(this, m, properHandler);
if (!isPrems) {
m.limit = m.limit || plugin.limit || false;
}
} catch (e) {
// Error occured
m.error = e;
console.error(e);
if (e) {
let text = format(e);
const {APIKeys} = await import('./api.js')
for (let key of Object.values(APIKeys)) {
text = text.replace(new RegExp(key, 'g'), '#HIDDEN#');
}
if (e.name)
for (let [jid] of owner.filter(
([number, _, isDeveloper]) => isDeveloper && number
)) {
let data = (await this.onWhatsApp(jid))[0] || {};
if (data.exists) {
let resp = `*[¡REPORTE DE COMANDO CON FALLOS!]*\n\n*PLUGIN:* ${__filename}\n*USUARIO:* ${senderJid}\n*COMANDO:* ${usedPrefix}${command} ${args.join( ' ')}\n\n\`\`\`${text}\`\`\`\n\n*[!] REPORTELO AL CREADOR, EL TRATARA DE DARLE SOLUCION, PUEDE USAR EL COMANDO #reporte*`.trim()
await this.sendWritingText(data.jid, resp, user, m )
}
}
let resp = text;
return this.sendWritingText(m.chat, resp, user, m )
}
} finally {
if (typeof plugin.after === 'function') {
try {
await plugin.after.call(this, m, properHandler);
} catch (e) {
console.error(e);
}
}
if (m.limit) { 
let resp = m.limit + ' DIAMANTE 💎 USADO';
this.sendWritingText(m.chat, resp, user, m )
}
let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17; // XP Earning per command
if (xp > 200) {
let resp = 'Ngecit -_-';
//this.sendWritingText(m.chat, resp, m )
} // Hehehe
else {
m.exp += xp;
}
}
break;
}
}
if (opts['queque'] && m.text) {
const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id);
if (quequeIndex !== -1) {
this.msgqueque.splice(quequeIndex, 1);
}
}
let stats = bot.stats;
if (m) {
if (m.isGroup && senderJid && user) {
user.exp += m.exp;
user.limit -= m.limit * 1;
} else { }

let stat;
if (m.plugin) {
let now = +new Date();
if (m.plugin in stats) {
stat = stats[m.plugin];
if (!isNumber(stat.total)) {stat.total = 1;}
if (!isNumber(stat.success)) {stat.success = m.error != null ? 0 : 1;}
if (!isNumber(stat.last)) {stat.last = now;}
if (!isNumber(stat.lastSuccess)) {stat.lastSuccess = m.error != null ? 0 : now;}
} else {
stat = stats[m.plugin] = {
total: 1,
success: m.error != null ? 0 : 1,
last: now,
lastSuccess: m.error != null ? 0 : now,
};
}
stat.total += 1;
stat.last = now;
if (m.error == null) {
stat.success += 1;
stat.lastSuccess = now;
}
}
db.write()
}

const settingsREAD = db.data.bot[this.user.jid].settings || {};
if (opts['autoread']) await this.readMessages([m.key]);
if (settingsREAD.autoread2) await this.readMessages([m.key]);
data.properPrint = properPrint
} catch (e) {
console.error(e);
} finally {
}
try { 
const MAX_STORE_SIZE_MB = 5
const stats = fs.statSync(storeFile)
const sizeMB = stats.size / (1024 * 1024)

if (sizeMB > MAX_STORE_SIZE_MB) {
console.warn(`⚠️ storeFile de ${storeFile} excede ${MAX_STORE_SIZE_MB} MB. Reseteando...`)

Object.keys(inMstore.chats).forEach(key => delete inMstore.chats[key])
Object.keys(inMstore.messages).forEach(key => delete inMstore.messages[key])

//inMstore.writeToFile(storeFile)
} else {
//inMstore.writeToFile(storeFile)
}
} catch (error) {
//inMstore.writeToFile(storeFile)
}
}


export async function groupsUpdate(groupsUpdate, objs) {
const {db, dbGroups} = objs
const {syncGroupsFrom} = await import('./lib/functions.js')
const {dataGroupsChats} = await import('./DataBaseINIFunc.js')
await syncGroupsFrom(this.chats, dbGroups)
for (const groupUpdate of await groupsUpdate) {
const {id, subject, author} = groupUpdate;
if (!id) continue;
if (!id.endsWith(groupID)) return
if (db.data == null) loadDatabase();
} 
}

export async function participantsUpdate(participantUpdate, objs) {
let {id, participants, action} = participantUpdate
const {dataGroupUsers} = await import('./DataBaseINIFunc.js')
const {syncGroupsFrom} = await import('./lib/functions.js')
const {db, dbGroups} = objs
await syncGroupsFrom(this.chats, dbGroups)
const m = {chat: id}
const grupo = id
if (!grupo.endsWith(groupID)) return
const chat = db.data.bot[this.user.jid].chats.groups || {};
if (typeof chat[grupo] !== 'object') chat[grupo] = {}
let users = chat[grupo].users
if (typeof users != 'object') db.data.bot[this.user.jid].chats.groups[grupo].users = {}
if (users) {
for (let data of participants) {
const {id, phoneNumber, admin} = data
if (!phoneNumber.endsWith(userID)) continue
const user = users[phoneNumber]
if (typeof user !== 'object') users[phoneNumber] = {}
if (action === ('add'|'promote'|'daradmin'|'darpoder'|'demote'|'quitarpoder'|'quitaradmin')) {
if (!user) {
await dataGroupUsers(this, db, grupo, phoneNumber)
}
} else if (action === 'remove') {
delete users[phoneNumber]
if (!phoneNumber.endsWith(userID)) delete users[phoneNumber]
await db.write();
console.log(`Usuario ${phoneNumber} eliminado de la base de datos.`);
}
}
} else {
db.data.bot[this.user.jid].chats.groups[grupo].users = {}
}
/** 
*/
}

export async function callUpdate(callUpdate, proper) {
const {db, func} = proper
const {owner} = await import('./config.js')
await func.call(callUpdate, {db, conn: this, owner})
}

export async function deleteUpdate(message, objs) {
const {db, func} = objs
let onDeleteUpdate = db.data.bot[this.user.jid].settings.deleteUpdate
if (onDeleteUpdate) return
try {
const {remoteJid, fromMe, id, participant } = message;
if (fromMe) return;
let msg = this.serializeM(this.loadMessage(id));
if (!msg) return;
const usuario = this.lidToJid(participant, remoteJid)
let resp = `
━━━━⬣*ANTI DELETE*⬣━━━━
*■ Nombre:* @${usuario.split`@`[0]}
*■ Enviando el mensaje..*
*■ Para desactivar esta función escriba el comando:*
*—◉ #disable antidelete*
*—◉ #enable delete*
━━━━⬣*ANTI DELETE*⬣━━━━
`.trim();
let isMedia = /imageMessage|videoMessage|stickerMessage|audioMessage|document(WithCaption)?Message/.test(msg.mtype)
if (isMedia) {


await this.writing(this.user.jid, resp)
await this.sendMessage(this.user.jid, { text: resp.trim(), mentions: this.parseMention(resp) }, {quoted: msg, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
let url
let quoted = msg.quoted ? msg.quoted : msg
if (msg.mtype === 'imageMessage') {
var mediax = await quoted.download?.()
url = msg.message.imageMessage.url
return this.sendMessage(this.user.jid, { image: mediax, caption: resp.trim(), mentions: this.parseMention(resp) }, {quoted: msg, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
}
if (msg.mtype === 'videoMessage') {
var mediax = await quoted.download?.()
url = msg.message.videoMessage.url
return this.sendMessage(this.user.jid, { video: mediax, mentions: msg.message.videoMessage.caption, mimetype: 'video/mp4', caption: msg.message.videoMessage.caption }, {userJid: this.user.jid, quoted: msg, ephemeralExpiration: 2*60*1000 } )
}
if (msg.mtype === 'stickerMessage') {
var mediax = await quoted.download?.()
url = msg.message.stickerMessage.url
return this.sendMessage(this.user.jid, {sticker: mediax,mimetype: 'image/webp', asSticker: true}, { quoted: msg, ephemeralExpiration: 2*60*1000 });
}
if (msg.mtype === 'audioMessage') {
var mediax = await quoted.download?.()
url = msg.message.audioMessage.url
return this.sendMessage(this.user.jid, { audio: mediax, seconds: msg.message.audioMessage.seconds, ptt: msg.message.audioMessage.ptt, mimetype: msg.message.audioMessage.mimetype, fileName: msg.message.audioMessage.fileName }, { quoted: msg, ephemeralExpiration: 2*60*1000 })
}
if (msg.mtype === 'documentMessage') {
var mediax = await quoted.download?.()
return this.sendMessage(this.user.jid, {document: mediax, mimetype: msg.message.documentMessage.mimetype, fileName:msg.message.documentMessage.filename, fileLength:msg.message.documentMessage.fileLength}, { quoted: msg, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
}
if (msg.mtype === 'documentWithCaptionMessage') {
var mediax = await quoted.download?.()
return this.sendMessage(this.user.jid, {document: mediax, caption: msg.message.documentWithCaptionMessage.message.documentMessage.caption, mimetype: msg.message.documentWithCaptionMessage.message.documentMessage.mimetype, fileName: msg.message.documentWithCaptionMessage.message.documentMessage.filename, fileLength:msg.message.documentWithCaptionMessage.message.documentMessage.fileLength}, { quoted: msg, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
}
} else {
if (msg.mtype === 'extendedTextMessage') {
return this.sendMessage(this.user.jid, { text: msg.message.extendedTextMessage.text.trim(), mentions: this.parseMention(msg.message.extendedTextMessage.text) }, {quoted: msg, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
if (msg.mtype === 'conversation') {
return this.sendMessage(this.user.jid, { text: msg.message.conversation.trim(), mentions: this.parseMention( msg.message.conversation) }, {quoted: msg, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
await this.sendWritingTest(this.user.jid, resp, msg);
}

let q = await this.copyNForward(this.user.jid, msg).catch((e) => console.log(e, m));
setTimeout(async () => {
await this.sendMessage(this.user.jid, { delete: { remoteJid: this.user.jid, fromMe: true, id: q.key.id } });
}, 24*60*1000);

} catch (e) {
console.error(e);
}
}
let file = __filename(import.meta.url, true);
fs.watchFile(file, async () => {
fs.unwatchFile(file);
if (global.reloadHandler) await global.reloadHandler(true);
console.log(chalk.redBright(`Se actualizo "handler.js"`));
});
