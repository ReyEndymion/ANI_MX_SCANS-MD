import chalk from 'chalk'
import fs, { watchFile, unwatchFile } from 'fs';
import cheerio from 'cheerio'
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
global.amsicon = `🌎`
global.author = '𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷'
global.wm = '🌎ANI MX SCANS🌏'
global.igfg = '★🌎ANI MX SCANS🌏★'
global.paypal = `https://www.paypal.me/AMxScan`
global.urlgofc = 'https://www.facebook.com/groups/otakustogether'
global.otkstgthr = 'ㄖㄒ卂Ҡ凵丂 ㄒㄖᎶ乇ㄒ卄乇尺'
global.namerepre = `「 Traducciones de Manga 」`
global.animxscans = [['14708300538', 'Bot principal - ANI MX SCANS', true]]
global.me = animxscans
global.hp_animxscans = 'https://www.facebook.com/ANIMxSCANS' 
global.hp_otkstogthr = 'https://www.facebook.com/OtakusTogether' 
global.md = 'https://github.com/ReyEndymion/ANI_MX_SCANS-MD'
global.animxscansmd = 'https://github.com/ReyEndymion/ANI_MX_SCANS-MD'
global.suppbot = 'https://chat.whatsapp.com/DpcgpFF2RO16wFG9SIZemG'
global.gofwhabot = 'https://chat.whatsapp.com/DpcgpFF2RO16wFG9SlZemG'
global.gt = '(☞ﾟ∀ﾟ)☞'
global.botcomedia = '𝓑𝓸𝓽 𝓒𝓸𝓶𝓮𝓭𝓲𝓪 👺👍'
global.botcomediamd = 'https://github.com/ReyEndymion/Bot-Comedia-MD'

/***************GLOBAL APIS****************** */
global.keysZens = ['fiktod', 'c2459db922', 'BF39D349845E', '675e34de8a', '37CC845916', '0b917b905e6f', '6fb0eff124']
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial']
// 'fiktod' 'BF39D349845E' '675e34de8a' '0b917b905e6f'
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios']

global.APIs = { 
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://api.zahwazein.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',	
  fgmods: 'https://api-fgmods.ddns.net',
  botcahx: 'https://api.botcahx.biz.id'
},
global.APIKeys = { 
  'https://api.xteam.xyz': `${keysxteam}`,
  'https://api.lolhuman.xyz': 'GataDios',
  'https://api.neoxr.my.id': `${keysneoxr}`,	
  'https://violetics.pw': 'beta',
  'https://api.zahwazein.xyz': `${keysxxx}`,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin'
}
/***************GLOBAL CONFIG****************/
global.raiz = './'
global.anidir = `ANI_MX_SCANS/`
global.dirP = raiz// + anidir
global.authFile = join(dirP, `ANIMXSCANS/`)
global.authFileRespald = join(dirP, `sesionRespaldo/`)
global.temp = join(dirP, 'tmp')
global.media = dirP + 'media/'
global.jadibts = join(dirP, 'jadibts/')
global.imagen1 = fs.readFileSync(join(dirP,`Menu2.jpg`))
global.imagen2 = fs.readFileSync(join(dirP,`src/nuevobot.jpg`)) 
global.imagen3 = fs.readFileSync(join(dirP,`src/Pre Bot Publi.png`))
global.imagen4 = fs.readFileSync(join(dirP,`Menu.png`))
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
global.stickerAMX = fs.readFileSync(join(dirP,`ANIMXSCANS.webp`))
global.mods = [] 

if (!fs.existsSync(authFile)) {
  fs.mkdirSync(authFile);
  console.log('Directorio jadibts creado exitosamente');
}
if (!fs.existsSync(jadibts)) {
  fs.mkdirSync(jadibts);
  console.log('Directorio jadibts creado exitosamente');
}
if (!fs.existsSync(authFileRespald)) {
  fs.mkdirSync(authFileRespald);
  console.log('Directorio sesionRespaldo creado exitosamente');
}
if (!fs.existsSync(temp)) {
  fs.mkdirSync(temp);
  console.log('Directorio tmp creado exitosamente');
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
//global.m = chatUpdate.messages[chatUpdate.messages.length - 1]
global.rpg = {
emoticon(string) {
string = string.toLowerCase()
let emot = {
      level: '🧬 Nivel',
      limit: '💎 Diamante',
      exp: '⚡ Experiencia',
      bank: '🏦 Banco',
      diamond: '💎 Diamante',
      health: '❤️ Salud',
      kyubi: '🌀 Magia',
      joincount: '🪙 Token',
      emerald: '💚 Esmeralda',
      stamina: '✨ Energía',
      role: '💪 Rango',
      premium: '🎟️ Premium',
      pointxp: '📧 Puntos Exp',
      gold: '👑 Oro',
      trash: '🗑 Basura',
      crystal: '🔮 Cristal',
      intelligence: '🧠 Inteligencia',
      string: '🕸️ Cuerda',
      keygold: '🔑 Llave de Oro',
      keyiron: '🗝️ Llave de Hierro',
      emas: '🪅 Piñata',
      fishingrod: '🎣 Caña de Pescar',
      gems: '🍀 Gemas',
      magicwand: '⚕️ Varita Mágica',
      mana: '🪄 Hechizo',
      agility: '🤸‍♂️ Agilidad',
      darkcrystal: '♠️ Cristal Oscuro',
      iron: '⛓️ Hierro',
      rock: '🪨 Roca',
      potion: '🥤 Poción',
      superior: '💼 Superior',
      robo: '🚔 Robo',
      upgrader: '🧰 Aumentar Mejora',
      wood: '🪵 Madera',
      strength: '🦹‍ ♀️ Fuerza',
      arc: '🏹 Arco',
      armor: '🥼 Armadura',
      bow: '🏹 Super Arco',
      pickaxe: '⛏️ Pico',
      sword: '⚔️ Espada',
      common: '📦 Caja Común',
      uncoommon: '🥡 Caja Poco Común',
      mythic: '🗳️ Caja Mítico',
      legendary: '🎁 Caja Legendaria',
      petFood: '🍖 Alimento para Mascota',
      pet: '🍱 Caja para Mascota',
      semillasdeuva: '🍇 Semilla de Uva',
      semillasdemanzana: '🍎 Semilla de Manzana',
      semillasdenaranja: '🍊 Semillas de naranja',
      semillasdemango: '🥭 Semilla de Mango',
      semillasdeplatano: '🍌 Semillas de Plátano',
      pollo: '🐓 Pollo',
      cerdo: '🐖 Puerco',
      Jabali: '🐗 Jabali',
      toro: '🐃 Toro',    
      cocodrilo: '🐊 Cocodrilo',    
      gato: '🐈 Gato',      
      centauro: '🐐 Centauro',
      chicken: '🐓 Pollo',
      cow: '🐄 Vaca', 
      dog: '🐕 Perro',
      dragon: '🐉 Dragón',
      elefante: '🐘 Elefante',
      zorro: '🦊 Zorro',
      jirafa: '🦒 Jirafa',
      griffin: '🦅 Ave',
      horse: '🐎 Caballo',
      kambing: '🐐 Cabra',
      kerbau: '🐃 Búfalo',
      lion: '🦁 León',
      money: '🪙 ANIMXCoins',
      monyet: '🐒 Mono',
      panda: '🐼 Panda',
      snake: '🐍 Serpiente',
      phonix: '🕊️ Fénix',
      rhinoceros: '🦏 Rinoceronte',
      wolf: '🐺 Lobo',
      tiger: '🐅 Tigre',
      cumi: '🦑 Calamar',
      udang: '🦐 Camarón',
      ikan: '🐟 Pez',
      fideos: '🍝 Fideos',
      ramuan: '🧪 Ingrediente NOVA',
      knife: '🔪 Cuchillo'
    }
let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emot[results[0][0]]
}}
global.rpgg = { //Solo emojis 
emoticon(string) {
string = string.toLowerCase()
    let emott = {
      level: '🧬',
      limit: '💎',
      exp: '⚡',
      bank: '🏦',
      diamond: '💎+',
      health: '❤️',
      kyubi: '🌀',
      joincount: '🪙',
      emerald: '💚',
      stamina: '✨',
      role: '💪',
      premium: '🎟️',
      pointxp: '📧',
      gold: '👑',
      trash: '🗑',
      crystal: '🔮',
      intelligence: '🧠',
      string: '🕸️',
      keygold: '🔑',
      keyiron: '🗝️',
      emas: '🪅',
      fishingrod: '🎣',
      gems: '🍀',
      magicwand: '⚕️',
      mana: '🪄',
      agility: '🤸‍♂️',
      darkcrystal: '♠️',
      iron: '⛓️',
      rock: '🪨',
      potion: '🥤',
      superior: '💼',
      robo: '🚔',
      upgrader: '🧰',
      wood: '🪵',
      strength: '🦹‍ ♀️',
      arc: '🏹',
      armor: '🥼',
      bow: '🏹',
      pickaxe: '⛏️',
      sword: '⚔️',
      common: '📦',
      uncoommon: '🥡',
      mythic: '🗳️',
      legendary: '🎁',
      petFood: '🍖',
      pet: '🍱',
      semillasdeuva: '🍇',
      semillasdemanzana: '🍎',
      semillasdenaranja: '🍊',
      semillasdemango: '🥭',
      semillasdeplatano: '🍌',
      pollo: '🐓',
      cerdo: '🐖',
      Jabali: '🐗',
      toro: '🐃',    
      cocodrilo: '🐊',    
      gato: '🐈',      
      centauro: '🐐',
      chicken: '🐓',
      cow: '🐄', 
      dog: '🐕',
      dragon: '🐉',
      elefante: '🐘',
      zorro: '🦊',
      jirafa: '🦒',
      griffin: '🦅', 
      horse: '🐎',
      kambing: '🐐',
      kerbau: '🐃',
      lion: '🦁',
      money: '🪙',
      monyet: '🐒',
      panda: '🐼',
      snake: '🐍',
      phonix: '🕊️',
      rhinoceros: '🦏',
      wolf: '🐺',
      tiger: '🐅',
      cumi: '🦑',
      udang: '🦐',
      ikan: '🐟',
      fideos: '🍝',
      ramuan: '🧪',
      knife: '🔪'
    }
let results = Object.keys(emott).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emott[results[0][0]]
}}
global.rpgshop = { //Tienda
emoticon(string) {
string = string.toLowerCase()
    let emottt = {
      exp: '⚡ Experiencia',
      limit: '💎 Diamante',
      diamond: '💎 Diamante',
      joincount: '🪙 Token',
      emerald: '💚 Esmeralda',
      berlian: '♦️ Joya',
      kyubi: '🌀 Magia',
      gold: '👑 Oro',
      money: '🪙 ANIMXCoins',
      tiketcoin: '🎫 ANI Tickers',
      stamina: '✨ Energía',
      potion: '🥤 Poción',
      aqua: '💧 Agua',
      trash: '🗑 Basura',
      wood: '🪵 Madera',
      rock: '🪨 Roca',
      batu: '🥌 Piedra',
      string: '🕸️ Cuerda',
      iron: '⛓️ Hierro',
      coal: '⚱️ Carbón',
      botol: '🍶 Botella',
      kaleng: '🥫 Lata',
      kardus: '🪧 Cartón',
      eleksirb: '💡 Electricidad',
      emasbatang: '〽️ Barra de Oro',
      emasbiasa: '🧭 Oro Común',
      rubah: '🦊🌫️ Zorro Grande',
      sampah: '🗑🌫️ Super Basura',
      serigala: '🐺🌫️ Super Lobo',
      kayu: '🛷 Super Madera',
      sword: '⚔️ Espada',
      umpan: '🪱 Carnada', 
      healtmonster: '💵 Billetes',
      emas: '🪅 Piñata',
      pancingan: '🪝 Gancho',
      pancing: '🎣 Caña de Pescar',
      common: '📦 Caja Común',
      uncoommon: '🥡 Caja Poco Común',
      mythic: '🗳️ Caja Mítica',
      pet: '📫 Caja de Mascotas',//?
      gardenboxs: '💐 Caja de Jardinería',//?
      legendary: '🎁 Caja Legendaria',
      anggur: '🍇 Uva',
      apel: '🍎 Manzana',
      jeruk: '🍊 Naranja',
      mangga: '🥭 Mango',
      pisang: '🍌 Platano',
      semillasdeuva: '🌾🍇 Semillas de uva',
      semillasdemanzana: '🌾🍎 Semillas de manzana',
      semillasdenaranja: '🌾🍊 Semillas de naranja',
      semillasdemango: '🌾🥭 Semillas de Mango',
      semillasdeplatano: '🌾🍌 Semillas de plátano',
      centauro: '🐐 Centauro',
      griffin: '🦅 Ave',
      kucing: '🐈 Gato',
      naga: '🐉 Dragón',
      zorro: '🦊 Zorro',
      kuda: '🐎 Caballo',
      phonix: '🕊️ Fénix',
      wolf: '🐺 Lobo',
      anjing: '🐶 Perro',
      petFood: '🍖 Alimento para Mascota', //?
      makanancentaur: '🐐🥩 Comida de Centauro',
      makanangriffin: '🦅🥩 Comida de Ave',
      makanankyubi: '🌀🥩 Comida Mágica',
      makanannaga: '🐉🥩 Comida de Dragón',
      makananpet: '🍱🥩 Alimentos de mascotas',
      makananphonix: '🕊️🥩 Comida de Fénix'  
    }
let results = Object.keys(emottt).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emottt[results[0][0]]
}}
global.rpgshopp = { //Tienda
  emoticon(string) {
    string = string.toLowerCase()
    let emotttt = {
      exp: '⚡',
      limit: '💎',
      diamond: '💎+',
      joincount: '🪙',
      emerald: '💚',
      berlian: '♦️',
      kyubi: '🌀',
      gold: '👑',
      money: '🪙',
      tiketcoin: '🎫',
      stamina: '✨',
      potion: '🥤',
      aqua: '💧',
      trash: '🗑',
      wood: '🪵',
      rock: '🪨',
      batu: '🥌',
      string: '🕸️',
      iron: '⛓️',
      coal: '⚱️',
      botol: '🍶',
      kaleng: '🥫',
      kardus: '🪧',
      eleksirb: '💡',
      emasbatang: '〽️',
      emasbiasa: '🧭',
      rubah: '🦊🌫️',
      sampah: '🗑🌫️',
      serigala: '🐺🌫️',
      kayu: '🛷',
      sword: '⚔️',
      umpan: '🪱', 
      healtmonster: '💵',
      emas: '🪅',
      pancingan: '🪝',
      pancing: '🎣',
      common: '📦',
      uncoommon: '🥡',
      mythic: '🗳️',
      pet: '📫',//?
      gardenboxs: '💐',//?
      legendary: '🎁',
      anggur: '🍇',
      apel: '🍎',
      jeruk: '🍊',
      mangga: '🥭',
      pisang: '🍌',
      semillasdeuva: '🌾🍇',
      semillasdemanzana: '🌾🍎',
      semillasdenaranja: '🌾🍊',
      semillasdemango: '🌾🥭',
      semillasdeplatano: '🌾🍌',
      centauro: '🐐',
      griffin: '🦅',
      kucing: '🐈',
      naga: '🐉',
      zorro: '🦊',
      kuda: '🐎',
      phonix: '🕊️',
      wolf: '🐺',
      anjing: '🐶',
      petFood: '🍖', //?
      makanancentaur: '🐐🥩',
      makanangriffin: '🦅🥩',
      makanankyubi: '🌀🥩',
      makanannaga: '🐉🥩',
      makananpet: '🍱🥩',
      makananphonix: '🕊️🥩'  
    }
let results = Object.keys(emotttt).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emotttt[results[0][0]]
}}	
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
global.botdate = `⫹⫺ Date :  ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}` //Asia/Jakarta
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
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     '
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
global.suittag = ['5215532867844'] 
global.espadmins = []
global.prems = [] 
/********QUOTEDS*************** */
global.fgif = {key: { participant : '0@s.whatsapp.net'}, message: { "videoMessage": { "title": wm, "h": `Hmm`, 'seconds': '999999999',  'gifPlayback': 'true',  'caption': bottime, 'jpegThumbnail': imagen4}}}
global.estado = {key: {participant: '0@s.whatsapp.net', remoteJid: '0@s.whatsapp.net'}, message: {groupInviteMessage: {groupJid: "1234567890-9876543210@g.us", inviteCode: `\n`, groupName: groupID, caption: `${userID}\n${igfg}`, jpegThumbnail: imagen2}}}
global.q = { key: { fromMe: false, participant: userID, ...(false ? { remoteJid: "9876543210-0123456789@g.us" } : {}) }, message: { extendedTextMessage: { text: '', title: wm, 'jpegThumbnail': null }}}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Actualizado 'config.js'"))
import(`${file}?update=${Date.now()}`)})
