import { WAMessageStubType } from '@whiskeysockets/baileys';
import PhoneNumber from 'awesome-phonenumber';
import chalk from 'chalk';
import { watchFile } from 'fs';

const terminalImage = global.opts['img'] ? require('terminal-image') : '';
const urlRegex = (await import('url-regex-safe')).default({strict: false});

export default async function (m, conn = { user: {} }) {
let chatType
if (m.chat.endsWith(userID)) {
chatType = 'Privado'
} else if (m.chat.endsWith(groupID)) {
chatType = 'Grupo'
}
let _name = await conn.getName(m.sender);
let sender = PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international')
let chatName = await conn.getName(m.chat);
let type = m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : ''
let img
try {
if (global.opts['img'])
img = /sticker|image/gi.test(m.mtype) ? await terminalImage.buffer(await m.download()) : false;
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
0
: m.text ? m.text.length : 0) || 0;
let me = PhoneNumber('+' + (conn.user?.jid).replace('@s.whatsapp.net', '')).getNumber('international');

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
│📊ㅤ${chalk.magenta(`tamaño de ${type}: %s [%s %sB]`)}
▣────────────···
`.trim(),

me + ' ~ ' + conn.user.name + `${conn.user.jid == conn.user.jid ? '' : ' (Sub Bot)'}`,
(new Date()).toLocaleTimeString('es-MX', {hour12: false, timeZoneName: 'long', timeZone: 'America/Mexico_City'}),
m.messageStubType ? `Evento en chat: ${WAMessageStubType[m.messageStubType]}` : '',
`Tipo de chat: ${m.chat ? chatType : ''}`,
`ID del chat: ${m.chat}`,
`Nombre del chat: ${m.chat ? `${(chatName ? `~${chatName}` : '')}` : ''}`,
`ID del usuario: ${m.sender}`,
`Numero: ${sender}`,
`Nickname: ~${_name}`,
`Tipo de mensaje: ${type}`,
filesize,
filesize === 0 ? 0 : (filesize / 1009 ** Math.floor(Math.log(filesize) / Math.log(1000))).toFixed(1),
['', ...'KMGTP'][Math.floor(Math.log(filesize) / Math.log(1000))] || ''
);
if (img) console.log(img.trimEnd());
if (typeof m.text === 'string' && m.text) {
let log = m.text.replace(/\u200e+/g, '');
let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g
let mdFormat = (depth = 4) => (_, type, text, monospace) => {
let types = {
'_': 'italic',
'*': 'bold',
'~': 'strikethrough'
}
text = text || monospace;
let formatted = !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)));
return formatted;
};
if (log.length < 1024)
log = log.replace(urlRegex, (url, i, text) => {
let end = url.length + i;
return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.blueBright(url) : url;
});
log = log.replace(mdRegex, mdFormat(4));
if (m.mentionedJid) for (const user of m.mentionedJid) log = log.replace('@' + user.split`@`[0], chalk.blueBright('@' +await conn.getName(user)));
console.log(m.error != null ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log);
}
if (m.messageStubParameters) console.log(m.messageStubParameters.map(jid => {
jid = conn.decodeJid(jid);
let name = conn.getName(jid);
return chalk.gray(PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international') + (name ? ' ~' + name : ''));
}).join(', '));
if (/document/i.test(m.mtype)) console.log(`🗂️ ${m.msg.fileName || m.msg.displayName || 'Document'}`);
else if (/ContactsArray/i.test(m.mtype)) console.log(`👨‍👩‍👧‍👦 ${' ' || ''}`);
else if (/contact/i.test(m.mtype)) console.log(`👨 ${m.msg.displayName || ''}`);
else if (/audio/i.test(m.mtype)) {
const duration = m.msg.seconds;
console.log(`${m.msg.ptt ? '🎤ㅤ(PTT ' : '🎵ㅤ('}AUDIO) ${Math.floor(duration / 60).toString().padStart(2, 0)}:${(duration % 60).toString().padStart(2, 0)}`);
}
console.log();
}
let file = global.__filename(import.meta.url);
watchFile(file, () => {
console.log(chalk.redBright("Update 'lib/print.js'"))});
