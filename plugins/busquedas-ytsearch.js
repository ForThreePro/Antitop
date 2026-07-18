import axios from 'axios'
let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('🥥 *Antitop Dice: yt search* 🐆\n\n💿 *que deseas buscar en youtube*') 
    await m.react('📺')
    try {
        let { data } = await axios.get(`https://api.delirius.store/search/ytsearch?q=${encodeURIComponent(text)}`)
        if (!data.data || data.data.length === 0) return m.reply(`🪩 *Antitop Dice: error* ➔ *no se encontraron resultados.*`)

        let res = data.data.slice(0, 5).map((v, i) => 
            `💿 *${i+1}.* *${v.title}*\n` +
            `⏳ *duracion:* ${v.duration} | 👁️ *vistas:* ${v.views}\n` +
            `👤 *canal:* ${v.author.name}\n` +
            `🔗 ${v.url}`
        ).join('\n\n')

        let cap = `🥥 *Antitop Dice: youtube search* 🐆\n\n` 
        cap += res
        cap += `\n\n💿 *usa:* .play <numero> o copia el link para descargar\n🪩 *Antitop Bot System*`

        m.reply(cap)
        await m.react('✅')
    } catch { 
        await m.react('❌')
        m.reply(`💿 *Antitop Dice: error* ➔ *error al buscar.*`)
    }
}
handler.help = ['yts <busqueda>']
handler.tags = ['search']
handler.command = /^(yts|ytsearch)$/i
export default handler