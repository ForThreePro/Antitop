import { Blob } from 'node:buffer';
import { FormData } from 'formdata-node';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime) throw `🥥 *Antitop Dice: responde a una imagen*\n\nusa *${usedPrefix + command}*`;
    if (!/image\/(jpe?g|png)/.test(mime)) {
        throw `🐆 *Antitop Dice: error de sistema*\n\nformato no soportado. solo jpg/png. envia la imagen normal`;
    }

    const API_KEY = "FEx4CYmYN1QRQWD1mbZp87jV";

    await m.react('⏳');
    await m.reply('💿 *Antitop Dice: procesando imagen... eliminando fondo*');

    try {
        let img = await q.download();
        if (!img) throw '🪩 *Antitop Dice: no se pudo descargar la imagen*';
        if (img.length > 12 * 1024 * 1024) throw '🥥 *Antitop Dice: archivo demasiado pesado*\n\nmaximo 12mb permitido';

        let base64Img = img.toString('base64');

        let form = new FormData();
        form.append('image_file_b64', base64Img);
        form.append('size', 'auto');

        let res = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': API_KEY
            },
            body: form
        });

        if (!res.ok) {
            let errorText = await res.text();
            throw `🐆 *Antitop Dice: error ${res.status}*\n\n${errorText}`;
        }

        let processedImg = await res.buffer();

        await conn.sendFile(
            m.chat,
            processedImg,
            'antitop_bot.png',
            '✨ *fondo eliminado con exito* ✨\n\n💿 *Antitop Dice: procesado por Antitop Bot AI*',
            m
        );

        await m.react('✅');

    } catch (error) {
        console.error('Remove.bg Error:', error);
        await m.reply(`${error}`);
        await m.react('❌');
    }
};

handler.help = ['removebg', 'quitafondo'];
handler.tags = ['tools'];
handler.command = ['removebg', 'quitafondo', 'nobg', 'rmbg'];
handler.register = false;

export default handler;