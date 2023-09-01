export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants}) {
  const espadmins = [
    ['50237822582'],
    ['50257602757'], 
    ['50372982101'], 
    ['50581492411'], 
    ['50582438276'], 
    ['50763057799'], 
    ['51901786322'], 
    ['51984122833'], 
    ['51969664348'], 
    ['5212411719937'],
    ['5215532867844'], 
    ['5213322708837'], 
    ['5213326820930'], 
    ['5213328673075'], 
    ['5213531275886'], 
    ['5214191056589'], 
    ['5214423933594'], 
    ['5214775190562'], 
    ['5215560065619'], 
    ['5215587486329'], 
    ['5215613310013'], 
    ['5215618937690'], 
    ['5217292331176'], 
    ['5217443714420'], 
    ['5217712009688'], 
    ['5218444999765'], 
    ['5218442677056'], 
    ['5219842545994'], 
    ['5219842504743'], 
    ['5219991307200'], 
    ['5219616650861'], 
    ['5219992698701'], 
    ['573132928488'], 
    ['573206049511'], 
    ['573172517283'], 
    ['573108715954'], 
    ['573175070854'], 
    ['573206279063'], 
    ['573105436190'], 
    ['573166730283'], 
    ['584128927527'], 
    ['59161545885'], 
    ['59162618066'], 
    ['59169283414'], 
    ['593979173410'], 
    ['34641526429'], 
    ['14192396562'], 
    ['12232308954'], 
    ['12246057118']
    ]

let sender = m.sender.split`@`[0];
let creators = owner.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join` y `
let adm = espadmins.flat().map(entry => entry.trim()).filter(entry => entry === sender).length > 0;
//console.log('esto da lo que elegi: ', m.sender + '\n\n'+ adm)
const regexp = /(reporte|piedra|papel|tijera|serbot|jadibot|deletebot|stop|codetoken)/i;
const containsWord = regexp.test(m.text);
if (m.isBaileys && m.fromMe) return !0
if (m.isGroup) return !0
if (adm) return 1;
if (!m.message) return !0
if (containsWord) return !0
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[this.user.jid] || {}
    let ban = `Hola *@${sender}*, está prohibido hablar al privado del bot serás bloqueado.\nDudas con *${creators}\n Para los jadibots aqui solo se pueden usar los comandos jadibot/serbot, deletebot, stop y estado \n\n El grupo para usar el bot es : https://chat.whatsapp.com/DpcgpFF2RO16wFG9SlZemG`
    if (bot.antiPrivate && !isOwner && !isROwner) {
      let txt = '';
      let count = 0;
      for (const c of ban) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
await this.updateBlockStatus(m.chat, 'block');
  }

    return !1;
}
