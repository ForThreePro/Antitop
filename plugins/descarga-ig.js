import axios from 'axios'
import fetch from "node-fetch"
import yts from 'yt-search'

let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: central de descargas*
│
│ 🐆 *youtube:*
│ 💿 *.play* nombre = audio yt
│ 💿 *.play2* nombre = video yt
│ 🪩 *.ytmp3* link/nombre = audio directo
│ 🪩 *.ytmp4* link/nombre = video 720p directo
│
│ 🐆 *musica y social:*
│ 💿 *.spotify* nombre = audio sp
│ 🥥 *.tiktok* link = video tt
│ 🥥 *.tiktoksearch* texto = buscar tt
│ 🪩 *.ig* link = instagram
│ 💿 *.fb* link = facebook
│ 🐆 *.mediafire* link = mediafire
│
│ > *“descarga procesada por Antitop Bot AI”*
╰─────────────────❒`, m)

    await m.react('⏳')
    const keyEvo = Buffer.from('ZWt1c2Fz', 'base64').toString('utf-8').split('').reverse().join('')
    const keySasuke = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')

    try {
        // ===== PLAY / PLAY2 YOUTUBE BUSQUEDA =====
        if (/^(play|play2)$/i.test(command)) {
            let res = await yts(text)
            let vid = res.videos[0]
            if (!vid) throw 'YT_NOT_FOUND'

            await m.react('🔍')
            await m.react('⏳')

            let isVideo = command === 'play2'
            let apiUrl = isVideo
            ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=${keySasuke}`
                : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=${keySasuke}`

            let json = await (await fetch(apiUrl)).json()
            if (!json.status) throw 'YT_DL_ERROR'

            let cap = `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: youtube ${isVideo? 'video' : 'audio'}*
│
│ 📌 *titulo:* ${vid.title}
│ ⏳ *duracion:* ${vid.timestamp}
│ 👤 *autor:* ${vid.author.name}
│ 👁️ *vistas:* ${vid.views.toLocaleString()}
│ 📁 *formato:* ${isVideo? 'mp4 720p' : 'mp3 320kbps'}
│
│ > *“extrayendo datos del servidor”*
╰─────────────────❒`

            await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, {
                [isVideo? 'video' : 'audio']: { url: json.data.dl },
                mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
                fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== YTMP3 / YTMP4 DIRECTO =====
        if (/^(ytmp3|ytmp4)$/i.test(command)) {
            let res = await yts(text)
            let vid = res.videos[0]
            if (!vid) throw 'YT_NOT_FOUND'

            await m.react('⏳')

            let isVideo = command === 'ytmp4'
            let apiUrl = isVideo
             ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=${keySasuke}`
                : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=${keySasuke}`

            let json = await (await fetch(apiUrl)).json()
            if (!json.status) throw 'YT_DL_ERROR'

            let cap = `╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: youtube ${isVideo? 'video' : 'audio'} directo*
│
│ 📌 *titulo:* ${vid.title}
│ 📁 *formato:* ${isVideo? 'mp4 720p' : 'mp3'}
│ ⏱️ *duracion:* ${vid.timestamp}
│ 👁️ *vistas:* ${vid.views.toLocaleString()}
│
│ > *“descarga iniciada por el sistema”*
╰─────────────────❒`

            await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, {
                [isVideo? 'video' : 'audio']: { url: json.data.dl },
                mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
                fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== SPOTIFY =====
        if (/^(spotify)$/i.test(command)) {
            let searchRes = await fetch(`https://api.evogb.org/search/spotify?query=${encodeURIComponent(text)}&key=${keySasuke}`)
            let searchData = await searchRes.json()
            if (!searchData.status ||!searchData.result[0]) throw 'SP_NOT_FOUND'

            await m.react('🔍')
            await m.react('⏳')

            let song = searchData.result[0]
            let dlRes = await fetch(`https://api.evogb.org/dl/spotify?url=${encodeURIComponent(song.link)}&key=${keySasuke}`)
            let dlData = await dlRes.json()
            if (!dlData.status) throw 'SP_DL_ERROR'

            let cap = `╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: spotify downloader*
│
│ 🥥 *titulo:* ${dlData.data.name}
│ 👤 *artista:* ${dlData.data.artist}
│ 🐆 *album:* ${dlData.data.album}
│ ⏳ *duracion:* ${dlData.data.duration}
│ 📅 *año:* ${dlData.data.year}
│
│ > *“musica procesada por Antitop Bot”*
╰─────────────────❒`

            await conn.sendMessage(m.chat, { image: { url: dlData.data.image }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, { audio: { url: dlData.data.url }, mimetype: 'audio/mpeg', fileName: `${dlData.data.name}.mp3` }, { quoted: m })
            return await m.react('✅')
        }

        // ===== TIKTOK =====
        if (/^(tiktok|tiktoksearch)$/i.test(command)) {
            if (command === 'tiktoksearch') {
                let res = await (await fetch(`https://api.evogb.org/search/tiktok?query=${text}&key=${keySasuke}`)).json()
                let video = res.data[0]
                if (!video) throw 'TT_NOT_FOUND'

                let caption = `╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: tiktok search*
│
│ 💿 *titulo:* ${video.title}
│ 👤 *autor:* ${video.author.nickname}
│ 👁️ *vistas:* ${video.play_count.toLocaleString()}
│ ❤️ *likes:* ${video.digg_count.toLocaleString()}
│
│ > *“video encontrado en la base de datos”*
╰─────────────────❒`
                await conn.sendFile(m.chat, video.dl, 'tiktok.mp4', caption, m)
            } else {
                let res = await (await fetch(`https://api.evogb.org/dl/tiktok?url=${text}&key=${keySasuke}`)).json()
                let data = res.data
                if (!data) throw 'TT_DL_ERROR'

                let caption = `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: tiktok downloader*
│
│ 🐆 *titulo:* ${data.title}
│ 👤 *autor:* ${data.author.nickname}
│
│ > *“descargado por el sistema”*
╰─────────────────❒`
                await conn.sendFile(m.chat, Array.isArray(data.dl)? data.dl[0] : data.dl, 'tiktok.mp4', caption, m)
            }
            return await m.react('✅')
        }

        // ===== INSTAGRAM =====
        if (/^(ig|instagram)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/instagram?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'IG_ERROR'
            let media = data.data[0]
            let type = media.type === 'video'? 'video' : 'imagen'

            let cap = `╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: instagram downloader*
│
│ 💿 *tipo:* ${type}
│ 🪩 *estado:* enviando contenido
│
│ > *“contenido capturado por el sistema”*
╰─────────────────❒`

            await conn.sendMessage(m.chat, {
                [media.type === 'video'? 'video' : 'image']: { url: media.url },
                mimetype: media.type === 'video'? 'video/mp4' : 'image/jpeg',
                caption: cap
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== FACEBOOK =====
        if (/^(fb|facebook)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/facebook?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'FB_ERROR'
            let video = data.resultados[0]

            let cap = `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: facebook downloader*
│
│ 🐆 *calidad:* ${video.calidad || 'hd'}
│ 💿 *estado:* enviando video
│
│ > *“video extraido por el sistema”*
╰─────────────────❒`

            await conn.sendMessage(m.chat, {
                video: { url: video.url },
                mimetype: 'video/mp4',
                caption: cap
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== MEDIAFIRE =====
        if (/^(mediafire|mf|mediafiredl)$/i.test(command)) {
            let response = await fetch(`https://api.evogb.org/dl/mediafire?url=${encodeURIComponent(text)}&key=${keySasuke}`)
            let result = await response.json()
            if (!result.status ||!result.data) throw 'MF_ERROR'

            let { name, size, date, dl } = result.data
            let caption = `╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: mediafire downloader*
│
│ 🏷 *nombre:* ${name}
│ ⚖ *tamaño:* ${size}
│ 📅 *fecha:* ${date}
│
│ > *“archivo extraido del servidor”*
╰─────────────────❒`

            await conn.sendFile(m.chat, dl, name, caption, m)
            return await m.react('✅')
        }

    } catch (e) {
        console.error(e)
        await m.react('❌')
        let msgs = {
            YT_NOT_FOUND: 'no se encontro el video',
            YT_DL_ERROR: 'error al procesar la descarga de youtube',
            SP_NOT_FOUND: `no se encontraron resultados para: ${text}`,
            SP_DL_ERROR: 'error al obtener el enlace de spotify',
            TT_NOT_FOUND: 'no se encontraron resultados en tiktok',
            TT_DL_ERROR: 'no se pudo obtener el video de tiktok',
            IG_ERROR: 'error al procesar el enlace de instagram',
            FB_ERROR: 'error al procesar el video de facebook',
            MF_ERROR: 'no se pudo localizar el archivo de mediafire'
        }
        m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: error de sistema*
│
│ 🥥 *${msgs[e] || 'error inesperado'}*
│ 🐆 *Antitop Dice: verifica el enlace/busqueda*
╰─────────────────❒`)
    }
}

handler.help = ['play', 'play2', 'ytmp3', 'ytmp4', 'spotify', 'tiktok', 'tiktoksearch', 'ig', 'fb', 'mediafire']
handler.tags = ['downloader']
handler.command = /^(play|play2|ytmp3|ytmp4|spotify|tiktok|tiktoksearch|ig|instagram|fb|facebook|mediafire|mf|mediafiredl)$/i

export default handler
