export const timestamp = { start: new Date };

export const extToMime = {
// AUDIO
mp3: 'audio/mpeg',
wav: 'audio/wav',
ogg: 'audio/ogg',
oga: 'audio/ogg',
opus: 'audio/ogg',
m4a: 'audio/mp4',
mp4: 'audio/mp4',
aac: 'audio/aac',
flac: 'audio/flac',
amr: 'audio/amr',
mid: 'audio/midi',
midi: 'audio/midi',
weba: 'audio/webm',
aiff: 'audio/aiff',
au: 'audio/basic',
// VIDEO
mp4: 'video/mp4',
m4v: 'video/mp4',
mov: 'video/quicktime',
webm: 'video/webm',
mkv: 'video/x-matroska',
avi: 'video/x-msvideo',
wmv: 'video/x-ms-wmv',
flv: 'video/x-flv',
mpg: 'video/mpeg',
mpeg: 'video/mpeg',
"3gp": 'video/3gpp',
"3g2": 'video/3gpp2',
ogv: 'video/ogg',
// IMAGE
jpg: 'image/jpeg',
jpeg: 'image/jpeg',
png: 'image/png',
gif: 'image/gif',
webp: 'image/webp',
bmp: 'image/bmp',
ico: 'image/x-icon',
svg: 'image/svg+xml',
tif: 'image/tiff',
tiff: 'image/tiff',
avif: 'image/avif',
heic: 'image/heic',
// OTHERS
pdf: 'application/pdf',
txt: 'text/plain',
json: 'application/json',
xml: 'application/xml',
m3u8: 'application/x-mpegURL',
ts: 'video/MP2T'
};

export const effects = ['greyscale', 'invert', 'brightness', 'threshold', 'sepia', 'red', 'green', 'blue', 'blurple', 'pixelate', 'blur']

export const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))}


export const DEFAULT_HEADERS = {
'accept': '*/*',
'accept-encoding': 'gzip, deflate, br',
'accept-language': 'en-US,en;q=0.9',
'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
'sec-ch-ua-mobile': '?0',
'sec-fetch-dest': 'empty',
'sec-fetch-mode': 'cors',
'sec-fetch-site': 'same-origin',
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
};

export const creds = 'creds.json';
export const more = String.fromCharCode(8206)
export const readMore = more.repeat(4001)

export let modesMath = {
noob: [-3, 3, -3, 3, '+-', 15000, 10],
easy: [-10, 10, -10, 10, '*/+-', 20000, 40],
medium: [-40, 40, -20, 20, '*/+-', 40000, 150],
hard: [-100, 100, -70, 70, '*/+-', 60000, 350],
extreme: [-999999, 999999, -999999, 999999, '*/', 99999, 9999],
impossible: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 35000],
impossible2: [-999999999999999, 999999999999999, -999, 999, '/', 30000, 50000]
};

export let operators = {
'+': '+',
'-': '-',
'*': '×',
'/': '÷'
};

export const modosSP = {
facil: {
lado: 8,
minLen: 3,
maxLen: 5,
premio: (len) => 2 * len // ej: palabra de 5 letras = 10 diamantes
},
normal: {
lado: 12,
minLen: 4,
maxLen: 7,
premio: (len) => 3 * len
},
dificil: {
lado: 16,
minLen: 6,
maxLen: 10,
premio: (len) => 4 * len
},
experto: {
lado: 20,
minLen: 8,
maxLen: 999, // sin límite
premio: (len) => 5 * len
}
}
export const levelSPMode = {
1: { // Nivel Novato
modos: {
1: { palabras: 1, grid: 5, minLen: 3, maxLen: 5, premio: (len) => 1 * len },
2: { palabras: 1, grid: 6, minLen: 3, maxLen: 6, premio: (len) => 1 * len },
3: { palabras: 1, grid: 7, minLen: 3, maxLen: 7, premio: (len) => 1 * len },
4: { palabras: 1, grid: 8, minLen: 3, maxLen: 8, premio: (len) => 1 * len },
}
},
2: { // Nivel Fácil
modos: {
1: { palabras: 2, grid: 8, minLen: 4, maxLen: 8, premio: (len) => 2 * len },
2: { palabras: 2, grid: 9, minLen: 4, maxLen: 9, premio: (len) => 2 * len },
3: { palabras: 2, grid: 10, minLen: 4, maxLen: 10, premio: (len) => 2 * len },
4: { palabras: 2, grid: 11, minLen: 4, maxLen: 11, premio: (len) => 2 * len },
}
},
3: { // Nivel Normal
modos: {
1: { palabras: 3, grid: 10, minLen: 5, maxLen: 10, premio: (len) => 3 * len },
2: { palabras: 3, grid: 11, minLen: 5, maxLen: 11, premio: (len) => 3 * len },
3: { palabras: 3, grid: 12, minLen: 5, maxLen: 12, premio: (len) => 3 * len },
4: { palabras: 3, grid: 13, minLen: 5, maxLen: 13, premio: (len) => 3 * len },
}
},
4: { // Nivel Difícil
modos: {
1: { palabras: 4, grid: 12, minLen: 6, maxLen: 12, premio: (len) => 4 * len },
2: { palabras: 4, grid: 13, minLen: 6, maxLen: 13, premio: (len) => 4 * len },
3: { palabras: 5, grid: 14, minLen: 6, maxLen: 14, premio: (len) => 4 * len },
4: { palabras: 5, grid: 15, minLen: 6, maxLen: 15, premio: (len) => 4 * len },
}
},
5: { // Nivel Leyenda → tablero doble
modos: {
1: { palabras: 6, grid: 13, tableros: 2, minLen: 6, maxLen: 12, premio: (len) => 5 * len },
2: { palabras: 6, grid: 14, tableros: 2, minLen: 6, maxLen: 13, premio: (len) => 5 * len },
3: { palabras: 7, grid: 15, tableros: 2, minLen: 6, maxLen: 14, premio: (len) => 5 * len },
4: { palabras: 7, grid: 16, tableros: 2, minLen: 6, maxLen: 15, premio: (len) => 5 * len },
}
},
6: { // Nivel Dios → tablero doble más difícil
modos: {
1: { palabras: 8, grid: 17, tableros: 2, minLen: 7, maxLen: 14, premio: (len) => 6 * len },
2: { palabras: 9, grid: 18, tableros: 2, minLen: 7, maxLen: 15, premio: (len) => 6 * len },
3: { palabras: 10, grid: 19, tableros: 2, minLen: 7, maxLen: 16, premio: (len) => 6 * len },
4: { palabras: 10, grid: 20, tableros: 2, minLen: 7, maxLen: 17, premio: (len) => 6 * len },
}
}
}

export const imageWeb = {
img: 'https://i.imgur.com/IXlUwTW.jpg',
img2: 'https://i.imgur.com/EXTbyyn.jpg',
img3: 'https://i.imgur.com/oUAGYc2.jpg', //prem
img4: 'https://i.imgur.com/i0pccuo.jpg', //prem
img5: 'https://i.imgur.com/iL1snRx.jpeg',
img6: 'https://i.imgur.com/cYFgSKv.jpeg',
img7: 'https://i.imgur.com/JqL3h2V.jpeg',
img8: 'https://i.imgur.com/PCujt1s.jpeg',
img9: 'https://i.imgur.com/xfUEdDb.jpeg',
img10: 'https://i.imgur.com/DvHoMc3.jpg',
img11: 'https://i.imgur.com/5Q1MqGD.jpg',
img12: 'https://i.imgur.com/vWnsjh8.jpg',
img13: 'https://i.imgur.com/pCfFOgw.jpeg',
img14: 'https://i.imgur.com/knBDWRA.jpeg',
img15: 'https://i.imgur.com/QrkkKx7.jpeg',
}
/*******IDIOMAS***** */
export const idiomas = [
['Afrikáans', 'af'], ['Albanés', 'sq'], ['Amárico', 'am'], ['Árabe', 'ar'], ['Armenio', 'hy'], ['Asamés', 'as'], ['Aimara', 'ay'], ['Azerbaiyano', 'az'], ['Bambara', 'bm'], 
['Vasco', 'eu'], ['Bielorruso', 'be'], ['Bengalí', 'bn'], ['Bhospuri', 'bho'], ['Bosnio', 'bs'], ['Búlgaro', 'bg'], ['Catalán', 'ca'], ['Cebuano', 'ceb'], ['Chino (simplificado)', 'zh-CN'], ['Chino (tradicional)', 'ny'], ['Corso', 'co'], ['Croata', 'hr'], ['Checo', 'cs'], ['Danés', 'da'], ['Dhivehi', 'dv'], ['Dogri', 'doi'], ['Neerlandés', 'nl'], ['Inglés', 'en'], ['Esperanto', 'eo'], ['Estonio', 'et'], ['Ewe', 'ee'], ['Filipino (tagalo)', 'fil'], ['Finés', 'fi'], ['Francés', 'fr'], ['Frisón', 'fy'], ['Gallego', 'gl'], ['Georgiano', 'ka'], ['Alemán', 'de'], ['Grieg', 'el'], ['Guaraní', 'gn'], ['Guyaratí', 'gu'], ['Criollo haitiano', 'ht'], ['Hausa', 'ha'], ['Hawaiano', 'haw'], ['Hebreo', 'he'], ['Hindi', 'hi'], ['Hmong', 'hmn'], ['Húngaro', 'hu'], ['Islandés', 'is'], ['Igbo', 'ig'], ['Ilocano', 'ilo'], ['Indonesio', 'id'], ['Irlandés', 'ga'], ['Italiano', 'it'], ['Japonés', 'ja'], ['Javanés', 'jv'], ['Canarés', 'kn'], ['Kazajo', 'kk'], ['Jemer', 'km'], ['Kiñaruanda', 'rw'], ['Konkani', 'gom'], ['Corean', 'ko'], ['Krio', 'kri'], ['Curdo', 'ku'], ['Kurdo (Sorani)', 'ckb'], ['Kirg', 'ky'], ['Laosiano', 'lo'], ['Latín', 'la'], ['Letón', 'lv'], ['Lingala', 'ln'], ['Lituano', 'lt'], ['Luganda', 'lg'], ['Luxemburgués', 'lb'], ['Macedonio', 'mk'], ['Maithili', 'mai'], ['Malgache', 'mg'], ['Malayo', 'ms'], ['Malabar', 'ml'], ['Maltés', 'mt'], ['Maorí', 'mi'], ['Marathi', 'mr'], ['Meiteilon (manipuri)', 'mni-Mtei'], ['Mizo', 'lus'], ['Mongol', 'mn'], ['Birmano', 'my'], ['Nepalí', 'ne'], ['Noruego', 'no'], ['Nyanja (chichewa)', 'ny'], ['Odia (oriya)', 'or'], ['Oromo', 'om'], ['Pashto', 'ps'], ['Persa', 'fa'], ['Polaco', 'pl'], ['Portugués (Portugal y Brasil)', 'pt'], ['Punjabi', 'pa'], ['Quechua', 'qu'], ['Rumano', 'ro'], ['Ruso', 'ru'], ['Samoano', 'sm'], ['Sánscr', 'sa'], ['Gaélico', 'gd'], ['Sepedi', 'nso'], ['Serbio', 'sr'], ['Sesoto', 'st'], ['Shona', 'sn'], ['Sindhi', 'sd'], ['Cingalés', 'si'], ['Eslovaco', 'sk'], ['Esloveno', 'sl'], ['Somalí', 'so'], ['Español', 'es'], ['Sundanés', 'su'], ['Suajili', 'sw'], ['Sueco', 'sv'], ['Tagalo (filipino)', 'tl'], ['Tayiko', 'tg'], ['Tamil', 'ta'], ['Tártaro', 'tt'], ['Telugú', 'te'], ['Tailandés', 'th'], ['Tigriña', 'ti'], ['Tsonga', 'ts'], ['Turco', 'tr'], ['Turcom', 'tk'], ['Twi (Akan)', 'ak'], ['Ucraniano', 'uk'], ['Urdu', 'ur'], ['Uigur', 'ug'], ['Uzbeko', 'uz'], ['Vietnamita', 'vi'], ['Galés', 'cy'], ['Xhosa', 'xh'], ['Yiddish', 'yi'], ['Yoruba', 'yo'], ['Zulú', 'zu']
] 

export const mkbot = ['UfN5DLvV', 'lwSUluWz', 'KcrY8r8I', 'HSxJ72Rf', 'Gmc5DlDb', 'H6pvVPJc', 'uVAf54xz', 'wF4gTpTZ', 'nwJVzP6v']
export const mkbotkey = mkbot[Math.floor(mkbot.length * Math.random())]


/*************************/
/****************GLOBAL CONFIG USERS********************** */ 
export const multiplier = 99

export const mensajeidioma = `language use enable lang "language or abbreviation of the following list" example enable lang es (for Spanish)\n\n ${idiomas}`

export const monthNames = [
'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

export const wmsg = {
wait: '*⌛ _Cargando, aguarde un momento..._ ▬▬▬▭*',
waitt: '*[❗] _Cargando, aguarde un momento..._*',
waittt: '*[❗] _Cargando, aguarde un momento..._*',
waitttt: '*[❗] _Cargando, aguarde un momento..._*'
}
export const pdoc = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/msword', 'application/pdf', 'text/rtf']
/***************FORMATO DE MENUS***************** */
export const menuform = {
cmenut: '❖––––––『',
cmenub: '┊✦ ',
cmenuf: '╰━═┅═━––––––๑\n',
cmenua: '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n ',
dmenut: '*❖─┅──┅〈*',
dmenub: '*┊»*',
dmenub2: '*┊*',
dmenuf: '*╰┅────────┅✦*',
htjava: '⫹⫺',
htki: '*⭑•̩̩͙⊱•••• ☪*',
htka: '*☪ ••••̩̩͙⊰•⭑*',
comienzo: '• • ◕◕════',
fin: '════◕◕ • •'
}
export const flaaa = [
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=']

export const stickerTriggers = [
'enviar como sticker',
'convierte esto en sticker',
'hazlo sticker',
'genera un sticker',
'mándalo como sticker',
'como sticker',
'sticker sugerido',
'sticker:'
]

export const imageTriggers = [
'enviar como imagen',
'convierte esto en imagen',
'genera una imagen',
'como imagen',
'imagen sugerida',
'imagen:'
]

export const audioTriggers = [
'como audio',
'convierte esto en audio',
'audio sugerido',
'genera un audio',
'enviar como audio'
]

export const videoTriggers = [
'como video',
'convierte esto en video',
'video sugerido',
'genera un video',
'enviar como video'
]

export const countryAbbreviationsAlpha3 = {
'AFG': 'Afganistán',
'ALA': 'Islas de Åland',
'ALB': 'Albania',
'DZA': 'Argelia',
'ASM': 'Samoa Americana',
'AND': 'Andorra',
'AGO': 'Angola',
'AIA': 'Anguila',
'ATA': 'Antártida',
'ATG': 'Antigua y Barbuda',
'ARG': 'Argentina',
'ARM': 'Armenia',
'ABW': 'Aruba',
'AUS': 'Australia',
'AUT': 'Austria',
'AZE': 'Azerbaiyán',
'BHS': 'Bahamas',
'BHR': 'Baréin',
'BGD': 'Bangladesh',
'BRB': 'Barbados',
'BLR': 'Bielorrusia',
'BEL': 'Bélgica',
'BLZ': 'Belice',
'BEN': 'Benín',
'BMU': 'Bermuda',
'BTN': 'Bután',
'BOL': 'Bolivia',
'BES': 'Bonaire, San Eustaquio y Saba',
'BIH': 'Bosnia y Herzegovina',
'BWA': 'Botsuana',
'BVT': 'Isla Bouvet',
'BRA': 'Brasil',
'IOT': 'Territorio Británico del Océano Índico',
'VGB': 'Islas Vírgenes Británicas',
'BRN': 'Brunei',
'BGR': 'Bulgaria',
'BFA': 'Burkina Faso',
'BDI': 'Burundi',
'KHM': 'Camboya',
'CMR': 'Camerún',
'CAN': 'Canadá',
'CPV': 'Cabo Verde',
'CYM': 'Islas Caimán',
'CAF': 'República de África Central',
'TCD': 'Chad',
'CHL': 'Chile',
'CHN': 'China',
'CXR': 'Isla de Pascua',
'CCK': 'Islas Cocos',
'COL': 'Colombia',
'COM': 'Comoras',
'COK': 'Islas Cook',
'CRI': 'Costa Rica',
'HRV': 'Croacia',
'CUB': 'Cuba',
'CUW': 'Curazao',
'CYP': 'Chipre',
'CZE': 'República Checa',
'COD': 'República Democrática del Congo',
'DNK': 'Dinamarca',
'DJI': 'Yibuti',
'DMA': 'Dominica',
'DOM': 'República Dominicana',
'TLS': 'Timor Oriental',
'ECU': 'Ecuador',
'EGY': 'Egipto',
'SLV': 'El Salvador',
'GNQ': 'Guinea Ecuatorial',
'ERI': 'Eritrea',
'EST': 'Estonia',
'ETH': 'Etiopía',
'FLK': 'Islas Malvinas',
'FRO': 'Islas Faroe',
'FJI': 'Fiji',
'FIN': 'Finlandia',
'FRA': 'Francia',
'GUF': 'Guayana Francesa',
'PYF': 'Polinesia Francesa',
'ATF': 'Territorios del sur Franceses',
'GAB': 'Gabón',
'GMB': 'Gambia',
'GEO': 'Georgia',
'DEU': 'Alemania',
'GHA': 'Ghana',
'GIB': 'Gibraltar',
'GRC': 'Grecia',
'GRL': 'Groenlandia',
'GRD': 'Granada',
'GLP': 'Guadalupe',
'GUM': 'Guam',
'GTM': 'Guatemala',
'GGY': 'Guernsey',
'GIN': 'Guinea',
'GNB': 'Guinea Bissau',
'GUY': 'Guyana',
'HTI': 'Haití',
'HMD': 'Islas Heard y McDonald',
'HND': 'Honduras',
'HKG': 'Hong Kong',
'HUN': 'Hungría',
'ISL': 'Islandia',
'IND': 'India',
'IDN': 'Indonesia',
'IRN': 'Irán',
'IRQ': 'Irak',
'IRL': 'Irlanda',
'IMN': 'Isla de Man',
'ISR': 'Israel',
'ITA': 'Italia',
'CIV': 'Costa de Marfil',
'JAM': 'Jamaica',
'JPN': 'Japón',
'JEY': 'Jersey',
'JOR': 'Jordania',
'KAZ': 'Kazajistán',
'KEN': 'Kenia',
'KIR': 'Kiribati',
'XXK': 'Kosovo',
'KWT': 'Kuwait',
'KGZ': 'Kirguistán',
'LAO': 'Laos',
'LVA': 'Letonia',
'LBN': 'Líbano',
'LSO': 'Lesoto',
'LBR': 'Liberia',
'LBY': 'Libia',
'LIE': 'Liechtenstein',
'LTU': 'Lituania',
'LUX': 'Luxemburgo',
'MAC': 'Macao',
'MKD': 'Macedonia',
'MDG': 'Madagascar',
'MWI': 'Malaui',
'MYS': 'Malasia',
'MDV': 'Maldivas',
'MLI': 'Malí',
'MLT': 'Malta',
'MHL': 'Islas Marshall',
'MTQ': 'Martinica',
'MRT': 'Mauritania',
'MUS': 'Mauricio',
'MYT': 'Mayotte',
'MEX': 'México',
'FSM': 'Micronesia',
'MDA': 'Moldavia',
'MCO': 'Mónaco',
'MNG': 'Mongolia',
'MNE': 'Montenegro',
'MSR': 'Montserrat',
'MAR': 'Marruecos',
'MOZ': 'Mozambique',
'MMR': 'Myanmar',
'NAM': 'Namibia',
'NRU': 'Nauru',
'NPL': 'Nepal',
'NLD': 'Países Bajos',
'ANT': 'Antillas Holandesas',
'NCL': 'Nueva Caledonia',
'NZL': 'Nueva Zelanda',
'NIC': 'Nicaragua',
'NER': 'Níger',
'NGA': 'Nigeria',
'NIU': 'Niue',
'NFK': 'Isla Norfolk',
'PRK': 'Corea del Norte',
'MNP': 'Islas Marianas del Norte',
'NOR': 'Noruega',
'OMN': 'Omán',
'PAK': 'Pakistán',
'PLW': 'Palaos',
'PSE': 'Territorios Palestinos',
'PAN': 'Panamá',
'PNG': 'Papúa Nueva Guinea',
'PRY': 'Paraguay',
'PER': 'Perú',
'PHL': 'Filipinas',
'PCN': 'Islas Pitcairn',
'POL': 'Polonia',
'PRT': 'Portugal',
'PRI': 'Puerto Rico',
'QAT': 'Catar',
'COG': 'República del Congo',
'REU': 'Reunión',
'ROU': 'Rumanía',
'RUS': 'Rusia',
'RWA': 'Ruanda',
'BLM': 'San Bartolomé',
'SHN': 'Santa Elena',
'KNA': 'San Cristóbal y Nieves',
'LCA': 'Santa Lucía',
'MAF': 'San Martín',
'SPM': 'San Pedro y Miguelón',
'VCT': 'San Vicente y las Granadinas',
'WSM': 'Samoa Occidental',
'SMR': 'San Marino',
'STP': 'Santo Tomé y Príncipe',
'SAU': 'Arabia Saudita',
'SEN': 'Senegal',
'SRB': 'Serbia',
'SCG': 'Serbia y Montenegro',
'SYC': 'Seychelles',
'SLE': 'Sierra Leona',
'SGP': 'Singapur',
'SXM': 'San Martín',
'SVK': 'Eslovaquia',
'SVN': 'Eslovenia',
'SLB': 'Islas Salomón',
'SOM': 'Somalia',
'ZAF': 'Sudáfrica',
'SGS': 'Islas Georgia del Sur y Sandwich del Sur',
'KOR': 'Corea del Sur',
'SSD': 'Sudán del Sur',
'ESP': 'España',
'LKA': 'Sri Lanka',
'SDN': 'Sudán',
'SUR': 'Surinam',
'SJM': 'Islas Svalbard y Jan Mayen',
'SWZ': 'Suazilandia',
'SWE': 'Suecia',
'CHE': 'Suiza',
'SYR': 'Siria',
'TWN': 'Taiwán',
'TJK': 'Tayikistán',
'TZA': 'Tanzania',
'THA': 'Tailandia',
'TGO': 'República Togolesa',
'TKL': 'Islas Tokelau',
'TON': 'Tonga',
'TTO': 'Trinidad y Tobago',
'TUN': 'Túnez',
'TUR': 'Turquía',
'TKM': 'Turkmenistán',
'TCA': 'Islas Turcos y Caicos',
'TUV': 'Tuvalu',
'VIR': 'Islas Vírgenes de los EE.UU.',
'UGA': 'Uganda',
'UKR': 'Ucrania',
'ARE': 'Emiratos Árabes Unidos',
'GBR': 'Reino Unido',
'USA': 'Estados Unidos (USA)',
'UMI': 'Islas menores alejadas de los Estados Unidos',
'URY': 'Uruguay',
'UZB': 'Uzbekistán',
'VUT': 'Vanuatu',
'VAT': 'Vaticano',
'VEN': 'Venezuela',
'VNM': 'Vietnam',
'WLF': 'Wallis y Futuna',
'ESH': 'Sahara Occidental',
'YEM': 'Yemen',
'ZMB': 'Zambia',
'ZWE': 'Zimbabue'
};

export const PALABRAS = [
'ABARATAR','ABSTRACTO','ABUDHABI','ACCESORIO','ACCIONISTA','ACRILICASS','ACRILICO','ACRILICOS','ACUARELA','ACUARELAS','ACUARELIST','ADELE','AEROGRAFO','AEROGRAFOS','AGUJA','AGUJERONEGRO','AHORRO','AKIRA','ALBIONONLIN','ALEMANIA','ALGORITMOS','ALIENIGENA','AMAZONAS','AMAZONPRIME','AMONGUS','AMORTIZACION','ANATOMIA','ANDROID','ANDROMEDA','ANGELINA','ANIME','ANIMXSCANS','APEXLEGEND','APPLEMUSIC','ARANCEL','ARCHEAGE','ARCOIRIS','ARGENTINA','ARIANAGRANDE','ARQUITECTO','ARTE','ARTEFLOR','ARTENEGRO','ARTESANAS','ARTESANIA','ARTISTAS','ARTISTICA','ASTEROIDE','ASTRONOMIA','ATLANTICO','ATLETISMO','ATTACKTITAN','AUSTRALIA','AUSTRIA','AVATAR','AVENGERS','BACTERIA','BALANZA','BALEARES','BALON','BANCA','BANCARIO','BANQUERO','BARRO','BARROCOS','BATMAN','BELGICA','BELICE','BELLASART','BELLASARTS','BILLIEEILISH','BIOLOGIA','BISUTERIA','BLACKCLOVER','BLACKDESERT','BLACKPANTHER','BLEACH','BOBBYBROWN','BODEGONES','BODEGONIS','BODEGONIST','BOKUNOHERO','BOLIVIA','BOLSAMX','BOTANICA','BOTCOMEDIA','BOUTIQUE','BRADPITT','BRASIL','BRAWLHALLA','BRAZIL','BREAKINGBAD','BRIELARSON','BRILLO','BRONCESOB','BULGARIA','BURJKHALIFA','CAJA','CALZADO','CAMELLO','CAMISA','CAMISETA','CANADA','CANGURO','CAPITAL','CAPITALISMO','CAPTAINAMERICA','CARBONCIL','CARBONCILS','CARDIB','CARTOGRAFIA','CARTONERA','CARTONERAS','CATALOGAR','CATASTRO','CAVERNA','CEBRA','CERAMICA','CHAQUETA','CHILE','CHIMPANCE','CHINA','CHRIS','CICLO','CICLOPE','CIENCIA','CINEMATICA','CLANNAD','COCO','COCODRILO','CODEGEASS','CODIFICAR','COLISEO','COLOMBIA','COMERCIAL','COMERCIO','COMETA','COMICS','COMISION','COMISIONISTA','COMPETENCIA','COMPLEMENTO','COMPOSITOR','COMPRAR','COMPRAVENTA','COMPUTADORA','CONCIERTO','CONEJO','CONFECCION','CONSTELACION','CONSUMIDOR','CONSUMO','CONTABLE','CONTRABANDO','CONTRATO','COOPERATIVA','CORDILLERA','CORTE','COSER','COSTARICA','COSTO','COSTURA','COTIZACION','COUNTERSTRK','COWBOYBEBOP','CRECIMIENTO','CREDITO','CRISIS','CROACIA','CRUCIGRAMA','CRUCIVERBA','CUADRO','CUBA','CUBRIR','CURSOARTE','CURSOSARTE','DAISYRIDLEY','DANZA','DAVIDHARBOUR','DEATHNOTE','DEEZER','DEFICIT','DEFLACION','DEMANDA','DEMANDANTE','DEMONSLAYER','DESCUENTO','DESFILE','DESTINY','DETECCION','DEUDA','DEVALOR','DEVALUACION','DEVALUAR','DIABLO','DIBUJANT','DIBUJANTE','DIBUJANTES','DIBUJAR','DICAPRIO','DIGIMON','DINAMARCA','DISENADOR','DISNEY','DISTRIBUCION','DIVISA','DOTA','DRAGONBALL','DUALIPA','DUNA','DWAYNE','ECONOMETRIA','ECONOMIA','ECONOMISTA','ECUADOR','EDSHEERAN','EGIPTO','EINSTEIN','ELECTRONICA','ELEFANTE','ELONMUSK','ELSALVADOR','EMILIACLARKE','EMMASTONE','EMPLEO','EMPRENDEDOR','EMPRENDER','EMPRESA','EMPRESARIO','ENCICLOPEDIA','EPOXICO','EQUILIBRIO','ESBOZAR','ESCAPEFROM','ESCARABAJO','ESCENOGRA','ESCOCIA','ESCULTORAS','ESCULTORE','ESCULTORI','ESCULTURA','ESCULTURAS','ESMERALDA','ESPACIAL','ESPACIO','ESPECULACION','ESPN','ESTADIO','ESTADO','ESTADOS','ESTAMPACION','ESTAMPAD','ESTAMPADO','ESTAMPAR','ESTARCIDO','ESTARCIDOS','ESTATUAS','ESTATUILLA','ESTILO','ESTIMULO','ESTRELLA','ETICA','ETIOPIA','EVANGELION','EVOLUCION','EXCEDENTE','EXPORTA','EXPORTACION','EXPORTADOR','FABRICANTE','FACEBOOK','FAIRYTAIL','FALLGUYS','FANTASMAS','FASHION','FASHIONISTA','FICCION','FIDUCIARIO','FIGHTCLUB','FIGURATIV','FIJIS','FILTERS','FINALFANTASY','FINANCIAR','FINANZAS','FISCALIDAD','FONDO','FORHONOR','FORRESTGUMP','FORTNITE','FOTOGRAF','FOTOGRAFAS','FOTOGRAFI','FOTOGRAFIA','FOTOGRAFO','FOTOGRAFOS','FOTOMONTAJE','FOTOMURAL','FRANCIA','FROZEN','FULLMETAL','FUSION','GALAXIA','GALERIAS','GALES','GALLO','GAMA','GANANCIA','GASTO','GASTOS','GATABOT','GATO','GEOGRAFIA','GHOSTSHELL','GINTAMA','GISELLES','GITHUB','GLACIAR','GLAMOUR','GLOBAL','GOLEADOR','GOODFELLAS','GRABADORA','GRABADORES','GRABADOS','GRECIA','GUATEMALA','GUILDWARS','GUITARRA','GURREN','GUYANA','HACIENDA','HAIKYUU','HAITI','HALOGUARD','HARINGTON','HARRYPOTTER','HARRYSTYLES','HBO','HEARTHSTONE','HEROACADEMIA','HEROESSTOR','HILO','HIPHOP','HIPODROMO','HISTORIA','HOLANDA','HONDURAS','HUELLISTA','HULU','HUNGRIA','HUNTER','IMPORTACION','IMPORTADOR','IMPORTE','IMPOSTER','IMPRESION','IMPRESORA','IMPUESTO','INCENTIVO','INDUSTRIA','INFLACION','INGLATERRA','INGRESO','INNOVACION','INSOLVENCIA','INSTAGRAM','INTERES','INTERNET','INVERSION','IRLANDA','IRONMAN','ISRAEL','ITALIA','JAMAICA','JAPON','JARDINERIA','JAWS','JENNIFERLOPEZ','JIMPARSONS','JIRAFA','JOHNBOYEGA','JOHNTRAVOLTA','JOJOBIZARRE','JONAS','JULIAROBERTS','JUPITER','JUSTINBIEBER','KANGAROO','KARATE','KATYPERRY','KENIA','KIMETSU','KIRIBATI','KON','LADYGAGA','LAGO','LAMINADORA','LAMINADOS','LEAGUEOFLEG','LEGENDZELDA','LENGUAJE','LEOPARDO','LEWISCAPALDI','LIMON','LINKEDIN','LIQUIDACION','LITERATURA','LITOGRAFO','LITOGRAFOS','LIZZO','LOOK','LORDOFTHERINGS','LUNA','MAGALLANES','MAGAZINE','MAGIA','MANDALORIAN','MANUALIDA','MANZANA','MAQUILLAJE','MARCAS','MARISCAL','MARKETING','MARRUECOS','MARTE','MARVEL','MATERIA','MATRICES','MERCADEO','MERCADO','MERCADOTECNIA','MERCANTIL','MERCURIO','MERYLSTREEP','METEORITO','MEXICO','MICRONESIA','MILEYCYRUS','MINECRAFT','MOCASTLE','MODELOS','MODISTA','MONEDA','MONETARIO','MONOPOLIO','MONTANA','MULTINACIONAL','MUNDIAL','MUNDO','MURALISTAS','MURCIELAGO','MUSEOGRAFO','MUSEOS','MUSICA','MYTOTORO','NAIROBI','NARANJA','NARUTO','NASA','NATACION','NAURU','NEBULOSA','NEGOCIACION','NEGOCIOS','NEOLIBERAL','NEPTUNO','NETFLIX','NEUROLOGIA','NICARAGUA','NICOLEKIDMAN','NIGERIA','NORUEGA','NUEVAZELANDA','NUMEROLOGIA','OBRASART','OFERTA','OFERTANTE','OLDSCROLLO','OLEO','OLEOGRAFIA','OLEOSOBRE','OLIGOPOLIO','ONEPIECE','ONEPUNCHMAN','ORION','ORNITOLOGIA','OUTFIT','OVERWATCH','PAGARE','PAINTBALL','PAISAJE','PAISAJISMO','PAISESBAJOS','PALADINS','PALAU','PANAMA','PANDORA','PAPELMAKIS','PAPERCUT','PARAGUAY','PASARELA','PASION','PATRONAL','PEINADO','PERU','PETER','PHASMOPHOB','PIANO','PIEL','PIGMENTOS','PINCELAZO','PINCELAZOS','PINCELES','PINCELETA','PINGUINO','PINTARRON','PINTARRONES','PINTORAS','PINTORES','PINTURA','PINTURAEN','PIZZA','PLANETA','PLAYLISTS','PLUTON','POKEMON','POLITICA','POLONIA','POLVO','PORTUGAL','POSTMALONE','PRECIOS','PREHISTORIC','PRESTAMO','PRIMA','PRINCESS','PRODUCCION','PRODUCTO','PRODUCTOR','PROTECCION','PROVEEDOR','PUBG','PUERTORICO','PULPFICTION','PUMA','PUNTILLIS','PUNTILLISM','QUIZAS','RECESION','REDDIT','RELIEVES','RELOJERIA','REMATE','REMESA','RENTA','REPDOMINICANA','RETABLISTA','RETABLOS','RETRATANDO','RETRATAR','RETRATARO','RETRATIST','RETRATO','RETRATOS','REYENDYMION','RIHANNA','RINOCERONTE','RIO','ROBERTDOWNEY','ROBLOX','ROBOT','ROBOTICA','ROCA','ROCKETLEAG','RUBI','RUMANIA','RUNESCAPE','RUSIA','RUST','SABANA','SAILORMOON','SALARIO','SALOMON','SALUD','SAMOA','SATELITE','SCARLETT','SCIFI','SEAOFTHIEVE','SEGURO','SELENAGOMEZ','SELVA','SERBIA','SEXOLOGIA','SHAWNMENDES','SIMPSONS','SINDICALISMO','SINGAPUR','SISTEMAS','SKYPE','SMITE','SNAPCHAT','SOCIALISMO','SOFIAVERGARA','SONIDO','SOSTENIBLE','SOUNDCLOUD','SPACEX','SPAIN','SPIDERMAN','SPIRITED','SPOTIFY','STARCRAFT','STARWARS','STEINS','STORIES','STRANGER','STUDIOS','SUBASTA','SUBSIDIO','SUDAFRICA','SUDOKU','SUECIA','SUIZA','SUPERAVIT','SUPERMAN','SURINAM','SWORDONLINE','TAICHI','TALENTO','TALLERES','TALLERIST','TALLERISTAS','TARIFA','TAROT','TASA','TAYLORSWIFT','TEAMFIGHT','TECNOLOGIA','TEJEDURIA','TEJEDURIAS','TELA','TELEGRAM','TEMPELATES','TENDENCIA','TERA','TERMINATOR','TERRARIA','TETRIS','TEXTIL','THECROWN','THEGODFATHER','THELIONKING','THEMATRIX','THEOFFICE','THESHINING','THETERMINATOR','THOR','TIDAL','TIENDA','TIGERKING','TIGRE','TIGRILLO','TIKTOK','TIKTOPDANCE','TINTOREAS','TIZIANOS','TIZIANOVA','TOKYO','TOMCRUISE','TOMHANKS','TOMHOLLAND','TONGA','TOPOGRAFIA','TORRE','TORREDEPISA','TORREEIFFEL','TORTUGA','TOYSTORY','TRADICION','TRAMPANTO','TRENDS','TRIPTICOS','TRIVIAL','TROPICAL','TUCAN','TURING','TURQUIA','TUVALU','TWITCH','TWITTER','UCRANIA','UNIVERSO','URANO','URBANISMO','URUGUAY','USA','UTILIDAD','UTOPICO','VALOR','VALORANT','VANGUARDIS','VANUATU','VENDEDOR','VENDER','VENEZUELA','VENTA','VENUS','VESTIDOS','VESTUARIO','VETERINARIA','VIAJES','VIDEOJUEGOS','VINILO','VINILOSADH','VIOLADAVIS','VIOLONCHELO','VIRUS','VLOGS','VOZ','WALKINGDEAD','WALLABY','WARCRAFT','WARFRAME','WESTWORLD','WHATSAPP','WONDERWOMAN','WORLDWART','WOWCLASSIC','XBOX','XENOVERSE','YOGA','YOURLIE','YOUTUBE','YOUTUBETV','YUYUHAKUSHO','ZAFIRO','ZAPATO','ZELDA','ZENON','ZONAARTE','ZOOLOGIA','ZOOM'
]
