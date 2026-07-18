import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: busqueda en la web*
│
│ 🐆 *que deseas buscar*
│ 💿 *uso:*.google Antitop Bot
╰─────────────────❒`)

    await m.react('🔍')

    try {
        let { data } = await axios.get(`https://api.delirius.store/search/google?query=${encodeURIComponent(text)}`)
        let results = data.data.slice(0, 5)

        if (!results.length) return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: sin resultados*
│
│ 🥥 *no se encontro nada sobre:* ${text}
╰─────────────────❒`)

        let txt = `╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: resultados de busqueda*
│
│ 💿 *consulta:* ${text}
╰─────────────────❒\n\n`

        txt += results.map((v, i) => {
            return `╭─── 🥥 *resultado ${i + 1}* ───╮
│ 📌 *${v.title}*
│ 📝 ${v.description}
│ 🔗 ${v.url}
╰───────────────────╯`
        }).join('\n\n')

        txt += `\n\n> *“datos procesados por Antitop Bot AI”* 💿\n> *© Antitop Bot System*`

        await conn.reply(m.chat, txt, m)
        await m.react('✅')

    } catch (e) {
        console.error(e)
        await m.react('❌')
        m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: error de sistema*
│
│ 🥥 *fallo la busqueda*
│ 🐆 *Antitop Dice: intenta de nuevo*
╰─────────────────❒`)
    }
}

handler.help = ['google <busqueda>']
handler.tags = ['search']
handler.command = /^google$/i

export default handler