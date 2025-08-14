import readline from 'readline'
import axios from 'axios'
import { countryAbbreviationsAlpha3, DEFAULT_HEADERS } from '../lib/constants.js'
let handler = async (m, {conn, args, text, usedPrefix, command, db, userdb, senderJid}) => {
if (/alpha3list/.test(command)) {
const codes = []
let resp = ` Esta es la lista completa para las abreviaciones Alfa 3:\n`
for (const [abbreviation, pais] of Object.entries(countryAbbreviationsAlpha3)) {
resp += `${pais} -> ${abbreviation}\n`
codes.push({pais, abbreviation})
}
if (!text) {
let resp = `*[❗] INGRESE EL NOMBRE DE UN PAIS, EJEMPLO ${usedPrefix + command} Mexico Para saber su código*\n Si quiere ver la lista completa use:\n*${usedPrefix + command} full*`
return conn.sendWritingText(m.chat, resp, userdb, m);
} else if (text === 'full') {
return conn.sendWritingText(m.chat, resp, userdb, m);
} else {
let resp = ` Esta es la abreviación correspondiente para ${text}:\n`
for (const [_, {pais, abbreviation}] of Object.entries(codes)) {

if (text.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() === pais.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()) resp += `${pais} -> ${abbreviation}`
}
return conn.sendWritingText(m.chat, resp, userdb, m);
}
}
if (/^(corona|covid|covid19)$/i.test(command)) {
const code = args[0].toUpperCase()
if (!code) return conn.sendWritingText(m.chat, `Uso incorrecto del comando Por favor consulte la lista completa o de su país usando el comando ${usedPrefix}alpha3list`, userdb, m)
let {key} = await conn.sendWritingText(m.chat, `⏳ _Cargando, aguarde un momento_`, userdb, m)
const aguarde = [
'*⌛ _Cargando, aguarde un momento..._ ▭▭▭▭*',
'*⏳ _Cargando, aguarde un momento..._ ▬▭▭▭*',
'*⌛ _Cargando, aguarde un momento..._ ▬▬▭▭*',
'*⏳ _Cargando, aguarde un momento..._ ▬▬▬▭*',
'*⌛ _Terminando, aguarde un momento..._ ▬▬▬▬*'
]

for (let i = 0; i < aguarde.length; i++) {
await conn.sendEditWritingText(m.chat, aguarde[i], key, userdb, m)
}
const apiUrl = `https://www.who.int/countries/${args[0]}`;
const csv = 'https://covid.ourworldindata.org/data/owid-covid-data.csv';
try {
	
const response = await axios.get(csv, {responseType: 'stream'});
const rl = readline.createInterface({
input: response.data,
crlfDelay: Infinity
});

let headers = [];
let latestRow = null;

for await (const line of rl) {
const row = line.split(',');

if (!headers.length) {
headers = row;
continue;
}

const record = {};
headers.forEach((h, i) => (record[h] = row[i]));

if (record.iso_code === code) {
latestRow = record;
}
}

if (!latestRow) {
throw new Error('País no encontrado');
}
const resp = `
🌏 País: ${latestRow.location}
✅ Confirmado: ${latestRow.total_cases}
☠️ Muertes: ${latestRow.total_deaths}
💌 Info Actualizada: ${latestRow.date}
Para más información consulte la página: ${apiUrl}
`.trim();
await conn.sendEditWritingText(m.chat, resp, key, userdb, m);
} catch (error) {
return conn.sendWritingText(m.chat, error.message+'\n'+error.stack, userdb, m);
}
}
}
handler.help = ['covid'].map(v => v + ' <país>')
handler.tags = ['info']
handler.command = /^(corona|covid|covid19|alpha3list)$/i
handler.menu = [
{title:"💎 COVID", description: "muestra información del COVID-19 de un país usando #covid <país>", id: `covid`}
];
handler.type = "info";
handler.disabled = false;

export default handler


