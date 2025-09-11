let handler = async (m, {conn, command, text, usedPrefix, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESE EL @tag DE ALGUN PARTICIPANTE DEL GRUPO O EL NOMBRE DE LA PERSONA*`, userdb, m)
if (command == 'gay2') {
return conn.sendWritingText(m.chat, `
_*${text.toUpperCase()}* *ES 🏳️‍🌈* *${(500).getRandom()}%* *GAY*_
`.trim(), m)}
if (command == 'lesbiana') {
return conn.sendWritingText(m.chat, `
_*${text.toUpperCase()}* *ES 🏳️‍🌈* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()}*_
`.trim(), m)} 
if (command == 'pajero') {
return conn.sendWritingText(m.chat, `
_*${text.toUpperCase()}* *ES 😏💦* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()}*_
`.trim(), m)} 
if (command == 'pajera') {
return conn.sendWritingText(m.chat, `
_*${text.toUpperCase()}* *ES 😏💦* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()}*_
`.trim(), m)} 
if (command == 'puto') {
return conn.sendWritingText(m.chat, `
_*${text.toUpperCase()}* *ES* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()},* *MÁS INFORMACIÓN A SU PRIVADO 🔥🥵 XD*_
`.trim(), m)} 
if (command == 'puta') {
return conn.sendWritingText(m.chat, `
_*${text.toUpperCase()}* *ES* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()},* *MÁS INFORMACIÓN A SU PRIVADO 🔥🥵 XD*_
`.trim(), m)} 
if (command == 'manco') {
return conn.sendWritingText(m.chat, `
_*${text.toUpperCase()}* *ES* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()} 💩*_
`.trim(), m)}
if (command == 'manca') {
return conn.sendWritingText(m.chat, `
_*${text.toUpperCase()}* *ES* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()} 💩*_
`.trim(), m)} 
if (command == 'rata') {
return conn.sendWritingText(m.chat, `
_*${text.toUpperCase()}* *ES* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()} 🐁 COME QUESO 🧀*_
`.trim(), m)}
if (command == 'prostituto') {
return conn.sendWritingText(m.chat, `
_*${text.toUpperCase()}* *ES* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()} 🫦👅, QUIEN QUIERE DE SUS SERVICIOS? XD*_
`.trim(), m)}
if (command == 'prostituta') {
return conn.sendWritingText(m.chat, `
_*${text.toUpperCase()}* *ES* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()} 🫦👅, QUIEN QUIERE DE SUS SERVICIOS? XD*_
`.trim(), m)} 
}
handler.help = ['gay2', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituta', 'prostituto'].map(v => v + ' @tag | nombre')
handler.tags = ['calculator']
handler.command = /^(gay2|lesbiana|pajero|pajera|puto|puta|manco|manca|rata|prostituta|prostituto)$/i
handler.menu = [
{title: "🎖️️ JODA PROSTITUTO", description: "usa #prostituto <nombre / @tag>", id: `prostituto`},
{title: "🎖️️ JODA PROSTITUTA", description: "usa #prostituta <nombre / @tag>", id: `prostituta`},
{title: "🎖️ JODA GAY", description: "usa #gay2 <nombre / @tag>", id: `gay2`},
{title: "🎖️ JODA LESBIANA", description: "usa #lesbiana <nombre / @tag>", id: `lesbiana`},
{title: "🎖️ JODA PAJERO", description: "usa #pajero <nombre / @tag>", id: `pajero`},
{title: "🎖️ JODA PAJERA", description: "usa #pajera <nombre / @tag>", id: `pajera`},
{title: "🎖️ JODA PUTO", description: "usa #puto <nombre / @tag>", id: `puto`},
{title: "🎖️ JODA PUTA", description: "usa #puta <nombre / @tag>", id: `puta`},
{title: "🎖️ JODA MANCO", description: "usa #manco <nombre / @tag>", id: `manco`},
{title: "🎖️ JODA MANCA", description: "usa #manca <nombre / @tag>", id: `manca`},
{title: "🎖️ JODA RATA", description: "usa #rata <nombre / @tag>", id: `rata`},
];
handler.type = "fun";
handler.disabled = false;

export default handler
