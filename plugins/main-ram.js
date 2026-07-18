let handler = async (m) => {
    const used = process.memoryUsage()
    m.reply(`💿 *Antitop Dice* ➔ consumo de sistema
🥥 *ram usada:* ${(used.heapUsed / 1024 / 1024).toFixed(2)} mb
🐆 *estado:* sistema estable`)
}
handler.help = ['ram']
handler.tags = ['main']
handler.command = ['ram']
export default handler