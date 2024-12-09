import { readFileSync, writeFileSync, existsSync, promises } from 'fs'
import { join } from 'path'
import { validateJSON } from './functions.js'

/**
 * @type {import('@whiskeysockets/baileys')}
 */
const { initAuthCreds, BufferJSON, proto, isJidBroadcast, isJidGroup, WAMessageStubType, useMultiFileAuthState: baileysMultiFileAuthState, fetchLatestBaileysVersion } = (await import('@whiskeysockets/baileys')).default

const dataConn = {}
/**
 * @param {import('@whiskeysockets/baileys').WASocket | import('@whiskeysockets/baileys').WALegacySocket}
 */
/** @type {{ [jid: string]: { id: string, subject?: string, name?: string, isChats?: boolean, isContact?: boolean, presence?: import('@whiskeysockets/baileys').PresenceData, metadata?: import('@whiskeysockets/baileys').GroupMetadata } & import('@whiskeysockets/baileys').Chat & import('@whiskeysockets/baileys').Contact }}} */
let chats = {}
/** @type {{ [jid: string]: import('@whiskeysockets/baileys').proto.IWebMessageInfo[] }} */
let messages = {}
/** 
 * @param {import('@whiskeysockets/baileys').BaileysEventEmitter} ev 
 * @param {{ groupMetadata: (jid: string, minimal?: boolean) => Promise<import('@whiskeysockets/baileys').GroupMetadata> }} opts
 */
function bind(conn, opts = { groupMetadata: () => null }) {
dataConn.conn = conn
dataConn.opts = opts
if (!conn.chats) conn.chats = {}
/**
 * 
 * @param {import('@whiskeysockets/baileys').Contact[]|{contacts:import('@whiskeysockets/baileys').Contact[]}} contacts 
 * @returns 
 */
conn.ev.on('chats.set', storeChatsS)
conn.ev.on('chats.update', storeChatsUpd)
conn.ev.on('chats.upsert', storeChatsUps)
conn.ev.on('contacts.set', storeContactsS)
conn.ev.on('contacts.update', storeContactsUpd)
conn.ev.on('contacts.upsert', updateNameToDb)
conn.ev.on('group-participants.update', storeGroupParticipantsUpd)
conn.ev.on('groups.update', storeGroupsUpd)
conn.ev.on('message-receipt.update', storeMessageReceiptUpd)
conn.ev.on('messages.set', storeMessagesS)
conn.ev.on('messages.update', storeMessagesUpd)
conn.ev.on('messages.upsert', storeMessagesUps)
conn.ev.on('presence.update', storePresenceUpd)
}


/**
async ({ chats }) => {
try {
for (let { id, name, readOnly } of chats) {
id = conn.decodeJid(id)
if (!id || id === 'status@broadcast') continue
const isGroup = id.endsWith('@g.us')
let chats = conn.chats[id]
if (!chats) chats = conn.chats[id] = { id }
chats.isChats = !readOnly
if (name) chats[isGroup ? 'subject' : 'name'] = name
if (isGroup) {
const metadata = await conn.groupMetadata(id).catch(_ => null)
if (name || metadata?.subject) chats.subject = name || metadata.subject
if (!metadata) continue
chats.metadata = metadata
}
}
} catch (e) {
console.error(e)
}
}
 */
/**
 * 
 * @param {String} filename 
 * @param {import('pino').Logger} logger
 * @returns 
 */

export function storeChatsS(chatsSet) {
// const { isLatest } = chatsSet
// if (isLatest) chats = {}
for (const chat of chatsSet.chats) {
// @ts-ignore
const id = chat.id?.decodeJid?.()
if (!id) continue
if (!(id in chats)) chats[id] = { ...chat, isChats: true }
if (chat.name) chats[id].name = chat.name
}
}
function storeChatsUpd(chatsUpdate) {
for (const chat of chatsUpdate) {
// @ts-ignore
const id = chat.id?.decodeJid?.()
if (!id) continue
if (id in chats && chat.unreadCount) chat.unreadCount += chats[id].unreadCount || 0
chats[id] = Object.assign(chats[id] || {}, { id, ...chat, isChats: true })
}
}
async function storeChatsUps(chatsUpsert) {
await Promise.all(chatsUpsert.map(async (chat) => {
// @ts-ignore
const id = chat.id?.decodeJid?.()
if (!id || isJidBroadcast(id)) return
const isGroup = isJidGroup(id)
chats[id] = Object.assign(chats[id] || {}, { ...chat, isChats: true })
if (isGroup && !chats[id].metadata) await fetchGroupMetadata(id, opts.groupMetadata)
}))
}
export function storeContactsS(contactsSet) {
for (const contact of contactsSet.contacts) {
// @ts-ignore
const id = contact.id?.decodeJid?.()
if (!id) continue
chats[id] = Object.assign(chats[id] || {}, { ...contact, isContact: true })
}
/*
function chatsUpsertPushToDb(chatsUpsert) {
try {
const { id, name } = chatsUpsert
if (!id || id === 'status@broadcast') return
conn.chats[id] = { ...(conn.chats[id] || {}), ...chatsUpsert, isChats: true }
const isGroup = id.endsWith('@g.us')
if (isGroup) conn.insertAllGroup().catch(_ => null)
} catch (e) {
console.error(e)
}
}
*/
}
function storeContactsUpd(contactsUpdate) {
for (const contact of contactsUpdate) {
// @ts-ignore
const id = contact.id?.decodeJid?.()
if (!id) continue
chats[id] = Object.assign(chats[id] || {}, { id, ...contact, isContact: true })
}
}
function updateNameToDb(contacts) {
if (!contacts) return
try {
contacts = contacts.contacts || contacts
for (const contact of contacts) {
const id = conn.decodeJid(contact.id)
if (!id || id === 'status@broadcast') continue
let chats = conn.chats[id]
if (!chats) chats = conn.chats[id] = { ...contact, id }
conn.chats[id] = {
...chats,
...({
...contact, id, ...(id.endsWith('@g.us') ?
{ subject: contact.subject || contact.name || chats.subject || '' } :
{ name: contact.notify || contact.name || chats.name || chats.notify || '' })
} || {})
}
}
} catch (e) {
console.error(e)
}
}
async function storeGroupParticipantsUpd(groupParticipantsUpdate) {
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
/**
async function updateParticipantsToDb({ id, participants, action }) {
if (!id) return
id = conn.decodeJid(id)
if (id === 'status@broadcast') return
if (!(id in conn.chats)) conn.chats[id] = { id }
let chats = conn.chats[id]
chats.isChats = true
const groupMetadata = await conn.groupMetadata(id).catch(_ => null)
if (!groupMetadata) return
chats.subject = groupMetadata.subject
chats.metadata = groupMetadata
}
 */
}
async function storeGroupsUpd(groupsUpdate) {
const {opts} = dataConn
await Promise.all(groupsUpdate.map(async (group) => {
// @ts-ignore
const id = group.id?.decodeJid?.()
if (!id) return
const isGroup = isJidGroup(id)
if (!isGroup) return
if (!(id in chats)) chats[id] = { id, ...group, isChats: true }
if (!chats[id].metadata) {
const groupMetadataFunc = opts.groupMetadata;
if (typeof groupMetadataFunc === "function") {
const metadata = await fetchGroupMetadata(id, groupMetadataFunc);
if (metadata) chats[id].metadata = metadata; // Solo asignar si es válido
}
if (chats[id].metadata && group && typeof group === "object") {
chats[id].metadata = Object.assign(chats[id].metadata, group);
}
//await fetchGroupMetadata(id, await opts.groupMetadata)
}
//chats[id].metadata = Object.assign(chats[id].metadata, group)
}))
/*
async function groupUpdatePushToDb(groupsUpdates) {
try {
for (const update of groupsUpdates) {
const id = conn.decodeJid(update.id)
if (!id || id === 'status@broadcast') continue
const isGroup = id.endsWith('@g.us')
if (!isGroup) continue
let chats = conn.chats[id]
if (!chats) chats = conn.chats[id] = { id }
chats.isChats = true
const metadata = await conn.groupMetadata(id).catch(_ => null)
if (metadata) chats.metadata = metadata
if (update.subject || metadata?.subject) chats.subject = update.subject || metadata.subject
}
} catch (e) {
console.error(e)
}
}
 */
}
function storeMessageReceiptUpd(messageReceiptUpdate) {
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
}
function storeMessagesS(messagesSet) {
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
}
function storeMessagesUpd(messagesUpdate) {
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
}
function toJSON() {
return { chats, messages }
}
function storeMessagesUps(messagesUpsert) {
const {conn} = dataConn
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
conn.ev.emit('chats.upsert', [{
id: jid,
conversationTimestamp: msg.messageTimestamp,
unreadCount: 1,
name: msg.pushName || msg.verifiedBizName,
}])
}
break
}
}
function storePresenceUpd(presenceUpdate) {
// @ts-ignore
const id = presenceUpdate.id?.decodeJid?.()
if (!id) return
chats[id] = Object.assign(chats[id] || {}, presenceUpdate)
/**
async function presenceUpdatePushToDb({ id, presences }) {
try {
const sender = Object.keys(presences)[0] || id
const _sender = conn.decodeJid(sender)
const presence = presences[sender]['lastKnownPresence'] || 'composing'
let chats = conn.chats[_sender]
if (!chats) chats = conn.chats[_sender] = { id: sender }
chats.presences = presence
if (id.endsWith('@g.us')) {
let chats = conn.chats[id]
if (!chats) chats = conn.chats[id] = { id }
}
} catch (e) {
console.error(e)
}
}
*/
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
jid = jid?.decodeJid?.()
if (!(jid in chats)) return chats[jid] = { id: jid }
if (!chats[jid].imgUrl) {
const url = await profilePictureUrl(jid, 'image').catch(() => './src/avatar_contact.png')
if (url) chats[jid].imgUrl = url
}
return chats[jid].imgUrl
}
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

function fromJSON(json) {
Object.assign(chats, json.chats)
for (const jid in json.messages)
messages[jid] = json.messages[jid].map(m => m && proto.WebMessageInfo.fromObject(m)).filter(m => m && m.messageStubType != WAMessageStubType.CIPHERTEXT)

}
/** @param {string} path*/
function writeToFile(path) {
let newDataReceived = false; // Bandera para verificar si se recibieron nuevos datos
if (!newDataReceived) return; // No escribe si no hubo nuevos datos

try {
fs.writeFileSync(path, JSON.stringify(path));
console.log(`Datos guardados en ${path}`);
newDataReceived = false; // Resetea la bandera después de escribir
} catch (error) {
console.error('Error al escribir en archivo:', error);
}

writeFileSync(path, JSON.stringify(toJSON(), (key, value) => key == 'isChats' ? undefined : value, 2))
}

/** @param {string} path*/
function readFromFile(path) {
if (existsSync(path) && validateJSON(path)) {
const result = JSON.parse(readFileSync(path, { encoding: 'utf-8' }))
fromJSON(result)
}
}
function JSONreplacer(key, value) {
if (value == null) return
const baileysJSON = BufferJSON.replacer(key, value)
return baileysJSON
}

const KEY_MAP = {
'pre-key': 'preKeys',
'session': 'sessions',
'sender-key': 'senderKeys',
'app-state-sync-key': 'appStateSyncKeys',
'app-state-sync-version': 'appStateVersions',
'sender-key-memory': 'senderKeyMemory'
}

function useSingleFileAuthState(filename, logger) {
let creds, keys = {}, saveCount = 0
// save the authentication state to a file
const saveState = (forceSave) => {
logger?.trace('saving auth state')
saveCount++
if (forceSave || saveCount > 5) {
writeFileSync(
filename,
// BufferJSON replacer utility saves buffers nicely
JSON.stringify({ creds, keys }, BufferJSON.replacer, 2)
)
saveCount = 0
}
}

if (existsSync(filename)) {
const result = JSON.parse(
readFileSync(filename, { encoding: 'utf-8' }),
BufferJSON.reviver
)
creds = result.creds
keys = result.keys
} else {
creds = initAuthCreds()
keys = {}
}

return {
state: {
creds,
keys: {
get: (type, ids) => {
const key = KEY_MAP[type]
return ids.reduce(
(dict, id) => {
let value = keys[key]?.[id]
if (value) {
if (type === 'app-state-sync-key') {
value = proto.AppStateSyncKeyData.fromObject(value)
}

dict[id] = value
}

return dict
}, {}
)
},
set: (data) => {
for (const _key in data) {
const key = KEY_MAP[_key]
keys[key] = keys[key] || {}
Object.assign(keys[key], data[_key])
}

saveState()
}
}
},
saveState
}
}
const {version} = await fetchLatestBaileysVersion();

/**
 * @typedef {typeof baileysMultiFileAuthState} MultiFileAuthStateStore
 */
/** @type {MultiFileAuthStateStore} */
const useMultiFileAuthState = baileysMultiFileAuthState ||
/**
 * Re implement useMultiFileAuthState if baileysMultiFileAuthState is undefined
 * @type {MultiFileAuthStateStore}
 */
async function useMultiFileAuthState(folder) {

const writeData = (data, file) => {
return promises.writeFile(join(folder, fixFileName(file)), JSON.stringify(data, JSONreplacer))
}

const readData = async (file) => {
try {
const data = await promises.readFile(join(folder, fixFileName(file)), { encoding: 'utf-8' })
return JSON.parse(data, BufferJSON.reviver)
} catch (error) {
return null
}
}

const removeData = async (file) => {
try {
await promises.unlink(fixFileName(file))
} catch {

}
}

const folderInfo = await promises.stat(folder).catch(() => { })
if (folderInfo) {
if (!folderInfo.isDirectory()) {
throw new Error(`found something that is not a directory at ${folder}, either delete it or specify a different location`)
}
} else {
await promises.mkdir(folder, { recursive: true })
}
 
const fixFileName = (file) =>{
if(file){
return file.replace(/:/g, '-');
}
else {
return file
}
}

const creds = await readData('creds.json') || initAuthCreds()

return {
state: {
creds,
keys: {
// @ts-ignore
get: async (type, ids) => {
const data = {}
await Promise.all(
ids.map(
async id => {
let value = await readData(`${type}-${id}.json`)
if (type === 'app-state-sync-key') {
value = proto.AppStateSyncKeyData.fromObject(value)
}

data[id] = value
}
)
)

return data
},
set: async (data) => {
const tasks = []
for (const category in data) {
for (const id in data[category]) {
const value = data[category][id]
const file = `${category}-${id}.json`
tasks.push(value ? writeData(value, file) : removeData(file))
}
}

await Promise.all(tasks)
}
}
},
saveCreds: () => {
return writeData(creds, 'creds.json')
}
}
}

export function makeInMemoryStore() {
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
export default {
bind,
useMultiFileAuthState,
useSingleFileAuthState
}
