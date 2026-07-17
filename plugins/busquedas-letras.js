import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🎵 *BUSCADOR DE LETRAS*
│
│ 🤖 *¿Qué canción buscas?*
│ ⚡ *Uso:*.letra Imagine Dragons
╰─────────────────❒`)

    await m.react('🎵')
    try {
        let { data } = await axios.get(`https://api.delirius.store/search/lyrics?query=${encodeURIComponent(text)}`)
        let res = data.data
        if (!res) return m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ❌ *SIN RESULTADOS*
│
│ ⚡ *No encontré la letra de:* ${text}
╰─────────────────❒`)

        let txt = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🎵 *LETRA ENCONTRADA*
│
│ ⚡ *Título:* ${res.title}
│ 👤 *Artista:* ${res.artists}
│ ⏳ *Duración:* ${res.duration || 'N/A'}
╰─────────────────❒\n\n`
        txt += `╭─── 💻 𝗟𝗘𝗧𝗥𝗔 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ───╮\n`
        txt += `${res.lyrics}\n`
        txt += `╰─────────────────────────╯\n\n`
        txt += `> *“La música procesada por Cyber Bot AI”* ⚡\n> *© Cyber Bot System*`

        m.reply(txt)
        await m.react('✅')
    } catch { 
        await m.react('❌')
        m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ❌ *ERROR DE SISTEMA*
│
│ ⚡ *Falló al buscar la letra*
│ 🤖 *Intenta de nuevo*
╰─────────────────❒`)
    }
}
handler.help = ['letra <cancion>']
handler.tags = ['search']
handler.command = /^(letra|lyrics)$/i
export default handler