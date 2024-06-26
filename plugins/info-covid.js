import fetch from 'node-fetch'
import cheerio from 'cheerio'
import axios from 'axios'
import { JSDOM } from 'jsdom'
let handler = async (m, { conn, text, usedPrefix, command }) => {
const country = text.toLowerCase();
const countryAbbr = countryAbbreviationsLowerCase[country];
const apiUrl = `https://www.who.int/countries/${countryAbbr}`;
const response = await axios.get(apiUrl);
const htmlContent = response.data;        
console.log('datos aqui: ', cheerio.load(htmlContent))
if (!text) {
let resp = `*[❗] INGRESE EL NOMBRE DE UN PAIS, EJEMPLO ${usedPrefix + command} Mexico*`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

}
axios.get(apiUrl)
  .then(async (response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
console.log('datos: ', $('div.heading1#confirmedCases').text()); 

      // Busca los elementos HTML con las clases o IDs relevantes y extrae los datos
      const newConfirmedCases = $('#viz-box-new-confirmed-cases .heading1').text();
      const confirmedCases = $.text('#confirmedCases');
      const confirmedDeaths = $('#viz-box-total-deaths-reported #confirmedDeaths').text();

      // Imprime los valores obtenidos
      console.log('New Confirmed Cases:', newConfirmedCases);
      console.log('Confirmed Cases:', confirmedCases);
      console.log('Confirmed Deaths:', confirmedDeaths);
    if (countryAbbreviationsLowerCase.hasOwnProperty(country)) {
// Ahora podemos usar $ para seleccionar elementos como en jQuery
        const totalCases = confirmedCases//.text().trim();
        const totalDeaths = confirmedDeaths//.text().trim();
        const newCases = newConfirmedCases//.text().trim();

        const resp = `
🌏 País: ${text}
✅ Confirmado: ${totalCases}
☠️ Muertes: ${totalDeaths}
💌 Info Actualizada: ${newCases}
`.trim();

let txt = '';
let count = 0;
for (const c of resp) {
    new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
} else {
}
    }
  })
  .catch(async(error) => {
console.error('Error al obtener la página:', error.message);
let resp =  `Hay un error ${error.message}`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
  });



}
handler.help = ['covid'].map(v => v + ' <país>')
handler.tags = ['info']
handler.command = /^(corona|covid|covid19)$/i
export default handler




const countryAbbreviations = {
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

const countryAbbreviationsLowerCase = {};
for (const abbreviation in countryAbbreviations) {
    const countryName = countryAbbreviations[abbreviation].toLowerCase();
    countryAbbreviationsLowerCase[countryName] = abbreviation;
}
