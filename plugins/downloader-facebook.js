import fg from 'api-dylux' 
import fetch from 'node-fetch'
import { savefrom, facebookdl, facebookdlv2 } from '@bochilteam/scraper'
import fbDownloader from 'fb-downloader-scrapper'
let handler = async (m, { conn, args, command, usedPrefix }) => {
let resp, video
if (!args[0]) {resp = `*[❗INFO❗] INGRESE UN ENLACE DE FACEBOOK, EJEMPLO: ${usedPrefix + command}* https://fb.watch/fOTpgn6UFQ/`} 
if (!args[0].match(/www.facebook.com|fb.watch/g)) {resp = `*[❗INFO❗] INGRESE UN ENLACE DE FACEBOOK, EJEMPLO: ${usedPrefix + command}* https://fb.watch/fOTpgn6UFQ/`}
try {
resp = `*[❗] DESCARGANDO SU VIDEO, AGUARDE UN MOMENTO POR FAVOR, ESTE PROCESO PUEDE DURAR ENTRE 2 Y 10 MINUTOS DEPENDIENDO DE LA DURACIÓN DEL VIDEO...*`
switch (command) {   
case "facebook": case "fb": case "facebookdl": case "fbdl":                                  
try {
let res = await fbDownloader(args[0])
for (let result of res.download) {
video = result.url
resp ='*AQUI ESTA SU VIDEO*'
}
} catch (error) {
resp = `${error}`   
}
break           
case "facebook2": case "fb2": case "facebookdl2": case "fbdl2":           
try {
let ress = await fg.fbdl(args[0])
video = await ress.data[0].url    
resp = '*AQUI ESTA SU VIDEO*'
} catch (error) {
resp = `${error}`   
}
break
case "facebook3": case "fb3": case "facebookdl3": case "fbdl3":        
try {
let vio = await fetch(`https://api.violetics.pw/api/downloader/facebook?apikey=beta&url=${args[0]}`)  
let vioo = await vio.json()
video = `${vioo.result.hd.url || vioo.result.sd.url}`
resp = '*AQUI ESTA SU VIDEO*'
} catch (error) {
resp = `${error}`   
}
break   
case "facebook4": case "fb4": case "facebookdl4": case "fbdl4":           
try {
const { result } = await facebookdl(args[0]).catch(async _ => await facebookdlv2(args[0]))
for (const { url, isVideo } of result.reverse()) {
`facebook.${!isVideo ? 'bin' : 'mp4'}`
video = url
resp = '*AQUI ESTA SU VIDEO*'
}
} catch (error) {
resp = `${error}`   
}
break          
case "facebook5": case "fb5": case "facebookdl5": case "fbdl5":        
try {
let res3 = await fetch(`https://latam-api.vercel.app/api/facebookdl?apikey=brunosobrino&q=${args[0]}`)  
let json = await res3.json()
video = await json.video
resp = '*AQUI ESTA SU VIDEO*'    
} catch (error) {
resp = `${error}`   
}   
break    
}} catch {
resp = `*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO, SI EL ERROR SIGUE, PRUEBE CON OTRA OPCION (${usedPrefix}fb, ${usedPrefix}fb2, ${usedPrefix}fb3, ${usedPrefix}fb4, ${usedPrefix}fb5)*`
/*let res = await facebookDl(args[0]).catch(async _ => await savefrom(args[0])).catch(_ => null)
let url = res?.url?.[0]?.url || res?.url?.[1]?.url || res?.['720p'] || res?.['360p']
conn.sendMessage(m.chat, { video: { url }, caption: res?.meta?.title || '*AQUI ESTA SU VIDEO*' }, { quoted: m })
} catch (e) {
m.reply('*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*\n\n*- CORROBORE QUE EL ENLACE SEA SIMILAR A:*\n*◉* https://www.facebook.com/HolaSoySkull/videos/982580549178886/?app=fbl')*/
}
let txt = '';
let count = 0;
if (resp === undefined) return
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 1));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
if (video) {
return conn.sendMessage(m.chat, { video: {url: video}, caption: txt.trim(), mentions: txt, mimetype: 'video/mp4', caption: txt }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 2*60*1000 } )
} else {
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
}
handler.command = /^(fb|facebookdl|fbdl|facebook2|fb2|facebookdl2|fbdl2|facebook3|fb3|facebookdl3|fbdl3|facebook4|fb4|facebookdl4|fbdl4|facebook5|fb5|facebookdl5|fbdl5)$/i
export default handler
