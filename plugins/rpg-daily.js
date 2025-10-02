let handler = async (m, {conn, isPrems, db, userdb, senderJid}) => {
const free = 5000
const prem = 20000

const {msToTime, pickRandom} = await import('../lib/functions.js')
const {rpgshop} = await import('../rpg.js')
let premium = userdb.premium

let exp = `${pickRandom([500, 600, 700, 800, 900, 999, 1000, 1300, 1500, 1800])}` * 1
let exppremium = `${pickRandom([1000, 1500, 1800, 2100, 2500, 2900, 3300, 3600, 4000, 4500])}` * 1

let money = `${pickRandom([300, 500, 700, 900, 500, 800, 900, 1100, 1350, 1500])}` * 1
let moneypremium = `${pickRandom([800, 1300, 1600, 1900, 2200, 2500, 2700, 3000, 3300, 3500])}` * 1

let potion = `${pickRandom([1, 2, 3, 4, 5])}` * 1
let potionpremium = `${pickRandom([2, 4, 6, 9, 12])}` * 1

let tiketcoin = `${pickRandom([1, 0, 0, 2, 0])}` * 1
let tiketcoinpremium = `${pickRandom([2, 1, 1, 3, 4])}` * 1

let eleksirb = `${pickRandom([1, 1, 1, 3, 1, 2, 2, 1, 5, 8])}` * 1
let eleksirbpremium = `${pickRandom([3, 3, 5, 3, 8, 3, 4, 4, 10, 7])}` * 1

let umpan = `${pickRandom([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])}` * 1
let umpanpremium = `${pickRandom([30, 60, 90, 120, 150, 180, 210, 240, 270, 300])}` * 1


const recompensas = {
exp: premium ? exppremium : exp,
money: premium ? moneypremium : money,
potion: premium ? potionpremium : potion,
tiketcoin: premium ? tiketcoinpremium : tiketcoin,
eleksirb: premium ? eleksirbpremium : eleksirb,
umpan: premium ? umpanpremium : umpan,
}
let time = userdb.lastclaim + 86400000
if (new Date - userdb.lastclaim < 86400000) {
let resp =`🎁 *Ya recogiste tu recompensa diaria*\n\n🕚 Vuelve en *${msToTime(time - new Date())}* `
return conn.sendWritingText(m.chat, resp, userdb, m);
}
let texto = ''
for (let reward of Object.keys(recompensas)) {
if (!(reward in userdb)) continue
userdb[reward] += recompensas[reward]
texto += `*+${rpgshop.emoticon(reward)}*: ${recompensas[reward]}\n`
}
userdb.exp += isPrems ? prem : free
let resp = `
🎁 *RECOMPENSA DIARIA*
▢ *Has recibido:*
🆙 *XP*: +${isPrems ? prem : free}\n${texto}`
userdb.lastclaim = new Date * 1
return conn.sendWritingText(m.chat, resp, userdb, m);
}
handler.help = ['daily']
handler.tags = ['xp']
handler.command = ['daily', 'claim'] 
handler.menu = [
{title: "🎁 RECOMPENSA DIARIA", description: `Recoge tu recompensa diaria, usa el comando #daily`, id: `daily`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler
