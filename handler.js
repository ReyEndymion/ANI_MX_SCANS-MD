import { smsg } from './lib/simple.js';
import { format } from 'util';
import { fileURLToPath } from 'url';
import path, { join } from 'path';
import { unwatchFile, watchFile } from 'fs';
import chalk from 'chalk';
import {dataPrivsChats, dataGroupsChats, dataGroupUsers} from './DataBaseINIFunc.js'
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

/**
 * Handle messages upsert
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['messages.upsert']} groupsUpdate
 */
export async function handler(chatUpdate) {
this.msgqueque = this.msgqueque || [];
if (!chatUpdate) {
return;
}
this.pushMessage(chatUpdate.messages).catch(console.error);
let m = chatUpdate.messages[chatUpdate.messages.length - 1];
if (!m) {
return;
}
if (global.db.data == null) await global.loadDatabase();
try {
m = smsg(this, m) || m;
if (!m) {
return;
}
m.exp = 0;
m.money = false;
m.limit = false;
try {
// TODO: use loop to insert data instead of this
/**
 * Nueva y original estructura de la base de datos desarrollada por https://github.com/ReyEndymion
 */
let bot = global.db.data.bot[this.user.jid];
if (typeof bot !== 'object') {
global.db.data.bot[this.user.jid] = {};
}
if (bot) {
let chats = global.db.data.bot[this.user.jid].chats;
if (typeof chats !== 'object') global.db.data.bot[this.user.jid].chats = {};
if (chats) {
let chat = ''
if (m.chat.endsWith(userID)) {
let privs = global.db.data.bot[this.user.jid].chats.privs;
if (typeof privs !== 'object') global.db.data.bot[this.user.jid].chats.privs = {};
if (privs) {
dataPrivsChats(this, m.chat, m.sender)
} else {
global.db.data.bot[this.user.jid].chats.privs = {
[m.chat]: {}
}
}
} else if (m.chat.endsWith(groupID)) {
dataGroupsChats(this, m.chat)
let groups = global.db.data.bot[this.user.jid].chats.groups;
if (typeof groups !== 'object') global.db.data.bot[this.user.jid].chats.groups = {};
if (groups) {
let users = global.db.data.bot[this.user.jid].chats.groups[m.chat].users;
if (typeof users !== 'object') global.db.data.bot[this.user.jid].chats.groups[m.chat].users = {};
if (users) {
dataGroupUsers(this, m.chat, m.sender)
} else {
global.db.data.bot[this.user.jid].chats.groups[m.chat].users = {
[m.sender]: {}
};
}
} else {
global.db.data.bot[this.user.jid].chats.groups = {
[m.chat]: {
users: {}
}
}
}
}
} else {
global.db.data.bot[this.user.jid].chats = {
privs: {},
groups: {}
}
}
let stats = global.db.data.bot[this.user.jid].stats;
if (typeof stats !== 'object')
global.db.data.bot[this.user.jid].stats = {};
if (!stats) {
global.db.data.bot[this.user.jid].stats = {}
};
let sticker = global.db.data.bot[this.user.jid].sticker;
if (typeof sticker !== 'object')
global.db.data.bot[this.user.jid].sticker = {};
if (!sticker) {
global.db.data.bot[this.user.jid].sticker = {}
};
let msgs = global.db.data.bot[this.user.jid].smgs;
if (typeof smgs !== 'object')
global.db.data.bot[this.user.jid].msgs = {};
if (!msgs) {
global.db.data.bot[this.user.jid].msgs = {};
}
let settings = global.db.data.bot[this.user.jid].settings;
if (typeof settings !== 'object')
global.db.data.bot[this.user.jid].settings = {};
if (settings) {
if (!('self' in settings)) settings.self = false;
if (!('autoread' in settings)) settings.autoread = false;
if (!('restrict' in settings)) settings.restrict = false;
if (!('antiCall' in settings)) settings.antiCall = false;
if (!('antispam' in settings)) settings.antispam = false;
if (!('stopBot' in settings)) settings.stopBot = false;
if (!('antiPrivate' in settings)) settings.antiPrivate = false;
if (!('modejadibot' in settings)) settings.modejadibot = true;
} else
global.db.data.bot[this.user.jid].settings = {
self: false,
autoread: false,
restrict: false,
antispam: false,
stopBot: false,
antiCall: false,
antiPrivate: false,
modejadibot: true,
};
} else {
global.db.data.bot[this.user.jid] = {
chats: {},
stats: {},
msgs: {},
sticker: {},
settings: {},
};
}
} catch (e) {
console.error(e);
}
if (opts['nyimak']) return;
if (!m.fromMe && opts['self']) return;
if (opts['pconly'] && m.chat.endsWith('g.us')) return;
if (opts['gconly'] && !m.chat.endsWith('g.us')) return;
if (opts['swonly'] && m.chat !== 'status@broadcast') return;
if (typeof m.text !== 'string') m.text = '';
const isROwner = [this.decodeJid(this.user.id), ...global.owner.map(([number]) => number)].map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
const isOwner = isROwner || m.fromMe;
const isMods = isOwner || global.mods.map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
const isPrems = isROwner || global.prems.map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);

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

let usedPrefix;
let _user =
global.db.data.bot[this.user.jid] && global.db.data.bot[this.user.jid].chats && global.db.data.bot[this.user.jid].chats.groups && global.db.data.bot[this.user.jid].chats.groups[m.chat] && global.db.data.bot[this.user.jid].chats.groups[m.chat].users && global.db.data.bot[this.user.jid].chats.groups[m.chat].users[m.sender] || global.db.data.bot[this.user.jid] && global.db.data.bot[this.user.jid].chats && global.db.data.bot[this.user.jid].chats.privs && global.db.data.bot[this.user.jid].chats.privs[m.chat];

const groupMetadata = (m.isGroup ? (this.chats[m.chat] || {}).metadata || (await this.groupMetadata(m.chat).catch((_) => null)) : {}) || {};
const participants = (m.isGroup ? groupMetadata.participants : []) || [];
const user = (m.isGroup ? participants.find((u) => this.decodeJid(u.id) === m.sender) : {}) || {}; // User Data
const bot = (m.isGroup ? participants.find((u) => this.decodeJid(u.id) == this.user.jid) : {}) || {}; // Your Data
const isRAdmin = user?.admin == 'superadmin' || false;
const isAdmin = isRAdmin || user?.admin == 'admin' || false; // Is User Admin?
const isBotAdmin = bot?.admin == 'admin' || false; // Are you Admin?

const announce = m.isGroup ? groupMetadata.announce : false
if ((m.chat.endsWith(newsletterID) || m.chat.endsWith(sBroadCastID)) || m.messageStubType === 2 || !isBotAdmin && announce || m.isBaileys) return;
const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins');
for (let name in global.plugins) {
let plugin = global.plugins[name];
if (!plugin) continue;
if (plugin.disabled) continue;
const __filename = join(___dirname, name);
if (typeof plugin.all === 'function') {
try {
await plugin.all.call(this, m, {
chatUpdate,
__dirname: ___dirname,
__filename,
});
} catch (e) {
// if (typeof e === 'string') continue
console.error(e);
for (let [jid] of global.owner.filter(
([number, _, isDeveloper]) => isDeveloper && number
)) {
let data = (await this.onWhatsApp(jid))[0] || {};
if (data.exists) {
let resp = `*[REPORTE DE COMANDO CON FALLOS]*\n\n*PLUGIN:* ${name}\n*USUARIO:* ${m.sender}\n*COMANDO:* ${m.text}\n\n*ERROR:*\n\`\`\`${format(e)}\`\`\`\n\n*[!] REPORTELO AL CREADOR, EL TRATARA DE DARLE SOLUCIÓN, PUEDE USAR EL COMANDO #reporte*`.trim()
await this.sendWritingText(data.jid, resp, m )
}
}
}
}
if (!opts['restrict'])
if (plugin.tags && plugin.tags.includes('admin')) {
// global.dfail('restrict', m, this)
continue;
}
const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
let _prefix = plugin.customPrefix ? plugin.customPrefix : this.prefix ? this.prefix : global.prefix;
// RegExp Mode? or // Array? or // String?
let match = (_prefix instanceof RegExp ? [[_prefix.exec(m.text), _prefix]] : Array.isArray(_prefix) ? _prefix.map((p) => {
// RegExp in Array?
let re = p instanceof RegExp ? p : new RegExp(str2Regex(p));
return [re.exec(m.text), re];
}) : typeof _prefix === 'string' ? [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix)), ]] : [[[], new RegExp()]]).find((p) => p[1]);
if (typeof plugin.before === 'function') {
if (
await plugin.before.call(this, m, {
match,
conn: this,
participants,
groupMetadata,
user,
bot,
isROwner,
isOwner,
isRAdmin,
isAdmin,
isBotAdmin,
isPrems,
chatUpdate,
__dirname: ___dirname,
__filename,
})
)
continue;
}
if (typeof plugin !== 'function') continue;
if ((usedPrefix = (match[0] || '')[0])) {
let noPrefix = m.text.replace(usedPrefix, '');
let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
args = args || [];
let _args = noPrefix.trim().split` `.slice(1);
let text = _args.join` `;
command = (command || '').toLowerCase();
let fail = plugin.fail || global.dfail; // When failed
// RegExp Mode? or // Array? or // RegExp in Array? or // String?
let isAccept = plugin.command instanceof RegExp ? plugin.command.test(command) : Array.isArray(plugin.command) ? plugin.command.some((cmd) => cmd instanceof RegExp ? cmd.test(command) : cmd === command ) : typeof plugin.command === 'string' ? plugin.command === command : false;

if (!isAccept) {
continue;
}
const chats = m.isGroup ? global.db.data.bot[this.user.jid].chats.groups : global.db.data.bot[this.user.jid].chats.privs
const users = m.isGroup ? global.db.data.bot[this.user.jid].chats.groups[m.chat].users : global.db.data.bot[this.user.jid].chats.privs
m.plugin = name;
if (m.chat in chats || m.sender in users) {
let chat = m.isGroup ? global.db.data.bot[this.user.jid].chats.groups[m.chat] : global.db.data.bot[this.user.jid].chats.privs[m.chat];
let user = m.isGroup ? global.db.data.bot[this.user.jid].chats.groups[m.chat].users[m.sender] : global.db.data.bot[this.user.jid].chats.privs[m.chat];
const settings = global.db.data.bot[this.user.jid].settings;
let creators = owner.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join` y `

if (!['owner-unbanchat.js', 'gc-link.js', 'gc-hidetag.js', 'info-creator.js'].includes(name) && chat && chat.isBanned && !isROwner) return; // Except this

if (name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && chat?.isBanned && !isROwner) return;

if (m.text && user.banned && !isROwner) {
if (typeof user.bannedMessageCount === 'undefined') {
user.bannedMessageCount = 0;
}

if (user.bannedMessageCount < 3) {
const messageNumber = user.bannedMessageCount + 1;
const messageText = `
╔═════════════════════════╗
 ❰ ⚠️ ❱ *¡USUARIO BANEADO!* ❰ ⚠️ ❱
—◉ *Aviso ${messageNumber}/3 (Total: 3)*
—◉ ${user.bannedReason ? `\n*Motivo:* ${user.bannedReason}` : '*Motivo:* Sin especificar'}
—◉ *Si consideras que esto es un error y cuentas con pruebas, puedes comunicarte con el propietario del Bot para apelar la suspensión.*
—◉ *Contacto para apelaciones:* ${creators}
╚═════════════════════════╝
 `.trim();
let resp = messageText;
await this.sendWritingText(m.chat, resp, m)
user.bannedMessageCount++;
} else if (user.bannedMessageCount === 3) {
user.bannedMessageSent = true;
} else {
return;
}
return;
}
		
if (botSpam.antispam && m.text && user && user.lastCommandTime && (Date.now() - user.lastCommandTime) < 5000 && !isROwner) {
if (user.commandCount === 2) {
const remainingTime = Math.ceil((user.lastCommandTime + 5000 - Date.now()) / 1000);
if (remainingTime > 0) {
const messageText = `*[ ⚠ ] Espera ${remainingTime} segundos antes de usar otro comando*`;
m.reply(messageText);
return;
} else {
user.commandCount = 0;
}
} else {
user.commandCount += 1;
}
} else {
user.lastCommandTime = Date.now();
user.commandCount = 1;
}
}
let hl = _prefix;
let adminMode = m.isGroup ? global.db.data.bot[this.user.jid].chats.groups[m.chat].modoadmin : false;
let animxscans = `${plugin.botAdmin || plugin.admin || plugin.group || plugin || noPrefix || hl || m.text.slice(0, 1) == hl || plugin.command}`;
if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && animxscans) return;

if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
fail('owner', m, this);
continue;
}
if (plugin.rowner && !isROwner) { // Real Owner
fail('rowner', m, this);
continue;
}
if (plugin.owner && !isOwner) { // Number Owner
fail('owner', m, this);
continue;
}
if (plugin.mods && !isMods) { // Moderator
fail('mods', m, this);
continue;
}
if (plugin.premium && !isPrems) { // Premium
fail('premium', m, this);
continue;
}
if (plugin.group && !m.isGroup) { // Group Only
fail('group', m, this);
continue;
} else if (plugin.botAdmin && !isBotAdmin) { // You Admin
fail('botAdmin', m, this);
continue;
} else if (plugin.admin && !isAdmin) { // User Admin
fail('admin', m, this);
continue;
}
if (plugin.private && m.isGroup) { // Private Chat Only
fail('private', m, this);
continue;
}
if (plugin.register == true && _user.registered == false) { // Butuh daftar?
fail('unreg', m, this);
continue;
}
m.isCommand = true;
let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17; // XP Earning per command
if (xp > 200) {
let resp = 'Ngecit -_-';
await this.sendWritingText(m.chat, resp, m)
} // Hehehe
else {
m.exp += xp;
}
if (!isPrems && plugin.limit && (m.isGroup ? global.db.data.bot[this.user.jid].chats.groups[m.chat].users[m.sender] : global.db.data.bot[this.user.jid].chats.privs[m.sender]).limit < plugin.limit * 1) {
let resp = `*[! INFO!] SUS DIAMANTES SE HAN AGOTADO, PUEDE COMPRAR MÁS USANDO EL COMANDO ${usedPrefix}buy <cantidad>*`;
await this.sendWritingText(m.chat, resp, m)
continue; // Limit habis
}
if (plugin.level > _user.level) {
let resp = `*[❗INFO ❗] SE REQUIERE EL NIVEL ${plugin.level} PARA USAR ESTE COMANDO. TU NIVEL ES ${_user.level}*`;
await this.sendWritingText(m.chat, resp, m)
continue; // If the level has not been reached
}
let extra = {
match,
usedPrefix,
noPrefix,
_args,
args,
command,
text,
conn: this,
participants,
groupMetadata,
user,
bot,
isROwner,
isOwner,
isRAdmin,
isAdmin,
isBotAdmin,
isPrems,
chatUpdate,
__dirname: ___dirname,
__filename,
};
try {
await plugin.call(this, m, extra);
if (!isPrems) {
m.limit = m.limit || plugin.limit || false;
}
} catch (e) {
// Error occured
m.error = e;
console.error(e);
if (e) {
let text = format(e);
for (let key of Object.values(global.APIKeys)) {
text = text.replace(new RegExp(key, 'g'), '#HIDDEN#');
}
if (e.name)
for (let [jid] of global.owner.filter(
([number, _, isDeveloper]) => isDeveloper && number
)) {
let data = (await this.onWhatsApp(jid))[0] || {};
if (data.exists){
let resp = `*[¡REPORTE DE COMANDO CON FALLOS!]*\n\n*PLUGIN:* ${m.plugin}\n*USUARIO:* ${m.sender}\n*COMANDO:* ${usedPrefix}${command} ${args.join( ' ')}\n\n\`\`\`${text}\`\`\`\n\n*[!] REPORTELO AL CREADOR, EL TRATARA DE DARLE SOLUCION, PUEDE USAR EL COMANDO #reporte*`.trim()
await this.sendWritingText(data.jid, resp, m)
 }
}
let resp = text;
await this.sendWritingText(m.chat, resp, m)
}
} finally {
// m.reply(util.format(_user))
if (typeof plugin.after === 'function') {
try {
await plugin.after.call(this, m, extra);
} catch (e) {
console.error(e);
}
}
if (m.limit) { 
let resp = +m.limit + ' DIAMANTE 💎 USADO';
await this.sendWritingText(m.chat, resp, m)
}
}
break;
}
}
} catch (e) {
console.error(e);
} finally {
if (opts['queque'] && m.text) {
const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id);
if (quequeIndex !== -1) {
this.msgqueque.splice(quequeIndex, 1);
}
}
let stats = global.db.data.bot[this.user.jid].stats;
let user = m.isGroup ? global.db.data.bot[this.user.jid].chats.groups[m.chat].users[m.sender] : global.db.data.bot[this.user.jid].chats.privs[m.sender];

if (m) {
if (m.sender && user) {
user.exp += m.exp;
user.limit -= m.limit * 1;
}

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
}

try {
if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this);
} catch (e) {
console.log('Error Lib Print', e.stack);
}
const settingsREAD = global.db.data.bot[this.user.jid].settings || {};
if (opts['autoread']) await this.readMessages([m.key]);
if (settingsREAD.autoread2) await this.readMessages([m.key]);

}

/**
 * Handle groups update
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate
 */
export async function groupsUpdate(groupsUpdate) {
for (const groupUpdate of groupsUpdate) {
const action = Object.keys(groupUpdate)[1]
if (action == 'subject') {
const { id, subject, subjectOwner, subjectTime, size, creation, owner, desc, descId, linkedParent, restrict, announce, isCommunity, isCommunityAnnounce, joinApprovalMode, memberAddMode, participants, ephemeralDuration} = groupUpdate
const group = id
let groups = global.db.data.bot[this.user.jid].chats.groups;
if (typeof groups !== 'object') global.db.data.bot[this.user.jid].chats.groups = {};
if (groups) {
dataGroupsChats(this, group)
for (const participant of participants) {
const user = participant.id
if (user.endsWith(lid)) continue
if (global.db.data.bot[this.user.jid].chats.groups[group]?.users?.[user]) continue
console.log('handlerGroupsUpdate: ', user)
let users = global.db.data.bot[this.user.jid].chats.groups[group].users;
if (typeof users !== 'object') global.db.data.bot[this.user.jid].chats.groups[group].users = {};
if (users) {
dataGroupUsers(this, group, user)
} else {
global.db.data.bot[this.user.jid].chats.groups[group].users[user] = {};
}

}
} else {
global.db.data.bot[this.user.jid].chats.groups[group] = {}
}
global.db.write()
} else {
const {id, author} = groupUpdate
const update = groupsUpdate[0][action]
console.log(`${action}: ${update} en grupo ${id} realizado por ${author}`)

}
}
}

/**
 * Handle groups participants update
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate
 * Tipo de dato para el stub de mensajes de WhatsApp
 * @typedef {import('@whiskeysockets/baileys').WAMessageStubType} WAMessageStubType
 */
export async function participantsUpdate(participantUpdate) {
const {id, author, participants, action} = participantUpdate
const group = id
const user = participants[0]
if (!group) return
let groups = global.db.data.bot[this.user.jid].chats.groups;
if (typeof groups !== 'object') groups = {};
let users = groups[group].users;
if (typeof users !== 'object') groups[group].users = {};
if (action === ('add')) {
if (groups) {
if (users) {
if (user.endsWith(lid)) return
if (groups[group].users[user]) return
dataGroupUsers(this, group, user)
} else {
groups[group].users = {}
}
} else {
global.db.data.bot[this.user.jid].chats.groups = {}
}
} else if (action === 'remove') {
console.log('participantsUpdate: ', user)
delete users[user]
if (!user.endsWith(userID)) delete global.db.data.bot[this.user.jid].chats.groups[group]?.users?.[user]
}
global.db.write()
}


export async function callUpdate(callUpdate) {
var bot = global.db.data.bot[this.user.jid] || {}
let ow = global.owner.filter((entry) => typeof entry[0] === 'string' && !isNaN(entry[0])).map((entry) => ({ jid: entry[0] })).slice(0).map(({ jid }) => `@${jid.split`@`[0]}`).join` y `;
let isAnticall = bot.settings.antiCall;
if (!isAnticall) return;
for (let nk of callUpdate) {
if (nk.isGroup == false) {
if (nk.status == 'offer') {
await this.rejectCall(nk.chatId, nk.from)
let callmsg = `Hola *@${nk.from.split('@')[0]}*, las ${nk.isVideo ? 'videollamadas' : 'llamadas'} no están permitidas, serás bloqueado.\n-\nSi accidentalmente llamaste póngase en contacto con mi creador ${ow} para que te desbloquee!`;

let q = await this.sendWritingText(nk.from, callmsg);
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃;;;\nFN:ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃\nORG:ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃\nTITLE:\nitem1.TEL;waid=5215517489568:+521 5517489568\nitem1.X-ABLabel:ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃\nX-WA-BIZ-DESCRIPTION:[❗] ᴄᴏɴᴛᴀᴄᴛᴀ ᴀ ᴇsᴛᴇ ɴᴜᴍ ᴘᴀʀᴀ ᴄᴏsᴀs ɪᴍᴘᴏʀᴛᴀɴᴛᴇs.\nX-WA-BIZ-NAME:ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃\nEND:VCARD`;
await this.sendMessage(nk.from, { contacts: {displayName: 'ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃', contacts: [{ vcard }] } }, {quoted: q, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100});
await this.updateBlockStatus(nk.from, 'block');
}
}
}
}
//let data = global.owner.filter(([id, isCreator]) => id && isCreator)
//await conn.sendContact(nk.from, data.map(([id, name]) => [id, name]), false, { quoted: callmsg })

export async function deleteUpdate(message) {
try {
const { fromMe, id, participant } = message;
let m = this.serializeM(this.loadMessage(id));
if (!m || fromMe) return;
let chat = m.isGroup ? global.db.data.bot[this.user.jid].chats.groups[m.chat] || {} : global.db.data.bot[this.user.jid].chats.privs[m.chat];
if (chat.delete) return;
let resp = `
━━━━⬣*ANTI DELETE*⬣━━━━
*■ Nombre:* @${participant.split`@`[0]}
*■ Enviando el mensaje..*
*■ Para desactivar esta función escriba el comando:*
*—◉ #disable antidelete*
*—◉ #enable delete*
━━━━⬣*ANTI DELETE*⬣━━━━
`.trim();
await this.sendWritingText(m.chat, resp, m )
this.copyNForward(m.chat, m).catch((e) => console.log(e, m));
} catch (e) {
console.error(e);
}
}

global.dfail = (type, m, conn) => {
let msg = {
rowner:
'*[ ⚠️ *ALERTA* ⚠️ ] ESTE COMANDO SOLO PUEDE SER UTILIZADO POR EL/LA PROPIETARIO/A (OWNER) DEL BOT*',
owner:
'*[ ⚠️ *ALERTA* ⚠️ ] ESTE COMANDO SOLO PUEDE SER UTILIZADO POR EL/LA PROPIETARIO/A (OWNER) DEL BOT*',
mods: '*[ ⚠️ *ALERTA* ⚠️ ] ESTE COMANDO SOLO PUEDE SER UTILIZADO POR MODERADORES Y EL/LA PROPIETARIO/A (OWNER) DEL BOT*',
premium:
'*[ ⚠️ *ALERTA* ⚠️ ] ESTE COMANDO SOLO PUEDE SER UTILIZADO POR USUARIOS PREMIUM Y EL/LA PROPIETARIO/A OWNER DEL BOT*',
group:
'*[ ⚠️ *ALERTA* ⚠️ ] ESTE COMANDO SOLO PUEDE SER UTILIZADO EN GRUPOS*',
private:
'*[ ⚠️ ALERTA ⚠️ ] ESTE COMANDO SOLO PUEDE SER UTILIZADO EN CHAT PRIVADO DEL BOT*',
admin:
'*[ ⚠️ ALERTA ⚠️ ] ESTE COMANDO SOLO PUEDE SER UTILIZADO POR ADMINS DEL GRUPO*',
botAdmin:
'*[ ⚠️ ALERTA ⚠️ ] PARA PODER USAR ESTE COMANDO ES NECESARIO QUE EL BOT SEA ADMIN, ASCENDER A ADMIN ESTE NUMERO*',
unreg:
'*[ 🛑 HEY!! ALTO, NO ESTAS REGISTRADO 🛑 ]*\n\n*—◉ PARA USAR ESTE COMANDO DEBES REGISTRARTE, USA EL COMANDO*\n*➣ #verificar nombre.edad*',
restrict:
'*[ ⚠️ ALERTA ⚠️ ] ESTE COMANDO ESTA RESTRINGIDO/DESACTIVADO POR DESICION DEL PROPIETARIO/A (OWNER) DEL BOT*',
}[type];
if (msg) {
return conn.sendWritingText(m.chat, msg, m);
}
};

let file = global.__filename(import.meta.url, true);
watchFile(file, async () => {
unwatchFile(file);
console.log(chalk.redBright(`Se actualizo "handler.js"`));
if (global.reloadHandler) console.log(await global.reloadHandler());
});
