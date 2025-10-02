import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path'

/**
* @type {import('@whiskeysockets/baileys')}
*/
import { initAuthCreds, BufferJSON, proto, isJidBroadcast, isJidGroup, WAMessageStubType, useMultiFileAuthState as baileysMultiFileAuthState } from '@whiskeysockets/baileys'

/**
* @param {import('@whiskeysockets/baileys').WASocket | import('@whiskeysockets/baileys').WALegacySocket}
*/
function bind(conn) {
if (!conn.chats) conn.chats = {};
/**
*
* @param {import('@whiskeysockets/baileys').Contact[]|{contacts:import('@whiskeysockets/baileys').Contact[]}} contacts
* @returns
*/
function updateNameToDb(contacts) {
if (!contacts) return;
try {
contacts = contacts.contacts || contacts;
for (const contact of contacts) {
const id = conn.decodeJid(contact.id);
if (!id || id === 'status@broadcast') continue;
let chats = conn.chats[id];
if (!chats) chats = conn.chats[id] = {...contact, id};
conn.chats[id] = {
...chats,
...({
...contact, id, ...(id.endsWith('@g.us') ?
{subject: contact.subject || contact.name || chats.subject || ''} :
{name: contact.notify || contact.name || chats.name || chats.notify || ''}),
} || {}),
};
}
} catch (e) {
console.error(e);
}
}
conn.ev.on('contacts.upsert', updateNameToDb);
conn.ev.on('groups.update', updateNameToDb);
conn.ev.on('contacts.set', updateNameToDb);
conn.ev.on('chats.set', async ({chats}) => {
try {
for (let {id, name, readOnly} of chats) {
id = conn.decodeJid(id);
if (!id || id === 'status@broadcast') continue;
const isGroup = id.endsWith('@g.us');
let chats = conn.chats[id];
if (!chats) chats = conn.chats[id] = {id};
chats.isChats = !readOnly;
if (name) chats[isGroup ? 'subject' : 'name'] = name;
if (isGroup) {
const metadata = await conn.groupMetadata(id).catch((_) => null);
if (name || metadata?.subject) chats.subject = name || metadata.subject;
if (!metadata) continue;
chats.metadata = metadata;
}
}
} catch (e) {
console.error(e);
}
});
conn.ev.on('group-participants.update', async function updateParticipantsToDb({id, participants, action}) {
if (!id) return;
id = conn.decodeJid(id);
if (id === 'status@broadcast') return;
if (!(id in conn.chats)) conn.chats[id] = {id};
const chats = conn.chats[id];
chats.isChats = true;
const groupMetadata = await conn.groupMetadata(id).catch((_) => null);
if (!groupMetadata) return;
chats.subject = groupMetadata.subject;
chats.metadata = groupMetadata;
});

conn.ev.on('groups.update', async function groupUpdatePushToDb(groupsUpdates) {
try {
for (const update of groupsUpdates) {
const id = conn.decodeJid(update.id);
if (!id || id === 'status@broadcast') continue;
const isGroup = id.endsWith('@g.us');
if (!isGroup) continue;
let chats = conn.chats[id];
if (!chats) chats = conn.chats[id] = {id};
chats.isChats = true;
const metadata = await conn.groupMetadata(id).catch((_) => null);
if (metadata) chats.metadata = metadata;
if (update.subject || metadata?.subject) chats.subject = update.subject || metadata.subject;
}
} catch (e) {
console.error(e);
}
});
conn.ev.on('chats.upsert', function chatsUpsertPushToDb(chatsUpsert) {
try {
const {id, name} = chatsUpsert;
if (!id || id === 'status@broadcast') return;
conn.chats[id] = {...(conn.chats[id] || {}), ...chatsUpsert, isChats: true};
const isGroup = id.endsWith('@g.us');
if (isGroup) conn.insertAllGroup().catch((_) => null);
} catch (e) {
console.error(e);
}
});
conn.ev.on('presence.update', async function presenceUpdatePushToDb({id, presences}) {
try {
const sender = Object.keys(presences)[0] || id;
const _sender = conn.decodeJid(sender);
const presence = presences[sender]['lastKnownPresence'] || 'composing';
let chats = conn.chats[_sender];
if (!chats) chats = conn.chats[_sender] = {id: sender};
chats.presences = presence;
if (id.endsWith('@g.us')) {
let chats = conn.chats[id];
if (!chats) chats = conn.chats[id] = {id};
}
} catch (e) {
console.error(e);
}
});
}

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
/** @type {{ [jid: string]: { id: string, subject?: string, name?: string, isChats?: boolean, isContact?: boolean, presence?: import('@whiskeysockets/baileys').PresenceData, metadata?: import('@whiskeysockets/baileys').GroupMetadata } & import('@whiskeysockets/baileys').Chat & import('@whiskeysockets/baileys').Contact }}} */
let chats = {}
/** @type {{ [jid: string]: import('@whiskeysockets/baileys').proto.IWebMessageInfo[] }} */
let messages = {}

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
function bind(ev, opts = { groupMetadata: () => null }) {
ev.on('chats.set', function store(chatsSet) {
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

ev.on('contacts.set', function store(contactsSet) {
for (const contact of contactsSet.contacts) {
// @ts-ignore
const id = contact.id?.decodeJid?.()
if (!id) continue
chats[id] = Object.assign(chats[id] || {}, { ...contact, isContact: true })
}
})

ev.on('messages.set', function store(messagesSet) {
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

ev.on('contacts.update', function store(contactsUpdate) {
for (const contact of contactsUpdate) {
// @ts-ignore
const id = contact.id?.decodeJid?.()
if (!id) continue
chats[id] = Object.assign(chats[id] || {}, { id, ...contact, isContact: true })
}
})

ev.on('chats.upsert', async function store(chatsUpsert) {
await Promise.all(chatsUpsert.map(async (chat) => {
// @ts-ignore
const id = chat.id?.decodeJid?.()
if (!id || isJidBroadcast(id)) return
const isGroup = isJidGroup(id)
chats[id] = Object.assign(chats[id] || {}, { ...chat, isChats: true })
if (isGroup && !chats[id].metadata) await fetchGroupMetadata(id, opts.groupMetadata)
}))
})

ev.on('chats.update', function store(chatsUpdate) {
for (const chat of chatsUpdate) {
// @ts-ignore
const id = chat.id?.decodeJid?.()
if (!id) continue
if (id in chats && chat.unreadCount) chat.unreadCount += chats[id].unreadCount || 0
chats[id] = Object.assign(chats[id] || {}, { id, ...chat, isChats: true })
}
})

ev.on('presence.update', function store(presenceUpdate) {
// @ts-ignore
const id = presenceUpdate.id?.decodeJid?.()
if (!id) return
chats[id] = Object.assign(chats[id] || {}, presenceUpdate)
})

ev.on('messages.upsert', function store(messagesUpsert) {
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
ev.emit('chats.upsert', [{
id: jid,
conversationTimestamp: msg.messageTimestamp,
unreadCount: 1,
name: msg.pushName || msg.verifiedBizName,
}])
}
break
}
})

ev.on('messages.update', function store(messagesUpdate) {
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
}
})

ev.on('groups.update', async function store(groupsUpdate) {
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

ev.on('group-participants.update', async function store(groupParticipantsUpdate) {
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

ev.on('message-receipt.update', function store(messageReceiptUpdate) {
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
/*
*/
export default {
bind,
useSingleFileAuthState,
makeInMemoryStore,
loadMessage,
};
