import { addExif } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
if (!m.quoted) throw '*[❗INFO❗] RESPONDE AL STICKER QUE DESEA AGREGAR UN PAQUETE Y UN NOMBRE*'
let stiker = false
try {
let [packname, ...author] = text.split('|')
author = (author || []).join('|')
let mime = m.quoted.mimetype || ''
if (!/webp/.test(mime)) throw '*[❗INFO❗] RESPONDE AL STICKER QUE DESEA AGREGAR UN PAQUETE Y UN NOMBRE*'
let img = await m.quoted.download()
if (!img) throw '*[❗INFO❗] RESPONDE AL STICKER QUE DESEA AGREGAR UN PAQUETE Y UN NOMBRE*'
stiker = await addExif(img, packname || '', author || '')
} catch (e) {
console.error(e)
if (Buffer.isBuffer(e)) stiker = e
} finally {
if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, false, { asSticker: true })
else throw '*[❗INFO❗] LO SIENTO, ALGO FALLO.. CORROBORE QUE HAYA RESPONDIDO A UN STICKER Y HAYA AGREGADO UN NOMBRE DE PAQUETE Y UN NOMBRE DE USUARIO*'
}}
handler.help = ['wm <packname>|<author>']
handler.tags = ['sticker']
handler.command = /^wm$/i
export default handler
