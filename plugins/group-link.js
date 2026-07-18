let handler = async (m, { conn }) => {
    try {
        let link = await conn.groupInviteCode(m.chat)
        let text = `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: link del grupo*
│
│ 🐆 https://chat.whatsapp.com/${link}
│
│ > *“comparte con responsabilidad”*
╰─────────────────❒`
        m.reply(text)
    } catch {
        m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: error de sistema*
│
│ 🪩 *no pude obtener el link*
│ 🥥 *soy administrador del grupo?*
╰─────────────────❒`)
    }
}

handler.help = ['link']
handler.tags = ['grupos']
handler.command = ['link', 'linkgroup']
handler.group = true
handler.botAdmin = true

export default handler