let handler = async (m, {conn, text, db, userdb, senderJid}) => {
let id = m.chat
conn.math = conn.math ? conn.math : {}
if (id in conn.math) {
clearTimeout(conn.math[id][3])
delete conn.math[id]
return conn.sendWritingText(m.chat, `HEY!! ESTAS HACIENDO TRAMPA`, userdb, m)}
let val = text
.replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
.replace(/×/g, '*')
.replace(/÷/g, '/')
.replace(/π|pi/gi, 'Math.PI')
.replace(/e/gi, 'Math.E')
.replace(/\/+/g, '/')
.replace(/\++/g, '+')
.replace(/-+/g, '-')
let format = val
.replace(/Math\.PI/g, 'π')
.replace(/Math\.E/g, 'e')
.replace(/\//g, '÷')
.replace(/\*×/g, '×')
try {
console.log(val)
let result = (new Function('return ' + val))()
if (!result) throw result
conn.sendWritingText(m.chat, `*format* = _${result}_`, userdb, m)
} catch (e) {
if (e == undefined) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESE LA OPERACION MATEMATICA QUE DESEE CALCULAR*`, userdb, m)
return conn.sendWritingText(m.chat, `*[❗INFO❗] FORMATO NO ADMITIDO, SOLO SE ADMITEN NUMEROS Y LOS SIMBOLOS -, +, *, /, ×, ÷, π, e, (, )*`, m)
}}
handler.help = ['calc <expression>']
handler.tags = ['tools']
handler.command = /^(calc(ulat(e|or))?|kalk(ulator)?)$/i
handler.exp = 5
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
