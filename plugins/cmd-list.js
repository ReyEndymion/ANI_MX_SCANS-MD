let handler = async (m, {conn, botdb, db, userdb, senderJid}) => {
let resp = `*< LISTA DE COMANDOS / TEXTOS ASIGNADOS />*\n${Object.entries(botdb.sticker).map(([key, value], index) => `*${index + 1}.-*\n*CODIGO:* ${value.locked ? `*(bloqueado)* ${key}` : key}\n*COMANDO/TEXTO* ${value.text}`).join('\n\n')}
`.trim()
await conn.writing(m.chat, resp)
return conn.sendMessage(m.chat, { text: resp, mentions: Object.values(botdb.sticker).map(x => x.mentionedJid).reduce((a, b) => [...a, ...b], []) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
handler.command = ['listcmd', 'cmdlist']
handler.rowner = true
handler.help = [];
handler.tags = [];
handler.menu = [
{header: 'Comandos en Multimedia', title: 'LISTCMD', description: 'Lista comandos asignados de stickers he imagenes guardadas', id: 'listcmd'}
];
handler.type = "owners";
handler.disabled = false;

export default handler
