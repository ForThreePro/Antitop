const handler = async (m, { conn, text, command, isAdmin, isOwner }) => {
    if (!m.isGroup || (!isAdmin &&!isOwner)) {
        return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: acceso denegado*
│
│ 🥥 *solo los admins o el dueño*
│ 🐆 *pueden controlar el sistema*
╰─────────────────❒`);
    }

    let chat = global.db.data.chats[m.chat]
    if (!chat) global.db.data.chats[m.chat] = {}
    chat = global.db.data.chats[m.chat]

    if (command === 'setbye') {
        if (!text) return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: configurar despedida*
│
│ 🥥 *falta el mensaje*
│
│ 💿 *ejemplo:*
│ .setbye 💨 @user salio del servidor 🐆
╰─────────────────❒`);
        chat.customBye = text.trim();
        return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: despedida guardada*
│
│ 📝 *vista previa:*
│ \`\`${text.trim()}\`\`
│
│ 💿 *para borrar:* .delbye
╰─────────────────❒`);
    }
    if (command === 'delbye') {
        if (!chat.customBye) return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: sin despedida*
│
│ 🪩 *no tienes una despedida editada*
╰─────────────────❒`);
        delete chat.customBye;
        return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: despedida eliminada*
│
│ 💿 *se borro el mensaje personalizado*
╰─────────────────❒`);
    }
};
handler.help = ['setbye <Mensaje>', 'delbye'];
handler.tags = ['group'];
handler.command = /^(setbye|delbye)$/i;
handler.admin = true;
handler.group = true;
export default handler;