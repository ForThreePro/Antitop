import os from 'os'
let handler = async (m) => {
    let cpu = os.loadavg()[0].toFixed(2)
    m.reply(`⛈️ *RAYO PREM* ➔ Monitor CPU\n⚡ *Carga Actual:* ${cpu}%\n🌙 *Estado:* Procesando rayos`) // Cambiado
}
handler.help = ['cpu']
handler.tags = ['main']
handler.command = ['cpu']
export default handler