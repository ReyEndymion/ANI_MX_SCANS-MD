let handler = async (m, {conn, text, db, userdb, senderJid}) => {
let [l, r] = text.split`|`
if (!l) l = ''
if (!r) r = ''
conn.sendWritingText(m.chat, l + readMore + r, userdb, m)
}
handler.help = ['readmore', 'spoiler'].map(v => v + ' <teks>|<teks>')
handler.tags = ['tools']
handler.command = /^(spoiler|hidetext|readmore|selengkapnya)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
