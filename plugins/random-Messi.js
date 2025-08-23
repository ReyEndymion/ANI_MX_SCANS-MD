import { googleImage } from '../lib/googlePictures.js'
import axios from 'axios'
let handler = async(m, {conn, start, info, usedPrefix, command, text, db, userdb, senderJid}) => {
const res = await googleImage(command)
let image = await res.getRandom()
let resp = `🔎 *Messi:*\n🔗 *LINK ${image}\n🌎 *BUSCADOR:* Google`
const buff = info.nanie
const buttons = [['⚽ SIGUIENTE ⚽', `${usedPrefix + command}`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, image, buttons, m, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendImageWriting(m.chat, image, resp+'\n'+cmds+'\n'+buff+'\n', m );
}
}
handler.help = ['messi']
handler.tags = ['internet']
handler.command = /^(messi)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
