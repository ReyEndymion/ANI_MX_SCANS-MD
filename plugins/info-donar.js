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
let handler = async (m, { conn, participants  }) => {
    let ow = global.owner.filter(entry => typeof entry[0] === `string` && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).map(toNumber(``)).sort(sort(``)).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : `@`}${jid.split`@`[0]}`).join` y `
    let userm = `@${m.sender.split`@`[0]}`
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
*┗ ┅ ━━━━━━━━━ ┅ ━*
`.trim()
conn.sendMessage(m.chat, {text: donar, mentions: conn.parseMention(donar) },  { quoted: m }, { disappearingMessagesInChat: 1 * 1000} )
}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)|donar|apoyar$/i
export default handler
