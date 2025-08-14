let handler = async (m, _2) => {
let { default: syntaxerror } = await import('syntax-error');
const {format} = await import('util');
const {fileURLToPath} = await import('url');
const {dirname} = await import('path');
const {createRequire} = await import('module');

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);

let { conn, usedPrefix, noPrefix, args, groupMetadata, msg, isOwner, pickRandom, userdb, senderJid } = _2;
let mention =
m.mentionedJid && m.mentionedJid[0]
? m.mentionedJid[0]
: m.quoted
? m.quoted.sender
: false;
let _return;
let name = conn.getName(senderJid);
let _syntax = "";
let _text = (/^=/.test(usedPrefix) ? "return " : "") + noPrefix;
let old = m.exp * 1;
try {
let i = 15;
let f = { exports: {} };
let exec = new (async () => {}).constructor(
"print",
"m",
"handler",
"require",
"conn",
"Array",
"process",
"args",
"groupMetadata",
"module",
"exports",
"argument",
_text
);
_return = await exec.call(
conn,
async (...args) => {
if (--i < 1) return;
console.log(...args);
let resp = format(...args);
return conn.sendWritingTest(m.chat, resp, m)
},
m,
handler,
require,
conn,
CustomArray,
process,
args,
groupMetadata,
f,
f.exports,
[conn, _2]
);
} catch (e) {
let err = syntaxerror(_text, "Execution Function", {
allowReturnOutsideFunction: true,
allowAwaitOutsideFunction: true,
sourceType: "module",
});
if (err) _syntax = "``" + err + "``\n\n";
_return = e;
let resp = _syntax + format(_return);
return conn.sendWritingTest( m.chat, resp, m);
} finally {
m.exp = old;
if (typeof _return === 'object' && _return?.message) return // ya se respondió
}
};
handler.help = ["> ", "=> "];
handler.tags = ["advanced"];
handler.customPrefix = /^(=?>|~)/;
handler.command = /(?:)/i;

handler.rowner = true;

handler.menu = [
{title: "🛠️ EJECUTAR CÓDIGO", description: "Ejecuta código JavaScript en el bot", id: `~`}
];
handler.type = "owners";
handler.disabled = false;

export default handler;

class CustomArray extends Array {
constructor(...args) {
if (typeof args[0] == "number") return super(Math.min(args[0], 10000));
else return super(...args);
}
}

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)];
}
