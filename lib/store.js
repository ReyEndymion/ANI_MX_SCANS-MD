import { readFileSync, writeFileSync, existsSync } from 'fs';
import { mkdir, readFile, stat, unlink, writeFile } from 'fs/promises';
import { join, isAbsolute } from 'path'
import { Mutex } from 'async-mutex';
import {lid as endLid} from '../config.js'
import { inspect } from 'util';
import { mergeDefined } from './functions.js';
/**
* @type {import('@whiskeysockets/baileys')}
*/
import { initAuthCreds, BufferJSON, proto, isJidBroadcast, isJidNewsletter, isJidGroup, isLidUser, isPnUser, WAMessageStubType, useMultiFileAuthState as baileysMultiFileAuthState, getHistoryMsg, getAggregateVotesInPollMessage, jidNormalizedUser } from '@whiskeysockets/baileys'


/** @type {{ [jid: string]: { id: string, subject?: string, name?: string, isChats?: boolean, isContact?: boolean, presence?: import('@whiskeysockets/baileys').PresenceData, metadata?: import('@whiskeysockets/baileys').GroupMetadata } & import('@whiskeysockets/baileys').Chat & import('@whiskeysockets/baileys').Contact }}} */
function makeInMemoryStore() {
let chats = {}
let messages = {}


/** 
* @param {import('@whiskeysockets/baileys').BaileysEventEmitter} ev 
* @param {{ groupMetadata: (jid: string, minimal?: boolean) => Promise<import('@whiskeysockets/baileys').GroupMetadata> }} opts
*/
function bind(sock, {dbGFAPFile, groupsDir, privsDir, index, indexFile, func, pluginsPath, inMstore, storeFile, dbGroups, groupMetadata = () => null}) {
const sockUserLid = jidNormalizedUser(sock.user.lid)

sock.ev.on('chats.set', async function store(chatsSet) {
let chatId
for (const chat of chatsSet.chats) {
// @ts-ignore
chatId = chat.id?.decodeJid?.()
const resolveUser = sock.resolveUser(chatId)
const id = resolveUser.jid
if (!chatId) continue
}
})

sock.ev.on('chats.upsert', async function store(chatsUpsert) {
await Promise.all(chatsUpsert.map(async (chat) => {
// @ts-ignore
let {id, jid, conversationTimestamp, unreadCount, fromMe, name} = chat
id = id?.decodeJid?.()
if (!id) return
if (isJidGroup(id)) {
let metadata
try {metadata = await sock.groupMetadata(id)} catch (error) {console.error(`No se pudo obtener metadata de ${id}:`, error)}

if (!chats[id]) chats[id] ||= {id, subject: name, isChatGroup: true}
if (!metadata) return
mergeDefined(chats[id], {...chat[id], subject: metadata?.subject ?? name, metadata})
let groupsDB = {}
try {
if (existsSync(dbGFAPFile)) {
const raw = readFileSync(dbGFAPFile, 'utf8')
groupsDB = raw.trim() ?JSON.parse(raw) : {}
}
} catch (error) {
sock.logger.error(`Error leyendo ${dbGFAPFile}:`, error)
groupsDB = {}
}
groupsDB[id] = metadata
writeFileSync(dbGFAPFile, JSON.stringify(groupsDB, null, 2), 'utf8')
} else if (isJidNewsletter(id)) {

} else if (isLidUser(id)) {
if (fromMe) {
chats[sockUserLid] ||= {lid: sockUserLid, ...sock.user}
mergeDefined(chats[sockUserLid], {lid: sockUserLid, phoneNumber: sock.user.jid.split('@')[0], ...sock.user, isChatPriv: true})
} else {
chats[id] ||= {lid: id, name}
mergeDefined(chats[id], {lid: id, jid, phoneNumber: jid ? jid.split('@')[0] : undefined, name, isChatPriv: true})
}
} else if (isPnUser(id)) {
} else if (isJidBroadcast(id)) {
const statusName = chat.name;

const found = Object.values(chats).find(c => c?.name === statusName);
return found
}
}))
})

sock.ev.on('chats.update', async function store(chatsUpdate) {
for (const chat of chatsUpdate) {
// @ts-ignore
let chatId = chat.id
messages[chatId] = [];
const messagesInChat = Array.isArray(chat.messages) ? chat.messages : []
if (!chatId && !messagesInChat) continue
let chatObjets
if (messagesInChat?.length) {
for (const msg of messagesInChat) {
if (!msg?.key) continue;
let {key, category, messageTimestamp, pushName, broadcast, retryCount, status} = msg
let {remoteJid, remoteJidAlt, remoteJidUsername, fromMe, id, participant, participantAlt, participantUsername, addressingMode} = key
const index = messages[chatId].findIndex(m => m?.key?.id === msg.key.id);
if (index === -1) {
messages[chatId].push(msg);
} else {
messages[chatId][index] = Object.assign(messages[chatId][index], msg);
}

if (isJidGroup(remoteJid)) {
let metadata = await fetchGroupMetadata(remoteJid, sock.groupMetadata)
if (!(chatId in chats) || !chats[chatId].metadata || !chats[chatId].subject) {
if (!chats[chatId].subject) chats[chatId].subject = metadata?.subject || '';
if (!chats[chatId].metadata) chats[chatId].metadata = metadata;
}

if ((messages = Object.entries(messages)).length > 40) messages = Object.fromEntries(messages.slice(30, messages.length));
} else if (isJidNewsletter(chatId)) {

} else if (isLidUser(chatId)) {
if (chatId !== remoteJid) continue
const resolveUser = sock.resolveUser(chatId)
const lid = remoteJid ? remoteJid : resolveUser.lid
const jid = remoteJidAlt ? remoteJidAlt : resolveUser.jid?.decodeJid?.()
const conversationTimestamp = chat.conversationTimestamp
const notify = chat.notify
const verifiedName = chat.verifyName
const name = pushName
if (fromMe) {
if (chats[chatId]) mergeDefined(chats[sockUserLid], {...sock.user, lid: sockUserLid})
else chats[sockUserLid] = {...sock.user, lid: sockUserLid, phoneNumber: sock.user.jid.split('@')[0], isChatPriv: true}//
} else {
const resolveUser = sock.resolveUser(remoteJid)
if (chats[remoteJid]) mergeDefined(chats[remoteJid], {...chats[remoteJid]})
else chats[remoteJid] ||= {lid: remoteJid, jid: resolveUser ? resolveUser.jid : undefined, phoneNumber: resolveUser ? resolveUser.pn : undefined, isChatPriv: true}
}
} else if(isPnUser(chatId)) {

} else if (isJidBroadcast(chatId)) {
chatId = participant
mergeDefined(chats[chatId], {lid: participant, jid: participantAlt, phoneNumber: participantAlt ? participantAlt.split('@')[0] : undefined, username: participantUsername, name: chat.notify || chat.verifyName || chat.verifyBizName || pushName, isChatPriv: true})
}
    }

    if (messages[chatId].length > 3) {
        messages[chatId] = messages[chatId].slice(-3);
    }
}
}
})

sock.ev.on('chats.delete', function store(deleteUpdate) {
})
sock.ev.on('groups.delete', function store(deleteUpdate) {
})
sock.ev.on('groups.upsert', function store(deleteUpdate) {
})

/**
*
* @param {import('@whiskeysockets/baileys').Contact[]|{contacts:import('@whiskeysockets/baileys').Contact[]}} contacts
* @returns
*/
sock.ev.on('contacts.set', async function store(contactsSet) {
for (const contact of contactsSet.contacts) {
// @ts-ignore
const id = contact.id?.decodeJid?.()
if (!id) continue
const name = contact?.notify || contact.verifiedName || undefined
}
})

sock.ev.on('contacts.update', async function store(contactsUpdate) {
let chatId
for (const contact of contactsUpdate) {
// @ts-ignoregetName(lid)
let {id, notify, verifiedBizName, verifiedName, imgUrl} = contact
chatId = id
if (!chatId) continue
const name = notify || verifiedName || verifiedBizName

if (sockUserLid === id) {
if (chats[sockUserLid]) mergeDefined(chats[sockUserLid], {...sock.user, lid: sockUserLid, name: notify, phoneNumber: sock.user.jid.split('@')[0], isChatPriv: true, isContact: true})
else chats[sockUserLid] ||= {lid: sockUserLid, name: notify, ...sock.user, phoneNumber: sock.user.jid.split('@')[0], isChatPriv: true, isContact: true}
} else {
const resolveUser = sock.resolveUser(chatId)
if (chats[id]) mergeDefined(chats[id], {...chats[id]})
else chats[id] ||= {lid: id, name: name, jid: resolveUser ? resolveUser.jid : undefined, phoneNumber: resolveUser ? resolveUser.pn : undefined, isChatPriv: true, isContact: true}

}
if (typeof contact.imgUrl !== 'undefined') {
const newUrl = contact.imgUrl === null
? null : await sock.profilePictureUrl(chatId).catch(() => null);
if (contact.imgUrl === 'change') console.log(`contacto ${sockUserLid === id ? sock.user.name : chats[id].name} tiene una nueva foto de perfil: ${newUrl}`);
 }
}
})

sock.ev.on('messages.set', async function store(messagesSet) {
for (const message of messagesSet.messages) {
// @ts-ignore
const remoteJid = message.key.remoteJid
const resolveUser = sock.resolveUser(remoteJid)
if (!remoteJid) continue
if (!remoteJid || isJidBroadcast(remoteJid)) continue
if (!(remoteJid in messages)) messages[remoteJid] = []
messages[remoteJid].push(message)
if (messages[remoteJid].length > 3) {
    messages[remoteJid] = messages[remoteJid].slice(-3)
}
}
})

sock.ev.on('messages.upsert', async function store(messagesUpsert) {
const { messages: newMessages, type } = messagesUpsert
let key, chatObjets, chatId;
switch (type) {
case 'append':
case 'notify':
for (const msg of newMessages) {
// @ts-ignore
if (msg.messageStubType == WAMessageStubType.CIPHERTEXT) continue
let {key, category, messageTimestamp, pushName, verifiedBizName, broadcast, retryCount, status} = msg
let {remoteJid, remoteJidAlt, remoteJidUsername, fromMe, id, participant, participantAlt, participantUsername, addressingMode} = key

if (isJidGroup(remoteJid)) {
let metadata = await fetchGroupMetadata(remoteJid, sock.groupMetadata)//
chats[remoteJid] ||= { id: remoteJid }
mergeDefined(chats[remoteJid], { id: remoteJid, subject: metadata?.subject, metadata, isChatGroup: true })
if (chats[participant]) {
const resolveUser = sock.resolveUser(isLidUser(participant) ? participant : isLidUser(participant) ? participant : remoteJidAlt ? remoteJidAlt : undefined)
const jid = remoteJidAlt ? remoteJidAlt : resolveUser ? resolveUser.jid : undefined
const lid = isLidUser(participant) ? remoteJid : resolveUser ? resolveUser.lid : undefined
mergeDefined(chats[participant], {lid: participant, jid, phoneNumber: jid ? jid.split('@')[0] : undefined, username: participantUsername, name: pushName || verifiedBizName, isChatPriv: true})
}
mergeDefined(messages[remoteJid], msg.message)
} else if (isJidNewsletter(remoteJid)) {
chatObjets = {}, chatId = remoteJid
} else if (isLidUser(remoteJid) || (isPnUser(remoteJid) || isPnUser(remoteJidAlt))) {
if (fromMe) {
chats[sockUserLid] = {lid: sockUserLid, ...sock.user}
mergeDefined(chats[sockUserLid], {lid: sockUserLid, ...sock.user, phoneNumber: sock.user.jid.split('@')[0], isChatPriv: true})
} else {
remoteJid = remoteJid?.replace(/:\d+(?=@lid$)/, '')
chats[remoteJid] ||= { id: remoteJid }
const resolveUser = sock.resolveUser(isLidUser(remoteJid) ? remoteJid : isLidUser(remoteJid) ? remoteJid : remoteJidAlt ? remoteJidAlt : undefined)
const jid = remoteJidAlt ? remoteJidAlt : resolveUser ? resolveUser.jid : undefined
const lid = isLidUser(remoteJid) ? remoteJid : resolveUser ? resolveUser.lid : undefined
mergeDefined(chats[remoteJid], { lid, jid, phoneNumber: jid ? jid.split('@')[0] : undefined, username: remoteJidUsername, name: (pushName || verifiedBizName), isChatPriv: true }) 
}
} else if (isJidBroadcast(remoteJid)) {
chats[key.participant] = {}
mergeDefined(chats[key.participant], {lid: key.participant, jid: key.remoteJidAlt, username: remoteJidUsername, name: pushName, isChatPriv: true})
}

if (!(remoteJid in messages)) messages[remoteJid] = []
messages[remoteJid].push(msg)
if (messages[remoteJid].length > 3) {
    messages[remoteJid] = messages[remoteJid].slice(-3)
}
if (type === 'notify' && !(remoteJid in chats))
sock.ev.emit('chats.upsert', [{
id: remoteJid,
jid: remoteJidAlt,
fromMe,
conversationTimestamp: msg.messageTimestamp,
unreadCount: 1,
name: fromMe ? sock.user.name : (msg.pushName || msg.verifiedBizName || msg.verifyName),
}])
}
break
}
sock.chats = chats
sock.messages = messages
return sock.handler(messagesUpsert)
})

sock.ev.on('messages.update', async function store(messagesUpdate) {
let key, chatId;
for (const message of messagesUpdate) {
// @ts-ignore
let {key, update} = message
let {remoteJid, id, fromMe, participant} = key
if (!remoteJid) continue
let remoteJidAlt = key.remoteJidAlt
if (isLidUser(remoteJid)) {
if (fromMe) {
chats[sockUserLid] = {lid: sockUserLid, ...sock.user}
mergeDefined(chats[sockUserLid], {lid: sockUserLid, ...sock.user, phoneNumber: sock.user.jid.split('@')[0], isChatPriv: true})
} else {
remoteJid = jidNormalizedUser(remoteJid)//?.replace(/:\d+(?=@lid$)/, '')
const resolveUser = sock.resolveUser(remoteJid)
if (chats[remoteJid]) mergeDefined(chats[remoteJid], {...chats[remoteJid]})
else chats[remoteJid] ||= { lid: remoteJid, jid: resolveUser ? resolveUser.jid : undefined, phoneNumber: resolveUser ? resolveUser.pn : undefined, isChatPriv: true}//
}
} else if (isPnUser(remoteJid)) {
if (fromMe) {
chats[sockUserLid] = {lid: sockUserLid, ...sock.user}
mergeDefined(chats[sockUserLid], {...sock.user, lid: sockUserLid, phoneNumber: sock.user.jid.split('@')[0], isChatPriv: true})
} else {
remoteJid = jidNormalizedUser(remoteJid)//?.replace(/:\d+(?=@lid$)/, '')
const resolveUser = sock.resolveUser(remoteJid)
if (!resolveUser) continue
if (chats[resolveUser.lid]) mergeDefined(chats[resolveUser.lid], {...chats[resolveUser.lid]})
else chats[resolveUser.lid] ||= { lid: resolveUser.lid, jid: remoteJid? remoteJid : resolveUser ? resolveUser.jid : undefined, phoneNumber: resolveUser ? resolveUser.pn : undefined, isChatPriv: true}//
}
} else if (isJidBroadcast(remoteJid)) {
chats[key.participant] = { id: key.participant }
messages[key.participant] = []
chats[key.participant] = Object.assign(chats[key.participant], {lid: key.participant, jid: key.remoteJidAlt, phoneNumber: key.remoteJidAlt ? key.remoteJidAlt.split('@')[0] : undefined, username: key.participantUsername, isChatPriv: true})
} else if (isJidGroup(remoteJid)) {

} else if (isJidNewsletter(remoteJid)) {

}
if (!(remoteJid in messages)) messages[remoteJid] = []
const msg = loadMessage(remoteJid, id)
if (!msg) return 
const msgIndex = messages[remoteJid].findIndex(m => key.id === id)
messages[remoteJid][msgIndex] = Object.assign(msg, message.update)
if(message.update.pollUpdates) {
const pollCreation = proto.Message = {} // get the poll creation message somehow
if (pollCreation) {
console.log(
'got poll update, aggregation: ',
getAggregateVotesInPollMessage({
message: pollCreation,
pollUpdates: message.update.pollUpdates,
}))
}
}
}
})

sock.ev.on('message-receipt.update', async function store(messageReceiptUpdate) {
let chatId
for (const msgReceipt of messageReceiptUpdate) {
// @ts-ignore
let {key, receipt} = msgReceipt
let {remoteJid, id, fromMe, participant} = key
const resolveUser = sock.resolveUser(chatId)
if (!chatId) continue
//const id = receipt.key.id
if (!(chatId in messages)) messages[chatId] = []
const msg = loadMessage(remoteJid, id)
if (!msg) return 
msg.userReceipt = msg.userReceipt || []
const recp = msg.userReceipt.find(m => m.userJid === receipt.userJid)
if (recp) Object.assign(recp, receipt)
else msg.userReceipt.push(receipt)

if (isJidGroup(remoteJid)) {

} else if (isJidNewsletter(remoteJid)) {

} else if (isLidUser(remoteJid)) {
if (fromMe) {
if (chats[sockUserLid]) {
chats[sockUserLid] = {...sock.user}
}
} else {
const resolveUser = sock.resolveUser(remoteJid)
if (chats[remoteJid]) mergeDefined(chats[remoteJid], {...chats[remoteJid]})
else chats[remoteJid] ||= {lid: remoteJid, jid: resolveUser ? resolveUser.jid : undefined, phoneNumber: resolveUser ? resolveUser.pn : undefined, isChatPriv: true}
}
} else if (isPnUser(remoteJid)) {
if (fromMe) {
if (chats[sockUserLid]) {
chats[sockUserLid] = {...sock.user}
}
} else {

}
} else if (isJidBroadcast(remoteJid)) {

}
}
})

sock.ev.on('messages.reaction', async function store(reactionMessages) {
for (const msg of reactionMessages) {
let {key, reaction} = msg
let {remoteJid, fromMe, id, participant} = key
let {key: keyReac, text, senderTimestampMs} = reaction
let {remoteJid: remoteReacJid, remoteJidAlt, remoteJidUsername, fromMe: fromMeReac, id: idReac, participant: participantReac, participantAlt, participantUsername, addressingMode} = keyReac
if (isJidGroup(remoteJid) && isJidGroup(remoteReacJid)) {
chats[remoteJid] = {...chats[remoteJid]}
const metadata = chats[remoteJid]?.metadata
if (!metadata) return
const participants = metadata.participants
if (fromMe && fromMeReac && participant === sockUserLid) {
chats[sockUserLid] = {...chats[participant]}
mergeDefined(chats[participant], {...sock.user, lid: sockUserLid, phoneNumber: sock.user.jid.split('@')[0], isChatPriv: true})
} else {
if (chats[participant]) {
chats[participant] = {...chats[participant]}
mergeDefined[chats[participant], {lid: participant, jid: participantAlt, username: participantUsername, ...chats[participant], isChatPriv: true}]
}
}
} else if (isJidNewsletter(remoteJid) && isJidNewsletter(remoteReacJid)) {

} else if (isLidUser(remoteJid) && isLidUser(remoteReacJid)) {
if (fromMe && fromMeReac) {
chats[sockUserLid] = {...chats[sockUserLid]}
mergeDefined(chats[sockUserLid], {lid: sockUserLid, ...sock.user, phoneNumber: sock.user.jid.split('@')[0], isChatPriv: true})
} else {
const resolveUser = sock.resolveUser(remoteJid)
chats[remoteJid] = {...chats[remoteJid]}//
mergeDefined(chats[remoteReacJid], {lid: remoteJid, jid: resolveUser ? resolveUser.jid : undefined, phoneNumber: resolveUser ? resolveUser.jid.split('@')[0] : undefined, username: remoteJidUsername, name: chats[remoteJid].name ? chats[remoteJid].name : undefined, isChatPriv: true})
}
} else if (isPnUser(remoteJid) && isPnUser(remoteReacJid)) {
if (fromMe && fromMeReac) {

} else {
const resolveUser = sock.resolveUser(remoteJid)
if (!resolveUser) return
chats[resolveUser.lid] = {...chats[resolveUser.lid]}//
mergeDefined(chats[resolveUser.lid], {lid: resolveUser ? resolveUser.lid : undefined, jid: remoteJid, phoneNumber: remoteJid.jid.split('@')[0], username: remoteJidUsername, name: chats[resolveUser.lid].name ? chats[resolveUser.lid].name : undefined, isChatPriv: true})
}
} else if (isJidBroadcast(remoteJid) && isJidBroadcast(remoteReacJid)) {

}
}
})

sock.ev.on('groups.update', async function store(groupsUpdate) {
let chatId
await Promise.all(groupsUpdate.map(async (group) => {
// @ts-ignore
chatId = group.id?.decodeJid?.()
if (!chatId) return
const isGroup = isJidGroup(chatId)
if (!isGroup) return
if (!(chatId in chats)) {
chats[chatId] ||= { id: chatId, metadata: group, isChatGroup: true }
} else {
chats[chatId] = {...chats[chatId]}
if (!chats[chatId].metadata) {
chats[chatId] ||= {id: chatId, subject: group?.subject, metadata: group, isChatGroup: true};}
}
//
}))
return sock.groupsUpdate(groupsUpdate)
})

sock.ev.on('group-participants.update', async function store(groupParticipantsUpdate) {
// @ts-ignore
const chatId = groupParticipantsUpdate.id?.decodeJid?.()
if (!chatId || !isJidGroup(chatId)) return

if (!(chatId in chats) || !chats[chatId].metadata) await fetchGroupMetadata(chatId, sock.groupMetadata)
const metadata = chats[chatId].metadata
if (!metadata) return 
switch (groupParticipantsUpdate.action) {
case 'add':
metadata.participants.push(...groupParticipantsUpdate.participants.map(id => ({ id, admin: null })))
break
case 'demote':
case 'promote':
for (const participant of metadata.participants)
if (groupParticipantsUpdate.participants.includes(participant.phoneNumber) && groupParticipantsUpdate.participants.includes(participant.id))
participant.admin = groupParticipantsUpdate.action === 'promote' ? 'admin' : null

break
case 'remove':
metadata.participants = metadata.participants.filter(p => !groupParticipantsUpdate.participants.includes(p.phoneNumber) && !groupParticipantsUpdate.participants.includes(p.id))
break
}
return sock.participantsUpdate(groupParticipantsUpdate)
})

sock.ev.on('presence.update', async function store(presenceUpdate) {
// @ts-ignore
if (presenceUpdate) {
let {id, presences} = presenceUpdate
if (!id) return
if (isJidGroup(id)) {
if (chats[id]) mergeDefined(chats[id], {...chats[id]})
else chats[id] ||= {id: id}
for (const [participant, presence] of Object.entries(presences)) {
if (sockUserLid === participant) {
if (chats[sockUserLid]) mergeDefined(chats[participant], {...chats[sockUserLid]})
else chats[sockUserLid] ||= {...sock.user, lid: participant}
} else {
if (chats[participant]) mergeDefined(chats[participant], {...chats[participant]})
}

}
} else if (isLidUser(id)) {
if (id === sockUserLid) {
if (chats[sockUserLid]) mergeDefined(chats[id], {...chats[sockUserLid]})
else chats[sockUserLid] ||= {...sock.user, lid: id}
} else {
const resolveUser = sock.resolveUser(id)
if (chats[id]) mergeDefined(chats[id], {...chats[id]})
else chats[id] ||= {lid: id, jid: resolveUser ? resolveUser.jid?.decodeJid?.() : undefined, phoneNumber: resolveUser ? resolveUser.pn : undefined, isChatPriv: true}
}
} else if (isPnUser(id)) {
const resolveUser = sock.resolveUser(id)
if (!resolveUser) return
if (chats[id]) mergeDefined(chats[id], {...chats[id]})
else chats[participant] ||= {lid: resolveUser.lid, jid: id, phoneNumber: id.split('@')[0], isChatPriv: true}
}
}
})

sock.ev.on('messaging-history.set', function store(msgHistorySet) {
const { chats: thisChats, contacts, messages, isLatest, progress, syncType } = msgHistorySet
if (syncType === proto.HistorySync.HistorySyncType.ON_DEMAND) {
}
console.log(`recv ${thisChats.length} chats, ${contacts.length} contacts, ${messages.length} msgs (is latest: ${isLatest}, progress: ${progress}%), type: ${syncType}`)
console.info(`messaging-history.set "${sock.user.jid}": `, chats, msgHistorySet)
}) 

}
function cleanJSON(obj) {
for (const [jid, msgs] of Object.entries(obj)) {
for (const m of [msgs]) {
if (typeof m.messageTimestamp === 'object' && !('isZero' in m.messageTimestamp)) {
}
const clean = JSON.parse(JSON.stringify(msgs, (k, v) => {
if (typeof v === 'function') return undefined
if (v && typeof v === 'object' && (v._idleNext || v._idlePrev)) return undefined
if (k === 'conn') return undefined
return v
}))
return clean
}
}
}
function toJSON() {
return {chats, messages}
}

function fromJSON(json) {
Object.assign(chats, json.chats)
for (const jid in json.messages)
messages[jid] = json.messages[jid].map(m => {
try {
return m && proto.WebMessageInfo.create(m)
} catch (error) {
console.error(`Error reconstruyendo mensaje de ${jid}:`, error)
return null
}
}).filter(m => m && m.messageStubType != WAMessageStubType.CIPHERTEXT)

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
/** @type {{ [jid: string]: import('@whiskeysockets/baileys').proto.IWebMessageInfo[] }} */
function loadMessage(jid, id) {
// If only 1 param, first param is id
if (!id && jid) {
id = jid
return (Object.entries(messages).filter(([, msgs]) => {
return Array.isArray(msgs) && msgs.find(msg => msg?.key?.id === id)
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
if (!(jid in chats)) chats[jid] = { id: jid, isChatGroup: true }
if (!chats[jid].metadata) {
const metadata = await groupMetadata?.(jid)
if (metadata) Object.assign(chats[jid], { subject: metadata.subject, metadata, isChatGroup: true})//.metadatametadatamergeDefined(
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
value = proto.Message.AppStateSyncKeyData.fromObject(value);
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

/**
* @param {import('@whiskeysockets/baileys').WASocket | import('@whiskeysockets/baileys').WALegacySocket}
*/
/** @type {(m: import('@whiskeysockets/baileys').proto.WebMessageInfo) => Boolean} */
function loadMessage(jid, id = null) {
let message = null;
//const messages = {};
const messages = (makeInMemoryStore()).messages
// If only 1 param, first param is assumed to be id not jid
if (jid && !id) {
id = jid;
const filter = (m) => m.key?.id == id;
//const messages = {};
const messageFind = Object.entries(messages)
.find(([, msgs]) => {
return msgs.find(filter);
});
message = messageFind?.[1]?.find(filter);
} else {
// @ts-ignore
jid = jid?.decodeJid?.();
if (!(jid in messages)) return null;
message = messages[jid].find((m) => m.key.id == id);
}
return message ? message : null;
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

export default {
useSingleFileAuthState,
makeInMemoryStore,
loadMessage,
};
