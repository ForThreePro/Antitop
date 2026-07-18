import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: buscador de letras*
│
│ 🐆 *que cancion buscas*
│ 💿 *uso:*.letra Imagine Dragons
╰─────────────────❒`)

    await m.react('🎵')
    try {
        let { data } = await axios.get(`https://api.delirius.store/search/lyrics?query=${encodeURIComponent(text)}`)
        let res = data.data
        if (!res) return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: sin resultados*
│
│ 🥥 *no encontre la letra de:* ${text}
╰─────────────────❒`)

        let txt = `╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: letra encontrada*
│
│ 💿 *titulo:* ${res.title}
│ 👤 *artista:* ${res.artists}
│ ⏳ *duracion:* ${res.duration || 'n/a'}
╰─────────────────❒\n\n`
        txt += `╭─── 🥥 *letra sistema* ───╮\n`
        txt += `${res.lyrics}\n`
        txt += `╰─────────────────────────╯\n\n`
        txt += `> *“la musica procesada por Antitop Bot AI”* 💿\n> *© Antitop Bot System*`

        m.reply(txt)
        await m.react('✅')
    } catch { 
        await m.react('❌')
        m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: error de sistema*
│
│ 🥥 *fallo al buscar la letra*
│ 🐆 *Antitop Dice: intenta de nuevo*
╰─────────────────❒`)
    }
}
handler.help = ['letra <cancion>']
handler.tags = ['search']
handler.command = /^(letra|lyrics)$/i
export default handler