import { Boom } from '@hapi/boom';
import * as chats_1 from '@whiskeysockets/baileys/lib/Socket/chats.js'
import {USyncQuery, chatModificationToAppPatch, generateMessageID, getBinaryNodeChild, getBinaryNodeChildString, getBinaryNodeChildren, 
//isLidUser, 
//isPnUser, 
isJidUser,
jidEncode, jidNormalizedUser, unixTimestampSeconds} from '@whiskeysockets/baileys'
const {proto, } = (await import('@whiskeysockets/baileys')).default
const removeContact = (jid) => {
return chatModify({
contact: null
}, jid) 
}
const chatModify = (mod, jid) => {
const patch = chatModificationToAppPatch(mod, jid)
return appPatch(patch)
}
const addOrEditContact = (jid, contact) => {
return chatModify({
contact
}, jid) 
}
const getLidUser = async (jid, sock) => {
if (!jid) {
throw new Boom('Please input a jid user')
}

if (!isJidUser(jid)) {throw new Boom('Invalid JID: Not a user JID!')}
//if (!isLidUser(jid)) {throw new Boom('Invalid JID: Not a user JID!')}

//if (!isPnUser(jid)) {throw new Boom('Invalid JID: Not a user JID!')}

const targetJid = jidNormalizedUser(jid)

const usyncQuery = new USyncQuery() 
usyncQuery.protocols.push({
name: 'lid', 
getQueryElement: () => ({
tag: 'lid', 
attrs: {}, 
content: undefined
}), 
getUserElement: () => null, 
parser: (node) => node.attrs.val
}) 
usyncQuery.users.push({
id: targetJid
})

const result = await sock.executeUSyncQuery(usyncQuery)

if (result) {
return result.list
}
}

const makeGroupsSocket = (config, conn = null) => {
const sock = conn || chats_1.makeChatsSocket(config)
const { authState, ev, query, upsertMessage } = sock

const groupQuery = async (jid, type, content) => (query({
tag: 'iq',
attrs: {
type,
xmlns: 'w:g2',
to: jid,
},
content
}))

const groupMetadata = async (jid) => {
const result = await groupQuery(jid, 'get', [{ tag: 'query', attrs: { request: 'interactive' } }])
return extractGroupMetadata(result)
}

const groupFetchAllParticipating = async () => {
const result = await query({
tag: 'iq',
attrs: {
to: '@g.us',
xmlns: 'w:g2',
type: 'get',
},
content: [
{
tag: 'participating',
attrs: {},
content: [
{ tag: 'participants', attrs: {} },
{ tag: 'description', attrs: {} }
]
}
]
})

const data = {}
const groupsChild = getBinaryNodeChild(result, 'groups')

if (groupsChild) {
const groups = getBinaryNodeChildren(groupsChild, 'group')
for (const groupNode of groups) {
const meta = extractGroupMetadata({
tag: 'result',
attrs: {},
content: [groupNode]
})
data[meta.id] = meta
}
}

sock.ev.emit('groups.update', Object.values(data))
return data
}

return {
...sock,
groupQuery, 
groupMetadata,
groupCreate: async (subject, participants) => {
const key = generateMessageID()

const result = await groupQuery('@g.us', 'set', [
{
tag: 'create',
attrs: {
subject,
key
},
content: participants.map(jid => ({
tag: 'participant',
attrs: { jid }
}))
}
])

return extractGroupMetadata(result)
},
groupLeave: async (id) => {
await groupQuery('@g.us', 'set', [
{
tag: 'leave',
attrs: {},
content: [
{ tag: 'group', attrs: { id } }
]
}
])
},
groupUpdateSubject: async (jid, subject) => {
await groupQuery(jid, 'set', [
{
tag: 'subject',
attrs: {},
content: Buffer.from(subject, 'utf-8')
}
])
},
groupRequestParticipantsList: async (jid) => {
const result = await groupQuery(jid, 'get', [
{
tag: 'membership_approval_requests',
attrs: {}
}
])

const node = getBinaryNodeChild(result, 'membership_approval_requests')
const participants = getBinaryNodeChildren(node, 'membership_approval_request')

return participants.map(v => v.attrs)
},
groupRequestParticipantsUpdate: async (jid, participants, action) => {
const result = await groupQuery(jid, 'set', [{
tag: 'membership_requests_action',
attrs: {},
content: [
{
tag: action,
attrs: {},
content: participants.map(jid => ({
tag: 'participant',
attrs: { jid }
}))
}
]
}])

const node = getBinaryNodeChild(result, 'membership_requests_action')
const nodeAction = getBinaryNodeChild(node, action)
const participantsAffected = getBinaryNodeChildren(nodeAction, 'participant')

return participantsAffected.map(p => {
return { status: p.attrs.error || '200', jid: p.attrs.jid }
})
},
groupParticipantsUpdate: async (jid, participants, action) => {
const result = await groupQuery(jid, 'set', [
{
tag: action,
attrs: {},
content: participants.map(jid => ({
tag: 'participant',
attrs: { jid }
}))
}
])
const node = getBinaryNodeChild(result, action)
const participantsAffected = getBinaryNodeChildren(node, 'participant')

return participantsAffected.map(p => {
return { status: p.attrs.error || '200', jid: p.attrs.jid, content: p }
})
},
groupUpdateDescription: async (jid, description) => {
const metadata = await groupMetadata(jid)
const prev = metadata.descId ? metadata.descId : null

await groupQuery(jid, 'set', [
{
tag: 'description',
attrs: {
...(description ? { id: generateMessageID() } : { delete: 'true' }),
...(prev ? { prev } : {})
},
content: description ? [
{ tag: 'body', attrs: {}, content: Buffer.from(description, 'utf-8') }
] : undefined
}
])
},
groupInviteCode: async (jid) => {
const result = await groupQuery(jid, 'get', [{ tag: 'invite', attrs: {} }])
const inviteNode = getBinaryNodeChild(result, 'invite')

return inviteNode?.attrs?.code
},
groupRevokeInvite: async (jid) => {
const result = await groupQuery(jid, 'set', [{ tag: 'invite', attrs: {} }])
const inviteNode = getBinaryNodeChild(result, 'invite')

return inviteNode?.attrs?.code
},
groupAcceptInvite: async (code) => {
const results = await groupQuery('@g.us', 'set', [{ tag: 'invite', attrs: { code } }])
const result = getBinaryNodeChild(results, 'group')

return result?.attrs?.jid
},
/**
 * revoke a v4 invite for someone
 * @param groupJid group jid
 * @param invitedJid jid of person you invited
 * @returns true if successful
 */
groupRevokeInviteV4: async (groupJid, invitedJid) => {
const result = await groupQuery(groupJid, 'set', [{ tag: 'revoke', attrs: {}, content: [{ tag: 'participant', attrs: { jid: invitedJid } }] }])

return !!result
},
/**
* accept a GroupInviteMessage
 * @param key the key of the invite message, or optionally only provide the jid of the person who sent the invite
 * @param inviteMessage the message to accept
 */
groupAcceptInviteV4: ev.createBufferedFunction(async (key, inviteMessage) => {
key = typeof key === 'string' ? { remoteJid: key } : key
const results = await groupQuery(inviteMessage.groupJid, 'set', [{
tag: 'accept',
attrs: {
code: inviteMessage.inviteCode,
expiration: inviteMessage.inviteExpiration.toString(),
admin: key.remoteJid
}
}])

// if we have the full message key
// update the invite message to be expired
if (key.id) {
// create new invite message that is expired
inviteMessage = proto.Message.GroupInviteMessage.create(inviteMessage)
inviteMessage.inviteExpiration = 0
inviteMessage.inviteCode = ''
ev.emit('messages.update', [
{
key,
update: {
message: {
groupInviteMessage: inviteMessage
}
}
}
])
}

// generate the group add message
await upsertMessage({
key: {
remoteJid: inviteMessage.groupJid,
id: generateMessageID(authState.creds.me?.id), 
fromMe: false,
participant: key.remoteJid,
},
messageStubType: WAMessageStubType.GROUP_PARTICIPANT_ADD,
messageStubParameters: [
authState.creds.me.id
],
participant: key.remoteJid,
messageTimestamp: unixTimestampSeconds()
}, 'notify')

return results.attrs.from
}),
groupGetInviteInfo: async (code) => {
const results = await groupQuery('@g.us', 'get', [{ tag: 'invite', attrs: { code } }])

return extractGroupMetadata(results)
},
groupToggleEphemeral: async (jid, ephemeralExpiration) => {
const content = ephemeralExpiration ?
{ tag: 'ephemeral', attrs: { expiration: ephemeralExpiration.toString() } } :
{ tag: 'not_ephemeral', attrs: {} }
await groupQuery(jid, 'set', [content])
},
groupSettingUpdate: async (jid, setting) => {
await groupQuery(jid, 'set', [{ tag: setting, attrs: {} }])
},
groupMemberAddMode: async (jid, mode) => {
await groupQuery(jid, 'set', [{ tag: 'member_add_mode', attrs: {}, content: mode }])
},
groupJoinApprovalMode: async (jid, mode) => {
await groupQuery(jid, 'set', [{ tag: 'membership_approval_mode', attrs: {}, content: [{ tag: 'group_join', attrs: { state: mode } }] }])
},
groupFetchAllParticipating
}
}

const extractGroupMetadata = (result) => {
const group = getBinaryNodeChild(result, 'group')
const descChild = getBinaryNodeChild(group, 'description')

let desc
let descId

if (descChild) {
desc = getBinaryNodeChildString(descChild, 'body')
descId = descChild.attrs.id
}

const groupId = group.attrs.id.includes('@') ? group.attrs.id : jidEncode(group.attrs.id, 'g.us')
const eph = getBinaryNodeChild(group, 'ephemeral')?.attrs.expiration
const memberAddMode = getBinaryNodeChildString(group, 'member_add_mode') === 'all_member_add'

const metadata = {
id: groupId,
addressingMode: group.attrs.addressing_mode,
subject: group.attrs.subject,
subjectOwner: group.attrs.s_o,
subjectTime: +group.attrs.s_t,
size: getBinaryNodeChildren(group, 'participant').length,
creation: +group.attrs.creation,
owner: group.attrs.creator ? jidNormalizedUser(group.attrs.creator) : undefined,
desc,
descId,
linkedParent: getBinaryNodeChild(group, 'linked_parent')?.attrs.jid || undefined,
restrict: !!getBinaryNodeChild(group, 'locked'),
announce: !!getBinaryNodeChild(group, 'announcement'),
isCommunity: !!getBinaryNodeChild(group, 'parent'),
isCommunityAnnounce: !!getBinaryNodeChild(group, 'default_sub_group'),
joinApprovalMode: !!getBinaryNodeChild(group, 'membership_approval_mode'),
memberAddMode,
participants: getBinaryNodeChildren(group, 'participant').map(({ attrs }) => {
return {
id: attrs.jid,
lid: attrs.lid, 
jid: attrs.phone_number,
admin: (attrs.type || null),
}
}),
ephemeralDuration: eph ? +eph : undefined, 
}

return metadata
}

export {
removeContact,
addOrEditContact,
getLidUser,
makeGroupsSocket,
extractGroupMetadata
}