import axios from 'axios'
import FormData from 'form-data'
import fetch from 'node-fetch'
import * as cheerio from 'cheerio';
let split = '|'
let handler = async (m, {conn, args: [effect], text: txt, usedPrefix, command, name, db, userdb, senderJid}) => {
const {effectsMaker} = await import('../lib/constants.js')
const {maker} = await import('../lib/functions.js')
if (!effect){ 
let resp = `*[❗INFO❗] ¿COMO USAR ESTE COMANDO?*\n—◉ _${usedPrefix + command} (efecto) (texto)_\n*EJEMPLO:*\n—◉ _${usedPrefix + command} 3d-deep-sea-metal ${ANIMXSCANS[0][2]}_\n\n*[❗] CUANDO LES DIGA QUE HACE FALTA UN TEXTO EL USO SERIA:*\n—◉ _${usedPrefix + command} (efecto) (texto1|texto2)_\n*EJEMPLO:*\n—◉ _${usedPrefix + command} Wolf-Logo-Galaxy _hola|Bot_\n\n*<_LISTA DE EFECTOS_/>*\n\n° ඬ⃟📝 ${usedPrefix + command + ' ' + effectsMaker.map(v => v.title).join(`\n° ඬ⃟📝 ${usedPrefix + command} `)}`

return conn.sendWritingText(m.chat, resp, userdb, m) 
} 
effect = effect.toLowerCase()
if (!effectsMaker.find(v => (new RegExp(v.title, 'gi')).test(effect))){ let resp = `*[❗INFO❗] EL EFECTO ${effect} NO ESTA EN LA LISTA DE EFECTOS*`
return conn.sendWritingText(m.chat, resp, userdb, m) 
}
let text = txt.replace(new RegExp(effect, 'gi'), '').trimStart();
if (text.includes(split)) {
text = text.split(split).map((t) => t.trim());
} else {
text = [text.trim()];
}
const effectoSelect = effectsMaker.find((effectz) => new RegExp(effectz?.title, 'i').test(effect));
const res = await maker(effectoSelect?.url, [...text]).catch(async _ =>{
let resp = `*[❗ERROR❗] Falta el texto al que se realizara el logo*` 
return conn.sendWritingText(m.chat, resp, userdb, m) 

})
try {
if (typeof res == 'number') {
let resp = res == -1 ? `*[❗INFO❗] EL EFECTO ${effect} NO ESTA EN LA LISTA DE EFECTOS*` : `*[❗INFO❗] EL USO CORRECTO DEL COMANDO ES ${usedPrefix + command} ${effect} ${new Array(res).fill('texto').map((v, i) => v + (i ? i + 1 : '')).join('|')}*`


return conn.sendWritingText(m.chat, resp, userdb, m) 
};
let resp = `*TOMA TU IMAGEN PERSONALIZADA!!*\n*EFECTO: ${effect}*`
let txto = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txto += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
await conn.sendMessage(m.chat, {image: {url: res.image}, caption: resp}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}); 

} catch (error) {
if (res == !text){
} else {}
}
};
handler.help = ['logos']
handler.tags = ['nulis']
handler.command = /^(logo|logos|logos2)$/i
handler.menu = [
{title:"💎 LOGOS", description: "crea un logo personalizado usando #logo", id: `logo`},
];
handler.type = "logosefectos";
handler.disabled = false;

export default handler


