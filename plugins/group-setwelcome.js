const handler = async (m, { conn, text, command, isAdmin, isOwner }) => {
    if (!m.isGroup || (!isAdmin &&!isOwner)) {
        return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: acceso denegado*
│
│ 🥥 *solo los admins o el dueño*
│ 🐆 *pueden ejecutar este comando*
╰─────────────────❒`);
    }

    let chat = global.db.data.chats[m.chat]
    if (!chat) global.db.data.chats[m.chat] = {}
    chat = global.db.data.chats[m.chat]

    if (command === 'setwelcome') {
        if (!text) return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: configurar bienvenida*
│
│ 🥥 *falta el mensaje*
│
│ 📝 *placeholders:*
│ @user = mencion
│ @group = grupo  
│ @count = miembros
│ @desc = descripcion
│
│ 💿 *ejemplo:*
│ .setwelcome ✅ @user se unio al servidor 🐆
│ 🪩 bienvenido a @group
│ 👥 miembro #@count
╰─────────────────❒`);
        chat.customWelcome = text.trim();
        return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: bienvenida guardada*
│
│ 📝 *vista previa:*
│ \`\`${text.trim()}\`\`
│
│ 💿 *para borrar:* .delwelcome
╰─────────────────❒`);
    }
    if (command === 'delwelcome') {
        if (!chat.customWelcome) return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: sin bienvenida*
│
│ 🪩 *no tienes una bienvenida editada*
╰─────────────────❒`);
        delete chat.customWelcome;
        return m.reply(`╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: bienvenida eliminada*
│
│ 💿 *se borro el mensaje personalizado*
│ 🐆 *ahora se usa la de welcome.js*
╰─────────────────❒`);
    }
};
handler.help = ['setwelcome <mensaje>', 'delwelcome'];
handler.tags = ['group'];
handler.command = /^(setwelcome|delwelcome)$/i;
handler.admin = true;
handler.group = true;
export default handler;