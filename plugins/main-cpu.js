import os from 'os'

let handler = async (m) => {
    let cpu = os.loadavg()[0].toFixed(2)
    m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: monitor cpu*
│
│ 💿 *carga actual:* ${cpu}%
│ 🐆 *estado:* procesando datos
╰─────────────────❒`)
}

handler.help = ['cpu']
handler.tags = ['main']
handler.command = ['cpu']

export default handler