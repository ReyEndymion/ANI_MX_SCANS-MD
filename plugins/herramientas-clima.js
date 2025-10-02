import axios from "axios"

let handler = async (m, {conn, args, db, userdb, senderJid}) => {
if (!args[0]) {
let resp = `*[❗INFO❗] ESCRIBA EL NOMBRE DE SU PAIS O CIUDAD*`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
try {
const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`)
const res = await response
const name = res.data.name
const Country = res.data.sys.country
const Weather = res.data.weather[0].description
const Temperature = res.data.main.temp + "°C"
const Minimum_Temperature = res.data.main.temp_min + "°C"
const Maximum_Temperature = res.data.main.temp_max + "°C"
const Humidity = res.data.main.humidity + "%"
const Wind = res.data.wind.speed + "km/h"
const wea = `「 📍 」LUGAR: ${name}\n「 🗺️ 」PAIS: ${Country}\n「 🌤️ 」TIEMPO: ${Weather}\n「 🌡️ 」TEMPERATURA: ${Temperature}\n「 💠 」 TEMPERATURA MINIMA: ${Minimum_Temperature}\n「 📛 」TEMPERATURA MAXIMA: ${Maximum_Temperature}\n「 💦 」HUMEDAD: ${Humidity}\n「 🌬️ 」 VIENTO: ${Wind}
`.trim()

await conn.sendWritingText(m.chat, wea, userdb, m)
} catch (e) {
let resp = " *[❗INFO❗] Error!\n _No se encontrarón resultados, trate de escribir un país o ciudad existente._* "

await conn.sendWritingText(m.chat, resp, userdb, m)
}
}
handler.help = ['clima *<ciudad/país>*']
handler.tags = ['herramientas']
handler.command = /^(clima|tiempo)$/i
handler.menu = [
{title:"💎 CLIMA", description: "muestra el clima de una ciudad o país usando #clima <ciudad/país>", id: `clima`}
];
handler.type = "herramientas";
handler.disabled = false;

export default handler