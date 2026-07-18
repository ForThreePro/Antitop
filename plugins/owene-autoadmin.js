let handler = async (m, { conn }) => {
    try {
        await conn.groupParticipantsUpdate(m.chat, [conn.user.jid], 'promote')
        m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: autopromote*
│
│ 💿 *estado:* admin asignado
│ 🐆 *el sistema toma el control*
╰─────────────────❒`)
    } catch (e) {
        m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: error autopromote*
│
│ 💿 *no pude asignarme admin*
│ 🥥 *dame permisos primero*
╰─────────────────❒`)
    }
}

handler.help = ['autoadmin']
handler.tags = ['owner']
handler.command = ['autoadmin']
handler.rowner = true

export default handler