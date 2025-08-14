let handler = async (m, { conn, info, args , db, userdb}) => {

const linksArray = [info.community, info.lobby, info.ganicmd]
for (const link of linksArray) {
let resp = info.community === link ? `*Hola 👋🏻, unete a los grupos oficiales para pasar un rato agradable usando el Bot o platicando con la familia de*\n*🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂*\n*ㄒㄖᎶ乇ㄒ卄乇尺🍜⃢⃟ᭀᬽ*\ny\n*🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂*\n千ㄖ尺乇ᐯ乇尺🍜⃢⃟ᭀᬽ*` : info.lobby === link ? ` Prepárate para las entrevistas para poder entrar a los grupos A los cuales son exclusivos` : info.gaportes === link ? ` Una vez que hayas Entrado podrás ingresar Al Grupo de aportes` : info.ganicmd === link ? ` Acá tenemos Promocionando nuestro Bot Público El cual podrás probar Y / o descargar Desde la cuenta del Owner(github)` : ``.trim()
await conn.sendWritingText(m.chat, `${resp}\n${link}`, userdb, m);
}
}
handler.help = ['grupos'];
handler.tags = ['group'];
handler.command = /^gruposofc$/i;
handler.admin = false;
handler.group = false;
handler.botAdmin = false;

handler.menu = [
{title:"💎 GRUPOS OFICIALES", description: "muestra los grupos oficiales del bot usando #grupos", id: `gruposofc`}
];
handler.type = "info";
handler.disabled = false;

export default handler;
