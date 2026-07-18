const linkRegex = /chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
const channelLinkRegex = /whatsapp\.com\/channel\/([0-9A-Za-z]{20,30})/i

const handler = async (m, { conn, args, isAdmin, isOwner }) => {
    if (!isAdmin &&!isOwner) throw `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: acceso denegado*
│ solo *admins* pueden usar esto
╰─────────────────❒`

    let chat = global.db.data.chats[m.chat]
    if (!chat) global.db.data.chats[m.chat] = {}

    if (/on/i.test(args[0])) {
        chat.antiLink = true
        await conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: anti-link activado*
│
│ 💿 *estado:* encendido
│ 🪩 *bloqueo:* grupos + canales
│ 🥥 *Antitop Dice: el sistema vigila el grupo*
╰─────────────────❒`, m)
    } else if (/off/i.test(args[0])) {
        chat.antiLink = false
        await conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: anti-link desactivado*
│
│ 💿 *estado:* apagado
│ 🪩 *Antitop Dice: ya se pueden enviar links*
╰─────────────────❒`, m)
    } else {
        await conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: panel anti-link*
│
│ 🥥 *uso:*.antilink on /.antilink off
│ 🐆 *funcion:* bloquea links externos
│ 💿 *protege:* spam de grupos y canales
│
│ 🪩 *Antitop Dice: mantén seguro el sistema*
╰─────────────────❒`, m)
    }
}

handler.help = ['antilink <on/off>']
handler.tags = ['config']
handler.command = /^(antilink|antilinks)$/i

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
    if (!m.isGroup) return!0
    const botNumber = conn.user.jid
    if (m.sender === botNumber || m.fromMe || m.isBaileys) return!0

    const chat = global.db.data.chats[m.chat]
    if (!chat?.antiLink) return!0

    const isGroupLink = linkRegex.exec(m.text)
    const isChannelLink = channelLinkRegex.exec(m.text)

    if ((isGroupLink || isChannelLink) &&!isAdmin) {
        if (!isBotAdmin) return!0

        // Permite el link del propio grupo
        if (isGroupLink) {
            const groupCode = await conn.groupInviteCode(m.chat).catch(() => null)
            if (groupCode && m.text.includes(groupCode)) return!0
        }

        await conn.sendMessage(m.chat, { delete: m.key })
        await conn.reply(
            m.chat,
            `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: enlace no autorizado*
│
│ 🚮 *usuario:* @${m.sender.split('@')[0]}
│ 🐆 *motivo:* enviar link externo
│ 💿 *accion:* expulsado del sistema
│
│ > *🪩 Antitop Dice: regla prohibido el spam*
╰─────────────────❒`,
            m,
            { mentions: [m.sender] }
        )
        return await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }
    return!0
}

export default handler