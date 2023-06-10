import { generateWAMessageFromContent, prepareWAMessageMedia} from '@whiskeysockets/baileys'
import url from 'url'
import fetch from 'node-fetch'
import fs from 'fs'
let handler = async (m, { conn, args }, jid) => {

let info = `*Hola 👋🏻, unete a los grupos oficiales para pasar un rato agradable usando el Bot o platicando con la familia de*\n*🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂*\n*ㄒㄖᎶ乇ㄒ卄乇尺🍜⃢⃟ᭀᬽ*\ny\n*🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂*\n千ㄖ尺乇ᐯ乇尺🍜⃢⃟ᭀᬽ*`.trim()
let link1 = 'https://chat.whatsapp.com/L4VRAzaYc11D4LSpt8rB9W'
let link2 = 'https://chat.whatsapp.com/BW4PAJNxiBYIfVS8RpKNbp'
let link3 = 'https://chat.whatsapp.com/JSduqw7R9Oa7iXrdryrBCu'
let txt = '';
let count = 0;
for (const c of info + link1 + info + link2 + info + link3) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
await delay(1 * 1000)
await conn.sendMessage(m.chat, { text: `${info}\n\n${link1}`.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
await delay(1 * 1000)
await conn.sendMessage(m.chat, { text: `${info}\n\n${link2}`.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
await delay(1 * 1000)
await conn.sendMessage(m.chat, { text: `${info}\n\n${link3}`.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
/*
	let name1 = link1['group_name'] 
	let name2 = link2['group_name']//link2.subject//await conn.groupMetadata(m.chat, )
	let name3 = link3['group_name']//link3.subject//conn.groupMetadata(m.chat, )
	var pp1 = link1 ? await (await fetch(link1)).buffer() : Buffer.alloc(link1)
    var pp2 = link2 ? await (await fetch(link2)).buffer() : Buffer.alloc(link2)
    var pp3 = link3 ? await (await fetch(link3)).buffer() : Buffer.alloc(link3)
    var img1 = await prepareWAMessageMedia({ image: pp1 }, { upload: conn.waUploadToServer })
    var img2 = await prepareWAMessageMedia({ image: pp2 }, { upload: conn.waUploadToServer })
    var img3 = await prepareWAMessageMedia({ image: pp3 }, { upload: conn.waUploadToServer })
    let info = `*Hola 👋🏻, unete a los grupos oficiales para pasar un rato agradable usando el Bot o platicando con la familia de*\n*🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂*\n*ㄒㄖᎶ乇ㄒ卄乇尺🍜⃢⃟ᭀᬽ*\ny\n*🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂*\n千ㄖ尺乇ᐯ乇尺🍜⃢⃟ᭀᬽ*`.trim()
	    
try {
let prep1 = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: `${link1}`, contextInfo: { externalAdReply: { 
	body: false, 
	containsAutoReply: true, 
	mediaType: 1, 
	mediaUrl: link1, 
	renderLargerThumbnail: true, 
	showAdAttribution: false, 
	sourceId: name1, 
	sourceUrl: link1, 
	thumbnail: pp1, 
	thumbnailUrl: img1, 
	title: name1
}}}}, {userJid: conn.user.jid, quoted: m }, m)

let prep2 = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: `${link2}\n${info}`, contextInfo: { externalAdReply: { 
	body: false, 
	containsAutoReply: true, 
	mediaType: 1, 
	mediaUrl: link2, 
	renderLargerThumbnail: true, 
	showAdAttribution: false, 
	sourceId: name2, 
	sourceUrl: link2, 
	thumbnail: pp2, 
	thumbnailUrl: img2, 
	title: name2
}}}}, {userJid: conn.user.jid, quoted: m }, m)

let prep3 = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: `${info}\n\n${link3}`, contextInfo: { externalAdReply: { 
	body: false, 
	containsAutoReply: true, 
	mediaType: 1, 
	mediaUrl: link3, 
	renderLargerThumbnail: true, 
	showAdAttribution: false, 
	sourceId: name3, 
	sourceUrl: link3, 
	thumbnail: pp3, 
	thumbnailUrl: img3, 
	title: name3
}}}}, {userJid: conn.user.jid, quoted: m }, m)

await delay(1 * 1000)
conn.relayMessage(m.chat, prep1.message, { messageId: prep1.key.id }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
await delay(1 * 1000)
conn.relayMessage(m.chat, prep2.message, { messageId: prep2.key.id }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
await delay(1 * 1000)
conn.relayMessage(m.chat, prep3.message, { messageId: prep3.key.id }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch (error) {
    console.error("Error al transmitir los mensajes en el chat de WhatsApp:", error) 
}*/
}
handler.command = /^linkgc|grupos$/i
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
//conn.fakeReply(m.chat, info, '0@s.whatsapp.net', wm, 'status@broadcast')	
 /*await conn.sendMessage(m.chat, getLinkPreview, { text: link1})
await conn.sendMessage(m.chat, getLinkPreview, { text: link2})
await conn.sendMessage(m.chat, getLinkPreview, { text: link3})
await conn.sendMessage(m.chat, { text: null, null, [['IR AL MENU PRINCIPAL', '.menu']], m)
*_➤ Grupos oficiales del Bot:_*
*_1.-_* *https://chat.whatsapp.com/L4VRAzaYc11D4LSpt8rB9W*
*_2.-_* *https://chat.whatsapp.com/H0SheP7ippc1dF9uxL04Gt*
'𝕃𝕠𝕓𝕓𝕪 𝕕𝕖 𝕆𝕥𝕒𝕜𝕦𝕤 𝕋𝕠𝕘𝕖𝕥𝕙𝕖𝕣'
*Grupo de rol*
*_3.-* *https://chat.whatsapp.com/DCn5C6m11Js0ie9bZUlNFX* */
/*let media = './Menu2.jpg'
let handler = async (m, { conn, command }) => conn.sendMessage(m.chat, { text: `
*Hola 👋🏻, unete a los grupos oficiales para pasar un rato agradable usando el Bot 🌎ANI MX SCANS🌏*

*_➤ Grupos oficiales del Bot:_*
*_1.-_* *https://chat.whatsapp.com/L4VRAzaYc11D4LSpt8rB9W*

*_2.-_* *https://chat.whatsapp.com/H0SheP7ippc1dF9uxL04Gt*

*Grupo de rol*
*_3.-* *https://chat.whatsapp.com/DCn5C6m11Js0ie9bZUlNFX* 
`.trim(), wm, media, [['IR AL MENU PRINCIPAL', '.menu']], m)
handler.command = /^linkgc|grupos$/i
export default handler*/
