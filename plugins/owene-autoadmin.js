let handler = async (m, { conn }) => {
    try {
        await conn.groupParticipantsUpdate(m.chat, [conn.user.jid], 'promote')
        m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 👑 *AUTOPROMOTE*
│
│ ✅ *Estado:* Admin asignado
│ 💻 *El sistema toma el control*
╰─────────────────❒`)
    } catch (e) {
        m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ❌ *ERROR AUTOPROMOTE*
│
│ ⚠️ *No pude asignarme admin*
│ 💻 *Dame permisos primero*
╰─────────────────❒`)
    }
}

handler.help = ['autoadmin']
handler.tags = ['owner']
handler.command = ['autoadmin']
handler.rowner = true

export default handler