import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import moment from 'moment-timezone'
import { platform } from 'process'
import { createRequire } from "module";
import lodash from 'lodash';
import { dirname, __filename } from './lib/functions.js'
const raizPath = dirname(import.meta.url)
const require = createRequire(raizPath)
export const { name, nameProyect, author, description, repository } = require(path.join(raizPath, './package.json'))
/***************GLOBAL CONFIG****************/
export const raiz = `./`
export const authFolderRespald = path.join(raizPath, `sesionRespaldo`)
export const dataBases = path.join(raizPath, 'dataBases')
export const temp = path.join(raizPath, 'tmp')
export const media = path.join(raizPath, 'media')
/**********OWNER***********************/
export const owner = [
['5215517489568','𝓢𝓾𝓹𝓻𝓮𝓶𝓮 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷 - Creador 👁️', false],
['5215533827255', '𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷 - Creador 👑', true]
] // Cambia los numeros que quieras
/**********GLOBAL INFO*****************/
export const info = {
packname: '(☞ﾟ∀ﾟ)☞',
descr: description,
kom: '(☞ﾟ∀ﾟ)☞',
amsicon: ['🌎', '🌍', '🌏'],
nani: 'ANI MX SCANS',
nanip: '🌎ANI MX SCANS🌏',
nanipe: '★🌎ANI MX SCANS🌏★',
np: nameProyect,
npe: `★${nameProyect}★`,
paypal: author.donate,
otkstgthr: 'ㄖㄒ卂Ҡ凵丂 ㄒㄖᎶ乇ㄒ卄乇尺',
namerepre: `「 Traducciones de Manga 」`,
gitAuthor: author.git,
author: author.name,
repoProyect: repository.link,
md: repository.url,
urlgofc: 'https://www.facebook.com/groups/otakustogether',
hp_animxscans: 'https://www.facebook.com/animxscans' ,
hp_otkstogthr: 'https://www.facebook.com/OtakusTogether' ,
}
/************ Config Terminal **************/
/*Configuracion de arranque en archivo configDynamics.json*/

/**Configuracion de arranque */

/************IMAGEWEB**********************/
export const anipp = path.join(media,`pictures/ANI.jpg`)
export const imagen1 = path.join(media,`pictures/Menu2.jpg`)
export const imagen2 = path.join(media,`pictures/nuevobot.jpg`)
export const imagen3 = path.join(media,`pictures/Pre Bot Publi.png`)
export const imagen4 = path.join(media,`pictures/Menu.png`)
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

/***Configuración de logotipos******* */	
export const botdate = `⫹⫺ Date :${moment.tz('America/Los_Angeles').format('DD/MM/YY')}` //Asia/Jakarta
export const bottime = `𝗧 𝗜 𝗠 𝗘 : ${moment.tz('America/Los_Angeles').format('HH:mm:ss')}`//America/Los_Angeles
//export const wm2 = `▸ ${dia} ${fecha}\n${info.igfg}`
//*************MENSAJES****************
/**********global tags***************/
export const userID = `@s.whatsapp.net`
export const groupID = '@g.us'
export const sBroadCastID = `status@broadcast`
export const newsletterID = `@newsletter`
export const lid = '@lid'
export const espadmins = []
export const prems = [] 
export const mods = []
/********QUOTEDS*************** */
export const fgif = {key: { participant : '0@s.whatsapp.net'}, message: { "videoMessage": { "title": info.wm, "h": `Hmm`, 'seconds': '999999999','gifPlayback': 'true','caption': bottime, 'jpegThumbnail': imagen4}}}
export const estado = {key: {participant: '0@s.whatsapp.net', remoteJid: '0@s.whatsapp.net'}, message: {groupInviteMessage: {groupJid: "1234567890-9876543210@g.us", inviteCode: `\n`, groupName: groupID, caption: `${userID}\n${info.igfg}`, jpegThumbnail: imagen2}}}
export const q = { key: { fromMe: false, participant: userID, ...(false ? { remoteJid: "9876543210-0123456789@g.us" } : {}) }, message: { extendedTextMessage: { text: '', title: info.wm, 'jpegThumbnail': null }}}


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
import(`${__filename(file)}?update=${Date.now()}`)
console.log(chalk.redBright(`"Actualizado ${file.replace(raizPath, '').replace (/[\/\\]/g, '')}"\nUpdate ${new Date(Date.now()).toString()}`))
})
//
export {
require,
raizPath
}
