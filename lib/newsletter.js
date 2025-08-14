"use strict";
const MexOperations = {
PROMOTE: "NotificationNewsletterAdminPromote",
DEMOTE: "NotificationNewsletterAdminDemote",
UPDATE: "NotificationNewsletterUpdate",
};

const XWAPaths = {
PROMOTE: "xwa2_notify_newsletter_admin_promote",
DEMOTE: "xwa2_notify_newsletter_admin_demote",
ADMIN_COUNT: "xwa2_newsletter_admin",
CREATE: "xwa2_newsletter_create",
NEWSLETTER: "xwa2_newsletter",
METADATA_UPDATE: "xwa2_notify_newsletter_on_metadata_update",
};
//Object.defineProperty(exports, "__esModule", { value: true });
//export const _extractNewsletterMetadata = exports.makeNewsletterSocket = void 0;
import { decryptMessageNode, generateProfilePicture, generateMessageID } from "@whiskeysockets/baileys/lib/Utils/index.js";
import { S_WHATSAPP_NET, getBinaryNodeChild, getAllBinaryNodeChildren, getBinaryNodeChildren } from "@whiskeysockets/baileys/lib/WABinary/index.js";
import { makeGroupsSocket } from "@whiskeysockets/baileys/lib/Socket/groups.js";
var QueryIds;
(function (QueryIds) {
QueryIds["JOB_MUTATION"] = "7150902998257522";
QueryIds["METADATA"] = "6620195908089573";
QueryIds["UNFOLLOW"] = "7238632346214362";
QueryIds["FOLLOW"] = "7871414976211147";
QueryIds["UNMUTE"] = "7337137176362961";
QueryIds["MUTE"] = "25151904754424642";
QueryIds["CREATE"] = "6996806640408138";
QueryIds["ADMIN_COUNT"] = "7130823597031706";
QueryIds["CHANGE_OWNER"] = "7341777602580933";
QueryIds["DELETE"] = "8316537688363079";
QueryIds["DEMOTE"] = "6551828931592903";
})(QueryIds || (QueryIds = {}));

export const makeNewsletterSocket = (config, conn = null) => {
const sock = conn || (0, makeGroupsSocket)(config);
const { authState, signalRepository, query, generateMessageTag } = sock;
const encoder = new TextEncoder();
const newsletterQuery = async (jid, type, content) => (query({
tag: 'iq',
attrs: {
id: generateMessageTag(),
type,
xmlns: 'newsletter',
to: jid,
},
content
}));
const newsletterWMexQuery = async (jid, query_id, content) => (query({
tag: 'iq',
attrs: {
id: generateMessageTag(),
type: 'get',
xmlns: 'w:mex',
to: S_WHATSAPP_NET,
},
content: [
{
tag: 'query',
attrs: { query_id },
content: encoder.encode(JSON.stringify({ variables: { newsletter_id: jid, ...content } }))
}
]
}));
const parseFetchedUpdates = async (node, type) => {
let child;
if (type === 'messages')
child = (0, getBinaryNodeChild)(node, 'messages');
else {
const parent = (0, getBinaryNodeChild)(node, 'message_updates');
child = (0, getBinaryNodeChild)(parent, 'messages');
}
return await Promise.all((0, getAllBinaryNodeChildren)(child).map(async (messageNode) => {
var _a, _b;
messageNode.attrs.from = child === null || child === void 0 ? void 0 : child.attrs.jid;
const views = (_b = (_a = (0, getBinaryNodeChild)(messageNode, 'views_count')) === null || _a === void 0 ? void 0 : _a.attrs) === null || _b === void 0 ? void 0 : _b.count;
const reactionNode = (0, getBinaryNodeChild)(messageNode, 'reactions');
const reactions = (0, getBinaryNodeChildren)(reactionNode, 'reaction')
.map(({ attrs }) => ({ count: +attrs.count, code: attrs.code }));
let data;
if (type === 'messages') {
const { fullMessage: message, decrypt } = await (0, decryptMessageNode)(messageNode, authState.creds.me.id, authState.creds.me.lid || '', signalRepository, config.logger);
await decrypt();
data = {
server_id: messageNode.attrs.server_id,
views: views ? +views : undefined,
reactions,
message
};
return data;
}
else {
data = {
server_id: messageNode.attrs.server_id,
views: views ? +views : undefined,
reactions
};
return data;
}
}));
};
return {
...sock,
subscribeNewsletterUpdates: async (jid) => {
var _a;
const result = await newsletterQuery(jid, 'set', [{ tag: 'live_updates', attrs: {}, content: [] }]);
return (_a = (0, getBinaryNodeChild)(result, 'live_updates')) === null || _a === void 0 ? void 0 : _a.attrs;
},
newsletterReactionMode: async (jid, mode) => {
await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
updates: { settings: { reaction_codes: { value: mode } } }
});
},
newsletterUpdateDescription: async (jid, description) => {
await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
updates: { description: description || '', settings: null }
});
},
newsletterUpdateName: async (jid, name) => {
await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
updates: { name, settings: null }
});
},
newsletterUpdatePicture: async (jid, content) => {
const { img } = await (0, generateProfilePicture)(content);
await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
updates: { picture: img.toString('base64'), settings: null }
});
},
newsletterRemovePicture: async (jid) => {
await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
updates: { picture: '', settings: null }
});
},
newsletterUnfollow: async (jid) => {
await newsletterWMexQuery(jid, QueryIds.UNFOLLOW);
},
newsletterFollow: async (jid) => {
await newsletterWMexQuery(jid, QueryIds.FOLLOW);
},
newsletterUnmute: async (jid) => {
await newsletterWMexQuery(jid, QueryIds.UNMUTE);
},
newsletterMute: async (jid) => {
await newsletterWMexQuery(jid, QueryIds.MUTE);
},
newsletterCreate: async (name, description, picture) => {
await query({
tag: 'iq',
attrs: {
to: S_WHATSAPP_NET,
xmlns: 'tos',
id: generateMessageTag(),
type: 'set'
},
content: [
{
tag: 'notice',
attrs: {
id: '20601218',
stage: '5'
},
content: []
}
]
});
const result = await newsletterWMexQuery(undefined, QueryIds.CREATE, {
input: {
name,
description: description !== null && description !== void 0 ? description : null,
picture: picture ? (await (0, generateProfilePicture)(picture)).img.toString('base64') : null,
settings: {
reaction_codes: { value: 'ALL' }
}
}
});
return (result, true);
},
newsletterMetadata: async (type, key, role) => {
const result = await newsletterWMexQuery(undefined, QueryIds.METADATA, {
input: {
key,
type: type.toUpperCase(),
view_role: role || 'GUEST'
},
fetch_viewer_metadata: true,
fetch_full_image: true,
fetch_creation_time: true
});
return (result);
},
newsletterAdminCount: async (jid) => {
var _a, _b;
const result = await newsletterWMexQuery(jid, QueryIds.ADMIN_COUNT);
const buff = (_b = (_a = (0, getBinaryNodeChild)(result, 'result')) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.toString();
return JSON.parse(buff).data[XWAPaths.ADMIN_COUNT].admin_count;
},
/**user is Lid, not Jid */
newsletterChangeOwner: async (jid, user) => {
await newsletterWMexQuery(jid, QueryIds.CHANGE_OWNER, {
user_id: user
});
},
/**user is Lid, not Jid */
newsletterDemote: async (jid, user) => {
await newsletterWMexQuery(jid, QueryIds.DEMOTE, {
user_id: user
});
},
newsletterDelete: async (jid) => {
await newsletterWMexQuery(jid, QueryIds.DELETE);
},
/**if code wasn't passed, the reaction will be removed (if is reacted) */
newsletterReactMessage: async (jid, server_id, code) => {
await query({
tag: 'message',
attrs: { to: jid, ...(!code ? { edit: '7' } : {}), type: 'reaction', server_id, id: (0, generateMessageID)() },
content: [{
tag: 'reaction',
attrs: code ? { code } : {}
}]
});
},
newsletterFetchMessages: async (type, key, count, after) => {
const result = await newsletterQuery(S_WHATSAPP_NET, 'get', [
{
tag: 'messages',
attrs: { type, ...(type === 'invite' ? { key } : { jid: key }), count: count.toString(), after: (after === null || after === void 0 ? void 0 : after.toString()) || '100' }
}
]);
return await parseFetchedUpdates(result, 'messages');
},
newsletterFetchUpdates: async (jid, count, after, since) => {
const result = await newsletterQuery(jid, 'get', [
{
tag: 'message_updates',
attrs: { count: count.toString(), after: (after === null || after === void 0 ? void 0 : after.toString()) || '100', since: (since === null || since === void 0 ? void 0 : since.toString()) || '0' }
}
]);
return await parseFetchedUpdates(result, 'updates');
}
};
};
//const _makeNewsletterSocket = makeNewsletterSocket;
//export { _makeNewsletterSocket as makeNewsletterSocket };
export const extractNewsletterMetadata = (node, isCreate) => {
var _a, _b, _c, _d;
const result = (_b = (_a = (0, getBinaryNodeChild)(node, 'result')) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.toString();
const metadataPath = JSON.parse(result).data[isCreate ? XWAPaths.CREATE : XWAPaths.NEWSLETTER];
const metadata = {
id: metadataPath.id,
state: metadataPath.state.type,
creation_time: +metadataPath.thread_metadata.creation_time,
name: metadataPath.thread_metadata.name.text,
nameTime: +metadataPath.thread_metadata.name.update_time,
description: metadataPath.thread_metadata.description.text,
descriptionTime: +metadataPath.thread_metadata.description.update_time,
invite: metadataPath.thread_metadata.invite,
handle: metadataPath.thread_metadata.handle,
picture: ((_c = metadataPath.thread_metadata.picture) === null || _c === void 0 ? void 0 : _c.direct_path) || null,
preview: ((_d = metadataPath.thread_metadata.preview) === null || _d === void 0 ? void 0 : _d.direct_path) || null,
reaction_codes: metadataPath.thread_metadata.settings.reaction_codes.value,
subscribers: +metadataPath.thread_metadata.subscribers_count,
verification: metadataPath.thread_metadata.verification,
viewer_metadata: metadataPath.viewer_metadata
};
return metadata;
};
//export { _extractNewsletterMetadata as extractNewsletterMetadata };
