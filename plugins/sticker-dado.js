import path, {join} from 'path';

let handler = async (m, { conn }) => {
const dado = [
join(media, '/stickers/dado1.webp'),
join(media, '/stickers/dado2.webp'),
join(media, '/stickers/dado3.webp'),
join(media, '/stickers/dado4.webp'),
join(media, '/stickers/dado5.webp'),
join(media, '/stickers/dado6.webp')
]
const indiceAleatorio = Math.floor(Math.random() * dado.length);
const dir = dado[indiceAleatorio];
conn.sendMessage(m.chat, {sticker: {url: dir},mimetype: 'image/webp', asSticker: true}, { quoted: m, ephemeralExpiration: 2*60*1000 });
}
handler.command = ['dado', 'dados', 'dadu'] 
export default handler
