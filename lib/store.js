import { readFileSync, writeFileSync, existsSync } from 'fs';
import { mkdir, readFile, stat, unlink, writeFile } from 'fs/promises';
import { join, isAbsolute } from 'path'
import { Mutex } from 'async-mutex';

import { inspect } from 'util';
/**
* @type {import('@whiskeysockets/baileys')}
*/
import { initAuthCreds, BufferJSON, proto, isJidBroadcast, isJidGroup, WAMessageStubType, useMultiFileAuthState as baileysMultiFileAuthState, getHistoryMsg, isJidNewsletter, getAggregateVotesInPollMessage } from '@whiskeysockets/baileys'

/**
* @param {import('@whiskeysockets/baileys').WASocket | import('@whiskeysockets/baileys').WALegacySocket}
*/

const KEY_MAP = {
'pre-key': 'preKeys',
'session': 'sessions',
'sender-key': 'senderKeys',
'app-state-sync-key': 'appStateSyncKeys',
'app-state-sync-version': 'appStateVersions',
'sender-key-memory': 'senderKeyMemory',
};

/**
*
* @param {String} filename
* @param {import('pino').Logger} logger
* @returns
*/
function useSingleFileAuthState(filename, logger) {
let creds, keys = {}, saveCount = 0
// save the authentication state to a file
const saveState = (forceSave) => {
logger?.trace('saving auth state');
saveCount++;
if (forceSave || saveCount > 5) {
writeFileSync(
filename,
// BufferJSON replacer utility saves buffers nicely
JSON.stringify({creds, keys}, BufferJSON.replacer, 2),
);
saveCount = 0;
}
};

if (existsSync(filename)) {
const result = JSON.parse(
readFileSync(filename, {encoding: 'utf-8'}),
BufferJSON.reviver,
);
creds = result.creds;
keys = result.keys;
} else {
creds = initAuthCreds();
keys = {};
}

return {
state: {
creds,
keys: {
get: (type, ids) => {
const key = KEY_MAP[type];
return ids.reduce(
(dict, id) => {
let value = keys[key]?.[id];
if (value) {
if (type === 'app-state-sync-key') {
value = proto.AppStateSyncKeyData.create(value);
}

dict[id] = value;
}

return dict;
}, {},
);
},
set: (data) => {
for (const _key in data) {
const key = KEY_MAP[_key];
keys[key] = keys[key] || {};
Object.assign(keys[key], data[_key]);
}

saveState();
},
},
},
saveState,
};
}
function makeInMemoryStore() {
let chats = {}
let messages = {}
/** @type {{ [jid: string]: { id: string, subject?: string, name?: string, isChats?: boolean, isContact?: boolean, presence?: import('@whiskeysockets/baileys').PresenceData, metadata?: import('@whiskeysockets/baileys').GroupMetadata } & import('@whiskeysockets/baileys').Chat & import('@whiskeysockets/baileys').Contact }}} */
/** @type {{ [jid: string]: import('@whiskeysockets/baileys').proto.IWebMessageInfo[] }} */

function loadMessage(jid, id) {
// If only 1 param, first param is id
if (!id && jid) {
id = jid
return (Object.entries(messages).filter(([, msgs]) => {
return msgs.find(msg => msg?.key?.id === id)
})?.[0]?.[1]?.[0] || null)
}
jid = jid?.decodeJid?.()
if (!(jid in messages)) return null;
const message = messages[jid].find(m => m.key.id === id)
return message ? message : null
}

/**
* @param {string} jid 
* @param {(jid: string) => Promise<import('@whiskeysockets/baileys').GroupMetadata>} groupMetadata 
*/
async function fetchGroupMetadata(jid, groupMetadata) {
// @ts-ignore
jid = jid?.decodeJid?.()
if (!isJidGroup(jid)) return
if (!(jid in chats)) return chats[jid] = { id: jid }
if (!chats[jid].metadata) {
const metadata = await groupMetadata?.(jid)
if (metadata) Object.assign(chats[jid], { subject: metadata.subject, metadata })
}
return chats[jid].metadata
}

/** @param {string} id */
function fetchMessageReceipts(id) {
const msg = loadMessage(id)
if (!msg) return null
return msg.userReceipt
}

/**
* @param {string} jid 
* @param {(jid: string, type?: 'preview' | 'image', timeoutMs?: number) => Promise<string>} profilePictureUrl 
*/
async function fetchImageUrl(jid, profilePictureUrl) {
// @ts-ignore
const {media} = await import('../config.js')
jid = jid?.decodeJid?.()
if (!(jid in chats)) return chats[jid] = { id: jid }
if (!chats[jid].imgUrl) {
const url = await profilePictureUrl(jid, 'image').catch(() => join(media, 'pictures/sinFoto.png'))
if (url) chats[jid].imgUrl = url
}
return chats[jid].imgUrl
}

/** 
* @param {import('@whiskeysockets/baileys').BaileysEventEmitter} ev 
* @param {{ groupMetadata: (jid: string, minimal?: boolean) => Promise<import('@whiskeysockets/baileys').GroupMetadata> }} opts
*/
function bind(sock, opts = { groupMetadata: () => null }) {
sock.ev.on('chats.set', function store(chatsSet) {
// const { isLatest } = chatsSet
// if (isLatest) chats = {}
for (const chat of chatsSet.chats) {
// @ts-ignore
const id = chat.id?.decodeJid?.()
if (!id) continue
if (!(id in chats)) chats[id] = { ...chat, isChats: true }
if (chat.name) chats[id].name = chat.name
}
})

sock.ev.on('contacts.set', function store(contactsSet) {
for (const contact of contactsSet.contacts) {
// @ts-ignore
const id = contact.id?.decodeJid?.()
if (!id) continue
chats[id] = Object.assign(chats[id] || {}, { ...contact, isContact: true })
}
})

sock.ev.on('messages.set', function store(messagesSet) {
// const { isLatest } = messagesSet
// if (isLatest) messages = {}
for (const message of messagesSet.messages) {
// @ts-ignore
const jid = message.key.remoteJid?.decodeJid?.()
if (!jid) continue
// const id = message.key.id
if (!jid || isJidBroadcast(jid)) continue
if (!(jid in messages)) messages[jid] = []
// const msg = loadMessage(jid, id)
// if (msg) console.log(`duplicate message ${id} ('message.set')`)
messages[jid].push(message)
}
})

sock.ev.on('contacts.update', async function store(contactsUpdate) {
for (const contact of contactsUpdate) {
// @ts-ignore
const id = contact.id?.decodeJid?.()
if (!id) continue
chats[id] = Object.assign(chats[id] || {}, { id, ...contact, isContact: true })
if (typeof contact.imgUrl !== 'undefined') {
const newUrl = contact.imgUrl === null
? null
: await sock.profilePictureUrl(id).catch(() => null);
 }
}
})

sock.ev.on('chats.upsert', async function store(chatsUpsert) {
await Promise.all(chatsUpsert.map(async (chat) => {
// @ts-ignore
const id = chat.id?.decodeJid?.()
if (!id || isJidBroadcast(id)) return
const isGroup = isJidGroup(id)
chats[id] = Object.assign(chats[id] || {}, { ...chat, isChats: true })
if (isGroup && !chats[id].metadata) await fetchGroupMetadata(id, opts.groupMetadata)
}))
})

sock.ev.on('chats.update', function store(chatsUpdate) {
for (const chat of chatsUpdate) {
// @ts-ignore
const id = chat.id?.decodeJid?.()
if (!id) continue
if (id in chats && chat.unreadCount) chat.unreadCount += chats[id].unreadCount || 0
chats[id] = Object.assign(chats[id] || {}, { id, ...chat, isChats: true })
}
})

sock.ev.on('presence.update', function store(presenceUpdate) {
// @ts-ignore
const id = presenceUpdate.id?.decodeJid?.()
if (!id) return
chats[id] = Object.assign(chats[id] || {}, presenceUpdate)
if (presenceUpdate) {
}
})

sock.ev.on('messages.upsert', async function store(messagesUpsert) {
const { messages: newMessages, type } = messagesUpsert
switch (type) {
case 'append':
case 'notify':
for (const msg of newMessages) {
// @ts-ignore
const jid = msg.key.remoteJid?.decodeJid?.()
if (!jid || isJidBroadcast(jid)) continue

if (msg.messageStubType == WAMessageStubType.CIPHERTEXT) continue
if (!(jid in messages)) messages[jid] = []
// const message = loadMessage(jid, msg.key.id)
// if (message) console.log(`duplicate message ${msg.key.id} ('messages.upsert')`)
messages[jid].push(msg)

if (type === 'notify' && !(jid in chats))
if (msg.message?.conversation || msg.message?.extendedTextMessage?.text) {
const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text
if (/requestPlaceholder/i.test(text) && !messagesUpsert.requestId) {
const messageId = await sock.requestPlaceholderResend(msg.key)
console.log('requested placeholder resync, id=', messageId)
}

// go to an old chat and send this
if (/onDemandHistSync/i.test(text)) {
const messageId = await sock.fetchMessageHistory(50, msg.key, msg.messageTimestamp)
console.log('requested on-demand sync, id=', messageId)
}

if (!msg.key.fromMe && !isJidNewsletter(msg.key?.remoteJid)) {
console.log('replying to', msg.key.remoteJid)
}
}
sock.ev.emit('chats.upsert', [{
id: jid,
conversationTimestamp: msg.messageTimestamp,
unreadCount: 1,
name: msg.pushName || msg.verifiedBizName,
}])
}
break
}
})
sock.ev.on('messages.update', function store(messagesUpdate) {
for (const message of messagesUpdate) {
// @ts-ignore
const jid = message.key.remoteJid?.decodeJid?.()
if (!jid) continue
const id = message.key.id
if (!jid || isJidBroadcast(jid)) continue
if (!(jid in messages)) messages[jid] = []
const msg = loadMessage(id)
if (!msg) return // console.log(`missing message ${id} ('messages.update')`)
const msgIndex = messages[msg.key.remoteJid].findIndex(m => m.key.id === id)
messages[jid][msgIndex] = Object.assign(msg, message.update)
if(message.update.pollUpdates) {
const pollCreation = proto.IMessage = {} // get the poll creation message somehow
if(pollCreation) {
console.log('got poll update, aggregation: ', getAggregateVotesInPollMessage({message: pollCreation, pollUpdates: message.update.pollUpdates,}))
}
}
}
})

sock.ev.on('groups.update', async function store(groupsUpdate) {
await Promise.all(groupsUpdate.map(async (group) => {
// @ts-ignore
const id = group.id?.decodeJid?.()
if (!id) return
const isGroup = isJidGroup(id)
if (!isGroup) return
if (!(id in chats)) chats[id] = { id, ...group, isChats: true }
if (!chats[id].metadata) await fetchGroupMetadata(id, opts.groupMetadata)
if (chats[id]?.metadata === undefined) return
chats[id].metadata = Object.assign(chats[id]?.metadata, group)
}))
})

sock.ev.on('group-participants.update', async function store(groupParticipantsUpdate) {
// @ts-ignore
const id = groupParticipantsUpdate.id?.decodeJid?.()
if (!id || !isJidGroup(id)) return
if (!(id in chats) || !chats[id].metadata) await fetchGroupMetadata(id, opts.groupMetadata)
const metadata = chats[id].metadata
if (!metadata) return // console.log(`Try to update group ${id} but metadata not found in 'group-participants.update'`)
switch (groupParticipantsUpdate.action) {
case 'add':
metadata.participants.push(...groupParticipantsUpdate.participants.map(id => ({ id, admin: null })))
break
case 'demote':
case 'promote':
for (const participant of metadata.participants)
if (groupParticipantsUpdate.participants.includes(participant.id))
participant.admin = groupParticipantsUpdate.action === 'promote' ? 'admin' : null

break
case 'remove':
metadata.participants = metadata.participants.filter(p => !groupParticipantsUpdate.participants.includes(p.id))
break
}
})

sock.ev.on('message-receipt.update', function store(messageReceiptUpdate) {
for (const receipt of messageReceiptUpdate) {
// @ts-ignore
const jid = receipt.key.remoteJid?.decodeJid?.()
if (!jid) continue
const id = receipt.key.id
if (!(jid in messages)) messages[jid] = []
const msg = loadMessage(jid, id)
if (!msg) return // console.log(`missing message ${id} ('message-receipt.update')`)
msg.userReceipt = msg.userReceipt || []
const recp = msg.userReceipt.find(m => m.userJid === receipt.receipt.userJid)
if (recp) Object.assign(recp, receipt.receipt)
else msg.userReceipt.push(receipt.receipt)
}
})

sock.ev.on('chats.delete', function store(deleteUpdate) {
console.log('chats deleted: ', deleteUpdate);
}) 
sock.ev.on('messages.reaction', function store(reaction) {
console.log('events[messages.reaction]', reaction);
})

sock.ev.on('messaging-history.set', function store(msgHistorySet) {
const { chats, contacts, messages, isLatest, progress, syncType } = msgHistorySet
if (syncType === proto.HistorySync.HistorySyncType.ON_DEMAND) {
}
}) 
}
function toJSON() {
return { chats, messages }
}

function fromJSON(json) {
Object.assign(chats, json.chats)
for (const jid in json.messages)
messages[jid] = json.messages[jid].map(m => m && proto.WebMessageInfo.create(m)).filter(m => m && m.messageStubType != WAMessageStubType.CIPHERTEXT)

}

/** @param {string} path*/
function writeToFile(path) {
writeFileSync(path, JSON.stringify(toJSON(), (key, value) => key == 'isChats' ? undefined : value, 2))
}

/** @param {string} path*/
function readFromFile(path) {
if (existsSync(path)) {
const result = JSON.parse(readFileSync(path, { encoding: 'utf-8' }))
fromJSON(result)
}
}

return {
chats,
messages,

loadMessage,
fetchGroupMetadata,
fetchMessageReceipts,
fetchImageUrl,
bind,
writeToFile,
readFromFile
}
}
/** @type {(m: import('@whiskeysockets/baileys').proto.WebMessageInfo) => Boolean} */

function loadMessage(jid, id = null) {
let message = null;
// If only 1 param, first param is assumed to be id not jid
if (jid && !id) {
id = jid;
const filter = (m) => m.key?.id == id;
const messages = {};
const messageFind = Object.entries(messages)
.find(([, msgs]) => {
return msgs.find(filter);
});
message = messageFind?.[1]?.find(filter);
} else {
// @ts-ignore
jid = jid?.decodeJid?.();
const messages = {};
if (!(jid in messages)) return null;
message = messages[jid].find((m) => m.key.id == id);
}
return message ? message : null;
}

const fileLocks = new Map();
// Get or create a mutex for a specific file path
const getFileLock = (path) => {
let mutex = fileLocks.get(path);
if (!mutex) {
mutex = new Mutex();
fileLocks.set(path, mutex);
}
return mutex;
};
/**
 * useMultiFileAuthState with backup
 * @param {string} folder 
 * @param {string} pathBack 
 * @returns {Promise<{ state: { creds: object, keys: { get(type: string, ids: string[]): Promise<object>, set(data: object): Promise<void> } }, saveCreds: () => Promise<void> }>} 
 * stores the full authentication state in a single folder.
 * Far more efficient than singlefileauthstate
 * Now with backup option for the CREDS.JSON file
 * Again, I wouldn't endorse this for any production level use other than perhaps a bot.
 * Would recommend writing an auth state for use with a proper SQL or No-SQL DB
 */
export const useMultiFileAuthState = async (folder, pathBack) => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.log('useMultiFileAuthState: ', folder, pathBack)
const writeData = async (data, file) => {
const filePath = join(folder, fixFileName(file));
const mutex = getFileLock(filePath);
return mutex.acquire().then(async (release) => {
try {
await writeFile(filePath, JSON.stringify(data, BufferJSON.replacer));
}
finally {
release();
}
});
};
const readData = async (file) => {
try {
const filePath = join(folder, fixFileName(file));
const mutex = getFileLock(filePath);
return await mutex.acquire().then(async (release) => {
try {
const data = await readFile(filePath, { encoding: 'utf-8' });
return JSON.parse(data, BufferJSON.reviver);
}
finally {
release();
}
});
}
catch (error) {
return null;
}
};
const removeData = async (file) => {
try {
const filePath = join(folder, fixFileName(file));
const mutex = getFileLock(filePath);
return mutex.acquire().then(async (release) => {
try {
await unlink(filePath);
}
catch {
}
finally {
release();
}
});
}
catch { }
};
const folderInfo = await stat(folder).catch(() => { });
if (folderInfo) {
if (!folderInfo.isDirectory()) {
throw new Error(`found something that is not a directory at ${folder}, either delete it or specify a different location`);
}
}
else {
await mkdir(folder, { recursive: true });
}
const fixFileName = (file) => file?.replace(/\//g, '__')?.replace(/:/g, '-');
const creds = (await readData('creds.json')) || initAuthCreds();
return {
state: {
creds,
keys: {
get: async (type, ids) => {
const data = {};
await Promise.all(ids.map(async (id) => {
let value = await readData(`${type}-${id}.json`);
if (type === 'app-state-sync-key' && value) {
value = proto.Message.AppStateSyncKeyData.create(value);
}
data[id] = value;
}));
return data;
},
set: async (data) => {
const tasks = [];
for (const category in data) {
for (const id in data[category]) {
const value = data[category][id];
const file = `${category}-${id}.json`;
tasks.push(value ? writeData(value, file) : removeData(file));
}
}
await Promise.all(tasks);
}
}
},
saveCreds: async () => {
if (pathBack) {
const backupPathFile = join(pathBack, 'creds.json');
await writeFile(backupPathFile, JSON.stringify(creds, BufferJSON.replacer));
}
return writeData(creds, 'creds.json');
}
};
};
/*
*/
export default {
useSingleFileAuthState,
makeInMemoryStore,
loadMessage,
};
