/* ⚠ POR FAVOR NO MODIFIQUES NADA DE AQUÍ ⚠ */

function sort(property, ascending = true) {
    if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
    else return (...args) => args[ascending & 1] - args[!ascending & 1]
  }
  
  function toNumber(property, _default = 0) {
    if (property) return (a, i, b) => {
      return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
    }
    else return a => a === undefined ? _default : a
  }
let handler = async (m, { conn, participants, usedPrefix  }) => {
    let ow = global.owner.filter(entry => typeof entry[0] === `string` && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).map(toNumber(``)).sort(sort(``)).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : `@`}${jid.split`@`[0]}`).join` y `
    let userm = `@${m.sender.split`@`[0]}`
    let estado = {key: {participant: "0@s.whatsapp.net", "remoteJid": "0@s.whatsapp.net"}, "message": {"groupInviteMessage": {"groupJid": "51995386439-1616969743@g.us", "inviteCode": "m", "groupName": "P", "caption": wm, 'jpegThumbnail': imagen1}}}
    let donar =`
*┏ ┅ ━━━━━━━━━ ┅ ━*
*┇          「 DONAR 」*
*┣ ┅ ━━━━━━━━━ ┅ ━*
*┃ HOLA ${userm} 💙*
*┃*
*┃ 👉🏻 AQUI ALGUNOS DATOS*
*┃ POR SI GUSTAS APOYAR :𝟹*

*┃ ➤ CONCEPTO: APOYO*  
*┃ ➤ PAYPAL: paypal.me/AMxScan*
*┃ 👉🏻 CONTACTAME SI NECESITAS MAS DATOS Y PARA AGRADECERTE <3*
*┃ ${ow}*
*┗ ┅ ━━━━━━━━━ ┅ ━*\n\n
[[Usa el comando : *${usedPrefix}paypal* para mostrar el enlace completo]]\n\n
${wm}
`.trim()
let txt = '';
let count = 0;
for (const c of donar) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
conn.sendMessage(m.chat, { text: donar, wm, mentions: conn.parseMention(txt) }, {quoted: estado, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}) 
}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)|donar|apoyar$/i
export default handler
