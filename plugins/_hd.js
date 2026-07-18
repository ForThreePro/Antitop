import fetch from "node-fetch"
import FormData from "form-data"
import crypto from "crypto"

const MARCA = 'Antitop Bot ⚡' // <- TU MARCA

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const key = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')
    let q = m.quoted? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    let urlTarget = text? text.trim() : ''

    if (!urlTarget &&!/image\/(jpe?g|png)/.test(mime)) {
        return conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: hd upscaler ai*
│
│ 🐆 *uso correcto:*
│ responde a una imagen o envia
│ un link con: *${usedPrefix + command}*
│
│ 💿 *formatos:* jpg / png
│ 🪩 *Antitop Dice: procesado con ia*
╰─────────────────❒`, m)
    }

    await m.react('⏳')
    try {
        let finalUrl = urlTarget

        if (!finalUrl && /image\/(jpe?g|png)/.test(mime)) {
            let imgBuffer = await q.download()
            let ext = mime.split('/')[1] || 'jpg'
            let filename = 'media-' + crypto.randomBytes(8).toString('hex') + '.' + ext

            let formulario = new FormData()
            formulario.append('file', imgBuffer, { filename, contentType: mime })

            let resUpload = await fetch(`https://api.evogb.org/tools/upload?key=${key}`, {
                method: 'POST',
                body: formulario,
                headers: {
                   ...formulario.getHeaders(),
                    'User-Agent': 'Mozilla/5.0'
                }
            })
            let jsonUpload = await resUpload.json()
            if (jsonUpload.status && jsonUpload.url) {
                finalUrl = jsonUpload.url
            } else {
                await m.react('❌')
                return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: error de sistema*
│
│ 🔴 *no se pudo subir la imagen*
│ 💿 *motivo:* ${jsonUpload?.message || 'sin respuesta'}
╰─────────────────❒`)
            }
        }

        let resDl = await fetch(`https://api.evogb.org/tools/upscale?method=url&url=${encodeURIComponent(finalUrl)}&key=${key}`)
        let contentType = resDl.headers.get("content-type")

        if (contentType && contentType.includes("application/json")) {
            let jsonDl = await resDl.json()
            await m.react('❌')
            return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: error de api*
│
│ 🥥 *${jsonDl.message || 'no se pudo mejorar la imagen.'}*
╰─────────────────❒`)
        }

        let buffer = await resDl.buffer()
        let info = `╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: imagen mejorada*
│
│ 💿 *estado:* procesado con ia
│ 🪩 *comando:* ${command.toUpperCase()}
│ 🥥 *bot:* Antitop Bot
│ 🔌 *api:* evogb.org
│
│ > *“resolucion optimizada al 4k”*
╰─────────────────❒`

        await conn.sendMessage(m.chat, { image: buffer, caption: info }, { quoted: m })
        await m.react('✅')

    } catch (e) {
        console.error(e)
        await m.react('❌')
        m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: error de sistema*
│
│ 🥥 *servidores saturados o error*
│ 🐆 *Antitop Dice: intenta de nuevo en unos seg*
╰─────────────────❒`)
    }
}

handler.help = ['upscale', 'remini']
handler.tags = ['tools']
handler.command = /^(upscale|remini|hd|mejorar)$/i

export default handler