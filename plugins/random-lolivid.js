let handler  = async (m, { conn, usedPrefix, command }) => {
let res = "https://api.zacros.my.id/asupan/loli"
conn.sendHydrated(m.chat, null, null, res, null, null, null, null, [['🔄SIGUIENTE🔄', `/${command}`]], m)}
handler.help = ['lolivid']
handler.tags = ['random']
handler.command = /^(lolivid|lolivideos|lolívid)$/i
export default handler
