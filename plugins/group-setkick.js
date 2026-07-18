const handler = async (m, { conn, text, command, isAdmin, isOwner }) => {
    if (!m.isGroup || (!isAdmin &&!isOwner)) {
        return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: acceso denegado*
│
│ 🥥 *solo los admins o el dueño*
│ 🐆 *pueden ejecutar comandos*
╰─────────────────❒`);
    }

    let chat = global.db.data.chats[m.chat]
    if (!chat) global.db.data.chats[m.chat] = {}
    chat = global.db.data.chats[m.chat]

    if (command === 'setkick') {
        if (!text) return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: configurar kick*
│
│ 🥥 *falta el mensaje*
│
│ 💿 *ejemplo:*
│ .setkick 🚫 @user fue expulsado del servidor 🐆
╰─────────────────❒`);
        chat.customKick = text.trim();
        return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: kick guardado*
│
│ 📝 *vista previa:*
│ \`\`${text.trim()}\`\`
│
│ 💿 *para borrar:* .delkick
╰─────────────────❒`);
    }
    if (command === 'delkick') {
        if (!chat.customKick) return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: sin kick*
│
│ 🪩 *no tienes un kick personalizado*
╰─────────────────❒`);
        delete chat.customKick;
        return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: kick eliminado*
│
│ 💿 *se borro el mensaje personalizado*
╰─────────────────❒`);
    }
};
handler.help = ['setkick <mensaje>', 'delkick'];
handler.tags = ['group'];
handler.command = /^(setkick|delkick)$/i;
handler.admin = true;
handler.group = true;
export default handler;