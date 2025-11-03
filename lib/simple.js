import path from 'path';
import chalk from 'chalk';
import { Boom } from '@hapi/boom';
import fetch from 'node-fetch';
import PhoneNumber from 'awesome-phonenumber';
import fs from 'fs';
import util from 'util';
import { format } from 'util';
import { fileURLToPath } from 'url';
import libstore from './store.js';
import { Jimp } from 'jimp';
import { fileTypeFromBuffer } from 'file-type';
import { info, temp, userID, groupID, lid } from '../config.js'

import { __filename, opts, clearTmp, parseDuration, purgeOldFiles, purgeSession } from './functions.js';
/**
* @type {import('@whiskeysockets/baileys')}
*/
import
 {
areJidsSameUser,
makeWASocket as _makeWaSocket,
downloadContentFromMessage,
encodeWAMessage,
encodeNewsletterMessage,
encodeSignedDeviceIdentity,
extractMessageContent,
jidDecode,
isLidUser,
isPnUser,
jidEncode,
isJidGroup,
generateForwardMessageContent,
generateMessageIDV2,
generateWAMessageFromContent,
normalizeMessageContent,
prepareWAMessageMedia,
proto,
WAMessageStubType,
WA_DEFAULT_EPHEMERAL
}
from '@whiskeysockets/baileys'


//import * as link_preview_1 from '@whiskeysockets/baileys/Utils/index.js'
//remplace fromObjetc => create

export function makeWASocket(connectionOptions, options = {}) {
/**
* @type {import('@whiskeysockets/baileys').WASocket | import('@whiskeysockets/baileys').WALegacySocket}
*/
const store = options.inMstore
let conn = (_makeWaSocket)(connectionOptions);
let sock = Object.defineProperties(conn, {
chats: {
value: {...(options.chats || {})},
writable: true,
},
decodeJid: {
value(jid) {
if (!jid || typeof jid !== 'string') return (!nullish(jid) && jid) || null;
return jid.decodeJid();
},
},
lidToJid: {
/**
* lid --> jid support string
* @param string text
* @param m msg
* @returns @param string@s.whatsapp.net
*/
value(string, chatjid) {
try {
if (/(\d{5,20})@lid/g.test(string)) {
const rawIds = [...string.matchAll(/(\d{5,20})@lid/g)].map(v => v[0].endsWith(lid) ? v[0] : v[1])
if (chatjid.endsWith(userID) ) {
return string
}
if (chatjid.endsWith(groupID)) {
const groupMetadata = conn.chats[chatjid].metadata
const isLidGroup = groupMetadata.addressingMode === 'lid'
if (isLidGroup) {
const participants = groupMetadata?.participants || []
const lidToJidMap = {}
for (const { id, phoneNumber } of participants) {
if (id && phoneNumber) {
const lidNum = id
lidToJidMap[lidNum] = phoneNumber
}
}
for (const lidNum of rawIds) {
const realJid = lidToJidMap[lidNum]
if (realJid) {
string = string.replaceAll(lidNum, realJid)
}
}
return string
} else {
return string
}
}
} else {
return string
}
} catch (error) {
console.log('lidToJid error:', error.stack)
return error
}
},
enumerable: true,
writable: true,
},
lidToJidPromises: {
/**
* lid --> jid support string
* @param string text
* @param m msg
* @returns @param string@s.whatsapp.net
*/
async value(string, chatjid) {
try {
if (/(\d{5,20})@lid/g.test(string)) {
const rawIds = [...string.matchAll(/(\d{5,20})@lid/g)].map(v => v[0])
if (chatjid.endsWith(userID) ) {
return string
}
if (chatjid.endsWith(groupID)) {

const groupMetadata = (await conn.groupMetadata(chatjid))
const isLidGroup = groupMetadata.addressingMode === 'lid'
if (isLidGroup) {
const participants = groupMetadata?.participants || []
const lidToJidMap = {}
for (const { id, phoneNumber } of participants) {
if (id && phoneNumber) {
const lidNum = id
lidToJidMap[lidNum] = phoneNumber
}
}
for (const lidNum of rawIds) {
const realJid = lidToJidMap[lidNum]
if (realJid) {
string = string.replaceAll(lidNum, realJid)
}
}
return string
} else {
return string
}
}
} else {
return string
}
} catch (error) {
console.log('lidToJidPromises error:', error.stack)
}

},
enumerable: true,
writable: true,
},
textTagsLidToJid: {
/**
* textTagsLidToJid
* @params text, m
*/
value(text, chatId) {
try {
if (!/@(\d{5,20})/g.test(text)) return text

const rawIds = [...text.matchAll(/@(\d{5,20})/g)].map(v => v[1])
if (chatId.endsWith(userID)) return text

if (!chatId.endsWith(groupID)) return text

const groupMetadata = conn.chats[chatId].metadata
const isLidGroup = groupMetadata.addressingMode === 'lid'
if (!isLidGroup) return text

const participants = groupMetadata?.participants || []
const lidToJidMap = {}

for (const { id, phoneNumber } of participants) {
if (groupMetadata?.isCommunityAnnounce) continue
if (id && phoneNumber) {
const lidNum = id.split('@')[0]
lidToJidMap[lidNum] = phoneNumber
}
}

let newText = text
for (const lidNum of rawIds) {
const realJid = lidToJidMap[lidNum]
if (realJid) {
newText = newText.replaceAll(`@${lidNum}`, `@${realJid.split('@')[0]}`)
}
}

return newText
} catch (error) {
console.log('textTagsLidToJid error:', error.stack)
return text
}
},
enumerable: true,
writable: true,
},
textTagsLidToJidPromises: {
/**
* textTagsLidToJid
* @params text, m
*/
async value(text, chatId) {
try {
if (!/@(\d{5,20})/g.test(text)) return text
const rawIds = [...text.matchAll(/@(\d{5,20})/g)].map(v => v[1])
if (chatId.endsWith(userID)) return text

if (!chatId.endsWith(groupID)) return text

const groupMetadata = await conn.groupMetadata(chatId)
const isLidGroup = groupMetadata.addressingMode === 'lid'
if (!isLidGroup) return text 
const participants = groupMetadata?.participants || []
const lidToJidMap = {}

for (const { id, phoneNumber } of participants) {
if (groupMetadata?.isCommunityAnnounce) continue
if (id && phoneNumber) {
const lidNum = id.split('@')[0]
lidToJidMap[lidNum] = phoneNumber
}
}

let newText = text
for (const lidNum of rawIds) {
const realJid = lidToJidMap[lidNum]
if (realJid) {
newText = newText.replaceAll(`@${lidNum}`, `@${realJid.split('@')[0]}`)
}
}

return newText
} catch (error) {
console.log('textTagsLidToJid error:', error.stack)
return text
}
},
writable: true,
},
langResponse: {
async value(text, userdb) {
if (userdb.lang === 'es') return text
if (userdb.lang) {
const mentions = [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => `@${v[1]}`)
try {
const {translate} = await import('@vitalets/google-translate-api')
let result = await translate(text, { to: userdb.lang, autoCorrect: true })
let mentionIndex = 0
text = result.text.replace(/@[\s\-]*([0-9\s\-]{5,20})/g, () => mentions[mentionIndex++] || '')
return text
} catch (e) {
console.log('langResponseError: ', e)
}
} else {
return text
}
}
},
formatNumberWA: {
value(string) {
let rawNumber = string.replace(/[^\d]/g, '')
let numero;
if (rawNumber.startsWith(52) && !rawNumber.startsWith('521')) {
numero = rawNumber.replace(/^52/, '521');
} else {
numero = rawNumber;
}
let newFormat = numero.replace(/\s+/g, '').match(/\d+/i).toString();
return newFormat
},
},
logger: {
get() {
return {
info(...args) {
console.log(
chalk.bold.bgRgb(51, 204, 51)('INFO '),
`[${chalk.rgb(255, 255, 255)(new Date().toLocaleTimeString('es-MX', {hour12: false, timeZoneName: 'long', timeZone: 'America/Mexico_City'}))}]:`,
chalk.cyan(format(...args)),
);
},
error(...args) {
console.log(
chalk.bold.bgRgb(247, 38, 33)('ERROR '),
`[${chalk.rgb(255, 255, 255)(new Date().toLocaleTimeString('es-MX', {hour12: false, timeZoneName: 'long', timeZone: 'America/Mexico_City'}))}]:`,
chalk.rgb(255, 38, 0)(format(...args)),
);
},
warn(...args) {
console.log(
chalk.bold.bgRgb(255, 153, 0)('WARNING '),
`[${chalk.rgb(255, 255, 255)(new Date().toLocaleTimeString('es-MX', {hour12: false, timeZoneName: 'long', timeZone: 'America/Mexico_City'}))}]:`,
chalk.redBright(format(...args)),
);
},
trace(...args) {
console.log(
chalk.grey('TRACE '),
`[${chalk.rgb(255, 255, 255)(new Date().toLocaleTimeString('es-MX', {hour12: false, timeZoneName: 'long', timeZone: 'America/Mexico_City'}))}]:`,
chalk.white(format(...args)),
);
},
debug(...args) {
console.log(
chalk.bold.bgRgb(66, 167, 245)('DEBUG '),
`[${chalk.rgb(255, 255, 255)(new Date().toLocaleTimeString('es-MX', {hour12: false, timeZoneName: 'long', timeZone: 'America/Mexico_City'}))}]:`,
chalk.white(format(...args)),
);
},
};
},
enumerable: true,
},
generateProfilePicture: {
/** Profile Image
*
* @param {Buffer} Buffer (Only Image)
* @param {Numeric} Width
* @param {Numeric} Height
*/
async value(buffer) {
const jimp_1 = await Jimp.read(buffer);
const resz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(550, Jimp.AUTO) : jimp_1.resize(Jimp.AUTO, 650)
const jimp_2 = await Jimp.read(await resz.getBufferAsync(Jimp.MIME_JPEG));
return {
img: await resz.getBufferAsync(Jimp.MIME_JPEG)
}}
},
resize: {
/** Resize Image
* @param {Buffer} Buffer (Only Image)
* @param {Numeric} Width
* @param {Numeric} Height
*/
async value(image, width, height) {
let readImg = await Jimp.read(image)
let resizeImg = await readImg.resize(width, height).getBufferAsync(Jimp.MIME_JPEG)
return resizeImg
}
},
sendPayment: {
async value(jid, amount, text, quoted, options) {
conn.relayMessage(jid, {
requestPaymentMessage: {
currencyCodeIso4217: 'PEN',
amount1000: amount,
requestFrom: null,
noteMessage: {
extendedTextMessage: {
text: text,
contextInfo: {
externalAdReply: {
showAdAttribution: true,
}, mentionedJid: conn.parseMention(text)}}}}}, {});
},
},
getFile: {
/**
* getBuffer hehe
* @param {fs.PathLike} PATH
* @param {Boolean} saveToFile
*/
async value(PATH, saveToFile = false) {
let res, filename;
const data = Buffer.isBuffer(PATH) ? PATH : PATH instanceof ArrayBuffer ? PATH.toBuffer() : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0);
if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer');
const type = await fileTypeFromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin',
};
if (data && saveToFile && !filename) (filename = temp + new Date * 1 + '.' + type.ext, await fs.promises.writeFile(filename, data));
return {
res,
filename,
...type,
data,
deleteFile() {
return filename && fs.promises.unlink(filename);
},
};
},
enumerable: true,
},
waitEvent: {
/**
* waitEvent
* @param {String} eventName
* @param {Boolean} is
* @param {Number} maxTries
*/
value(eventName, is = () => true, maxTries = 25) { //Idk why this exist?
return new Promise((resolve, reject) => {
let tries = 0;
const on = (...args) => {
if (++tries > maxTries) reject('Max tries reached');
else if (is()) {
conn.ev.off(eventName, on);
resolve(...args);
}
};
conn.ev.on(eventName, on);
});
},
},
getTypeMessage: {
value(msg) {
if (msg.viewOnceMessage) {
return conn.getTypeMessage(msg.viewOnceMessage.message);
}
else if (msg.viewOnceMessageV2) {
return conn.getTypeMessage(msg.viewOnceMessageV2.message);
}
else if (msg.viewOnceMessageV2Extension) {
return conn.getTypeMessage(msg.viewOnceMessageV2Extension.message);
}
else if (msg.ephemeralMessage) {
return conn.getTypeMessage(msg.ephemeralMessage.message);
}
else if (msg.documentWithCaptionMessage) {
return conn.getTypeMessage(msg.documentWithCaptionMessage.message);
}
else if (msg.reactionMessage) {
return 'reaction';
}
else if (msg.pollCreationMessage || msg.pollCreationMessageV2 || msg.pollCreationMessageV3 || msg.pollUpdateMessage) {
return 'poll';
}
else if (conn.getMediaType(msg)) {
return 'media';
}
else {
return 'text';
}
}
},
getMessageType: {
value(message) {
if (message.pollCreationMessage || message.pollCreationMessageV2 || message.pollCreationMessageV3 || message.pollUpdateMessage) {
return 'poll';
}
return 'text';
}
},
getMediaType: {
value(message) {
if (message.imageMessage) {
return 'image';
}
else if (message.videoMessage) {
return message.videoMessage.gifPlayback ? 'gif' : 'video';
}
else if (message.audioMessage) {
return message.audioMessage.ptt ? 'ptt' : 'audio';
}
else if (message.contactMessage) {
return 'vcard';
}
else if (message.documentMessage) {
return 'document';
}
else if (message.contactsArrayMessage) {
return 'contact_array';
}
else if (message.liveLocationMessage) {
return 'livelocation';
}
else if (message.stickerMessage) {
return 'sticker';
}
else if (message.listMessage) {
return 'list';
}
else if (message.listResponseMessage) {
return 'list_response';
}
else if (message.buttonsResponseMessage) {
return 'buttons_response';
}
else if (message.orderMessage) {
return 'order';
}
else if (message.productMessage) {
return 'product';
}
else if (message.interactiveResponseMessage) {
return 'native_flow_response';
}
else if (message.groupInviteMessage) {
return 'url';
}
}
},
relayWAMessage: {
async value(jid, message, { messageId: msgId, participant, additionalAttributes, additionalNodes, useUserDevicesCache, useCachedGroupMetadata, statusJidList, userdb }) {
const { logger, linkPreviewImageThumbnailWidth, generateHighQualityLinkPreview, options: axiosOptions, patchMessageBeforeSending, cachedGroupMetadata} = connectionOptions;
var _a;
const meId = conn.authState.creds.me.id;
let shouldIncludeDeviceIdentity = false;
const { user, server } = (0, jidDecode)(jid);
const statusJid = 'status@broadcast';
const isGroup = server === 'g.us';
const isNewsletter = server == 'newsletter';
const isStatus = jid === statusJid;
const isLid = server === 'lid';
msgId = msgId || (0, generateMessageIDV2)((_a = sock.user) === null || _a === void 0 ? void 0 : _a.id);
useUserDevicesCache = useUserDevicesCache !== false;
useCachedGroupMetadata = useCachedGroupMetadata !== false && !isStatus;
const participants = [];
const destinationJid = (!isStatus) ? (0, jidEncode)(user, isLid ? 'lid' : isGroup ? 'g.us' : isNewsletter ? 'newsletter' : 's.whatsapp.net') : statusJid;
const binaryNodeContent = [];
const devices = [];
const meMsg = {
deviceSentMessage: {
destinationJid,
message
}
};
const extraAttrs = {};
if (participant) {
// when the retry request is not for a group
// only send to the specific device that asked for a retry
// otherwise the message is sent out to every device that should be a recipient
if (!isGroup && !isStatus) {
additionalAttributes = { ...additionalAttributes, 'device_fanout': 'false' };
}
const { user, device } = (0, jidDecode)(participant.jid);
devices.push({ user, device });
}
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
await conn.authState.keys.transaction(async () => {
const mediaType = conn.getMediaType(message);
if (mediaType) {
extraAttrs['mediatype'] = mediaType;
}
if ((_a = (0, normalizeMessageContent)(message)) === null || _a === void 0 ? void 0 : _a.pinInChatMessage) {
extraAttrs['decrypt-fail'] = 'hide';
}
if (isGroup || isStatus) {
const [groupData, senderKeyMap] = await Promise.all([
(async () => {
let groupData = useCachedGroupMetadata && cachedGroupMetadata ? await cachedGroupMetadata(jid) : undefined;
if (groupData && Array.isArray(groupData === null || groupData === void 0 ? void 0 : groupData.participants)) {
logger.trace({ jid, participants: groupData.participants.length }, 'using cached group metadata');
}
if (!groupData && !isStatus) {
groupData = await conn.groupMetadata(jid);
}
return groupData;
})(),
(async () => {
if (!participant && !isStatus) {
const result = await conn.authState.keys.get('sender-key-memory', [jid]);
return result[jid] || {};
}
return {};
})()
]);
if (!participant) {
const participantsList = (groupData && !isStatus) ? groupData.participants.map(p => p.id) : [];
if (isStatus && statusJidList) {
participantsList.push(...statusJidList);
}
if (!isStatus) {
additionalAttributes = {
...additionalAttributes,
addressing_mode: (groupData === null || groupData === void 0 ? void 0 : groupData.addressingMode) || 'pn'
};
}
const additionalDevices = await conn.getUSyncDevices(participantsList, !!useUserDevicesCache, false);
devices.push(...additionalDevices);
}
const patched = await patchMessageBeforeSending(message);
if (Array.isArray(patched)) {
throw new Boom('Per-jid patching is not supported in groups');
}
const bytes = (0, encodeWAMessage)(patched);
const { ciphertext, senderKeyDistributionMessage } = await conn.signalRepository.encryptGroupMessage({
group: destinationJid,
data: bytes,
meId,
}).catch(purgeSession(options.folderPath));
const senderKeyJids = [];
// ensure a connection is established with every device
for (const { user, device } of devices) {
const jid = (0, jidEncode)(user, (groupData === null || groupData === void 0 ? void 0 : groupData.addressingMode) === 'lid' ? 'lid' : 's.whatsapp.net', device);
if (!senderKeyMap[jid] || !!participant) {
senderKeyJids.push(jid);
// store that this person has had the sender keys sent to them
senderKeyMap[jid] = true;
}
}
// if there are some participants with whom the session has not been established
// if there are, we re-send the senderkey
if (senderKeyJids.length) {
logger.debug({ senderKeyJids }, 'sending new sender key');
const senderKeyMsg = {
senderKeyDistributionMessage: {
axolotlSenderKeyDistributionMessage: senderKeyDistributionMessage,
groupId: destinationJid
}
};
await conn.assertSessions(senderKeyJids, false);
const result = await conn.createParticipantNodes(senderKeyJids, senderKeyMsg, extraAttrs);
shouldIncludeDeviceIdentity = shouldIncludeDeviceIdentity || result.shouldIncludeDeviceIdentity;
participants.push(...result.nodes);
}
binaryNodeContent.push({
tag: 'enc',
attrs: { v: '2', type: 'skmsg' },
content: ciphertext
});
await conn.authState.keys.set({ 'sender-key-memory': { [jid]: senderKeyMap } });
} else if (isNewsletter) {
// Message edit
if ((_b = message.protocolMessage) === null || _b === void 0 ? void 0 : _b.editedMessage) {
msgId = (_c = message.protocolMessage.key) === null || _c === void 0 ? void 0 : _c.id;
message = message.protocolMessage.editedMessage;
}
// Message delete
if (((_d = message.protocolMessage) === null || _d === void 0 ? void 0 : _d.type) === proto.Message.ProtocolMessage.Type.REVOKE) {
msgId = (_e = message.protocolMessage.key) === null || _e === void 0 ? void 0 : _e.id;
message = {};
}
const patched = await patchMessageBeforeSending(message, []);
if (Array.isArray(patched)) {
throw new Boom('Per-jid patching is not supported in channel');
}
const bytes = (0, encodeNewsletterMessage)(patched);
binaryNodeContent.push({
tag: 'plaintext',
attrs: mediaType ? { mediatype: mediaType } : {},
content: bytes
});
} else {
const { user: meUser } = (0, jidDecode)(meId);
//, device: meDevice
if (!participant) {
devices.push({ user });
// do not send message to self if the device is 0 (mobile)
if (user !== meUser) {
//meDevice !== undefined && meDevice !== 0
devices.push({ user: meUser });
}
if ((additionalAttributes === null || additionalAttributes === void 0 ? void 0 : additionalAttributes['category']) !== 'peer') {
const additionalDevices = await conn.getUSyncDevices([meId, jid], !!useUserDevicesCache, true);
devices.push(...additionalDevices);
}
}
const allJids = [];
const meJids = [];
const otherJids = [];
for (const { user, device } of devices) {
const isMe = user === meUser;
const jid = (0, jidEncode)(isMe && isLid ? ((_g = (_f = authState.creds) === null || _f === void 0 ? void 0 : _f.me) === null || _g === void 0 ? void 0 : _g.lid.split(':')[0]) || user : user, isLid ? 'lid' : 's.whatsapp.net', device);
if (isMe) {
meJids.push(jid);
}
else {
otherJids.push(jid);
}
allJids.push(jid);
}
await conn.assertSessions(allJids, false);
const [{ nodes: meNodes, shouldIncludeDeviceIdentity: s1 }, { nodes: otherNodes, shouldIncludeDeviceIdentity: s2 }] = await Promise.all([
conn.createParticipantNodes(meJids, meMsg, extraAttrs),
conn.createParticipantNodes(otherJids, message, extraAttrs)
]);
participants.push(...meNodes);
participants.push(...otherNodes);
shouldIncludeDeviceIdentity = shouldIncludeDeviceIdentity || s1 || s2;
}
if (participants.length) {
if ((additionalAttributes === null || additionalAttributes === void 0 ? void 0 : additionalAttributes['category']) === 'peer') {
const peerNode = (_j = (_h = participants[0]) === null || _h === void 0 ? void 0 : _h.content) === null || _j === void 0 ? void 0 : _j[0];
if (peerNode) {
binaryNodeContent.push(peerNode); // push only enc
}
} else {
binaryNodeContent.push({
tag: 'participants',
attrs: {},
content: participants
});
}
}
const stanza = {
tag: 'message',
attrs: {
id: msgId,
type: isNewsletter ? conn.getTypeMessage(message) : conn.getMessageType(message),
//'text'
...(additionalAttributes || {})
},
content: binaryNodeContent
};
// if the participant to send to is explicitly specified (generally retry recp)
// ensure the message is only sent to that person
// if a retry receipt is sent to everyone -- it'll fail decryption for everyone else who received the msg
if (participant) {
if ((0, isJidGroup)(destinationJid)) {
stanza.attrs.to = destinationJid;
stanza.attrs.participant = participant.jid;
}
else if ((0, areJidsSameUser)(participant.jid, meId)) {
stanza.attrs.to = participant.jid;
stanza.attrs.recipient = destinationJid;
}
else {
stanza.attrs.to = participant.jid;
}
}
else {
stanza.attrs.to = destinationJid;
}
if (shouldIncludeDeviceIdentity) {
stanza.content.push({
tag: 'device-identity',
attrs: {},
content: (0, encodeSignedDeviceIdentity)(conn.authState.creds.account, true)
});
logger.debug({ jid }, 'adding device identity');
}
const buttonType = conn.getButtonType(message);
if (buttonType) {
stanza.content.push({
tag: 'biz',
attrs: {},
content: [
{
tag: buttonType,
attrs: conn.getButtonArgs(message),
}
]
});
logger.debug({ jid }, 'adding business node');
}
if (additionalNodes && additionalNodes.length > 0) {
stanza.content.push(...additionalNodes);
} else {
if (((0, isJidGroup)(jid) || (0, isLidUser)(jid) || (0, isPnUser)(jid)) && (((_l = (_k = message === null || message === void 0 ? void 0 : message.viewOnceMessage) === null || _k === void 0 ? void 0 : _k.message) === null || _l === void 0 ? void 0 : _l.interactiveMessage) || ((_o = (_m = message === null || message === void 0 ? void 0 : message.viewOnceMessageV2) === null || _m === void 0 ? void 0 : _m.message) === null || _o === void 0 ? void 0 : _o.interactiveMessage) || ((_q = (_p = message === null || message === void 0 ? void 0 : message.viewOnceMessageV2Extension) === null || _p === void 0 ? void 0 : _p.message) === null || _q === void 0 ? void 0 : _q.interactiveMessage) || (message === null || message === void 0 ? void 0 : message.interactiveMessage)) || (((_s = (_r = message === null || message === void 0 ? void 0 : message.viewOnceMessage) === null || _r === void 0 ? void 0 : _r.message) === null || _s === void 0 ? void 0 : _s.buttonsMessage) || ((_u = (_t = message === null || message === void 0 ? void 0 : message.viewOnceMessageV2) === null || _t === void 0 ? void 0 : _t.message) === null || _u === void 0 ? void 0 : _u.buttonsMessage) || ((_w = (_v = message === null || message === void 0 ? void 0 : message.viewOnceMessageV2Extension) === null || _v === void 0 ? void 0 : _v.message) === null || _w === void 0 ? void 0 : _w.buttonsMessage) || (message === null || message === void 0 ? void 0 : message.buttonsMessage))) {
stanza.content.push({
tag: 'biz',
attrs: {},
content: [{
tag: 'interactive',
attrs: {
type: 'native_flow',
v: '1'
},
content: [{
tag: 'native_flow',
attrs: { name: 'quick_reply' }
}]
}]
});
}
}
logger.debug({ msgId }, `sending message to ${participants.length} devices`);
await conn.sendNode(stanza);
});
if (message) {
conn.sendPresenceUpdate('paused', jid)
return msgId;
}
}
},
getButtonType: {
value(message) {
if (message.buttonsMessage) {
return 'buttons';
}
else if (message.buttonsResponseMessage) {
return 'buttons_response';
}
else if (message.interactiveResponseMessage) {
return 'interactive_response';
}
else if (message.listMessage) {
return 'list';
}
else if (message.listResponseMessage) {
return 'list_response';
}
}
},
getButtonArgs: {
value(message) {
var ListType = proto.Message.ListMessage.ListType;
if (message.templateMessage) {
// TODO: Add attributes
return {};
}
else if (message.listMessage) {
const type = message.listMessage.listType;
if (!type) {
throw new Boom('Expected list type inside message');
}
return { v: '2', type: ListType[type].toLowerCase() };
}
else {
return {};
}
}
},
sendFile: {
/**
* Send Media/File with Automatic Type Specifier
* @param {String} jid
* @param {String|Buffer} path
* @param {String} filename
* @param {String} caption
* @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} quoted
* @param {Boolean} ptt
* @param {Object} options
*/
async value(jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) {
const { toAudio } = await import('./converter.js');;
const type = await conn.getFile(path, true);
let {res, data: file, filename: pathFile} = type;
if (res && res.status !== 200 || file.length <= 65536) {
try {
throw {json: JSON.parse(file.toString())};
} catch (e) {
if (e.json) throw e.json;
}
}
// const fileSize = fs.statSync(pathFile).size / 1024 / 1024
// if (fileSize >= 100) throw new Error('File size is too big!')
const opt = {};
if (quoted) opt.quoted = quoted;
if (!type) options.asDocument = true;
let mtype = '', mimetype = options.mimetype || type.mime, convert;
const durationByText = {ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}
const durationOffText = {ephemeralExpiration: 2 * 60 * 1000 }
if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker', Object.assign(opt, durationOffText);
else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image', Object.assign(opt, durationByText);
else if (/video/.test(type.mime)) mtype = 'video', Object.assign(opt, durationByText);
else if (/audio/.test(type.mime)) {
(
convert = await toAudio(file, type.ext),
file = convert.data,
pathFile = convert.filename,
mtype = 'audio',
mimetype = options.mimetype || 'audio/mpeg; codecs=opus'
);
Object.assign(opt, durationOffText)
} else mtype = 'document';
if (options.asDocument) mtype = 'document', Object.assign(opt, durationByText);

delete options.asSticker;
delete options.asLocation;
delete options.asVideo;
delete options.asDocument;
delete options.asImage;

const message = {
...options,
caption,
ptt,
[mtype]: {url: pathFile},
mimetype,
fileName: filename || pathFile.split('/').pop(),
};
/**
* @type {import('@whiskeysockets/baileys').proto.WebMessageInfo}
*/
let m;
try {
m = await conn.sendMessage(jid, message, {...opt, ...options});
} catch (e) {
console.error(e);
m = null;
} finally {
if (!m) m = await conn.sendMessage(jid, {...message, [mtype]: file}, {...opt, ...options});
file = null; // releasing the memory
return m;
}
},
enumerable: true,
},
reply: {
/**
* Reply to a message
* @param {String} jid
* @param {String|Buffer} text
* @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} quoted
* @param {Object} options
*/
async value(jid, text = '', quoted, options) {
return Buffer.isBuffer(text) ? conn.sendFile(jid, text, 'file', '', quoted, false, options) : conn.sendMessage(jid, {...options, text}, {quoted, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100, ...options});
},
},
sendButton: {
/**
* send Button
* @param {String} jid
* @param {Object} messageObject = {@param {String} title, @param {String} subtitle, @param {String} text, @param {String} footer}
* @param {Object} options = {@param {url} buffer, @param {Object} object}
* @param {Arrays[][]} buttons
* @param {Object} userdb
* @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} quoted
*/
async value(jid, messageObject, options = {}, buttons, userdb, quoted) {
const {default: crypto} = await import('crypto')
let {title = null, subtitle = null, text = '', footer = ''} = messageObject || {}
text = await conn.langResponse(text, userdb)
footer = await conn.langResponse(footer, userdb)
const { url = null, object = null } = options || {};
let imageMessage, videoMessage, documentMessage, locationMessage, headerType, header = {}, contextInfo, messageContextInfo, nativeFlowMessage, messageContent, image = false, video = false, document = false, location = false, product = false
await conn.writing(jid, text);
const isBuffer = Buffer.isBuffer(url);
const isString = typeof url === 'string';
if (isBuffer) {
const type = await fileTypeFromBuffer(url) || {};
try {
if (/^image\//i.test(type.mime)) {
imageMessage = await prepareWAMessageMedia(
{ image: url }, 
{ upload: conn.waUploadToServer }
)
image = true
} else if (/^video\//i.test(type.mime)) {
videoMessage = await prepareWAMessageMedia(
{ video: url }, 
{ upload: conn.waUploadToServer }
)
video = true
} else if (/^document\//i.test(type.mime)) {
documentMessage = await prepareWAMessageMedia(
{ document: url, mimetype: type.mime, fileName: "archivo." + type.ext }, 
{ upload: conn.waUploadToServer }
)
document = true
}
} catch (error) {
console.error("Error al obtener el tipo de archivo:", error);
}
} else if (isString) {
if (/^https?:\/\//i.test(url)) {
try {
const response = await fetch(url)
const contentType = response.headers.get('content-type')
if (/^image\//i.test(contentType)) {
imageMessage = await prepareWAMessageMedia({ image: { url: url } }, { upload: conn.waUploadToServer })
image = true
} else if (/^video\//i.test(contentType)) {
videoMessage = await prepareWAMessageMedia({ video: { url: url } }, { upload: conn.waUploadToServer })
video = true
} else if (/^document\//i.test(contentType)) {
documentMessage = await prepareWAMessageMedia({ video: { url: url } }, { upload: conn.waUploadToServer })
document = true
} else {
console.error("Tipo MIME no compatible:", contentType)
}
} catch (error) {
console.error("Error al obtener el tipo MIME:", error)
}
} else {
try {
const type = await conn.getFile(url)
if (/^image\//i.test(type.mime)) {
imageMessage = await prepareWAMessageMedia({ image: { url: url } }, { upload: conn.waUploadToServer })
image = true
} else if (/^video\//i.test(type.mime)) {
videoMessage = await prepareWAMessageMedia({ video: { url: url } }, { upload: conn.waUploadToServer })
video = true
} else if (/^document\//i.test(type.mime)) {
documentMessage = await prepareWAMessageMedia({ video: { url: url } }, { upload: conn.waUploadToServer })
document = true
}
} catch (error) {
console.error("Error al obtener el tipo de archivo:", error);
}
}
}
if (typeof object === 'object' && object !== null) {
if (/location(Message)?/g.test(Object.keys(object)[0].toLowerCase())) {
const message = {[Object.keys(object)[0]]: object[Object.keys(object)]}
locationMessage = generateWAMessageFromContent(jid, message, {userJid: conn.user.jid})
location = true
}
if (/document(Message)?/g.test(Object.keys(object)[0].toLowerCase())) {

const message = {[Object.keys(object)[0]]: object[Object.keys(object)]}
documentMessage = message
document = true
}
if (/order(Message)?/g.test(Object.keys(object)[0].toLowerCase())) {
imageMessage = await prepareWAMessageMedia({ image: { url: url } }, { upload: conn.waUploadToServer })
nativeFlowMessage = proto.Message.InteractiveMessage.NativeFlowMessage.create({buttons: [{buttonParamsJson: JSON.stringify(buttons
), name: "review_and_pay"}], messageVersion: 1})
messageContextInfo = {messageSecret: crypto.randomBytes(32)}
product = true
}
}
if (!url && options === null) {
header = {
hasMediaAttachment: false,
};
headerType = 1
}
if (document) {
header = {
hasMediaAttachment: true,
documentMessage
};
headerType = 2
}
if (video) {
header = {
hasMediaAttachment: true,
...videoMessage
};
headerType = 3
}
if (image) {
header = {
hasMediaAttachment: true,
...imageMessage
};
headerType = 4
}
if (product && options !== null && object) {
header = {
title: title,
subtitle: subtitle,
hasMediaAttachment: true,
jpegThumbnail: imageMessage.imageMessage.jpegThumbnail
};
headerType = 5
}
if (location) {
header = {
hasMediaAttachment: true,
locationMessage
};
headerType = 6
}

if (!product) {
const isArrayButtons = Array.isArray(buttons) && Array.isArray(buttons[0]);
const parsedButtons = isArrayButtons ? await Promise.all(buttons.map(async btn => {
let [text, id] = Array.isArray(btn) ? btn : [btn, btn];
text = await conn.langResponse(text, userdb)
return {
name: 'quick_reply',
buttonParamsJson: JSON.stringify({
display_text: text,
id: id
})
};
})) : [];
nativeFlowMessage = proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: parsedButtons,
messageParamsJson: ''
})
messageContextInfo = {
deviceListMetadata: {},
mentionedJid: conn.parseMention(text),
deviceListMetadataVersion: 2
}
contextInfo = { 
mentionedJid: conn.parseMention(text),
...options?.contextInfo
}
}
const interactiveMessagePayLoad = {
body: proto.Message.InteractiveMessage.Body.create({text}),
footer: proto.Message.InteractiveMessage.Footer.create({text: footer}),
header: proto.Message.InteractiveMessage.Header.create(header),
nativeFlowMessage,
contextInfo,
headerType
}
if (!product) {
}
const interactiveMessage = proto.Message.InteractiveMessage.create(interactiveMessagePayLoad);
!product ? messageContent = proto.Message.create({
viewOnceMessage: {
message: {
messageContextInfo,
interactiveMessage
}
}
}) : messageContent = proto.Message.create({
message: {
messageContextInfo,
interactiveMessage
}
});

return conn.sendInteractiveResponse(jid, messageContent, quoted);
},
enumerable: true,
},
sendList: {
async value(jid, messageList, userdb, quoted) {
let {title, text, buffer, buttonText, footer, sections, options} = messageList
title = await conn.langResponse(title, userdb)
text = await conn.langResponse(text, userdb)
buttonText = await conn.langResponse(buttonText, userdb)
footer = await conn.langResponse(footer, userdb)
let media = options?.media || null;

await conn.writing(jid, text);
if (/^https?:\/\//i.test(buffer)) {
try {
const response = await fetch(buffer);
const contentType = response.headers.get('content-type');
if (/^image\//i.test(contentType)) {
media = await prepareWAMessageMedia({ image: { url: buffer } }, { upload: conn.waUploadToServer, ...options });
} else if (/^video\//i.test(contentType)) {
media = await prepareWAMessageMedia({ video: { url: buffer } }, { upload: conn.waUploadToServer, ...options });
}
} catch (error) {
console.error("Failed to get MIME type:", error);
}
} else {
try {
const type = await conn.getFile(buffer);
if (/^image\//i.test(type.mime)) {
media = await prepareWAMessageMedia({ image: type.data }, { upload: conn.waUploadToServer, ...options });
} else if (/^video\//i.test(type.mime)) {
media = await prepareWAMessageMedia({ video: type.data }, { upload: conn.waUploadToServer, ...options });
}
} catch (error) {
console.error("Failed to get file type:", error);
}
}
const listSections = await Promise.all(
sections.map(async (section) => ({
...(section.title && { title: await conn.langResponse(section.title, userdb) }),
rows: await Promise.all(
section.rows.map(async (row) => {
const translatedRow = { id: row.id }

if (row.title) translatedRow.title = await conn.langResponse(row.title, userdb)
if (row.description) translatedRow.description = await conn.langResponse(row.description, userdb)
if (row.header) translatedRow.header = await conn.langResponse(row.header, userdb)

return translatedRow
})
)
}))
)
const interactiveMessage = proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({text}),
footer: proto.Message.InteractiveMessage.Footer.create({text: footer}),
header: title || title.header.hasMediaAttachment ? proto.Message.InteractiveMessage.Header.create({
title: title,
subtitle: text,
hasMediaAttachment: !!media,
...media
}) : title,
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: buttonText,
sections: listSections
})
}
],
messageParamsJson: ''
}),
mentions: typeof text === 'string' ? conn.parseMention(text) : [],
contextInfo: { 
mentionedJid: conn.parseMention(text),
...options?.contextInfo }
});
const messageContent = proto.Message.create({
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage
}
}
});

return conn.sendInteractiveResponse(jid, messageContent, quoted);
}
},
sendInteractiveResponse: {
async value(jid, messageContent, quoted) {
let msg = generateWAMessageFromContent(jid, messageContent, { userJid: conn.user.jid, quoted: quoted, upload: conn.waUploadToServer, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
return conn.relayWAMessage(jid, msg.message, { messageId: msg.key.id});
}
},
sendCarousel: {
/**
* Send carouselMessage
*/
async value(jid, text = '', footer = '', text2 = '', messages, quoted, options) {
if (messages.length > 1) {
await conn.writing(jid, text);
const cards = await Promise.all(messages.map(async ([text = '', footer = '', buffer, buttons, copy, urls, list ]) => {
let img, video;
if (/^https?:\/\//i.test(buffer)) {
try {
const response = await fetch(buffer);
const contentType = response.headers.get('content-type');
if (/^image\//i.test(contentType)) {
img = await prepareWAMessageMedia({
image: {
url: buffer
}
}, {
upload: conn.waUploadToServer,
...options
});
} else if (/^video\//i.test(contentType)) {
video = await prepareWAMessageMedia({
video: {
url: buffer
}
}, {
upload: conn.waUploadToServer,
...options
});
} else {
console.error("Incompatible MIME types:", contentType);
}
} catch (error) {
console.error("Failed to get MIME type:", error);
}
} else {
try {
const type = await conn.getFile(buffer);
if (/^image\//i.test(type.mime)) {
img = await prepareWAMessageMedia({
image: (/^https?:\/\//i.test(buffer)) ? {
url: buffer
} : (type && type?.data)
}, {
upload: conn.waUploadToServer,
...options
});
} else if (/^video\//i.test(type.mime)) {
video = await prepareWAMessageMedia({
video: (/^https?:\/\//i.test(buffer)) ? {
url: buffer
} : (type && type?.data)
}, {
upload: conn.waUploadToServer,
...options
});
}
} catch (error) {
console.error("Failed to get file type:", error);
}
}
const dynamicButtons = []
if (buttons !== null) {
buttons.map(btn => (
dynamicButtons.push({
name: 'quick_reply',
buttonParamsJson: JSON.stringify({
display_text: btn[0],
id: btn[1]
}),
})
));
}
if (copy !== null) {
copy = Array.isArray(copy) ? copy : [copy]
copy.map(copy => {
dynamicButtons.push({
name: 'cta_copy',
buttonParamsJson: JSON.stringify({
display_text: 'Copy',
copy_code: copy[0]
})
});
});
}
if (urls !== null) {
urls?.forEach(url => {
dynamicButtons.push({
name: 'cta_url',
buttonParamsJson: JSON.stringify({
display_text: url[0],
url: url[1],
merchant_url: url[1]
})
});
});
}
if (list !== null) {
list?.forEach(lister => {
dynamicButtons.push({
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: lister[0],
sections: lister[1]
})
});
})
}
console.dir(dynamicButtons, {depth: null})
return {
body: proto.Message.InteractiveMessage.Body.create({
text: text || ''
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: footer || info.np
}),
header: proto.Message.InteractiveMessage.Header.create({
title: text2,
subtitle: text || '',
hasMediaAttachment: img?.imageMessage || video?.videoMessage ? true : false,
imageMessage: img?.imageMessage || null,
videoMessage: video?.videoMessage || null
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: dynamicButtons.filter(Boolean),
messageParamsJson: ''
}),
...Object.assign({
mentions: typeof text === 'string' ? conn.parseMention(text || '@0') : [],
contextInfo: {
mentionedJid: typeof text === 'string' ? conn.parseMention(text || '@0') : [],
}
}, {
...(options || {}),
...(conn.temareply?.contextInfo && {
contextInfo: {
...(options?.contextInfo || {}),
...conn.temareply?.contextInfo,
externalAdReply: {
...(options?.contextInfo?.externalAdReply || {}),
...conn.temareply?.contextInfo?.externalAdReply,
},
},
})
})
};
}));
const interactiveMessage = proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({
text: text || ''
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: footer || info.np
}),
header: proto.Message.InteractiveMessage.Header.create({
title: text || '',
subtitle: text || '',
hasMediaAttachment: false
}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({
cards,
}),
...Object.assign({
mentions: typeof text === 'string' ? conn.parseMention(text || '@0') : [],
contextInfo: {
mentionedJid: typeof text === 'string' ? conn.parseMention(text || '@0') : [],
}
}, {
...(options || {}),
...(conn.temareply?.contextInfo && {
contextInfo: {
...(options?.contextInfo || {}),
...conn.temareply?.contextInfo,
externalAdReply: {
...(options?.contextInfo?.externalAdReply || {}),
...conn.temareply?.contextInfo?.externalAdReply,
},
},
})
})
});
const messageContent = proto.Message.create({
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage
}
}
});
const msgs = generateWAMessageFromContent(jid, messageContent, {
userJid: conn.user.jid,
quoted: quoted,
upload: conn.waUploadToServer,
ephemeralExpiration: WA_DEFAULT_EPHEMERAL
});
return conn.relayWAMessage(jid, msgs.message, {messageId: msgs.key.id});
} else {
return conn.sendNCarousel(jid, ...messages[0], quoted, options);
}
}
}, 
sendNCarousel: {
async value(jid, text = '', footer = '', buffer, buttons, copy, urls, list, quoted, options) {
let img, video;
if (buffer) {
if (/^https?:\/\//i.test(buffer)) {
try {
const response = await fetch(buffer);
const contentType = response.headers.get('content-type');
if (/^image\//i.test(contentType)) {
img = await prepareWAMessageMedia({
image: {
url: buffer
}
}, {
upload: conn.waUploadToServer,
...options
});
} else if (/^video\//i.test(contentType)) {
video = await prepareWAMessageMedia({
video: {
url: buffer
}
}, {
upload: conn.waUploadToServer,
...options
});
} else {
console.error("Incompatible MIME type:", contentType);
}
} catch (error) {
console.error("Failed to get MIME type:", error);
}
} else {
try {
const type = await conn.getFile(buffer);
if (/^image\//i.test(type.mime)) {
img = await prepareWAMessageMedia({
image: (/^https?:\/\//i.test(buffer)) ? {
url: buffer
} : (type && type?.data)
}, {
upload: conn.waUploadToServer,
...options
});
} else if (/^video\//i.test(type.mime)) {
video = await prepareWAMessageMedia({
video: (/^https?:\/\//i.test(buffer)) ? {
url: buffer
} : (type && type?.data)
}, {
upload: conn.waUploadToServer,
...options
});
}
} catch (error) {
console.error("Failed to get file type:", error);
}
}
}
const dynamicButtons = buttons.map(btn => ({
name: 'quick_reply',
buttonParamsJson: JSON.stringify({
display_text: btn[0],
id: btn[1]
}),
}));
dynamicButtons.push(
(copy && (typeof copy === 'string' || typeof copy === 'number')) ? {
name: 'cta_copy',
buttonParamsJson: JSON.stringify({
display_text: 'Copy',
copy_code: copy
})
} : null);
urls?.forEach(url => {
dynamicButtons.push({
name: 'cta_url',
buttonParamsJson: JSON.stringify({
display_text: url[0],
url: url[1],
merchant_url: url[1]
})
});
});
list?.forEach(lister => {
dynamicButtons.push({
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: lister[0],
sections: lister[1]
})
});
})
const interactiveMessage = {
body: {
text: text || ''
},
footer: {
text: footer 
},
header: {
hasMediaAttachment: img?.imageMessage || video?.videoMessage ? true : false,
imageMessage: img?.imageMessage || null,
videoMessage: video?.videoMessage || null
},
nativeFlowMessage: {
buttons: dynamicButtons.filter(Boolean),
messageParamsJson: ''
},
...Object.assign({
mentions: typeof text === 'string' ? conn.parseMention(text || '@0') : [],
contextInfo: {
mentionedJid: typeof text === 'string' ? conn.parseMention(text || '@0') : [],
}
}, {
...(options || {}),
...(conn.temareply?.contextInfo && {
contextInfo: {
...(options?.contextInfo || {}),
...conn.temareply?.contextInfo,
externalAdReply: {
...(options?.contextInfo?.externalAdReply || {}),
...conn.temareply?.contextInfo?.externalAdReply,
},
},
})
})
};
const messageContent = proto.Message.create({
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage
}
}
});
const msgs = generateWAMessageFromContent(jid, messageContent, {
userJid: conn.user.jid,
quoted: quoted,
upload: conn.waUploadToServer,
ephemeralExpiration: WA_DEFAULT_EPHEMERAL
});
return conn.relayWAMessage(jid, msgs.message, {
messageId: msgs.key.id
});
}
}, 
sendButtonMessages: {
/**
* Send nativeFlowMessage
*/
async value(jid, messages, quoted, options) {
messages.length > 1 ? await conn.sendCarousel(jid, messages, quoted, options) : await conn.sendNCarousel(
jid, ...messages[0], quoted, options);
}
}, 
sendPoll: {
async value(jid, name = '', optiPoll, options) {
if (!Array.isArray(optiPoll[0]) && typeof optiPoll[0] === 'string') optiPoll = [optiPoll];
if (!options) options = {};
const pollMessage = {
name: name,
options: optiPoll.map((btn) => ({
optionName: !nullish(btn[0]) && btn[0] || '',
})),
selectableOptionsCount: 1,
};
return conn.relayMessage(jid, {pollCreationMessage: pollMessage}, {messageId: msgs.key.id, ...options});
},
},
cMod: {
/**
* cMod
* @param {String} jid
* @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} message
* @param {String} text
* @param {String} sender
* @param {*} options
* @returns
*/
value(jid, message, text = '', sender = conn.user.jid, options = {}) {
conn.writing(jid, text);
if (options.mentions && !Array.isArray(options.mentions)) options.mentions = [options.mentions];
const copy = JSON.parse(JSON.stringify(message));
delete copy.message.messageContextInfo;
delete copy.message.senderKeyDistributionMessage;
const mtype = Object.keys(copy.message)[0];
const msg = copy.message;
const content = msg[mtype];
if (typeof content === 'string') msg[mtype] = text || content;
else if (content.caption) content.caption = text || content.caption;
else if (content.text) content.text = text || content.text;
if (typeof content !== 'string') {
msg[mtype] = {...content, ...options};
msg[mtype].contextInfo = {
...(content.contextInfo || {}),
mentionedJid: options.mentions || content.contextInfo?.mentionedJid || [],
groupMentions: options.gpmentions || content.contextInfo?.groupMentions || []
};
}
if (copy.participant) sender = copy.participant = sender || copy.participant;
else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid;
else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid;
copy.key.remoteJid = jid;
copy.key.fromMe = areJidsSameUser(sender, conn.user.id) || false;
return proto.WebMessageInfo.create(copy);
},
enumerable: true,
},
copyNForward: {
/**
* Exact Copy Forward
* @param {String} jid
* @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} message
* @param {Boolean|Number} forwardingScore
* @param {Object} options
*/
async value(jid, message, forwardingScore = true, options = {}) {
let vtype;
if (options.readViewOnce && message.message.viewOnceMessage?.message) {
vtype = Object.keys(message.message.viewOnceMessage.message)[0];
delete message.message.viewOnceMessage.message[vtype].viewOnce;
message.message = proto.Message.create(
JSON.parse(JSON.stringify(message.message.viewOnceMessage.message)),
);
message.message[vtype].contextInfo = message.message.viewOnceMessage.contextInfo;
}
const mtype = Object.keys(message.message)[0];
let m = generateForwardMessageContent(message, !!forwardingScore);
const ctype = Object.keys(m)[0];
if (forwardingScore && typeof forwardingScore === 'number' && forwardingScore > 1) m[ctype].contextInfo.forwardingScore += forwardingScore;
m[ctype].contextInfo = {
...(message.message[mtype].contextInfo || {}),
...(m[ctype].contextInfo || {}),
};
m = generateWAMessageFromContent(jid, m, {
...options,
userJid: conn.user.jid,
});
await conn.relayMessage(jid, m.message, {messageId: m.key.id, additionalAttributes: {...options}});
return m;
},
enumerable: true,
},
fakeReply: {
/**
* Fake Replies
* @param {String} jid
* @param {String|Object} text
* @param {String} fakeJid
* @param {String} fakeText
* @param {String} fakeGroupJid
* @param {String} options
*/
value(jid, text = '', fakeJid = this.user.jid, fakeText = '', fakeGroupJid, options) {
conn.writing(jid, text);
return conn.reply(jid, text, {key: {fromMe: areJidsSameUser(fakeJid, conn.user.id), participant: fakeJid, ...(fakeGroupJid ? {remoteJid: fakeGroupJid} : {})}, message: {conversation: fakeText}, ...options});
},
},
downloadM: {
/**
* Download media message
* @param {Object} m
* @param {String} type
* @param {fs.PathLike | fs.promises.FileHandle} saveToFile
* @return {Promise<fs.PathLike | fs.promises.FileHandle | Buffer>}
*/
async value(m, type, saveToFile) {
let filename;
if (!m || !(m.url || m.directPath)) return Buffer.alloc(0);
const stream = await downloadContentFromMessage(m, type);
let buffer = Buffer.from([]);
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}
if (saveToFile) ({filename} = await conn.getFile(buffer, true));
return saveToFile && fs.existsSync(filename) ? filename : buffer;
},
enumerable: true,
},
parseMention: {
/**
* Parses string into mentionedJid(s)
* @param {String} text
* @return {Array<String>}
*/
value(text = '') {

const allTags = [...text.matchAll(/@(\d{5,20}(?:-\d+)?)(@g\.us)?/g)];
const userNumbers = allTags.filter(([, , g]) => !g) .map(([match, number]) => number + userID);
return userNumbers;
},
enumerable: true
},
parseGroupMention: {
/**
* Parses string into mentionedJid(s)
* @param {String} text
* @return {Array<String>}
*/
async value(text = '') {
const jidsGp = [...text.matchAll(/@([0-9]{5,20}(?:-\d+)?@g\.us)/g)].map((v) => v[1])
if (jidsGp.length > 0) {
await options.dbGroups.read()
} 
const groupMentions = await Promise.all(jidsGp.map(async (jidGp) => ({
groupJid: jidGp,
groupSubject: (options.dbGroups.data[jidGp]?.subject == undefined ? store.chats[jidGp]?.subject === undefined ? jidGp.replace(groupID, '') : store.chats[jidGp].subject : options.dbGroups.data[jidGp].subject) || 'Group' || await conn.getName(jidGp)//!
}
))
)
return groupMentions;
},
enumerable: true,
},
getName: {
/**
* Get name from jid
* @param {String} jid
* @param {Boolean} withoutContact
*/
value(jid = '', withoutContact = false) {
jid = conn.decodeJid(jid);
withoutContact = conn.withoutContact || withoutContact;
let v;
if (jid.endsWith('@g.us')) {
return new Promise(async (resolve) => {
v = await store.fetchGroupMetadata(jid, conn.groupMetadata) || conn.chats[jid] || {};
//if (!(v.name || v.subject)) v = await conn.groupMetadata(jid) || {};
resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'));
});
} else {
v = jid === '0@s.whatsapp.net' ? {
jid,
vname: 'WhatsApp',
} : areJidsSameUser(jid, conn.user.id) ?
conn.user :
(store.chats[jid] || conn.chats[jid] || {});
}
return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
},
enumerable: true,
writable: true,
},
loadMessage: {
/**
*
* @param {String} messageID
* @returns {import('@whiskeysockets/baileys').proto.WebMessageInfo}
*/
value(messageID) {
let load = store.loadMessage(messageID) || Object.entries(conn.chats)
.filter(([_, {messages}]) => typeof messages === 'object')
.find(([_, {messages}]) => Object.entries(messages)
.find(([k, v]) => (k === messageID || v.key?.id === messageID)))
?.[1].messages?.[messageID]
if (load === undefined) load = store.loadMessage(messageID) || options.libstore.loadMessage(messageID)
return load;
},
enumerable: true,
writable: true,
},
sendTemplateButtonLoc: {
async value(jid, buffer, contentText, footer, buttons1, row1, quoted, options) {
let file = await conn.resize(buffer, 300, 150)
const template = generateWAMessageFromContent(jid, proto.Message.create({
templateMessage: {
hydratedTemplate: {
locationMessage: { jpegThumbnail: file },
hydratedContentText: contentText,
hydratedFooterText: footer,
...options,
hydratedButtons: [{
urlButton: {
displayText: info.gitAuthor,
url: info.repoProyect
}
},
{
quickReplyButton: {
displayText: buttons1,
id: row1
}
}]
}
}
}), { userJid: conn.user.jid, quoted: quoted, contextInfo: { mentionedJid: conn.parseMention(contentText + footer) }, ephemeralExpiration: "86400", ...options });
return conn.relayMessage(
jid,
template.message,
{ messageId: template.key.id }
)
}},
sendGroupV4Invite: {
/**
* sendGroupV4Invite
* @param {String} jid
* @param {*} participant
* @param {String} inviteCode
* @param {Number} inviteExpiration
* @param {String} groupName
* @param {String} caption
* @param {Buffer} jpegThumbnail
* @param {*} options
*/
async value(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', caption = 'Invitation to join my WhatsApp group', jpegThumbnail, options = {}) {
const msg = proto.Message.create({
groupInviteMessage: proto.GroupInviteMessage.create({
inviteCode,
inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
groupJid: jid,
groupName: (groupName ? groupName : await conn.getName(jid)) || null,
jpegThumbnail: Buffer.isBuffer(jpegThumbnail) ? jpegThumbnail : null,
caption,
}),
});
const message = generateWAMessageFromContent(participant, msg, options);
await conn.relayMessage(participant, message.message, {messageId: message.key.id, additionalAttributes: {...options}});
return message;
},
enumerable: true,
},
processMessageStubType: {
/**
* to process MessageStubType
* @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} m
*/
async value(m) {
if (!m.messageStubType) return;
const chat = conn.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || '');
if (!chat || chat === 'status@broadcast') return;
const emitGroupUpdate = (update) => {
conn.ev.emit('groups.update', [{id: chat, ...update}]);
};
switch (m.messageStubType) {
case WAMessageStubType.REVOKE:
case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
//if (m.messageStubParameters && m.messageStubParameters[0]) {
emitGroupUpdate({revoke: m && m.messageStubParameters && m.messageStubParameters[0]});
//}
break;
case WAMessageStubType.GROUP_CHANGE_ICON:
//if (m.messageStubParameters && m.messageStubParameters[0]) {
emitGroupUpdate({icon: m && m.messageStubParameters && m.messageStubParameters[0]});
//}
break;
default: {
console.log({
messageStubType: m.messageStubType,
messageStubParameters: m.messageStubParameters,
type: WAMessageStubType[m.messageStubType],
});
break;
}
}
const isGroup = chat.endsWith('@g.us');
if (!isGroup) return;
let chats = conn.chats[chat];
if (!chats) chats = conn.chats[chat] = {id: chat};
chats.isChats = true;
const metadata = await conn.groupMetadata(chat).catch((_) => null);
if (!metadata) return;
chats.subject = metadata.subject;
chats.metadata = metadata;
},
},
insertAllGroup: {
async value() {
const groups = await conn.groupFetchAllParticipating().catch((_) => null) || {};
for (const group in groups) conn.chats[group] = {...(conn.chats[group] || {}), id: group, subject: groups[group].subject, isChats: true, metadata: groups[group]};
return conn.chats;
},
},
pushMessage: {
/**
* pushMessage
* @param {import('@whiskeysockets/baileys').proto.WebMessageInfo[]} m
*/
async value(m) {
if (!m) return;
if (!Array.isArray(m)) m = [m];
for (const message of m) {
try {
// if (!(message instanceof proto.WebMessageInfo)) continue // https://github.com/adiwajshing/Baileys/pull/696/commits/6a2cb5a4139d8eb0a75c4c4ea7ed52adc0aec20f
if (!message) continue;
if (message.messageStubType && message.messageStubType != WAMessageStubType.CIPHERTEXT) conn.processMessageStubType(message).catch(console.error);
const _mtype = Object.keys(message.message || {});
const mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(_mtype[0]) && _mtype[0]) ||
(_mtype.length >= 3 && _mtype[1] !== 'messageContextInfo' && _mtype[1]) ||
_mtype[_mtype.length - 1];
const chat = conn.decodeJid(message.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '');
if (message.message?.[mtype]?.contextInfo?.quotedMessage) {
/**
* @type {import('@whiskeysockets/baileys').proto.IContextInfo}
*/
const context = message.message[mtype].contextInfo;
let participant = conn.decodeJid(context.participant);
const remoteJid = conn.decodeJid(context.remoteJid || participant);
/**
* @type {import('@whiskeysockets/baileys').proto.IMessage}
*
*/
const quoted = message.message[mtype].contextInfo.quotedMessage;
if ((remoteJid && remoteJid !== 'status@broadcast') && quoted) {
let qMtype = Object.keys(quoted)[0];
if (qMtype == 'conversation') {
quoted.extendedTextMessage = {text: quoted[qMtype]};
delete quoted.conversation;
qMtype = 'extendedTextMessage';
}
if (!quoted[qMtype].contextInfo) quoted[qMtype].contextInfo = {};
quoted[qMtype].contextInfo.mentionedJid = context.mentionedJid || quoted[qMtype].contextInfo.mentionedJid || [];
const isGroup = remoteJid.endsWith('g.us');
if (isGroup && !participant) participant = remoteJid;
const qM = {
key: {
remoteJid,
fromMe: areJidsSameUser(conn.user.jid, remoteJid),
id: context.stanzaId,
participant,
},
message: JSON.parse(JSON.stringify(quoted)),
...(isGroup ? {participant} : {}),
};

let qChats = conn.chats[participant];
if (!qChats) qChats = conn.chats[participant] = {id: participant, isChats: !isGroup};
if (!qChats.messages) qChats.messages = {};
if (!qChats.messages[context.stanzaId] && !qM.key.fromMe) qChats.messages[context.stanzaId] = qM;
let qChatsMessages;
if ((qChatsMessages = Object.entries(qChats.messages)).length > 40) qChats.messages = Object.fromEntries(qChatsMessages.slice(30, qChatsMessages.length)); // maybe avoid memory leak
}
}
if (!chat || chat === 'status@broadcast') continue;
const isGroup = chat.endsWith('@g.us');
let chats = conn.chats[chat];
if (!chats) {
if (isGroup) await conn.insertAllGroup().catch(console.error);
chats = conn.chats[chat] = {id: chat, isChats: true, ...(conn.chats[chat] || {})};
}
let metadata; let sender;
if (isGroup) {
if (!chats.subject || !chats.metadata) {
metadata = await conn.groupMetadata(chat).catch((_) => ({})) || {};
if (!chats.subject) chats.subject = metadata.subject || '';
if (!chats.metadata) chats.metadata = metadata;
}
sender = conn.decodeJid(message.key?.fromMe && conn.user.id || message.participant || message.key?.participant || chat || '');
if (sender !== chat) {
let chats = conn.chats[sender];
if (!chats) chats = conn.chats[sender] = {id: sender};
if (!chats.name) chats.name = message.pushName || chats.name || '';
}
} else if (!chats.name) chats.name = message.pushName || chats.name || '';
if (['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype)) continue;
chats.isChats = true;
if (!chats.messages) chats.messages = {};
const fromMe = message.key.fromMe || areJidsSameUser(sender || chat, conn.user.id);
if (!['protocolMessage'].includes(mtype) && !fromMe && message.messageStubType != WAMessageStubType.CIPHERTEXT && message.message) {
delete message.message.messageContextInfo;
delete message.message.senderKeyDistributionMessage;
chats.messages[message.key.id] = JSON.parse(JSON.stringify(message, null, 2));
let chatsMessages;
if ((chatsMessages = Object.entries(chats.messages)).length > 40) chats.messages = Object.fromEntries(chatsMessages.slice(30, chatsMessages.length));
}
} catch (e) {
console.error(e);
}
}
/*
*/

}
},
writing: {
async value(jid, text) {
if (typeof text !== 'string' || text === undefined) return
await conn.presenceSubscribe(jid);
let txt = '';
let count = 0;
const minDelay = 0
const maxDelay = 10
const longTextThereshold = 300
const delayPerChar = Math.max(minDelay, maxDelay - Math.min(text.length, longTextThereshold) * (maxDelay / longTextThereshold))
for (const c of text) {
await new Promise(resolve => setTimeout(resolve, delayPerChar));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , jid);
}
}
return txt;
},
},
recording: {
async value(jid, filePath) {
await conn.presenceSubscribe(jid);
const isBuffer = Buffer.isBuffer(filePath);
const { fileTypeFromBuffer } = await import('file-type')
const {extToMime} = await import('./constants.js')
const {ext, mime} = isBuffer ? await fileTypeFromBuffer(filePath) || {} : {ext: path.extname(filePath).slice(1), mime: extToMime[path.extname(filePath).slice(1)]};
const tempFilePath = path.join(temp, `${Date.now()}.${ext}`);
isBuffer ? !fs.existsSync(tempFilePath) ? fs.writeFileSync(tempFilePath, filePath) : tempFilePath : filePath
const file = fs.existsSync(tempFilePath) ? tempFilePath : filePath
const stats = fs.statSync(file).size / 1024;
const fileSizeInMiliSeconds = Math.round((stats / 112) * 1000);
for (let i = 0; i < fileSizeInMiliSeconds; i++) {
await new Promise(resolve => setTimeout(resolve, 1));

if ((i + 1) % 10 === 0) {
await conn.sendPresenceUpdate('recording', jid);
}
}
return {tempFilePath, ext, mime, file, stats, isBuffer}
},
},
sendWritingTest: {
async value(jid, text, quoted) {
await conn.writing(jid, text);
await conn.sendPresenceUpdate('paused', jid);
return conn.sendMessage(jid, { text: text.trim(), mentions: conn.parseMention(text) }, {quoted: quoted, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
},
enumerable: true
},
sendWritingText: {
async value(jid, text, userdb, quoted) {
text = await conn.langResponse(text, userdb)
await conn.writing(jid, text);
await conn.sendPresenceUpdate('paused', jid);
return conn.sendMessage(jid, { text: text.trim(), mentions: conn.parseMention(text) }, {quoted: quoted, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
},
enumerable: true
},
sendEditWritingText: {
async value(jid, text, key, userdb, quoted) {
text = await conn.langResponse(text, userdb)
await conn.writing(jid, text);
await conn.sendPresenceUpdate('paused', jid);
return conn.sendMessage(jid, { text: text, edit: key, mentions: conn.parseMention(text) }, {quoted: quoted, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
},
enumerable: true
},
sendWritingTextCI: {
async value(jid, text, contextInfo = {}, userdb, quoted) {
text = await conn.langResponse(text, userdb)
await conn.writing(jid, text);
await conn.sendPresenceUpdate('paused', jid);
return conn.sendMessage(jid, { text: text.trim(), contextInfo: contextInfo, mentions: conn.parseMention(text) }, {quoted: quoted, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
},
enumerable: true
},
sendImageWriting: {
async value(jid, image, text, userdb, quoted) {
const isBuffer = Buffer.isBuffer(image);
const tempFilePath = path.join(temp, `${Date.now()}.jpg`);
isBuffer ? !fs.existsSync(tempFilePath) ? fs.writeFileSync(tempFilePath, image) : tempFilePath : image
//isBuffer && 
const file = fs.existsSync(tempFilePath) ? tempFilePath : image
text = await conn.langResponse(text, userdb)
await conn.writing(jid, text)
await conn.sendPresenceUpdate('paused', jid);
const msg = await conn.sendMessage(jid, { image: {url: file}, caption: text.trim(), mentions: conn.parseMention(text) }, {quoted: quoted, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
fs.existsSync(tempFilePath) ? await clearTmp(parseDuration('3m')) : null
return msg
},
enumerable: true
},
sendDocumentWriting: {
async value(jid, doc, message, userdb, quoted) {
let {caption = '', mimetype = null, fileName = '', fileLength = 0, pageCount = 0 } = message
let contextInfo = {...(message.contextInfo || {})}
const type = mimetype.replace(`application/`, '')
const isBuffer = Buffer.isBuffer(doc);
const tempFilePath = path.join(temp, `temp_file.${type}`);
isBuffer ? !fs.existsSync(tempFilePath) ? fs.writeFileSync(tempFilePath, doc) : tempFilePath : doc
const file = fs.existsSync(tempFilePath) ? tempFilePath : doc
if (message?.caption) {
await conn.writing(jid, caption)
caption = await conn.langResponse(caption, userdb)
}
await conn.sendPresenceUpdate('paused', jid);
const msg = await conn.sendMessage(jid, {document: { url: file }, caption, mimetype, fileName, fileLength, pageCount, contextInfo}, { quoted, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
fs.existsSync(tempFilePath) ? await clearTmp(parseDuration('3m')) : clearTmp()
return msg
},
enumerable: true
},
sendWAMessageWriting: {
async value(jid, message, userdb, quoted) {
const isBuffer = Buffer.isBuffer(image);
const tempFilePath = path.join(temp, `${Date.now()}.jpg`);
isBuffer ? !fs.existsSync(tempFilePath) ? fs.writeFileSync(tempFilePath, image) : tempFilePath : image
//isBuffer && 
const file = fs.existsSync(tempFilePath) ? tempFilePath : image
text = await conn.langResponse(text, userdb)
if (message?.text) await conn.writing(jid, text)
await conn.sendPresenceUpdate('paused', jid);
const msg = await conn.sendMessage(jid, message, {quoted: quoted, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
fs.existsSync(tempFilePath) ? await clearTmp(parseDuration('3m')) : clearTmp()
return msg
},
enumerable: true
},
sendSticker: {
async value(jid, file, options = {}, quoted) {
const fs = await import('fs');
const path = await import('path');
const { ffmpeg } = await import('./converter.js');
const { fileTypeFromBuffer } = await import('file-type');
const { sticker: funcSticker } = await import('./sticker.js');
const temp = (await import('../config.js')).temp;

let contextInfo = options.contextInfo;
let stickerBuffer;
const isBuffer = Buffer.isBuffer(file);
const isString = typeof file === 'string';
let conv
if (isBuffer) {
const type = await fileTypeFromBuffer(file) || {};
if (type.mime === 'image/webp') {
stickerBuffer = file;
} else {
conv = await ffmpeg(file, [
'-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,' +
'format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1'
], type.ext, 'webp');
stickerBuffer = conv.data;
}

if (options.packname || options.wm) {
stickerBuffer = await funcSticker(stickerBuffer, false, options.packname, options.wm);
}

} else if (isString) {
if (/^https?:\/\//i.test(file)) {
const fetch = (await import('node-fetch')).default;
const res = await fetch(file);
if (!res.ok) throw new Error(`Error al descargar: ${await res.text()}`);
const buffer = Buffer.from(await res.arrayBuffer());

const type = await fileTypeFromBuffer(buffer) || {};
if (type.mime === 'image/webp' && !(options.packname || options.wm)) {
stickerBuffer = buffer;
} else {
conv = await ffmpeg(buffer, [
'-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,' +
'format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1'
], type.ext, 'webp');
stickerBuffer = conv.data;

if (options.packname || options.wm) {
stickerBuffer = await funcSticker(stickerBuffer, false, options.packname, options.wm);
}
}
} else if (fs.existsSync(file)) {
const buffer = await fs.promises.readFile(file);
const type = await fileTypeFromBuffer(buffer) || {};

if (type.mime === 'image/webp' && !(options.packname || options.wm)) {
stickerBuffer = buffer;
} else {
conv = await ffmpeg(buffer, [
'-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,' +
'format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1'
], type.ext, 'webp');
stickerBuffer = conv.data;

if (options.packname || options.wm) {
stickerBuffer = await funcSticker(stickerBuffer, false, options.packname, options.wm);
}
}
} else {
throw new Error('Ruta inválida o archivo no encontrado');
}
} else {
throw new Error('Tipo de archivo no válido (ni buffer ni ruta ni URL)');
}

const msg = await conn.sendMessage(jid, { sticker: stickerBuffer, mimetype: 'image/webp', asSticker: true, contextInfo }, { quoted, ephemeralExpiration: 2 * 60 * 1000 });
fs.existsSync(conv.filename) ? await clearTmp(parseDuration('3m')) : clearTmp()
return msg
},
enumerable: true
},
sendAudio: {
async value(jid, filePath, quoted) {
const isBuffer = Buffer.isBuffer(filePath);
const tempFilePath = path.join(temp, `${Date.now()}.mp3`);
fs.writeFileSync(tempFilePath, filePath)
const file = isBuffer && fs.existsSync(tempFilePath) ? tempFilePath : filePath
const msg = await conn.sendMessage(jid, {audio: { url: file }, fileName: 'error.mp3', mimetype: 'audio/mp4'}, {quoted: quoted, ephemeralExpiration: 2*60*1000})
fs.existsSync(tempFilePath) ? await clearTmp(parseDuration('3m')) : clearTmp()
return msg
},
enumerable: true
},
sendAudioRecording: {
async value(jid, filePath, quoted) {
const isBuffer = Buffer.isBuffer(filePath);
const tempFilePath = path.join(temp, `${Date.now()}.mp3`);
fs.writeFileSync(tempFilePath, filePath)
const file = isBuffer && fs.existsSync(tempFilePath) ? tempFilePath : filePath
const {mime} = await conn.recording(jid, file)
const msg = await conn.sendMessage(jid, {audio: { url: file }, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: quoted, ephemeralExpiration: 2*60*1000})
fs.existsSync(tempFilePath) ? await clearTmp(parseDuration('3m')) : clearTmp()
return msg
},
enumerable: true
},
sendVideoWriting: {
async value (jid, video, text, userdb, quoted) {
const isBuffer = Buffer.isBuffer(video);
const tempFilePath = path.join(temp, `${Date.now()}.mp4`);
isBuffer ? !fs.existsSync(tempFilePath) ? fs.writeFileSync(tempFilePath, video) : tempFilePath : video
const file = fs.existsSync(tempFilePath) ? tempFilePath : video
text = await conn.langResponse(text, userdb)
await conn.writing(jid, text)
const msg = await conn.sendMessage(jid, { video: {url: file}, caption: text.trim(), mentions: conn.parseMention(text), mimetype: 'video/mp4', caption: text }, {userJid: conn.user.jid, quoted: quoted, ephemeralExpiration: 2*60*1000 } )
fs.existsSync(tempFilePath) ? await clearTmp(parseDuration('3m')) : clearTmp()
return msg
}
},
sendContact: {
/**
* Send Contact
* @param {String} jid
* @param {String[][]|String[]} data
* @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} quoted
* @param {Object} options
*/
async value(jid, data, quoted, options) {
if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data];
const contacts = [];
for (let [number, name] of data) {
number = number.replace(/[^0-9]/g, '');
const njid = number + '@s.whatsapp.net';
const biz = await conn.getBusinessProfile(njid).catch((_) => null) || {};
const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name.replace(/\n/g, '\\n')};;;
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}${biz.description ? `
X-WA-BIZ-NAME:${(conn.chats[njid]?.vname || conn.getName(njid) || name).replace(/\n/, '\\n')}
X-WA-BIZ-DESCRIPTION:${biz.description.replace(/\n/g, '\\n')}
`.trim() : ''}
END:VCARD
`.trim();
contacts.push({vcard, displayName: name});
}
return conn.sendMessage(jid, {...options, contacts: {...options, displayName: (contacts.length >= 2 ? `${contacts.length} kontak` : contacts[0].displayName) || null, contacts}}, {quoted, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100, ...options});
},
enumerable: true,
},
sendContactArray: {
/**
* Send Contact Array
* @param {String} jid 
* @param {String} number 
* @param {String} name 
* @param {Object} quoted 
* @param {Object} options 
*/
async value(jid, data, quoted, options) {
if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
let contacts = []
let buttons = []
for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5, ...extraLinks] of data) {
number = number.replace(/[^0-9]/g, '')
let njid = number + '@s.whatsapp.net'
let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {};
let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
${isi2 ? `item2.EMAIL;type=INTERNET:${isi2}\nitem2.X-ABLabel:📧 Email` : ''}
${isi3 ? `item3.ADR:;;${isi3};;;;\nitem3.X-ABADR:ac \nitem3.X-ABLabel:📍 Region` : ''}
${isi4 ? `item4.URL;type=pref:${isi4}\nitem4.X-ABLabel:Website` : ''}
${extraLinks.map((link, index) => link ? `item${index + 5}.URL;type=pref:${link}\nitem${index + 5}.X-ABLabel:Extra Link ${index + 1}` : '').join('\n')}
${isi5 ? `${extraLinks.length > 0 ? `item${extraLinks.length + 5}` : 'item5'}.X-ABLabel:${isi5}` : ''}
END:VCARD`.trim()

let newButtons = extraLinks.map((link, index) => ({
buttonId: `extra-link-${index + 1}`,
buttonText: { displayText: `Extra Link ${index + 1}` },
type: 1,
url: `http://${link}`
}))
buttons.push(...newButtons)

contacts.push({ vcard, displayName: name })
}

let displayName = null
if (contacts.length === 1) {
displayName = contacts[0].displayName
} else if (contacts.length > 1) {
displayName = `${contacts.length} kontak`
}

let contactsWithButtons = []
for (let i = 0; i < contacts.length; i++) {
let contact = contacts[i]
let contactButtons = buttons.filter(button => button.buttonId.startsWith(`extra-link-${i + 1}`))
contactsWithButtons.push({ ...contact, ...{ buttons: contactButtons } })
}

return await conn.sendMessage(jid, {contacts: { displayName, contacts: contactsWithButtons
}}, {quoted, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100, ...options})
}
},
sendContacts: {
/**
 * Send Contact (Unified)
 * @param {String} jid
 * @param {String[][]|String[]} data
 * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} quoted
 * @param {Object} options
 */
async value(jid, data, quoted) {
let {array, options = null} = data
if (!Array.isArray(array[0]) && typeof array[0] === 'string') array = [array];
const contacts = [];
const buttons = [];

for (let item of array) {
let [number, name, isi, isi1, isi2, isi3, isi4, isi5, ...extraLinks] = item;
number = number.replace(/[^0-9]/g, '');
const njid = number + '@s.whatsapp.net';
const biz = await conn.getBusinessProfile(njid).catch(_ => null) || {};

// Construcción del vCard
let vcard = `BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
X-ABLabel:${name}
${isi ? `item.ORG:${isi}` : ''}
${isi1 ? `item1.X-ABLabel:${isi1}` : ''}
${isi2 ? `item2.EMAIL;type=INTERNET:${isi2}\nitem2.X-ABLabel:📧 Email` : ''}
${isi3 ? `item3.ADR:;;${isi3};;;;\nitem3.X-ABADR:ac\nitem3.X-ABLabel:📍 Region` : ''}
${isi4 ? `item4.URL;type=pref:${isi4}\nitem4.X-ABLabel:Website` : ''}
${extraLinks.map((link, index) => link ? `item${index + 5}.URL;type=pref:${link}\nitem${index + 5}.X-ABLabel:Extra Link ${index + 1}` : '').join('\n')}
${isi5 ? `${extraLinks.length > 0 ? `item${extraLinks.length + 5}` : 'item5'}.X-ABLabel:${isi5}` : ''}
${biz.description ? `X-WA-BIZ-NAME:${(conn.chats[njid]?.vname || conn.getName(njid) || name).replace(/\n/, '\\n')}\nX-WA-BIZ-DESCRIPTION:${biz.description.replace(/\n/g, '\\n')}` : ''}
END:VCARD`.trim();

contacts.push({ vcard, displayName: name });

// Botones opcionales
const newButtons = extraLinks.map((link, index) => ({
buttonId: `extra-link-${index + 1}`,
buttonText: { displayText: `Extra Link ${index + 1}` },
type: 1,
url: `http://${link}`
}));
buttons.push(...newButtons);
}

// Si no hay contactos, enviar mensaje informativo
if (contacts.length === 0) {
return await conn.sendMessage(jid, {
text: 'No se encontraron contactos para enviar.',
}, { quoted, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100, ...options });
}

// Preparar contactos con botones si existen
const contactsWithButtons = contacts.map((contact, i) => {
const contactButtons = buttons.filter(btn => btn.buttonId.startsWith(`extra-link-${i + 1}`));
return { ...contact, ...(contactButtons.length ? { buttons: contactButtons } : {}) };
});

const displayName = contacts.length === 1 ? contacts[0].displayName : `${contacts.length} kontak`;
const interactiveMessage = {
type: 'contacts',
contacts: {
displayName,
contacts: contactsWithButtons
}
};

const messageContent = proto.Message.create({
  viewOnceMessage: {
    message: {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2
      },
      interactiveMessage
    }
  }
});

// y luego
return conn.sendInteractiveResponse(jid, messageContent, quoted);
return await conn.sendMessage(jid, {contacts: { displayName, contacts: contactsWithButtons}}, { quoted, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100, ...options});
},
enumerable: true,
},
sendReact: {
async value(jid, emot, key) {
await conn.sendMessage(jid, { react: { text: emot, key }});
},
enumerable: true
},
deleteMessage: {
async value(jid, key) {
return conn.sendMessage(jid, { delete: key})
},
enumerable: true
},
serializeM: {
/**
* Serialize Message, so it easier to manipulate
* @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} m
*/
value(m) {
return smsg(conn, m);
},
},
...(typeof conn.chatRead !== 'function' ? {
chatRead: {
/**
* Read message
* @param {String} jid
* @param {String|undefined|null} participant
* @param {String} messageID
*/
value(jid, participant = conn.user.jid, messageID) {
return conn.sendReceipt(jid, participant, [messageID]);
},
enumerable: true,
},
} : {}),
...(typeof conn.setStatus !== 'function' ? {
setStatus: {
/**
* setStatus bot
* @param {String} status
*/
value(status) {
return conn.query({
tag: 'iq',
attrs: {
to: S_WHATSAPP_NET,
type: 'set',
xmlns: 'status',
},
content: [
{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8'),
},
],
});
},
enumerable: true,
},
} : {}),
});
if (sock.user?.id) sock.user.jid = sock.decodeJid(sock.user.id);
if (sock.chats && sock.chats !== store.chats) {
Object.assign(store.chats, sock.chats)
}


if (sock.messages && sock.messages !== store.messages) {
Object.assign(store?.messages, sock.messages)
}
return sock;
}
/**
* Serialize Message
* @param {ReturnType<typeof makeWASocket>} conn
* @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} m
* @param {Boolean} hasParent
*/
export function smsg(conn, m, hasParent) {
if (!m) return m;
/**
* @type {import('@whiskeysockets/baileys').proto.WebMessageInfo}
*/
const M = proto.WebMessageInfo;
m = M.create(m);
m.conn = conn;
let protocolMessageKey;
if (m.message) {
if (m.mtype == 'protocolMessage' && m.msg.key) {
protocolMessageKey = m.msg.key;
if (protocolMessageKey == 'status@broadcast') protocolMessageKey.remoteJid = m.chat;
if (!protocolMessageKey.participant || protocolMessageKey.participant == 'status_me') protocolMessageKey.participant = m.sender;
protocolMessageKey.fromMe = conn.decodeJid(protocolMessageKey.participant) === conn.decodeJid(conn.user.id);
if (!protocolMessageKey.fromMe && protocolMessageKey.remoteJid === conn.decodeJid(conn.user.id)) protocolMessageKey.remoteJid = m.sender;
}
if (m.quoted) if (!m.quoted.mediaMessage) delete m.quoted.download;
}
if (!m.mediaMessage) delete m.download;

try {
if (protocolMessageKey && m.mtype == 'protocolMessage') conn.ev.emit('message.delete', protocolMessageKey);
} catch (e) {
console.error(e);
}
return m;
}

// https://github.com/Nurutomo/wabot-aq/issues/490
export function serialize() {
const MediaType = ['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage'];
return Object.defineProperties(proto.WebMessageInfo?.prototype, {
conn: {
value: undefined,
enumerable: false,
writable: true,
},
id: {
get() {
return this.key?.id;
},
},
isBaileys: {
get() {
return this.id?.length === 16 || this.id?.startsWith('3EB0') && this.id?.length === 12 || false;
},
},
chat: {
get() {
const senderKeyDistributionMessage = this.message?.senderKeyDistributionMessage?.groupId;
return ( this.key?.remoteJid || (senderKeyDistributionMessage && senderKeyDistributionMessage !== 'status@broadcast') || '').decodeJid();
},
},
isGroup: {
get() {
return this.chat.endsWith('@g.us');
},
enumerable: true,
},
sender: {
get() {
if (!this.chat) return
const sender = this.isGroup ? this.key?.fromMe ? this.conn?.user.jid : this.key.participantAlt || this.key.participantPn || this.participant || this.key.participant : this.chat || '' 
return this.conn?.decodeJid(this.conn.lidToJid(sender, this.chat));
},
enumerable: true,
},
fromMe: {
get() {
return this.key?.fromMe || areJidsSameUser(this.conn?.user.id, this.sender) || false;
},
},
mtype: {
get() {
if (!this.message) return '';
const type = Object.keys(this.message);
return (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(type[0]) && type[0]) || // Sometimes message in the front
(type.length >= 3 && type[1] !== 'messageContextInfo' && type[1]) || // Sometimes message in midle if mtype length is greater than or equal to 3
type[type.length - 1]; // common case
},
enumerable: true,
},
msg: {
get() {
if (!this.message) return null;
return this.message[this.mtype];
},
},
mediaMessage: {
get() {
if (!this.message) return null;
const Message = ((this.msg?.url || this.msg?.directPath) ? {...this.message} : extractMessageContent(this.message)) || null;
if (!Message) return null;
const mtype = Object.keys(Message)[0];
return MediaType.includes(mtype) ? Message : null;
},
enumerable: true,
},
mediaType: {
get() {
let message;
if (!(message = this.mediaMessage)) return null;
return Object.keys(message)[0];
},
enumerable: true,
},
_text: {
value: null,
writable: true,
},
text: {
get() {
const msg = this.msg;
const text = (typeof msg === 'string' ? this.conn.textTagsLidToJid(msg, this.chat) : this.conn.textTagsLidToJid(msg?.text, this.chat)) || msg?.caption || msg?.contentText || '';
return typeof this._text === 'string' ? this._text : '' || (typeof text === 'string' ? text : (
text?.selectedDisplayText ||
text?.hydratedTemplate?.hydratedContentText ||
text
)) || '';
},
set(str) {
return this._text = str;
},
enumerable: true,
},
mentionedJid: {
get() {
const mentioned = this.msg?.contextInfo?.mentionedJid?.length && this.msg.contextInfo.mentionedJid.map(jid => this.conn.lidToJid(jid, this.chat) || jid) || []
return mentioned;
},
enumerable: true,
},
groupMentions: {
get() {
return this.msg?.contextInfo?.groupMentions?.length && this.msg.contextInfo.groupMentions || [];
},
},
name: {
get() {
return !nullish(this.pushName) && this.pushName || this.conn?.getName(this.sender);
},
enumerable: true,
},
download: {
value(saveToFile = false) {
const mtype = this.mediaType;
return this.conn?.downloadM(this.mediaMessage[mtype], mtype.replace(/message/i, ''), saveToFile);
},
enumerable: true,
configurable: true,
},
reply: {
value(text, chatId, options) {
return this.conn?.reply(chatId ? chatId : this.chat, text, this, options);
},
},
copy: {
value() {
const M = proto.WebMessageInfo;
return smsg(this.conn, M.create(M.toObject(this)));
},
enumerable: true,
},
forward: {
value(jid, force = false, options = {}) {
return this.conn?.sendMessage(jid, {
forward: this, force, ...options,
}, {...options});
},
enumerable: true,
},
copyNForward: {
value(jid, forceForward = false, options = {}) {
return this.conn?.copyNForward(jid, this, forceForward, options);
},
enumerable: true,
},
cMod: {
value(jid, text = '', sender = this.sender, options = {}) {
return this.conn?.cMod(jid, this, text, sender, options);
},
enumerable: true,
},
getQuotedObj: {
value() {
if (!this.quoted.id) return null;
const q = proto.WebMessageInfo.create(this.conn?.loadMessage(this.quoted.id) || this.quoted.vM);
return smsg(this.conn, q);
},
enumerable: true,
},
getQuotedMessage: {
get() {
return this.getQuotedObj;
},
},
delete: {
value() {
return this.conn?.sendMessage(this.chat, {delete: this.key});
},
enumerable: true,
},
quoted: {
get() {
/**
* @type {ReturnType<typeof makeWASocket>}
*/
const self = this;
const msg = self.msg;
const contextInfo = msg?.contextInfo;
const quoted = contextInfo?.quotedMessage;
if (!msg || !contextInfo || !quoted) return null;
const type = Object.keys(quoted)[0];
const q = quoted[type];
return Object.defineProperties(JSON.parse(JSON.stringify(typeof q === 'string' ? {text: q} : q)), {
mtype: {
get() {
return type;
},
enumerable: true,
},
mediaMessage: {
get() {
const Message = ((q.url || q.directPath) ? {...quoted} : extractMessageContent(quoted)) || null;
if (!Message) return null;
const mtype = Object.keys(Message)[0];
return MediaType.includes(mtype) ? Message : null;
},
enumerable: true,
},
mediaType: {
get() {
let message;
if (!(message = this.mediaMessage)) return null;
return Object.keys(message)[0];
},
enumerable: true,
},
id: {
get() {
return contextInfo.stanzaId;
},
enumerable: true,
},
chat: {
get() {
return contextInfo.remoteJid || self.chat;
},
enumerable: true,
},
isBaileys: {
get() {
return this.id?.length === 16 || this.id?.startsWith('3EB0') && this.id.length === 12 || false;
},
enumerable: true,
},
sender: {
get() {
const sender = self.conn.lidToJid(contextInfo.participant, this.chat)
return (sender || this.chat || '').decodeJid();
},
enumerable: true,
},
fromMe: {
get() {
const sender = self.conn?.lidToJid(this.sender, this.chat)
return areJidsSameUser(sender, self.conn?.user.jid);
},
enumerable: true,
},
text: {
get() {
const text = typeof q === 'string' ? self.conn.textTagsLidToJid(q, this.chat) : self.conn.textTagsLidToJid(q.text, this.chat);
return text || this.caption || this.contentText || this.selectedDisplayText || '';
},
enumerable: true,
},
mentionedJid: {
get() {
const qMentioned = q.contextInfo?.mentionedJid.map(jid => self.conn.lidToJid(jid, this.chat) || jid).length > 0 ? q.contextInfo?.mentionedJid.map(jid => self.conn.lidToJid(jid, this.chat) || jid) : self.getQuotedObj()?.mentionedJid.map(jid => self.conn.lidToJid(jid, this.chat) || jid).length > 0 ? self.getQuotedObj()?.mentionedJid.map(jid => self.conn.lidToJid(jid, this.chat) || jid) : self.conn.parseMention(this.text).length > 0 ? self.conn.parseMention(this.text) : []
return qMentioned;
},
enumerable: true,
},
groupMentions: {
get() {
console.log('serialize: ', q.contextInfo, this.text)
if (!q.contextInfo?.groupMentions) return
const qGMentioned = q.contextInfo?.groupMentions.map(jid => jid).length > 0 ? q.contextInfo?.groupMentions.map(jid => jid) : self.getQuotedObj()?.groupMentions.map(jid => jid).length > 0 ? self.getQuotedObj()?.groupMentions.map(jid => jid) : self.conn.parseGroupMention(this.text).length > 0 ? self.conn.parseGroupMention(this.text) : []
return qGMentioned;
},
enumerable: true,
},
name: {
get() {
const sender = this.sender;
return sender ? self.conn?.getName(sender) : null;
},
enumerable: true,
},
vM: {
get() {
return proto.WebMessageInfo.create({
key: {
fromMe: this.fromMe,
remoteJid: this.chat,
id: this.id,
},
message: quoted,
...(self.isGroup ? {participant: this.sender} : {}),
});
},
enumerable: true,
},
fakeObj: {
get() {
return this.vM;
},
},
download: {
value(saveToFile = false) {
const mtype = this.mediaType;
return self.conn?.downloadM(this.mediaMessage[mtype], mtype.replace(/message/i, ''), saveToFile);
},
enumerable: true,
configurable: true,
},
reply: {
/**
* Reply to quoted message
* @param {String|Object} text
* @param {String|false} chatId
* @param {Object} options
*/
value(text, chatId, options) {
return self.conn?.reply(chatId ? chatId : this.chat, text, this.vM, options);
},
enumerable: true,
},
copy: {
/**
* Copy quoted message
*/
value() {
const M = proto.WebMessageInfo;
return smsg(conn, M.create(M.toObject(this.vM)));
},
enumerable: true,
},
forward: {
/**
* Forward quoted message
* @param {String} jid
*@param {Boolean} forceForward
*/
value(jid, force = false, options) {
return self.conn?.sendMessage(jid, {
forward: this.vM, force, ...options,
}, {...options});
},
enumerable: true,
},
copyNForward: {
/**
* Exact Forward quoted message
* @param {String} jid
* @param {Boolean|Number} forceForward
* @param {Object} options
*/
value(jid, forceForward = false, options) {
return self.conn?.copyNForward(jid, this.vM, forceForward, options);
},
enumerable: true,

},
cMod: {
/**
* Modify quoted Message
* @param {String} jid
* @param {String} text
* @param {String} sender
* @param {Object} options
*/
value(jid, text = '', sender = this.sender, options = {}) {
return self.conn?.cMod(jid, this.vM, text, sender, options);
},
enumerable: true,

},
delete: {
/**
* Delete quoted message
*/
value() {
return self.conn?.sendMessage(this.chat, {delete: this.vM.key});
},
enumerable: true,

},
});
},
enumerable: true,
},
});
}

export function logic(check, inp, out) {
if (inp.length !== out.length) throw new Error('Input and Output must have same length');
for (const i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i];
return null;
}

export async function protoType() {
Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
const ab = new ArrayBuffer(this.length);
const view = new Uint8Array(ab);
for (let i = 0; i < this.length; ++i) {
view[i] = this[i];
}
return ab;
};
/**
* @return {ArrayBuffer}
*/
Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength);
};
/**
* @return {Buffer}
*/
ArrayBuffer.prototype.toBuffer = function toBuffer() {
return Buffer.from(new Uint8Array(this));
};
// /**
//* @returns {String}
//*/
// Buffer.prototype.toUtilFormat = ArrayBuffer.prototype.toUtilFormat = Object.prototype.toUtilFormat = Array.prototype.toUtilFormat = function toUtilFormat() {
// return util.format(this)
// }
Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
return await fileTypeFromBuffer(this);
};
/**
* @returns {Boolean}
*/
String.prototype.isNumber = Number.prototype.isNumber = isNumber;
/**
*
* @return {String}
*/
String.prototype.capitalize = function capitalize() {
return this.charAt(0).toUpperCase() + this.slice(1, this.length);
};
/**
* @return {String}
*/
String.prototype.capitalizeV2 = function capitalizeV2() {
const str = this.split(' ');
return str.map((v) => v.capitalize()).join(' ');
};
String.prototype.decodeJid = function decodeJid() {
if (/:\d+@/gi.test(this)) {
const decode = jidDecode(this) || {};
return (decode.user && decode.server && decode.user + '@' + decode.server || this).trim();
} else return this.trim();
};
/**
* number must be milliseconds
* @return {string}
*/
Number.prototype.toTimeString = function toTimeString() {
// const milliseconds = this % 1000
const seconds = Math.floor((this / 1000) % 60);
const minutes = Math.floor((this / (60 * 1000)) % 60);
const hours = Math.floor((this / (60 * 60 * 1000)) % 24);
const days = Math.floor((this / (24 * 60 * 60 * 1000)));
return (
(days ? `${days} day(s) ` : '') +
(hours ? `${hours} hour(s) ` : '') +
(minutes ? `${minutes} minute(s) ` : '') +
(seconds ? `${seconds} second(s)` : '')
).trim();
};
Number.prototype.getRandom = String.prototype.getRandom = Array.prototype.getRandom = getRandom;
}


function isNumber() {
const int = parseInt(this);
return typeof int === 'number' && !isNaN(int);
}

function getRandom() {
if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)];
return Math.floor(Math.random() * this);
}


/**
* ??
* @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
* @return {boolean}
*/
export function nullish(args) {
return !(args !== null && args !== undefined);
}
