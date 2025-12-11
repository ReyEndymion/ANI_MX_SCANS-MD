export async function before(m, {conn, plugins, match, botdb, chatdb, userdb, isROwner, objs}) {
if (m.fromMe) return
const {owner} = await import('../config.js')
const {nameReg, dataBot} = objs
const data = await dataBot(nameReg)
const timestamp = data.timestamp

if (userdb.lastCommandTime && userdb.lastCommandTime < timestamp) {
userdb.lastCommandTime = 0;
userdb.commandCount = 0;
userdb.lastCommandUsed = null;
userdb.bannedMessageCount = 0
}
if (userdb.bannedMessageCount && typeof userdb.bannedMessageTimestamp === 'number') {
if (Date.now() - userdb.bannedMessageTimestamp > 30 * 60 * 1000) {
userdb.bannedMessageCount = 0;
userdb.bannedMessageTimestamp = 0;
}
}
const settings = botdb.settings;
if (!(chatdb.antispam||settings.antispam) ) return
if (typeof m.text !== 'string' || !match || !match[0]) return;

const body = m.text.slice(match[0].length).trim().split(/\s+/g).shift().toLowerCase();
let isCommand = false
for (const [_, plugin] of plugins.entries()) {
if (!plugin || plugin.disabled || !plugin.command) continue;

const cmd = plugin.command;

if (typeof cmd === 'function') {
if (cmd(body, m)) isCommand = true;
} else if (cmd instanceof RegExp) {
if (cmd.test(body)) isCommand = true;
} else if (Array.isArray(cmd)) {
if (cmd.some(entry => (entry instanceof RegExp ? entry.test(body) : entry === body))) isCommand = true;
}
}
if ((chatdb.antispam||settings.antispam) && isCommand && userdb && userdb.lastCommandTime && (Date.now() - userdb.lastCommandTime) < 5000 && body === userdb.lastCommandUsed && !isROwner) {
if (userdb.commandCount === 2) {
const remainingTime = Math.ceil((userdb.lastCommandTime + 5000 - Date.now()) / 1000);
if (remainingTime > 0) {
const messageText = `*[ ⚠ ] Espera ${remainingTime} segundos antes de usar ese comando*`;
return conn.sendWritingText(m.chat, messageText, userdb, m );
} else {
userdb.commandCount = 0;
}
} else {
userdb.commandCount += 1;
}
} else {
userdb.lastCommandTime = Date.now();
userdb.commandCount = 1;
userdb.lastCommandUsed = body
}
if (isCommand && !userdb.banned && !isROwner) {
if (typeof userdb.bannedMessageCount === 'undefined') {
userdb.bannedMessageCount = 0;
}
if (userdb.bannedMessageCount < 3) {
let creators = owner.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `@${jid}`).join` y `
const messageNumber = userdb.bannedMessageCount + 1;
const messageText = `
╔═════════════════════════╗
❰ ⚠️ ❱ *¡USUARIO BANEADO!* ❰ ⚠️ ❱
—◉ *Aviso ${messageNumber}/3 (Total: 3)*
—◉ ${userdb.BannedReason ? `\n*Motivo:* ${userdb.BannedReason}` : '*Motivo:* Sin especificar'}
—◉ *Si consideras que esto es un error y cuentas con pruebas, puedes comunicarte con el propietario del Bot para apelar la suspensión.*
—◉ *Contacto para apelaciones:* ${creators} 
╚═════════════════════════╝
`.trim();
await conn.sendWritingText(m.chat, messageText, userdb, m )
userdb.bannedMessageCount++;
} else if (userdb.bannedMessageCount === 3) {
userdb.bannedMessageSent = true;
//userdb.banned = true
} else {
return;
}
return;
}
}