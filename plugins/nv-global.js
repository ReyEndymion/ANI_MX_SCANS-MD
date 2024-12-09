//plugin recontruido y naturalizado por github.com/reyendymion
import fs from "fs"
import path from 'path'
export async function before(m, {conn}) {
if (m.chat == sBroadCastID || m.chat.endsWith(newsletterID)) return

let chat = m.isGroup ? global.db.data.bot[conn.user.jid].chats.groups[m.chat] : global.db.data.bot[conn.user.jid].chats.privs[m.chat]
if (/^hola$/i.test(m.text) && chat.audios && !chat.isBanned) {
let vn = path.join(media, 'audios/Hola.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(anadieleimporta|a nadie le importa)/gi)) {
let vn = path.join(media, 'audios/dylan1.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(araara|ara ara)/gi)) {
let vn = path.join(media, 'audios/Ara.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(miarda de bot|mierda de bot|mearda de bot|Miarda de Bot|Mierda de Bot|Mearda de Bot)/gi)) {
let vn = path.join(media, 'audios/insultar.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
} 

if (!chat.isBanned && chat.audios && m.text.match(/(bañate|Bañate)/gi)) {
let vn = path.join(media, 'audios/Banate.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
} 

if (!chat.isBanned && chat.audios && m.text.match(/(baneado|Baneado)/gi)) {
let vn = path.join(media, 'audios/baneado.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}
 
if (!chat.isBanned && chat.audios && m.text.match(/(bebito fiu fiu|bff|Bebito Fiu Fiu|Bff)/gi)) {
let vn = path.join(media, 'audios/bff.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
} 

if (!chat.isBanned && chat.audios && m.text.match(/(buenas noches|Buenas noches|Boanoite|boanoite)/gi)) {
let vn = path.join(media, 'audios/boanoite.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(buenas tardes|Buenas tardes|boatarde|Boatarde)/gi)) {
let vn = path.join(media, 'audios/boatarde.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(buenos dias|Buenos dias|buenos días|Buenos días)/gi)) {
let vn = media + '/Buenos-dias-2.mp3'
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(chica lgante|Chica lgante|Chicalgante|chicalgante|chical gante|Chical gante)/gi)) {
let vn = media + '/chica lgante.mp3'
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(giagnosticadocongay|diagnosticado con gay|diagnosticado gay|te diagnóstico con gay|diagnóstico gay|te diagnostico con gay|te diagnóstico con gay|te diagnosticó con gay|te diagnostico con gay)/gi)) {
let vn = path.join(media, 'audios/DiagnosticadoConGay.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(es puto|eeesss putoo|es putoo|esputoo)/gi)) {
let vn = media + '/Es putoo.mp3'
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(feliz cumpleaños|felizcumpleaños|happy birthday)/gi)) {
let vn = media + '/Feliz cumple.mp3'
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(Fiesta del admin|fiesta del admin)/gi)) {
let vn = path.join(media, 'audios/admin.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(fiesta del administrador)/gi)) {
let vn = path.join(media, 'audios/fiesta.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(fiesta del admin 3|atención grupo|atencion grupo|aviso importante|fiestadeladmin3)/gi)) {
let vn = path.join(media, 'audios/Fiesta1.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(gemidos|gemime|gime|gemime|gemi2)/gi)) {
let vn = path.join(media, 'audios/gemi2.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(audio hentai|Audio hentai|audiohentai|Audiohentai)/gi)) {
let vn = path.join(media, 'audios/hentai.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(sexo|Sexo|Hora de sexo|hora de sexo)/gi)) {
let vn = path.join(media, 'audios/maau1.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(laoracion|La biblia|La oración|La biblia|La oración|la biblia|La Biblia)/gi)) {
let vn = path.join(media, 'audios/ora.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(Marica tu|cancion1|Marica quien)/gi)) {
let vn = path.join(media, 'audios/cancion.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(Murió el grupo|Murio el grupo|murio el grupo|murió el grupo|Grupo muerto|grupo muerto)/gi)) {
let vn = media + '/Murio.m4a'
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(Feliz navidad|feliz navidad|Merry Christmas|merry chritmas)/gi)) {
let vn = media + '/navidad.m4a'
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(noche de paz|Noche de paz|Noche de amor|noche de amor|Noche de Paz)/gi)) {
let vn = path.join(media, 'audios/Noche.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(Nyapasu|Nyanpasu|nyapasu|Nyapasu|Gambure|Yabure)/gi)) {
let vn = path.join(media, 'audios/otaku.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(ho me vengo|oh me vengo|o me vengo|Ho me vengo|Oh me vengo|O me vengo)/gi)) {
let vn = path.join(media, 'audios/vengo.mp3')

await conn.sendPresenceUpdate ('recording', m.chat);

await conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m, ephemeralExpiration: 2*60*1000})
}

if (!chat.isBanned && chat.audios && m.text.match(/(oni-chan|onichan|o-onichan)/gi)) {
let vn = path.join(media, 'audios/Onichan.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(Pasa pack|vendes tu nudes|pasa video hot|pasa tu pack|pasa fotos hot|vendes tu pack|Vendes tu pack|Vendes tu pack?|vendes tu pack|Pasa Pack Bot|pasa pack Bot|pasa tu pack Bot|Pásame tus fotos desnudas|pásame tu pack|me pasas tu pak|me pasas tu pack|pasa pack)/gi)) {
let vn = path.join(media, 'audios/Elmo.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(Quién es tu senpai botsito 7u7|Quien es tu senpai botsito 7u7|Quién es tu sempai botsito 7u7|Quien es tu sempai botsito 7u7|Quién es tu senpai botsito 7w7|Quien es tu senpai botsito 7w7|quién es tu senpai botsito 7u7|quien es tu senpai botsito 7u7|Quién es tu sempai botsito 7w7|Quien es tu sempai botsito 7w7|Quién es tu senpai botsito|Quien es tu senpai botsito|Quién es tu sempai botsito|Quien es tu sempai botsito|Quién es tu senpai botsito|Quien es tu senpai botsito|quién es tu senpai botsito|quien es tu senpai botsito|Quién es tu sempai botsito|Quien es tu sempai botsito)/gi)) {
let vn = path.join(media, 'audios/Tu.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(rawr|Rawr|RAWR|raawwr|rraawr|rawwr)/gi)) {
let vn = path.join(media, 'audios/rawr.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(siu|siiuu|ssiiuu|siuuu|siiuuu|siiiuuuu|siuuuu|siiiiuuuuu|siu|SIIIIUUU)/gi)) {
let vn = path.join(media, 'audios/siu.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(te amo|teamo)/gi)) {
let vn = media + '/Te-amo.mp3'
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(ooo tio|tio que rico)/gi)) {
let vn = path.join(media, 'audios/oh_tio.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(un Pato| un pato|un pato que va caminando alegremente|Un pato|Un Pato)/gi)) {
let vn = path.join(media, 'audios/pato.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(UwU|uwu|Uwu|uwU|UWU)/gi)) {
let vn = path.join(media, 'audios/UwU.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(vetealavrg|vete a la vrg|vete a la verga)/gi)) {
let vn = media + '/vete a la verga.mp3'
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(fiesta viernes|viernes|Viernes|viernes fiesta)/gi)) {
let vn = path.join(media, 'audios/viernes.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(vivan!!|vivan los novios|vivanlosnovios)/gi)) {
let vn = path.join(media, 'audios/vivan.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(Yamete|yamete|Yamete kudasai|yamete kudasai)/gi)) {
let vn = media + '/Yamete-kudasai.mp3'
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(epico|esto va a ser epico)/gi)) {
let vn = path.join(media, 'audios/Epico.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}

if (!chat.isBanned && chat.audios && m.text.match(/(shitpost)/gi)) {
let vn = path.join(media, 'audios/shitpost.mp3')
return conn.sendAudioRecording(m.chat, vn, m)
}
}
