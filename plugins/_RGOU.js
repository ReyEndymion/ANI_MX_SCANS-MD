let handler = async (m, {conn, db, userdb, senderJid}) => {
const resp = `*_➤ Asociación de grupos de anime S.A._*

**Sean bienvenidos los grupos de anime y todos aquellos que quieran pertenecer aunque no sean de anime**

**REGLAS**

**Primera regla** Tiene que haber solo un administrador del grupo que quiere asociarse o que lo represente

**Segunda regla** Este grupo no debe de utilizarse para chat, en este grupo solamente se deben de exponer las claves de algún problema en específico que tengan sus grupos

**Tercera regla** 
No se permiten los enlaces de invitación de sus propios grupos Y si alguien va a ayudar a algún grupo en específico tienen que enviar se los enlaces en privado

**Cuarta regla**
Todos aquí son administradores de sus grupos, por lo tanto siendo de igual a igual deben respetarse independientemente de los que estén aquí fundando el grupo

Para cualquier conflicto entre grupos debe solicitarse *"La sala del trono* Qué es un grupo especial para resoluciones de problemas entre grupos los cuales no deben manifestarse aquí sino en privado con el administrador superior de este grupo, el cual tiene la facultad de encontrar una solución al conflicto entre grupos

**Sin nada más por decir les agradezco por unirse a este grupo**

`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
handler.command = /^(R G O U|reglas asociacion grupos otakus|R A G O U|r a g o u|rgou|ragou)$/i
handler.help = ['RAG','RGOU']
handler.fail = null
handler.tags = [];
handler.menu = [
{title: 'RGOU', description: 'reglas Asociacion Grupos Otakus Unidos', id: 'RGOU'}
];
handler.type = "info";
handler.disabled = false;

export default handler
