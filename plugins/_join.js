let handler = async (m, { conn, args, text, isOwner }) => {
    // Solo el owner puede usarlo
    if (!isOwner) return m.reply('🥥 *Antitop Dice: acceso denegado*\n\nsolo el administrador del sistema puede usar este comando')

    if (!text) return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: modulo de conexion*
│
│ 💿 *uso:*.join https://chat.whatsapp.com/xxxxx
│ 🪩 *Antitop Dice: funcion unirme a un grupo*
│
│ *envíame el link del grupo y me conecto*
╰─────────────────❒`)

    let link = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/)
    if (!link) return m.reply('💿 *Antitop Dice: error*\n\nlink invalido. envíame un link de whatsapp valido')

    let res = await conn.groupAcceptInvite(link[1]).catch(e => {
        console.log(e)
        return m.reply('🥥 *Antitop Dice: error de conexion*\n\nno pude unirme. puede que ya esté en el grupo o el link expiro')
    })

    if (res) {
        m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: conexion exitosa*
│
│ 💿 *estado:* conectado al sistema
│ 🪩 *id del grupo:* ${res}
│ 🥥 *Antitop Dice: Antitop Bot online*
╰─────────────────❒`)
    }
}
handler.help = ['join <link>']
handler.tags = ['owner']
handler.command = ['join', 'unirbot']
handler.owner = true

export default handler