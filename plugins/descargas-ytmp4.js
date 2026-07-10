import yts from 'yt-search'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`⛈️ *RAYO PREM YT* 🌙\n\n⚡ *Ingresa un enlace o nombre de YouTube.*\n*Ejemplo:* ${usedPrefix + command} https://youtu.be/xxx`) // Cambiado

  let res = await yts(text)
  let vid = res.videos[0]
  if (!vid) return m.reply(`⛈️ *RAYO PREM ERROR* ➔ *No se encontró el video.*`) // Cambiado

  let apiUrl = `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=sasuke`
  let json = await (await fetch(apiUrl)).json()
  if (!json.status) return m.reply(`⛈️ *RAYO PREM ERROR* ➔ *Error al procesar el video.*`) // Cambiado

  let cap = `⛈️ *RAYO PREM DESCARGA* 🌙\n\n` // Cambiado
  cap += `⚡ *Título:* ${vid.title}\n`
  cap += `📁 *Formato:* MP4 (720p)\n`
  cap += `⏱️ *Duración:* ${vid.timestamp}\n`
  cap += `👁️ *Vistas:* ${vid.views.toLocaleString()}\n\n`
  cap += `🌩️ *Descargando...* \n⛈️ *Team Nightwish*` // Cambiado

  await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: cap }, { quoted: m })
  await conn.sendMessage(m.chat, { video: { url: json.data.dl }, mimetype: 'video/mp4', fileName: `${vid.title}.mp4` }, { quoted: m }) // Agregado fileName
}

handler.help = ['ytmp4 <url>']
handler.tags = ['downloader']
handler.command = /^ytmp4$/i

export default handler