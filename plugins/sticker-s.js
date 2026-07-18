import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!/webp|image|video/g.test(mime)) return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: sticker*
│
│ 💿 *responde a una imagen, video o gif*
│ 🐆 *para convertirlo en sticker*
╰─────────────────❒`)

    let img = await q.download()
    let stiker = await sticker(img, false, 'Antitop Bot', 'Antitop Team')

    await conn.sendFile(m.chat, stiker, 'sticker.webp', `╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: sticker creado*
│
│ > *el sistema en forma de sticker*
╰─────────────────❒`, m)
}

handler.help = ['s']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']

export default handler