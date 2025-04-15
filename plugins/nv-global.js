//plugin recontruido y naturalizado por github.com/reyendymion
import fs from "fs"
import path from 'path'
export async function before(m, {conn}) {
if (m.chat == sBroadCastID || m.chat.endsWith(newsletterID)) return

let chat = m.isGroup ? global.db.data.bot[conn.user.jid].chats.groups[m.chat] : global.db.data.bot[conn.user.jid].chats.privs[m.chat]
const textlower = m.text.toLowerCase()

if (/^hola$/i.test(textlower) && chat.audios && !chat.isBanned) {
let vn = path.join(media, 'audios/Hola.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(anadieleimporta|a nadie le importa)/g)) {
let vn = path.join(media, 'audios/dylan1.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(araara|ara ara)/g)) {
let vn = path.join(media, 'audios/Ara.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/((mi|me)(ar|er)da de bot)/g)) {
let vn = path.join(media, 'audios/insultar.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
} 

if (!chat.isBanned && chat.audios && textlower.match(/(bañate)/g)) {
let vn = path.join(media, 'audios/Banate.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
} 

if (!chat.isBanned && chat.audios && textlower.match(/(baneado)/g)) {
let vn = path.join(media, 'audios/baneado.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}
 
if (!chat.isBanned && chat.audios && textlower.match(/(bebito fiu fiu|bff)/g)) {
let vn = path.join(media, 'audios/bff.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
} 

if (!chat.isBanned && chat.audios && textlower.match(/(buenas noches|boanoite)/g)) {
let vn = path.join(media, 'audios/boanoite.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(buenas tardes|boatarde)/g)) {
let vn = path.join(media, 'audios/boatarde.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(buenos d(i|í)as)/g)) {
let vn = path.join(media, 'audios/Buenos-dias-2.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(chica lgante|chicalgante|chical gante)/g)) {
let vn = path.join(media, 'audios/chica lgante.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(giagnosticadocongay|(te)?diagn(ó|o)sti(co|cado) ((con)? )?(g)(ay|ei|eis))/g)) {
let vn = path.join(media, 'audios/DiagnosticadoConGay.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(es puto|eeesss putoo|es putoo|esputoo)/g)) {
let vn = path.join(media, 'audios/Es putoo.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(feliz cumpleaños|felizcumpleaños|happy birthday)/g)) {
let vn = path.join(media, 'audios/Feliz cumple.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(Fiesta del admin|fiesta del admin)/g)) {
let vn = path.join(media, 'audios/admin.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(fiesta del administrador)/g)) {
let vn = path.join(media, 'audios/fiesta.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(atenci(ó|o)n grupo|aviso importante|atenci(ó|o)n fiesta)/g)) {
let vn = path.join(media, 'audios/Fiesta1.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(gemidos|gemime|gime|gemime|gemi2)/g)) {
let vn = path.join(media, 'audios/gemi2.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(audio hentai|audiohentai)/g)) {
let vn = path.join(media, 'audios/hentai.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/((Hora de )?sexo)/g)) {
let vn = path.join(media, 'audios/maau1.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(laoracion|la (biblia|oraci(ó|o)n))/g)) {
let vn = path.join(media, 'audios/ora.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(Marica tu|cancion1|Marica quien)/g)) {
let vn = path.join(media, 'audios/cancion.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(muri(ó|o) el grupo|grupo muerto)/g)) {
let vn = path.join(media, 'audios/Murio.m4a')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(Feliz navidad|feliz navidad|Merry Christmas|merry chritmas)/g)) {
let vn = path.join(media, 'audios/navidad.m4a')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(noche( de paz| de amor))/g)) {
let vn = path.join(media, 'audios/Noche.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(Nyapasu|Nyanpasu|nyapasu|Nyapasu|Gambure|Yabure)/g)) {
let vn = path.join(media, 'audios/otaku.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/((ho|oh|o)?( )?(me vengo|me vengo))/g)) {
let vn = path.join(media, 'audios/vengo.mp3')

await conn.sendPresenceUpdate ('recording', m.chat);

await conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m, ephemeralExpiration: 2*60*1000})
}

if (!chat.isBanned && chat.audios && textlower.match(/(on(i|ii)-chan|onichan|o-onichan)/g)) {
let vn = path.join(media, 'audios/Onichan.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/((me)?(vendes|p(á|a)sa(me|s)?)( tu(s)?)?( pa(c)?k| nudes| video(s)?| foto(s)?)( hot| bot| desnuda(s)?)?)/g)) {
let vn = path.join(media, 'audios/Elmo.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(qui(é|e)n es tu se(n|m)pai botsito(7(u|w|v)7)?)/g)) {
let vn = path.join(media, 'audios/Tu.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(rawr|Rawr|RAWR|raawwr|rraawr|rawwr)/g)) {
let vn = path.join(media, 'audios/rawr.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(siu|siiuu|ssiiuu|siuuu|siiuuu|siiiuuuu|siuuuu|siiiiuuuuu|siu|SIIIIUUU)/g)) {
let vn = path.join(media, 'audios/siu.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(te amo|teamo)/g)) {
let vn = path.join(media, 'audios/Te-amo.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(ooo tio|tio que rico)/g)) {
let vn = path.join(media, 'audios/oh_tio.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(un pato(que va caminando alegremente)?)/g)) {
let vn = path.join(media, 'audios/pato.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(UwU|uwu|Uwu|uwU|UWU)/g)) {
let vn = path.join(media, 'audios/UwU.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(vetealavrg|vete a la (v(rg|erga)))/g)) {
let vn = path.join(media, 'audios/vete a la verga.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/((fiesta)?viernes(fiesta)?)/g)) {
let vn = path.join(media, 'audios/viernes.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(vivan(!!)?( los novios)?|vivanlosnovios)/g)) {
let vn = path.join(media, 'audios/vivan.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(yamete (kudasai))/g)) {
let vn = path.join(media, 'audios/Yamete-kudasai.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && /((esto va a ser )?(e|é)pico)/g.test(textlower)) {
let vn = path.join(media, 'audios/Epico.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}
if (!chat.isBanned && chat.audios && textlower.match(/(shitpost)/g)) {
let vn = path.join(media, 'audios/shitpost.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(chamb(a|eando))/g)) {
let vn = path.join(media, 'audios/chamba.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && textlower.match(/(cans(ar|ando|ado))/g)) {
let vn = path.join(media, 'audios/cansado.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}
}
