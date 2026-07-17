import fs from 'fs'

let handler = async (m) => {
    const tmpPath = './tmp'
    if (fs.existsSync(tmpPath)) {
        fs.readdirSync(tmpPath).forEach(file => fs.unlinkSync(`${tmpPath}/${file}`))
    }
    m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🧹 *PURGA DE CACHÉ*
│
│ ✅ *Estado:* Archivos temporales eliminados
│ 💻 *El sistema está limpio*
╰─────────────────❒`)
}

handler.help = ['cleartmp']
handler.tags = ['main']
handler.command = ['cleartmp']
handler.rowner = true

export default handler