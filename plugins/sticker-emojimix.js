import MessageType from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
import fs from "fs"

const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
    .then(response => response.json())
    .then(json => {
        resolve(json)
    })
    .catch((err) => {
        reject(err)
    })
})

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args[0]) return m.reply(`📌 Ejemplo: *${usedPrefix + command}* 😏👉🏻👈🏻\n\nMirá pues, poné dos emojis separados con un ➕ como así: 🤔+😏`)

    let [emoji, emoji2] = text.split`+`
    let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji)}_${encodeURIComponent(emoji2)}`)

    if (!anu.results || !anu.results.length) {
        return m.reply(`😒 Uy vos, no encontré esa mezcla, probá con otros emojis pues chapina traviesa 😘`)
    }

    // Bot reacciona coqueto
    await conn.sendMessage(m.chat, { react: { text: '😏', key: m.key } })

    for (let res of anu.results) {
        let userId = m.sender
        let packstickers = global.db.data.users[userId] || {}
        let texto1 = packstickers.text1 || global.packsticker
        let texto2 = packstickers.text2 || global.packsticker2

        try {
            let stiker = await sticker(false, res.url, texto1, texto2)
            await conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
            await m.reply(`🔥 Aquí está tu sticker, mi chapinita coqueta 😘\n\nYa mirá, hasta los emojis se andan mezclando como vos con tus ganas 🤭`)
        } catch (e) {
            console.error(e)
            m.reply(`💔 Se me chingó al hacer tu sticker 😢 pero igual te quiero, vos traviesa.`)
        }
    }
}

handler.help = ['emojimix *<emoji+emoji>*']
handler.tags = ['sticker']
handler.command = ['emojimix'] 
handler.register = false 

export default handler