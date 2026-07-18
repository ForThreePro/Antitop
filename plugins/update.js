import { exec } from "child_process"

const handler = async (m, { conn }) => {
    const owner = "🐆 *creador: antitop team*"

    if (m.react) await m.react('💿')

    await conn.reply(m.chat, '💿 *Antitop Bot* ➔ Antitop Dice: sincronizando con el sistema... actualizando modulos.', m)

    exec('git pull', async (err, stdout, stderr) => {
        if (err) {
            if (m.react) await m.react('❌')
            return conn.reply(m.chat, `💿 *Antitop Bot error* ➔ Antitop Dice: fallo la actualizacion.\n\n\`\`${err.message}\`\n\n${owner}`, m)
        }

        if (stdout.includes('Already up to date.')) {
            if (m.react) await m.react('✅')
            return conn.reply(m.chat, `💿 *Antitop Bot* ➔ Antitop Dice: el sistema ya esta en su version mas reciente.\n\n${owner}\n> "el sistema nunca duerme"`, m)
        }

        if (m.react) await m.react('💿')
        return conn.reply(m.chat, `💿 *Antitop Bot* ➔ Antitop Dice: actualizacion aplicada con exito.\n\n*📜 cambios:*\n\`\`${stdout}\`\n\n${owner}`, m)
    })
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = /^(update|actualizar|fix)$/i
handler.rowner = true

export default handler