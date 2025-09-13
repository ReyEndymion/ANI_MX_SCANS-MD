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
import _ from "lodash"
import { getUrlFromDirectPath } from "@whiskeysockets/baileys"
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
const data = parseNewsletterResponse(result, XWAPaths.NEWSLETTER);
if (!data) return null;
return {
id: data.id,
state: data.state?.type,
name: data.thread_metadata?.name?.text,
description: data.thread_metadata?.description?.text,
subscribers: +data.thread_metadata?.subscribers_count || 0,
picture: data.thread_metadata?.picture?.direct_path || null,
preview: data.thread_metadata?.preview?.direct_path || null,
verification: data.thread_metadata?.verification,
viewer_metadata: data.viewer_metadata || null,
};},
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

const parseNewsletterResponse = (result, path) => {
const buf = result?.content?.[0]?.content;
if (!buf) return null;
try {
const parsed = JSON.parse(Buffer.from(buf).toString());
return parsed?.data?.[path] || null;
} catch (e) {
console.error("Error parseando newsletter:", e);
return null;
}
};

function formatValue(key, value, preview) {
switch (key) {
case "subscribers":
return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "No hay suscriptores"
case "creation_time":
case "nameTime":
case "descriptionTime":
return formatDate(value)
case "description": 
case "name":
return value || "No hay información disponible"
case "state":
switch (value) {
case "ACTIVE": return "Activo"
case "GEOSUSPENDED": return "Suspendido por regi�n"
case "SUSPENDED": return "Suspendido"
default: return "Desconocido"
}
case "reaction_codes":
switch (value) {
case "ALL": return "Todas las reacciones permitidas"
case "BASIC": return "Reacciones b�sicas permitidas"
case "NONE": return "No se permiten reacciones"
default: return "Desconocido"
}
case "verification":
switch (value) {
case "VERIFIED": return "Verificado"
case "UNVERIFIED": return "No verificado"
default: return "Desconocido"
}
case "mute":
switch (value) {
case "ON": return "Silenciado"
case "OFF": return "No silenciado"
case "UNDEFINED": return "Sin definir"
default: return "Desconocido"
}
case "view_role":
switch (value) {
case "ADMIN": return "Administrador"
case "OWNER": return "Propietario"
case "SUBSCRIBER": return "Suscriptor"
case "GUEST": return "Invitado"
default: return "Desconocido"
}
case "picture":
if (preview) {
return getUrlFromDirectPath(preview)
} else {
return "No hay imagen disponible"
}
default:
return value !== null && value !== undefined ? value.toString() : "No hay información disponible"
}
}

function newsletterKey(key) {
return _.startCase(key.replace(/_/g, " "))
.replace("Id", "🆔 Identificador")
.replace("State", "📌 Estado")
.replace("Creation Time", "📅 Fecha de creación")
.replace("Name Time", "✏️ Fecha de modificación del nombre")
.replace("Name", "🏷️ Nombre")
.replace("Description Time", "📝 Fecha de modificación de la descripción")
.replace("Description", "📜 Descripción")
.replace("Invite", "📩 Invitación")
.replace("Handle", "👤 Alias")
.replace("Picture", "🖼️ Imagen")
.replace("Preview", "👀 Vista previa")
.replace("Reaction Codes", "😃 Reacciones")
.replace("Subscribers", "👥 Suscriptores")
.replace("Verification", "✅ Verificación")
.replace("Viewer Metadata", "🔍 Datos avanzados")
}

export function formatDate(n, locale = "es", includeTime = true) {
if (n > 1e12) {
n = Math.floor(n / 1000)
} else if (n < 1e10) {
n = Math.floor(n * 1000)
}
const date = new Date(n)
if (isNaN(date)) return "Fecha no válida"
const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' }
const formattedDate = date.toLocaleDateString(locale, optionsDate)
if (!includeTime) return formattedDate
const hours = String(date.getHours()).padStart(2, '0')
const minutes = String(date.getMinutes()).padStart(2, '0')
const seconds = String(date.getSeconds()).padStart(2, '0')
const period = hours < 12 ? 'AM' : 'PM'
const formattedTime = `${hours}:${minutes}:${seconds} ${period}`
return `${formattedDate}, ${formattedTime}`
}

export function processObject(obj, prefix = "", preview) {
let caption = ""
Object.keys(obj).forEach(key => {
const value = obj[key]
if (typeof value === "object" && value !== null) {
if (Object.keys(value).length > 0) {
const sectionName = newsletterKey(prefix + key)
caption += `\n*\`${sectionName}\`*\n`
caption += processObject(value, `${prefix}${key}_`)
}
} else {
const shortKey = prefix ? prefix.split("_").pop() + "_" + key : key
const displayValue = formatValue(shortKey, value, preview)
const translatedKey = newsletterKey(shortKey)
caption += `- *${translatedKey}:*\n${displayValue}\n\n`
}})
return caption.trim()
}
