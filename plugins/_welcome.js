import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

export async function before(m, { conn }) {
  try {
    if (!m.messageStubType ||!m.isGroup) return true;
    const chat = global.db?.data?.chats?.[m.chat];
    if (!chat || chat.bienvenida === false) return true;

    const groupMetadata = await conn.groupMetadata(m.chat).catch(_ => null);
    if (!groupMetadata) return true;

    let userJid = m.messageStubParameters?.[0];
    if (!userJid) return true;

    // [FIX @lid -> @numero]
    let userName = userJid.split('@')[0];
    if (userJid.endsWith('@lid')) {
      try {
        let info = await conn.onWhatsApp(userJid);
        userName = info[0]?.jid?.split('@')[0] || userName;
      } catch(e){}
    }
    const user = `@${userName}`;

    // [DATOS DEL GRUPO]
    const groupName = groupMetadata.subject || 'mi sistema';
    const groupDesc = groupMetadata.desc?.toString() || '📜 sin descripcion';
    const groupMembers = groupMetadata.participants.length;

    const fixedImageUrl = 'https://files.evogb.win/5wXYR4.jpg'; // [TU LOGO SOLO SI NO TIENE FOTO]

    // [FIX] 1. FOTO DEL USER PRIMERO
    let imgBuffer = null;
    try {
      let ppUrl = await conn.profilePictureUrl(userJid, 'image').catch(_ => null);
      if (ppUrl) {
        imgBuffer = await fetch(ppUrl).then(res => res.buffer()).catch(_ => null);
      }
    } catch(e){}

    // [FIX] 2. SI NO TIENE FOTO = LOGO
    if (!imgBuffer) {
      imgBuffer = await fetch(fixedImageUrl).then(res => res.buffer()).catch(_ => null);
    }

    let text = '', audioFile = '';

    // [SWITCH DISEÑO ANTITOP BOT]
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      audioFile = './bienvenida.mp3';
      text = chat.customWelcome
? chat.customWelcome.replace(/@user/gi, user).replace(/@group/gi, groupName).replace(/@count/gi, groupMembers).replace(/@desc/gi, groupDesc)
        : `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: nuevo usuario conectado*
│
│ 🐆 *bienvenido:* ${user}
│ 💿 *Antitop Dice: se ha conectado al sistema*
│
│ 🪩 *sistema:* ${groupName}
│ 👥 *usuarios:* ${groupMembers}
│ 📜 *descripcion:* ${groupDesc}
│
│ > *“nuevo nodo agregado al sistema”*
╰─────────────────❒`.trim();

    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      audioFile = './despedida.mp3';
      text = chat.customBye
? chat.customBye.replace(/@user/gi, user).replace(/@group/gi, groupName).replace(/@count/gi, groupMembers).replace(/@desc/gi, groupDesc)
        : `╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: desconexion registrada*
│
│ 🌫️ *se desconecto:* ${user}
│ 🥥 *Antitop Dice: nodo fuera de linea*
│
│ 💿 *sistema:* ${groupName}
│ 👥 *quedan:* ${groupMembers}
│ 📜 *motivo:* desconexion voluntaria
│
│ > *“nodo desconectado del sistema”*
╰─────────────────❒`.trim();

    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
      audioFile = './kick.mp3';
      text = chat.customKick
? chat.customKick.replace(/@user/gi, user).replace(/@group/gi, groupName).replace(/@count/gi, groupMembers).replace(/@desc/gi, groupDesc)
        : `╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: expulsion ejecutada*
│
│ 💣 *eliminado:* ${user}
│ 🥥 *Antitop Dice: protocolo de seguridad aplicado*
│
│ 💿 *sistema:* ${groupName}
│ 👥 *quedan:* ${groupMembers}
│ 📜 *motivo:* violo protocolos del sistema
│
│ > *“acceso denegado por violacion”*
╰─────────────────❒`.trim();
    } else return true;

    // 1. MENSAJE 1: IMAGEN + TEXTO PRO
    if(imgBuffer){
      await conn.sendMessage(m.chat, { image: imgBuffer, caption: text, mentions: [userJid] });
    } else {
      await conn.sendMessage(m.chat, { text: text, mentions: [userJid] });
    }

    // 2. MENSAJE 2: AUDIO CON BARRA
    const audioPath = path.resolve(audioFile);
    if (fs.existsSync(audioPath)) {
      await new Promise(r => setTimeout(r, 1500));
      const audioBuffer = fs.readFileSync(audioPath);
      await conn.sendMessage(m.chat, {
        audio: audioBuffer,
        mimetype: 'audio/mpeg',
        ptt: false
      });
      console.log(`[WELCOME] ✅ Enviado: ${audioFile}`);
    } else {
      console.log(`[WELCOME] ❌ No existe: ${audioPath}`);
    }

  } catch (error) {
    console.error('❌ Error en welcome:', error);
  }
}

export const disabled = false;