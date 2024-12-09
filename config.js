import translate from '@vitalets/google-translate-api'
import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import fs from 'fs'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import path, { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import moment from 'moment-timezone' 
import { platform } from 'process'
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }
const __dirname = global.__dirname(import.meta.url)


global.owner = [
['5215517489568','𝓢𝓾𝓹𝓻𝓮𝓶𝓮 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷 - Creador 👁️', false],
['5215533827255', '𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷 - Creador 👑', true]
] // Cambia los numeros que quieras

/**********GLOBAL INFO*****************/
global.packname = '(☞ﾟ∀ﾟ)☞'
global.gt = '(☞ﾟ∀ﾟ)☞'
global.amsicon = `🌎`
global.author = '𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷'
global.wm = '🌎ANI MX SCANS🌏'
global.igfg = '★🌎ANI MX SCANS🌏★'
global.paypal = `https://www.paypal.me/AMxScan`
global.urlgofc = 'https://www.facebook.com/groups/otakustogether'
global.otkstgthr = 'ㄖㄒ卂Ҡ凵丂 ㄒㄖᎶ乇ㄒ卄乇尺'
global.namerepre = `「 Traducciones de Manga 」`
global.animxscans = [['1234567890', 'Bot principal - ANI MX SCANS', true]]
global.me = animxscans
global.hp_animxscans = 'https://www.facebook.com/ANIMxSCANS' 
global.hp_otkstogthr = 'https://www.facebook.com/OtakusTogether' 
global.md = 'https://github.com/ReyEndymion'
global.animxscansmd = 'https://github.com/ReyEndymion/ANI_MX_SCANS-MD'
global.ganisubbots = 'https://chat.whatsapp.com/IgcrWQHcxpoD1dgSvTGQ7Y'
global.ganicmd = 'https://chat.whatsapp.com/KL6BBEMQoH6KVLy7wjs5St'
global.lobby = 'https://chat.whatsapp.com/DV5v6atFvtAKaq5mWOFPNb'
global.community = 'https://chat.whatsapp.com/LpIcN0eoJYXDmT65IwixPk'
global.gaportes = 'https://chat.whatsapp.com/JArEosfq4x89SGKnQKH6Td'

/***************GLOBAL CONFIG****************/
global.raiz = `./`
global.anidir = `ANI_MX_SCANS`
global.dirP = !fs.existsSync(anidir) ? __dirname : join(raiz, anidir) //Solo si quieres arrancar el bot desde una carpeta diferente, por ejemplo: /ANI_MX_SCANS
global.sessionNameAni = `ANIMXSCANS`
global.authFolder = join(dirP, sessionNameAni)
global.authFolderRespald = join(dirP, `sesionRespaldo`)
global.dataBases = join(dirP, 'dataBases')
global.temp = join(dirP, 'tmp')
global.media = join(dirP, 'media')
global.jadibts = join(dirP, 'jadibts')
global.imagen1 = fs.readFileSync(join(media,`pictures/Menu2.jpg`))
global.imagen2 = fs.readFileSync(join(media,`pictures/nuevobot.jpg`)) 
global.imagen3 = fs.readFileSync(join(media,`pictures/Pre Bot Publi.png`))
global.imagen4 = fs.readFileSync(join(media,`pictures/Menu.png`))
global.img = 'https://i.imgur.com/IXlUwTW.jpg'
global.img2 = 'https://i.imgur.com/EXTbyyn.jpg'

global.img3 = 'https://i.imgur.com/oUAGYc2.jpg' //prem
global.img4 = 'https://i.imgur.com/i0pccuo.jpg' //prem

global.img5 = 'https://i.imgur.com/iL1snRx.jpeg'
global.img6 = 'https://i.imgur.com/cYFgSKv.jpeg'
global.img7 = 'https://i.imgur.com/JqL3h2V.jpeg'
global.img8 = 'https://i.imgur.com/PCujt1s.jpeg'
global.img9 = 'https://i.imgur.com/xfUEdDb.jpeg'

global.img10 = 'https://i.imgur.com/DvHoMc3.jpg'
global.img11 = 'https://i.imgur.com/5Q1MqGD.jpg'
global.img12 = 'https://i.imgur.com/vWnsjh8.jpg'
global.img13 = 'https://i.imgur.com/pCfFOgw.jpeg'
global.img14 = 'https://i.imgur.com/knBDWRA.jpeg'
global.img15 = 'https://i.imgur.com/QrkkKx7.jpeg'
global.stickerAMX = fs.readFileSync(join(media,`stickers/ANIMXSCANS.webp`))
global.mods = [] 

if (!fs.existsSync(authFolder)) {
fs.mkdirSync(authFolder);
console.log('Directorio ANIMXSCANS creado exitosamente');
}
if (!fs.existsSync(jadibts)) {
fs.mkdirSync(jadibts);
console.log('Directorio jadibts creado exitosamente');
}
if (!fs.existsSync(authFolderRespald)) {
fs.mkdirSync(authFolderRespald);
console.log('Directorio sesionRespaldo creado exitosamente');
}
if (!fs.existsSync(temp)) {
fs.mkdirSync(temp);
console.log('Directorio tmp creado exitosamente');
}
if (!fs.existsSync(dataBases)) {
fs.mkdirSync(dataBases);
console.log(`Directorio ${dataBases} creado exitosamente`);
}

/*******IDIOMAS***** */
global.idiomas = [['Afrikáans',	'af'], ['Albanés', 'sq'], ['Amárico',	'am'], ['Árabe',	'ar'], ['Armenio',	'hy'], ['Asamés',	'as'], ['Aimara',	'ay'], ['Azerbaiyano',	'az'], ['Bambara',	'bm'], ['Vasco',	'eu'], ['Bielorruso',	'be'], ['Bengalí',	'bn'], ['Bhospuri',	'bho'], ['Bosnio',	'bs'], ['Búlgaro',	'bg'], ['Catalán',	'ca'], ['Cebuano',	'ceb'], ['Chino (simplificado)',	'zh-CN'], ['Chino (tradicional)',	'ny'], ['Corso',	'co'], ['Croata',	'hr'], ['Checo',	'cs'], ['Danés',	'da'], ['Dhivehi',	'dv'], ['Dogri',	'doi'], ['Neerlandés',	'nl'], ['Inglés',	'en'], ['Esperanto',	'eo'], ['Estonio',	'et'], ['Ewe',	'ee'], ['Filipino (tagalo)',	'fil'], ['Finés',	'fi'], ['Francés',	'fr'], ['Frisón',	'fy'], ['Gallego',	'gl'], ['Georgiano',	'ka'], ['Alemán',	'de'], ['Grieg',	'el'], ['Guaraní',	'gn'], ['Guyaratí',	'gu'], ['Criollo haitiano',	'ht'], ['Hausa',	'ha'], ['Hawaiano',	'haw'], ['Hebreo',	'he'], ['Hindi',	'hi'], ['Hmong',	'hmn'], ['Húngaro',	'hu'], ['Islandés',	'is'], ['Igbo',	'ig'], ['Ilocano',	'ilo'], ['Indonesio',	'id'], ['Irlandés',	'ga'], ['Italiano',	'it'], ['Japonés',	'ja'], ['Javanés',	'jv'], ['Canarés',	'kn'], ['Kazajo',	'kk'], ['Jemer',	'km'], ['Kiñaruanda',	'rw'], ['Konkani',	'gom'], ['Corean',	'ko'], ['Krio',	'kri'], ['Curdo',	'ku'], ['Kurdo (Sorani)',	'ckb'], ['Kirg',	'ky'], ['Laosiano',	'lo'], ['Latín',	'la'], ['Letón',	'lv'], ['Lingala',	'ln'], ['Lituano',	'lt'], ['Luganda',	'lg'], ['Luxemburgués',	'lb'], ['Macedonio',	'mk'], ['Maithili',	'mai'], ['Malgache',	'mg'], ['Malayo',	'ms'], ['Malabar',	'ml'], ['Maltés',	'mt'], ['Maorí',	'mi'], ['Marathi',	'mr'], ['Meiteilon (manipuri)',	'mni-Mtei'], ['Mizo',	'lus'], ['Mongol',	'mn'], ['Birmano',	'my'], ['Nepalí',	'ne'], ['Noruego',	'no'], ['Nyanja (chichewa)',	'ny'], ['Odia (oriya)',	'or'], ['Oromo',	'om'], ['Pashto',	'ps'], ['Persa',	'fa'], ['Polaco',	'pl'], ['Portugués (Portugal y Brasil)',	'pt'], ['Punjabi',	'pa'], ['Quechua',	'qu'], ['Rumano',	'ro'], ['Ruso',	'ru'], ['Samoano',	'sm'], ['',	''], ['Sánscr',	'sa'], ['Gaélico',	'gd'], ['Sepedi',	'nso'], ['Serbio',	'sr'], ['Sesoto',	'st'], ['Shona',	'sn'], ['Sindhi',	'sd'], ['Cingalés',	'si'], ['Eslovaco',	'sk'], ['Esloveno',	'sl'], ['Somalí',	'so'], ['Español',	'es'], ['Sundanés',	'su'], ['Suajili',	'sw'], ['Sueco',	'sv'], ['Tagalo (filipino)',	'tl'], ['Tayiko',	'tg'], ['Tamil',	'ta'], ['Tártaro',	'tt'], ['Telugú',	'te'], ['Tailandés',	'th'], ['Tigriña',	'ti'], ['Tsonga',	'ts'], ['Turco',	'tr'], ['Turcom',	'tk'], ['Twi (Akan)',	'ak'], ['Ucraniano',	'uk'], ['Urdu',	'ur'], ['Uigur',	'ug'], ['Uzbeko',	'uz'], ['Vietnamita',	'vi'], ['Galés',	'cy'], ['Xhosa',	'xh'], ['Yiddish',	'yi'], ['Yoruba',	'yo'], ['Zulú',	'zu']]	

global.mensajeidioma = `language use enable lang "language or abbreviation of the following list" example enable lang es (for Spanish)\n\n ${idiomas}`


/*************************/
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment
/****************GLOBAL CONFIG USERS********************** */	
global.multiplier = 99
/***Configuración de logotipos******* */	
global.flaaa = [
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=']
//********Tiempo***************
global.d = new Date(new Date + 3600000)
global.locale = 'es'
global.dia = d.toLocaleDateString(locale, { weekday: 'long' })
global.fecha = d.toLocaleDateString('es', { day: 'numeric', month: 'numeric', year: 'numeric' })
global.mes = d.toLocaleDateString('es', { month: 'long' })
global.año = d.toLocaleDateString('es', { year: 'numeric' })
global.tiempo = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
global.botdate = `⫹⫺ Date :${moment.tz('America/Los_Angeles').format('DD/MM/YY')}` //Asia/Jakarta
global.bottime = `𝗧 𝗜 𝗠 𝗘 : ${moment.tz('America/Los_Angeles').format('HH:mm:ss')}`//America/Los_Angeles
//*****************************
global.wm2 = `▸ ${dia} ${fecha}\n${igfg}`
global.wait = '*⌛ _Cargando, aguarde un momento..._ ▬▬▬▭*'
global.waitt = '*[❗] _Cargando, aguarde un momento..._*'
global.waittt = '*[❗] _Cargando, aguarde un momento..._*'
global.waitttt = '*[❗] _Cargando, aguarde un momento..._*'
global.pdoc = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/msword', 'application/pdf', 'text/rtf']
/****************FORMATO DE MENUS***************** */
global.cmenut = '❖––––––『'
global.cmenub = '┊✦ '
global.cmenuf = '╰━═┅═━––––––๑\n'
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n '
global.dmenut = '*❖─┅──┅〈*'
global.dmenub = '*┊»*'
global.dmenub2 = '*┊*'
global.dmenuf = '*╰┅────────┅✦*'
global.htjava = '⫹⫺'
global.htki = '*⭑•̩̩͙⊱•••• ☪*'
global.htka = '*☪ ••••̩̩͙⊰•⭑*'
global.comienzo = '• • ◕◕════'
global.fin = '════◕◕ • •'
/**********global tags***************/
global.userID = `@s.whatsapp.net`
global.groupID = '@g.us'
global.sBroadCastID = `status@broadcast`
global.newsletterID = `@newsletter`
global.lid = '@lid'
global.suittag = ['5215532867844'] 
global.espadmins = []
global.prems = [] 
/********QUOTEDS*************** */
global.fgif = {key: { participant : '0@s.whatsapp.net'}, message: { "videoMessage": { "title": wm, "h": `Hmm`, 'seconds': '999999999','gifPlayback': 'true','caption': bottime, 'jpegThumbnail': imagen4}}}
global.estado = {key: {participant: '0@s.whatsapp.net', remoteJid: '0@s.whatsapp.net'}, message: {groupInviteMessage: {groupJid: "1234567890-9876543210@g.us", inviteCode: `\n`, groupName: groupID, caption: `${userID}\n${igfg}`, jpegThumbnail: imagen2}}}
global.q = { key: { fromMe: false, participant: userID, ...(false ? { remoteJid: "9876543210-0123456789@g.us" } : {}) }, message: { extendedTextMessage: { text: '', title: wm, 'jpegThumbnail': null }}}

await import ('./api.js');
await import ('./rpg.js');

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Actualizado 'config.js'"))
import(`${file}?update=${Date.now()}`)})
