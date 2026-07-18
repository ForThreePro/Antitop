let handler = async (m, { conn, participants, usedPrefix, command }) => {
    let mentionedJid = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null

    if (!mentionedJid) return conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: expulsar usuario*
│
│ 🐆 *menciona a un usuario o responde a un mensaje*
╰─────────────────❒`, m)

    try {
        let groupMetadata = await conn.groupMetadata(m.chat)
        let ownerGroup = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
        let ownerBot = global.owner[0][0] + '@s.whatsapp.net'

        if (mentionedJid === conn.user.jid) return conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: error de sistema*
│
│ 🪩 *no puedo expulsarme a mi mismo*
╰─────────────────❒`, m)
        if (mentionedJid === ownerGroup) return conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: error de sistema*
│
│ 🪩 *no puedo expulsar al creador del grupo*
╰─────────────────❒`, m)
        if (mentionedJid === ownerBot) return conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: error de sistema*
│
│ 🪩 *no puedo expulsar al dueño del bot*
╰─────────────────❒`, m)

        await conn.groupParticipantsUpdate(m.chat, [mentionedJid], 'remove')
        conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: usuario expulsado*
│
│ 🐆 *@${mentionedJid.split('@')[0]} fue sacado del grupo*
│ 💿 *protocolo de seguridad ejecutado*
╰─────────────────❒`, m, { mentions: [mentionedJid] })
    } catch (e) {
        conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: error de sistema*
│
│ 🥥 *ocurrio un problema*
│ 🐆 *${e.message}*
╰─────────────────❒`, m)
    }
}

handler.help = ['kick @user']
handler.tags = ['grupos']
handler.command = ['kick', 'echar', 'hechar', 'sacar', 'ban']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler