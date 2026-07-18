let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = {
        'abrir': 'not_announcement',
        'cerrar': 'announcement',
    }[(args[0] || '')]

    if (isClose === undefined) {
        await conn.reply(m.chat, `🥥 *Antitop Dice: grupo* 🐆\n\n💿 *elige una opcion:*\n*${usedPrefix + command}* abrir\n*${usedPrefix + command}* cerrar`, m)
        return
    }

    await conn.groupSettingUpdate(m.chat, isClose)

    // aviso de la accion realizada
    let estado = isClose === 'announcement'? 'cerrado 🔒' : 'abierto 🔓'
    let emoji = isClose === 'announcement'? '❌' : '✅'
    await conn.reply(m.chat, `${emoji} *Antitop Dice* ➔ grupo ${estado}\n🪩 *accion por:* @${m.sender.split('@')[0]}\n💿 *Antitop Bot System*`, m, {
        mentions: [m.sender]
    })
}

handler.help = ['grupo abrir', 'grupo cerrar']
handler.tags = ['grupos']
handler.command = ['group', 'grupo']
handler.admin = true
handler.botAdmin = true

export default handler