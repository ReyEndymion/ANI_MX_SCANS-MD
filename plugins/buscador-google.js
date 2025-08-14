let { default: google } = await import('google-it');
let handler = async (m, {conn, command, args, db, userdb, senderJid}) => {
const fetch = (await import('node-fetch')).default
let full = /f$/i.test(command)
let text = args.join` `
let url = 'https://google.com/search?q=' + encodeURIComponent(text)
let resp, imagen
if (!text) {
resp = '*[❗INFO❗] INGRESE EL TEXTO O TEMA QUE DESEE BUSCAR*'
} else {
try {
let search = await google({
query: text,
options: {
url: 'https://www.google.com/search',
qs: {
q: text,
num: 10,
start: 0,
lr: 'lang_es' 
},
headers: {
'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:34.0) Gecko/20100101 Firefox/34.0',
},
}
})
imagen = `https://image.thum.io/get/fullpage/${url}`
resp = `*RESULTADOS DE : _${text}_*\n\n${url}\n\n`
let toesp = ''
for (let g of search) {
resp += `_*${g.title}*_\n_${g.link}_\n_${g.snippet}_\n\n`
} 
} catch (error) {
resp = `${error}`
}
}

if (imagen) {
return conn.sendImageWriting(m.chat, imagen, resp.trim(), userdb, m);
} else {
return conn.sendWritingText(m.chat, resp.trim(), userdb, m)
}		
}
handler.help = ['google', 'googlef'].map(v => v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^googlef?$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
