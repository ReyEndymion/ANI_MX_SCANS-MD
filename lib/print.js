export default async function (m, conn, propers) {
const {senderJid, isAnnounce, isCommunityAnnounce, chat} = propers
if (chat.muteconsole) return
const urlRegex = (await import('url-regex-safe')).default({strict: false});
const {default: fs} = await import('fs')
const {WAMessageStubType} = await import('@whiskeysockets/baileys')
let { userID, groupID, lid } = await import('../config.js');
let { opts, __filename, prefix } = await import('./functions.js');
const {default: PhoneNumber} = await import('awesome-phonenumber')
const {default: chalk} = await import('chalk')
const terminalImage = opts['img'] ? require('terminal-image') : '';
const chatType = m.isGroup ? 'Grupo' : 'privado'
let _name = await conn.getName(senderJid);
let sender = PhoneNumber('+' + senderJid.replace('@s.whatsapp.net', '')).getNumber('international')
let chatName = await conn.getName(m.chat);
let type = m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : ''
let img
try {
if (opts['img']) {
img = /sticker|image/gi.test(m.mtype) ? await terminalImage.buffer(await m.download()) : false;
}
} catch (e) {
console.error(e);
}
let filesize = (m.msg ?
m.msg.vcard ?
m.msg.vcard.length :
m.msg.fileLength ?
m.msg.fileLength.low || m.msg.fileLength :
m.msg.axolotlSenderKeyDistributionMessage ?
m.msg.axolotlSenderKeyDistributionMessage.length :
m.text ?
m.text.length :
0 : 
m.text ? m.text.length : 0) || 0;

let me = PhoneNumber('+' + (conn.user?.jid).replace('@s.whatsapp.net', '')).getNumber('international');
if (img) console.log(img.trimEnd());

if (m.messageStubParameters) {
console.log(m.messageStubParameters.map((jid) => {
jid = conn.decodeJid(jid);
m.isGroup && jid.endsWith(lid) ? conn.lidToJid(jid, m.chat) : jid
let name = conn.getName(jid);
return chalk.gray(PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international') + (name ? ' ~' + name : ''));
}).join(', '));
}
if (/document/i.test(m.mtype)) console.log(`🗂️ ${m.msg.fileName || m.msg.displayName || 'Document'}`);
else if (/ContactsArray/i.test(m.mtype)) console.log(`👨‍👩‍👧‍👦 ${' ' || ''}`);
else if (/contact/i.test(m.mtype)) console.log(`👨 ${m.msg.displayName || ''}`);
else if (/audio/i.test(m.mtype)) {
const duration = m.msg.seconds;
console.log(`${m.msg.ptt ? '🎤ㅤ(PTT ' : '🎵ㅤ('}AUDIO) ${Math.floor(duration / 60).toString().padStart(2, 0)}:${(duration % 60).toString().padStart(2, 0)}`);
}
if (WAMessageStubType[m.messageStubType] === 'CIPHERTEXT' || /Protocol/g.test(m.type)) return
const tamaño = filesize === 0 ? 0 : (filesize / 1009 ** Math.floor(Math.log(filesize) / Math.log(1000))).toFixed(1)
const unidad = ['', ...'KMGTP'][Math.floor(Math.log(filesize) / Math.log(1000))] || ''

console.log(`▣────────────···
│ ${chalk.redBright('%s')}
│⏰ㅤ${chalk.black(chalk.bgYellow('%s'))}
│📑ㅤ${chalk.black(chalk.bgGreen('%s'))}
│📤ㅤ${chalk.green('%s')}
│📤ㅤ${chalk.green('%s')}
│📤ㅤ${chalk.green('%s')}
│📃ㅤ${chalk.yellow('%s')}
│📃ㅤ${chalk.yellow('%s')}
│📃ㅤ${chalk.yellow('%s')}
│💬ㅤ${chalk.black(chalk.bgYellow('%s'))}
│📊ㅤ${chalk.magenta(`tamaño de ${type}: ${tamaño} [${tamaño} ${unidad}B]`)}
▣────────────···
`.trim(),
me + ' ~ ' + conn.user.name + `${conn.user.jid == conn.user.jid ? '' : ' (Sub Bot)'}`,
(new Date()).toLocaleTimeString('es-MX', {hour12: false, timeZoneName: 'long', timeZone: 'America/Mexico_City'}),
`Tipo de chat: ${m.chat ? chatType : ''}`,
m.messageStubType ? `Evento en chat: ${WAMessageStubType[m.messageStubType]}` : isAnnounce || isCommunityAnnounce ? `Estado del chat: cerrado` : 'Estado del chat: abierto',
`ID del chat: ${m.chat}`,
`Nombre del chat: ${m.chat ? `${(chatName ? `~${chatName}` : '')}` : ''}`,
`ID del usuario: ${senderJid}`,
`Numero: ${sender}`,
`Nickname: ~${_name}`,
`Tipo de mensaje: ${type}`,
);
if (typeof m.text === 'string' && m.text) {
let log = m.text.replace(/\u200e+/g, '');
let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g
let mdFormat = (depth = 4) => (_, type, text, monospace) => {
let types = {
'_': 'italic',
'*': 'bold',
'~': 'strikethrough'
};
text = text || monospace;
let formatted = !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)));
return formatted;
};
if (log.length < 1024) {
log = log.replace(urlRegex, (url, i, text) => {
let end = url.length + i;
return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.blueBright(url) : url;
});
}
log = log.replace(mdRegex, mdFormat(4));
if (m.mentionedJid.length !== 0) {
for (let user of m.mentionedJid) {
const userjid = m.isGroup && user.endsWith(lid) ? conn.lidToJid(user, m.chat) : user
log = log.replace('@' + user.split`@`[0], chalk.blueBright('@'+await conn.getName(userjid)));
}
}
let match = (
prefix instanceof RegExp
? [[prefix.exec(m.text), prefix]]
: Array.isArray(prefix)
? prefix.map(p => {
let re = p instanceof RegExp ? p : new RegExp(str2Regex(p));
return [re.exec(m.text), re];
})
: typeof _prefix === 'string'
? [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(prefix))]]
: [[[], new RegExp()]]
).find(p => p[1]);

if (match && (match[0] || '')[0]) {
propers.isCommand = true;
}

console.log(m.error != null ? chalk.red(log) : propers.isCommand ? chalk.yellow(log) : log);
}
}
