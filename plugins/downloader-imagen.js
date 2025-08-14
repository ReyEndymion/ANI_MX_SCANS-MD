import { googleImage } from '../lib/googleImagen.js'
import { owner, info, temp, newsletterID, sBroadCastID, groupID, media } from '../config.js'
let handler = async (m, {conn, start, text, usedPrefix, command, db, userdb, senderJid}) => {
const forbiddenWords = [
// Agrega aquí las palabras que deseas filtrar
'lame', 'chupa', 'kaka', 'caca', 'bobo', 'boba', 'loco', 'loca', // ... y así sucesivamente
];
if (!text) {
let resp = `*[❗INFO❗] EJEMPLO DE USO DEL COMANDO ${usedPrefix + command} Minecraft*`
return conn.sendWritingText(m.chat, resp, userdb, m)}
let prohibidas = /(lame|chupa|kaka|caca|bobo|boba|loco|loca|chupapolla|estupid(o|a|os)|poll(a|as)|idiota|maricon|chucha|v(erga|rga)|naco|zorra|zorro|zorras|zorros|pito|huev(on|ona|ones)|rctmre|mrd|ctm|csm|cp|hldv|ptm|baboso|babosa|babosos|babosas|feo|fea|feos|feas|web(o|os)|mamawebos|c(a|á)ll(a|ese|ate)|chupame|bolas|qliao|imb(e|é)c(il|iles)|kbrones|cabron|capullo|carajo|gore|gorre|gorreo|gordo|gorda|gordos|gordas|sapo|sapa|mierda|cerdo|cerda|puerco|puerca|perra|perro|joden|jodemos|joder|joderan|dumb|fuck|shit|bullshit|cunt|cum|semen|bitch|motherfucker|foker|fucking|g0re|g0r3|g.o.r.e|sap0|sap4|malparido|malparida|malparidos|malparidas|m4lp4rid0|m4lp4rido|m4lparido|malp4rido|m4lparid0|malp4rid0|chocha|chupala|chup4la|chup4l4|chupalo|chup4lo|chup4l0|chupal0|chupon|chupameesta|sabandija|hijodelagranputa|hijodeputa|hijadeputa|hijadelagranputa|kbron|kbrona|cajetuda|laconchadedios|put((o|a)|(i|1(t(a|o|4|0)))madre)|ptm|kk|culo|pussy|hentai|nepe|pene|p3ne|p3n3|pen3|p.e.n.e|pvt0|puto|pvto|put0|Hijodelagransetentamilparesdeputa|Chingadamadre|coño|c0ño|coñ0|c0ñ0|merda|mamon|caca|polla|porno|porn|gore|cum|semen|puta|puto|culo|putita|putito|puta|puto|pussy|hentai|pene|coño|asesinato|zoofilia|mia khalifa|desnudo|desnuda|cuca|chocha|muertos|pornhub|xnxx|xvideos|teta|vagina|marsha may|misha cross|sexmex|furry|furro|furra|xxx|rule|rule34|panocha|pedofilia|necrofilia|pinga|horny|ass|nude|popo|nsfw|femdom|futanari|erofeet|sexo|sex|yuri|ero|ecchi|blowjob|anal|ahegao)/ig.test(text.toLowerCase())
if (prohibidas) return 
const palabrasComunes = /(\b(de|un(a)?|los|las|y|o|en|con|por|para)\b\s*)+/ig;

const textoFiltrado = text.replace(palabrasComunes, "").trim();
console.log();

const res = await googleImage(textoFiltrado)
let image = await res.getRandom()
let link = image
let captionn = `🔎 *RESULTADO DE:* ${text}\n🔗 *LINK ${link}\n🌎 *BUSCADOR:* Google\n\nPara 🔄 SIGUIENTE 🔄 usa: *${usedPrefix}imagen ${text}*`
return conn.sendMessage(m.chat, { image:{url: image}, caption: captionn}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, info.nanie , link, m)}
handler.help = ['gimage <query>', 'imagen <query>']
handler.tags = ['internet', 'tools']
handler.command = /^(gimage|image|imagen)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
