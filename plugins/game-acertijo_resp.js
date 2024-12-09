import similarity from 'similarity'
const threshold = 0.72
let handler = m => m
handler.before = async function (m, {conn}) {
if (m.chat == sBroadCastID || m.chat.endsWith(newsletterID)) return
const bot = global.db.data.bot[conn.user.jid] || {}
const chats = bot.chats || {}
const privs = chats.privs || {}
const groups = chats.groups || {}
const chat = m.isGroup ? groups[m.chat] || {} : privs[m.chat] || {}
const users = m.isGroup ? chat.users || {} : privs || {}
const user = m.isGroup ? users[m.sender] || {} : privs[m.sender] || {}
if (user.banned) return
let id = m.chat
if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0
this.tekateki = this.tekateki ? this.tekateki : {}
if (!(id in this.tekateki)){ 
let resp = 'Ese acertijo ya ha terminado!'
return conn.sendWritingText(m.chat, resp, m );
}
if (m.quoted.id == this.tekateki[id][0].id) {
let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
let userResponse = m.text.toLowerCase();
if (userResponse.includes(json.response.toLowerCase().trim())) {
users[m.sender].exp += this.tekateki[id][2]
let resp = `*Respuesta correcta!*\n+${this.tekateki[id][2]} Exp`
clearTimeout(this.tekateki[id][3])
delete this.tekateki[id]
return conn.sendWritingText(m.chat, resp, m );
} else if (similarity(userResponse, json.response.toLowerCase().trim()) >= threshold) {
let resp = `Casi lo logras!`
return conn.sendWritingText(m.chat, resp, m );
} else {
let resp = 'Respuesta incorrecta!'
return conn.sendWritingText(m.chat, resp, m );
}
}
return !0
}
handler.exp = 0
export default handler
