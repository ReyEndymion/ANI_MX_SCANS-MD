let handler = async (m, {conn, args, command, db, userdb, senderJid}) => {
await conn.sendWritingText(m.chat, `*Adios a todos, el Bot se despide! (≧ω≦)ゞ*`, m) 
await conn.groupLeave(m.chat)
}
handler.command = /^(out|leavegc|leave|salirdelgrupo)$/i
handler.group = true
handler.rowner = true
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "👋 SALIR DEL GRUPO", description: "Salir de un grupo usando el comando", id: `out`}
];
handler.type = "owners";
handler.disabled = false;

export default handler
