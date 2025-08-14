//plugin recontruido y naturalizado por github.com/reyendymion
import fs from "fs"
import { newsletterID, sBroadCastID, media } from '../config.js'
import path from 'path'
export async function before(m, {conn, info, chatdb, db}) {
if (m.chat == sBroadCastID || m.chat.endsWith(newsletterID)) return
const textlower = m.text.toLowerCase()

if (/^hola$/i.test(textlower) && chatdb.audios && !chatdb.isBanned) {
let vn = path.join(media, 'audios/Hola.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(anadieleimporta|a nadie le importa)/g)) {
let vn = path.join(media, 'audios/dylan1.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(araara|ara ara)/g)) {
let vn = path.join(media, 'audios/Ara.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/((mi|me)(ar|er)da de bot)/g)) {
let vn = path.join(media, 'audios/insultar.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
} 

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(bañate)/g)) {
let vn = path.join(media, 'audios/Banate.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
} 

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(baneado)/g)) {
let vn = path.join(media, 'audios/baneado.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(bebito fiu fiu|bff)/g)) {
let vn = path.join(media, 'audios/bff.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
} 

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(buenas noches|boanoite)/g)) {
let vn = path.join(media, 'audios/boanoite.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(buenas tardes|boatarde)/g)) {
let vn = path.join(media, 'audios/boatarde.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(buenos d(i|í)as)/g)) {
let vn = path.join(media, 'audios/Buenos-dias-2.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(chica lgante|chicalgante|chical gante)/g)) {
let vn = path.join(media, 'audios/chica lgante.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(giagnosticadocongay|(te)?diagn(ó|o)sti(co|cado) ((con)? )?(g)(ay|ei|eis))/g)) {
let vn = path.join(media, 'audios/DiagnosticadoConGay.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(es puto|eeesss putoo|es putoo|esputoo)/g)) {
let vn = path.join(media, 'audios/Es putoo.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(feliz cumpleaños|felizcumpleaños|happy birthday)/g)) {
let vn = path.join(media, 'audios/Feliz cumple.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(Fiesta del admin|fiesta del admin)/g)) {
let vn = path.join(media, 'audios/admin.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(fiesta del administrador)/g)) {
let vn = path.join(media, 'audios/fiesta.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(atenci(ó|o)n grupo|aviso importante|atenci(ó|o)n fiesta)/g)) {
let vn = path.join(media, 'audios/Fiesta1.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(gemidos|gemime|gime|gemime|gemi2)/g)) {
let vn = path.join(media, 'audios/gemi2.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(audio hentai|audiohentai)/g)) {
let vn = path.join(media, 'audios/hentai.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/((Hora de )?sexo)/g)) {
let vn = path.join(media, 'audios/maau1.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(laoracion|la (biblia|oraci(ó|o)n))/g)) {
let vn = path.join(media, 'audios/ora.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(Marica tu|cancion1|Marica quien)/g)) {
let vn = path.join(media, 'audios/cancion.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(muri(ó|o) el grupo|grupo muerto)/g)) {
let vn = path.join(media, 'audios/Murio.m4a')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(Feliz navidad|feliz navidad|Merry Christmas|merry chritmas)/g)) {
let vn = path.join(media, 'audios/navidad.m4a')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(noche( de paz| de amor))/g)) {
let vn = path.join(media, 'audios/Noche.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(Nyapasu|Nyanpasu|nyapasu|Nyapasu|Gambure|Yabure)/g)) {
let vn = path.join(media, 'audios/otaku.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/((ho|oh|o)?( )?(me vengo|me vengo))/g)) {
let vn = path.join(media, 'audios/vengo.mp3')

await conn.sendPresenceUpdate ('recording', m.chat);

await conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m, ephemeralExpiration: 2*60*1000})
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(on(i|ii)-chan|onichan|o-onichan)/g)) {
let vn = path.join(media, 'audios/Onichan.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/((me)?(vendes|p(á|a)sa(me|s)?)( tu(s)?)?( pa(c)?k| nudes| video(s)?| foto(s)?)( hot| bot| desnuda(s)?)?)/g)) {
let vn = path.join(media, 'audios/Elmo.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(qui(é|e)n es tu se(n|m)pai botsito(7(u|w|v)7)?)/g)) {
let vn = path.join(media, 'audios/Tu.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(rawr|Rawr|RAWR|raawwr|rraawr|rawwr)/g)) {
let vn = path.join(media, 'audios/rawr.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(siu|siiuu|ssiiuu|siuuu|siiuuu|siiiuuuu|siuuuu|siiiiuuuuu|siu|SIIIIUUU)/g)) {
let vn = path.join(media, 'audios/siu.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(te amo|teamo)/g)) {
let vn = path.join(media, 'audios/Te-amo.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(ooo tio|tio que rico)/g)) {
let vn = path.join(media, 'audios/oh_tio.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(un pato(que va caminando alegremente)?)/g)) {
let vn = path.join(media, 'audios/pato.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(UwU|uwu|Uwu|uwU|UWU)/g)) {
let vn = path.join(media, 'audios/UwU.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(vetealavrg|vete a la (v(rg|erga)))/g)) {
let vn = path.join(media, 'audios/vete a la verga.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/((fiesta)?viernes(fiesta)?)/g)) {
let vn = path.join(media, 'audios/viernes.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(vivan(!!)?( los novios)?|vivanlosnovios)/g)) {
let vn = path.join(media, 'audios/vivan.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(yamete (kudasai))/g)) {
let vn = path.join(media, 'audios/Yamete-kudasai.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && /((esto va a ser )?(e|é)pico)/g.test(textlower)) {
let vn = path.join(media, 'audios/Epico.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}
if (!chatdb.isBanned && chatdb.audios && textlower.match(/(shitpost)/g)) {
let vn = path.join(media, 'audios/shitpost.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(chamb(a|eando))/g)) {
let vn = path.join(media, 'audios/chamba.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chatdb.isBanned && chatdb.audios && textlower.match(/(cans(ar|ando|ado))/g)) {
let vn = path.join(media, 'audios/cansado.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}
if (!chatdb.isBanned && chatdb.audios && textlower.match(/^a$/i)) {
let vn = path.join(media, 'audios/a.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}
if (!chatdb.isBanned && chatdb.audios && textlower.match(/^(🥲|😭|😥|😢|😞|😓😰|😨|😫|😩|😣|😖|😦|😵|🤧|\:c)$/g)) {
let vn = path.join(media, 'audios/toma.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}
}

let menuInfo = {
help: `Escuche los audios de los admins originales, solo encuentre las palabras magicas para sacar los audios`,
info: `━━━━━━━━━━━━━━━━━━━━
┣ *☑️ adminsot*\nDescripcion: \nComando:\nEl prefijo actual: usedPrefix + enable adminsot \nUsar asi: *usedPrefixenable adminsot* 
━━━━━━━━━━━━━━━━━━━━
`,
rows: [
{title: "🔊 Quien es tu sempai botsito 7w7", id: `Quien es tu sempai botsito 7w7`},
{title: "🔊 Te diagnostico con gay", id: `Te diagnostico con gay`},
{title: "🔊 A nadie le importa", id: `A nadie le importa`},
{title: "🔊 Fiesta del admin", id: `Fiesta del admin`}, 
{title: "🔊 Fiesta del administrador", id: `Fiesta del administrador`},
{title: "🔊 Vivan los novios", id: `Vivan los novios`},
{title: "🔊 Feliz cumpleaños", id: `Feliz cumpleaños`},
{title: "🔊 Noche de paz", id: `Noche de paz`},
{title: "🔊 Buenos dias", id: `Buenos dias`},
{title: "🔊 Buenos tardes", id: `Buenos tardes`},
{title: "🔊 Buenos noches", id: `Buenos noches`},
{title: "🔊 Audio hentai", id: `Audio hentai`},
{title: "🔊 Chica lgante", id: `Chica lgante`},
{title: "🔊 Feliz navidad", id: `Feliz navidad`},
{title: "🔊 Vete a la vrg", id: `Vete a la vrg`},
{title: "🔊 Pasa pack Bot", id: `Pasa pack Bot`},
{title: "🔊 Atencion grupo", id: `Atencion grupo`},
{title: "🔊 Marica quien", id: `Marica quien`},
{title: "🔊 Murio el grupo", id: `Murio el grupo`},
{title: "🔊 Oh me vengo", id: `Oh me vengo`},
{title: "🔊 tio que rico", id: `tio que rico`},
{title: "🔊 Viernes", id: `Viernes`},
{title: "🔊 Baneado", id: `Baneado`},
{title: "🔊 Sexo", id: `Sexo`},
{title: "🔊 Hola", id: `Hola`},
{title: "🔊 Un pato", id: `Un pato`},
{title: "🔊 Nyanpasu", id: `Nyanpasu`},
{title: "🔊 Te amo", id: `Te amo`},
{title: "🔊 Yamete", id: `Yamete`},
{title: "🔊 Bañate", id: `Bañate`},
{title: "🔊 Es puto", id: `Es puto`},
{title: "🔊 La biblia", id: `La biblia`},
{title: "🔊 Onichan", id: `Onichan`},
{title: "🔊 Mierda de Bot", id: `Mierda de Bot`},
{title: "🔊 Siuuu", id: `Siuuu`},
{title: "🔊 Epico", id: `Epico`},
{title: "🔊 Shitpost", id: `Shitpost`},
{title: "🔊 Rawr", id: `Rawr`},
{title: "🔊 UwU", id: `UwU`},
{title: "🔊 :c", id: `:c`},
{title: "🔊 a", id: `a`},
],
type: 'audios'
}
export {menuInfo}