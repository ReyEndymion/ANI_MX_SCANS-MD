//import axios from "axios"
const { owner, temp, newsletterID, sBroadCastID, userID, groupID, media } = await import('../config.js')
let handler = async (m, {start, info, command, conn, db, userdb, senderJid}) => {
let resp = '', imagen
if (command == 'akira') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/akira?apikey=APIKEY`)
conn.sendMessage(m.chat, {image:{url: haha.data}, caption: `_${command}_`.trim(), }, [['🔄 SIGUIENTE 🔄', `/${command}`]], m)}
if (command == 'akiyama') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/akiyama?apikey=APIKEY`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'anna') {
let haha = await conn.getFile(`https://api.sekha.tech/api/wallpaper/ana?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'asuna') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/asuna?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'ayuzawa') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/ayuzawa?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'boruto') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/boruto?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'chiho') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/chiho?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
} 
if (command == 'chitoge') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/chitoge?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'deidara') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/deidara?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'erza') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/erza?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'elaina') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/elaina?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'eba') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/eba?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'emilia') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/emilia?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'hestia') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/hestia?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'hinata') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/hinata?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'inori') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/inori?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'isuzu') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/isuzu?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
} 
if (command == 'itachi') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/itachi?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'itori') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/itori?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'kaga') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kaga?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'kagura') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kagura?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'kaori') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kaori?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'keneki') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/keneki?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
} 
if (command == 'kotori') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kotori?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'kurumi') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kurumi?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'madara') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/madara?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'mikasa') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/mikasa?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'miku') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/miku?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'minato') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/minato?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
} 
if (command == 'naruto') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/naruto?apikey=APIKEY`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'nezuko') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/nezuko?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'sagiri') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/sagiri?apikey=APIKEY`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'sasuke') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/sasuke?apikey=APIKEY`)
imagen = haha.data
resp = `_${command}_`.trim()
} 
if (command == 'sakura') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/sakura?apikey=APIKEY`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'cosplay') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/random/cosplay?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
const buff = info.nanie
const buttons = [['🔄 SIGUIENTE 🔄', `/${command}`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendImageWriting(m.chat, imagen, resp+'\n'+cmds+'\n'+'\n'+buff, m );
}

}
handler.command = handler.help = ['akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura', 'cosplay']
handler.tags = ['anime']
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
