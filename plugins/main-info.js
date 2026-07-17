import os from 'os'

let handler = async (m) => {
    let _muptime = process.uptime() * 1000
    let muptime = clockString(_muptime)
    const used = process.memoryUsage()
    let cpu = os.loadavg()[0].toFixed(2)

    let info = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 📊 *ESTADO DEL SISTEMA*
│
│ ⏰ *Uptime:* ${muptime}
│ 🧠 *RAM Usada:* ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB
│ ⚡ *Carga CPU:* ${cpu}%
│
│ 👑 *Desarrollado por:* Whois Yallico
│ > *“Sistema conectado 24/7”*
╰─────────────────❒`

    m.reply(info)
}

function clockString(ms) {
    let d = Math.floor(ms / 86400000)
    let h = Math.floor(ms / 3600000) % 24
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return `${d}d ${h}h ${m}m ${s}s`
}

handler.help = ['info']
handler.tags = ['main']
handler.command = ['info']

export default handler