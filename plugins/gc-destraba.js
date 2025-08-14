import { plugins, getCommandVariants, wrapText } from '../lib/functions.js'
let handler = async (m, {conn, db, userdb, senderJid}) => {
const {raizPath} = await import('../config.js')
const path = await import('path')
const fs = await import('fs')
const hypertext = JSON.parse(fs.readFileSync(path.join(raizPath, 'src/JSON/hypertext.json')))
let resp = hypertext.destraba
let txt = await conn.writing(m.chat, resp)
console.log('destrabas: ', )
let q = await conn.sendWritingText(m.chat, txt, userdb, m);
q = await conn.sendWritingText(m.chat, txt, userdb, q);
return conn.sendWritingText(m.chat, txt, userdb, q);
}
handler.command = /^(destraba|deztraba|clear)$/i
handler.admin = true
handler.help = [];
handler.tags = [];
handler.menu = [
{title:"💎 DESTRABAS", description: `Se utiliza en el caso de recibir virus en modo texto (trabas) para dejarlas muy atras en el chat usando:\n\n${getCommandVariants(handler.command).map(hc => `#${hc}`).join('\n')}`, id: `destraba`},
];
handler.type = "gadmin";
handler.disabled = false;

export default handler

