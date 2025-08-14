import moment from 'moment-timezone'
import { countries } from 'country-data';

let handler = async (m, {conn, db, usedPrefix, command, args, userdb, senderJid}) => {
const countryZones = {}
for (const zone of moment.tz.names()) {
const parts = zone.split('/')
if (parts.length > 1) {
const country = parts[1].replace('_', ' ').toLowerCase()
if (!countryZones[country]) countryZones[country] = []
countryZones[country].push(zone)
}
}
const regionesOrden = ['America', 'Europe', 'Africa', 'Asia', 'Pacific', 'Antarctica'];
const paisesPorRegion = {};
const linesList = []
const keys = []
const names = []
const times = []
for (const [key, datas] of Object.entries(countries)) {
if (key === 'all' || datas.status === 'delete') continue
let emoji = datas.emoji
if (!emoji) emoji = '🤷'
keys.push(key)
if (/^(horariolocal)$/i.test(command)) names.push(datas.name.toUpperCase())
const zones = moment.tz.zonesForCountry(key);
if (!zones || !zones.length) continue;
zones.forEach(z => {
const region = z.split('/')[0];
const mtz = moment().tz(z)
const time = mtz.format('DD/MM HH:mm');
const offsetmin = mtz.utcOffset()
let ciudad = ''
for (const [alias, zoneList] of Object.entries(countryZones)) {
if (zoneList.some(zone => zone.includes(z))) {
ciudad += alias
}
}
times.push({
region,
ciudad,
nombre: datas.name,
bandera: datas.emoji || '🌐',
time,
offsetmin,
})
});
if (!times.length) continue

if (/^listapaises$/.test(command)) linesList.push(`${emoji}${datas.name} --> ${key}`)
}
if (/^(horario)$/i.test(command)) {
let resp = `📌 *Uso del comando ${usedPrefix+command}*:
1️⃣ *${usedPrefix}horariolocal [zona]* → Hora local (ej. ${usedPrefix}horariolocal ${keys.getRandom()})
2️⃣ *${usedPrefix}horariozone [zona|país]* → Hora en zona específica (ej. ${usedPrefix}horariozone peru)
3️⃣ *${usedPrefix}horariomundial* → Lista agrupada de horarios globales.

Consulta el comando *${usedPrefix}listapaises* para ver los Codigos ISO aceptados por pais`
return conn.sendWritingText(m.chat, resp, userdb, m)

}
if (/^(horariolocal)$/i.test(command)) {
if (!args[0]) return conn.sendWritingText(m.chat, `*${usedPrefix+command} [zona]* → Hora local (ej. ${usedPrefix+command} ${keys.getRandom()})`, userdb, m)
const isoInput = args[0].toString().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
let isoCode = null;
if (keys.includes(isoInput)) {
isoCode = isoInput;
} else {
const idx = names.findIndex(n => n === isoInput);
if (idx !== -1) isoCode = keys[idx];
}

if (!isoCode) {
return conn.sendWritingText(m.chat, `⚠️ País no encontrado.\nUsa *${usedPrefix}listapaises* para ver opciones.`, userdb, m);
}
const countryInfo = countries[isoCode]

const timeZone = moment.tz.zonesForCountry(countryInfo.alpha2)
if (!countryInfo || countryInfo.status === 'deleted' || timeZone === null) {
return conn.sendWritingText(m.chat, `⚠️ Código inválido o país no disponible.\nEscribe *${usedPrefix}listapaises* para ver los códigos ISO.`, userdb, m);
}

let emoji 
const region = timeZone[0].split('/')[0];
switch (region) {
case 'America': emoji = '🌎'; break 
case 'Europe': emoji = '🌍'; break
case 'Africa': emoji = '🌍'; break
case 'Asia': emoji = '🌏'; break
case 'Pacific': emoji = '🌏'; break
case 'Antarctica': emoji = '❄️'; break
default: emoji = '🌎'; break
}
let resp = `${emoji} País: *${countries[isoCode].name}*\n\n`;
resp += `Zonas horarias disponibles:\n`;
for (const [alias, zoneList] of Object.entries(countryZones)) {
if (zoneList.some(zone => zone.includes(timeZone[0]))) {
resp += `${alias}\n`;
}
}
resp += timeZone.map(z => `- ${z.split('/')[1]}: ${moment().tz(z).format('DD/MM HH:mm')}`).join('\n');
return conn.sendWritingText(m.chat, resp, userdb, m)
}
if (/^horariomundial$/i.test(command)) {
let resp = `Horas en el mundo:\n`
for (const region of regionesOrden) {
if (!paisesPorRegion[region]) paisesPorRegion[region] = [];
if (!paisesPorRegion[region]) continue;

paisesPorRegion[region].push(times);
times.sort((a, b) => a.offsetmin - b.offsetmin);
resp += `\n*${region.toUpperCase()}*\n`;
for (const pais of paisesPorRegion[region]) {
for (const ciudad of pais) {
if (ciudad.region !== region) continue
resp += `${ciudad.bandera} ${ciudad.nombre}:\n${ciudad.ciudad} ${ciudad.time}\n`;

}
}
}
console.log('horario: ', resp)
return conn.sendWritingText(m.chat, resp, userdb, m)
}
if (/^horariozone$/i.test(command)) {
if (!args[0]) return conn.sendWritingText(m.chat, `*Uso:* ${usedPrefix + command} <zona>\nEj: ${usedPrefix + command} ${regionesOrden.getRandom().toLowerCase()}\nZonas: ${regionesOrden.join(', ').toLowerCase()}`, userdb, m);
const inRaw = args.join(' ').trim().toString().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
if (!times.length) {
return conn.sendWritingText(m.chat, `No encontré países en la zona *${inRaw}*.`, userdb, m);
}

times.sort((a, b) => a.offsetmin - b.offsetmin);

const regionEmoji = (() => {
switch (inRaw) {
case 'america': return '🌎';
case 'europe':
case 'africa': return '🌍';
case 'asia':
case 'pacific': return '🌏';
case 'antarctica': return '❄️';
default: return '🌐';
}
})();

let resp = `${regionEmoji} *${inRaw.toUpperCase()}*\n`;
for (const p of times) {
if(p.region.toLowerCase() !== inRaw) continue
resp += `${p.bandera} ${p.nombre}:\n${p.ciudad} ${p.time}\n`;
}

return conn.sendWritingText(m.chat, resp.trim(), userdb, m);
}
if (/^listapaises$/.test(command)) {
const resp = `Codigos ISO aceptados por pais en este comando:
${linesList.join('\n')}`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}

handler.help = ['horario']
handler.tags = ['info']
handler.command = /^(horario(local|mundial|zone)?|listapaises)$/i

handler.menu = [
{title:"💎 HORARIO", description: "muestra el horario de diferentes países usando #horario", id: `horario`}
];
handler.type = "info";
handler.disabled = false;

export default handler
