let { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@whiskeysockets/baileys')).default
import fetch from 'node-fetch'

/**
 * @type {import('@whiskeysockets/baileys')}
 */
const { getBinaryNodeChild, getBinaryNodeChildren } = (await import('@whiskeysockets/baileys')).default
let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
if (!global.db.data.settings[conn.user.jid].restrict) throw '*[ ⚠️ ] EL OWNER TIENE RESTRINGIDO (_enable restrict_ / _disable restrict_) EL USO DE ESTE COMANDO*'

    let _participants = participants.map(user => user.id)
    let users = (await Promise.all(
        text.split(',').map(v => v.replace(/[^0-9]/g, ''))
            .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
            .map(async v => [v, await conn.onWhatsApp(v + '@s.whatsapp.net')
            ])
    )).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us')
    const response = await conn.query({
        tag: 'iq',
        attrs: {
            type: 'set',
            xmlns: 'w:g2',
            to: m.chat,
        },
        content: users.map(jid => ({
            tag: 'add',
            attrs: {},
            content: [{ tag: 'participant', attrs: { jid } }]
        }))
    })
    const pp = await conn.profilePictureUrl(m.chat).catch(_ => null)
    const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0)
    const add = getBinaryNodeChild(response, 'add')
    const participant = getBinaryNodeChildren(add, 'participant')
    for (const user of participant.filter(item => item.attrs.error == 403)) {
        const jid = user.attrs.jid
        const content = getBinaryNodeChild(user, 'add_request')
        const invite_code = content.attrs.code
        const invite_code_exp = content.attrs.expiration
		let teks = `*[❗INFO❗] no fue posible añadir el numero del usuario @${jid.split('@')[0]} que ingreso, esto puede ocurrir porque el numero este incorrecto, la persona se haya salido recientemente del grupo o la persona haya configurado su privacidad de grupos, pero se envió un invitación privada!!*`
        if (user === 'block'){
        chat.unblock = true
        }
        m.reply(teks, null, {
            mentions: conn.parseMention(teks)
        })
        const inviteMessage = `🌎 Que tal, soy el Bot ANI MX SCANS que esta en este grupo, me han pedido que te envié está invitación porque no te pude añadir, esperemos que aceptes... Bienvenido al grupo 🌏🤝🏼`
        var messaa = await prepareWAMessageMedia({ image: jpegThumbnail }, { upload: conn.waUploadToServer })
        var groupInvite = generateWAMessageFromContent(m.chat, proto.Message.fromObject({ groupInviteMessage: { groupJid: m.chat,  inviteCode: invite_code, inviteExpiration: invite_code_exp, groupName: await conn.getName(m.chat), caption: inviteMessage, jpegThumbnail: messaa }}), { userJid: jid })
        
        conn.relayMessage(jid, groupInvite.message, { messageId: groupInvite.key.id })
    }
 /*catch (e) {
throw m.reply('*[❗INFO❗] NO FUE POSIBLE AÑADIR EL NUMERO QUE INGRESO, ESTO PUEDE OCURRIR PORQUE EL NUMERO ESTE INCORRECTO, LA PERSONA SE HAYA SALIDO RECIENTEMENTE DEL GRUPO O LA PERSONA HAYA CONFIGURADO SU PRIVACIDAD DE GRUPOS, TE ACONSEJAMOS ENVIALE LA INVITACION MANUALMENTE!!*')}*/
}
handler.help = ['add', '+'].map(v => v + ' número')
handler.tags = ['group']
handler.command = /^(add|agregar|añadir|\+)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null
export default handler
