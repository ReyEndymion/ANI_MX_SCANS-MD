import path, {join} from 'path';

let handler = async (m, {conn, db, userdb, senderJid}) => {
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
conn.sendSticker(m.chat, dir, null, m);
}
handler.command = ['dado', 'dados', 'dadu'] 
handler.help = [];
handler.tags = [];
handler.menu = [
{ title: "?? DADO", description: `Tira un dado y obtén un resultado aleatorio`, id: `dado` }
];
handler.type = "stickermenu";
handler.disabled = false;

export default handler
