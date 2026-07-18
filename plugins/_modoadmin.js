const handler = async (m, { conn, args, isAdmin, isOwner }) => {
    // Validación de permisos para el comando
    if (!isAdmin &&!isOwner) throw `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: acceso denegado*
│ solo *admins* pueden usar esto
╰─────────────────❒`

    let chat = global.db.data.chats[m.chat]
    if (!chat) global.db.data.chats[m.chat] = {}

    if (/on/i.test(args[0])) {
        chat.modoadmin = true
        await conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: modo admin activado*
│
│ 💿 *estado:* encendido
│ 🪩 *restriccion:* solo admins
│ 🥥 *Antitop Dice: los comandos estan bloqueados*
│
│ > *“protocolo de seguridad activo”*
╰─────────────────❒`, m)
    } else if (/off/i.test(args[0])) {
        chat.modoadmin = false
        await conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: modo admin desactivado*
│
│ 💿 *estado:* apagado
│ 🪩 *Antitop Dice: todos pueden usar el bot*
│ 🥥 *sistema libre nuevamente*
╰─────────────────❒`, m)
    } else {
        await conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: panel modo admin*
│
│ 🥥 *uso:*.modoadmin on /.modoadmin off
│ 🐆 *funcion:* restringe comandos a admins
│ 💿 *protege:* uso indebido del bot
│
│ 🪩 *Antitop Dice: control total del sistema*
╰─────────────────❒`, m)
    }
}

handler.help = ['modoadmin <on/off>']
handler.tags = ['config']
handler.command = /^(modoadmin|adminmode)$/i

handler.before = async function (m, { conn, isAdmin, isOwner, isROwner, isPrems }) {
    if (m.isBaileys || m.fromMe) return!0

    let chat = global.db.data.chats[m.chat]
    if (!chat) return!0

    // Si estamos en un grupo
    if (m.isGroup) {
        // Si el modo admin está activo y el que escribe NO es admin/owner/premium
        if (chat.modoadmin &&!isAdmin &&!isOwner &&!isROwner &&!isPrems) {
            // Si el usuario intenta usar un comando (empieza con prefijo), bloqueamos
            if (m.text.startsWith('.') || m.text.startsWith('/') || m.text.startsWith('#')) {
                await conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: acceso restringido*
│
│ 🐆 *modo admin:* activo
│ 💿 *Antitop Dice: no tienes permiso*
│ 🪩 *solo admins pueden usar comandos*
╰─────────────────❒`, m)
                return false // Detiene la ejecución de otros plugins
            }
        }
    } else {
        // Chats privados - todos pueden usar
        return!0
    }

    return!0
}

export default handler