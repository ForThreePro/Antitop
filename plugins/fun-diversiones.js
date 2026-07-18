let handler = async (m, { conn, command, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0]
          : m.quoted? m.quoted.sender
          : m.sender;

  let name = await conn.getName(who);
  let userTarget = m.mentionedJid && m.mentionedJid[0]? `@${who.split('@')[0]}` : name;
  let porcentaje = Math.floor(Math.random() * 500) + 1;

  let respuestas = {
    // BASE
    'gay': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es 🏳️‍🌈* *${porcentaje}%* *gay*\n🪩 *Antitop Bot System*`,
    'lesbiana': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es 🏳️‍🌈* *${porcentaje}%* *lesbiana*\n🪩 *Antitop Bot System*`,
    'pajero': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es 😏💦* *${porcentaje}%* *pajero*\n🪩 *Antitop Bot System*`,
    'pajera': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es 😏💦* *${porcentaje}%* *pajera*\n🪩 *Antitop Bot System*`,
    'puto': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *puto*\n🔥 *mas info en su privado* 🔥🥵\n🪩 *Antitop Bot System*`,
    'puta': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *puta*\n🔥 *mas info en su privado* 🔥🥵\n🪩 *Antitop Bot System*`,
    'manco': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *manco* 💩\n🪩 *Antitop Bot System*`,
    'manca': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *manca* 💩\n🪩 *Antitop Bot System*`,
    'rata': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *rata* 🐁 *come queso* 🧀\n🪩 *Antitop Bot System*`,
    'prostituto': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *prostituto* 🫦👅\n❓ *quien quiere de sus servicios*\n🪩 *Antitop Bot System*`,
    'prostituta': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *prostituta* 🫦👅\n❓ *quien quiere de sus servicios*\n🪩 *Antitop Bot System*`,

    // PERÚ + NUEVOS
    'choro': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *choro* 🏃‍♂️💨\n⚠️ *guarden sus iphones* ⚠️\n🪩 *Antitop Bot System*`,
    'cachero': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *cachero* 😈\n🔥 *ni en discoteca lo paran* 🔥\n🪩 *Antitop Bot System*`,
    'cauchera': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *cauchera* 😈💃\n🔥 *reina del huarique* 🔥\n🪩 *Antitop Bot System*`,
    'cabezón': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *cabezon* 🤯\n🧠 *piensa con la otra cabeza*\n🪩 *Antitop Bot System*`,
    'jinetero': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *jinetero* 🏍️\n💨 *piloto de mototaxi*\n🪩 *Antitop Bot System*`,
    'sangre': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *sangre* 🩸\n💸 *vive de prestamo*\n🪩 *Antitop Bot System*`,
    'tragón': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *tragon* 🍻\n🍺 *se toma hasta el agua del florero*\n🪩 *Antitop Bot System*`,
    'fresa': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *fresa* 🍓\n💅 *habla como gringo*\n🪩 *Antitop Bot System*`,
    'pipero': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *pipero* 🌿\n😵‍💫 *vive en otra dimension*\n🪩 *Antitop Bot System*`,
    'muerto': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *muerto* 💀\n😴 *duerme en toda reunion*\n🪩 *Antitop Bot System*`,

    // TUS 5 PEDIDOS
    'burro': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *burro* 🫏\n🤡 *ni el jefe lo entiende*\n🪩 *Antitop Bot System*`,
    'burra': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *burra* 🫏\n🤡 *reprobo hasta en educ. fisica*\n🪩 *Antitop Bot System*`,
    'kbro': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *kbro* 😈\n🔥 *no respeta ni a su abuela*\n🪩 *Antitop Bot System*`,
    'chivo': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *chivo* 🐐\n💨 *huele a cerveza y discoteca*\n🪩 *Antitop Bot System*`,
    'kchera': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *kchera* 😈💃\n🔥 *rompe corazones*\n🪩 *Antitop Bot System*`,

    // +30 NUEVOS
    'bamba': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *bamba* 📱\n⚠️ *celular dura 2 dias*\n🪩 *Antitop Bot System*`,
    'yapa': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *yapa* 🥭\n😏 *siempre pide de mas*\n🪩 *Antitop Bot System*`,
    'caña': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *caña* 🥃\n🍺 *con 2 ya esta tirado*\n🪩 *Antitop Bot System*`,
    'pata': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *pata* 🤝\n😎 *el alma de la joda*\n🪩 *Antitop Bot System*`,
    'floro': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *floro* 💬\n💋 *enamora con pura mentira*\n🪩 *Antitop Bot System*`,
    'miserable': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *miserable* 💸\n🥺 *pide yapa y no paga*\n🪩 *Antitop Bot System*`,
    'gil': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *gil* 🤡\n😵 *se cae solo*\n🪩 *Antitop Bot System*`,
    'gilasa': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *gilasa* 🤡\n😵 *cree todo*\n🪩 *Antitop Bot System*`,
    'lenteja': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *lenteja* 🐢\n🐌 *demora 1 hora en responder*\n🪩 *Antitop Bot System*`,
    'chibolo': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *chibolo* 👶\n🎮 *vive en free fire*\n🪩 *Antitop Bot System*`,
    'chibola': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *chibola* 👧\n💄 *sube 20 historias al dia*\n🪩 *Antitop Bot System*`,
    'viejo': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *viejo* 👴\n😮‍💨 *se queja de todo*\n🪩 *Antitop Bot System*`,
    'vieja': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *vieja* 👵\n🗣️ *chisme nivel dios*\n🪩 *Antitop Bot System*`,
    'grasa': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *grasa* 💪\n🏋️ *solo va al gym a tomar fotos*\n🪩 *Antitop Bot System*`,
    'graso': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *graso* 💪\n😎 *piensa que esta buenazo*\n🪩 *Antitop Bot System*`,
    'pituco': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *pituco* 💎\n💳 *paga con yape de su mama*\n🪩 *Antitop Bot System*`,
    'pituca': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *pituca* 💎\n💅 *toma cafe de 30 soles*\n🪩 *Antitop Bot System*`,
    'sapa': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *sapa* 🐸\n👀 *ve todo y cuenta todo*\n🪩 *Antitop Bot System*`,
    'sapo': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *sapo* 🐸\n👀 *el informativo del grupo*\n🪩 *Antitop Bot System*`,
    'pavo': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *pavo* 🦃\n🤦 *se tropieza solo*\n🪩 *Antitop Bot System*`,
    'pava': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *pava* 🦃\n🤦 *olvida hasta su nombre*\n🪩 *Antitop Bot System*`,
    'trome': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *trome* 👑\n🔥 *el crack del barrio*\n🪩 *Antitop Bot System*`,
    'reina': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *reina* 👑\n💅 *manda en el grupo*\n🪩 *Antitop Bot System*`,
    'king': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *king* 👑\n😎 *el jefe de la joda*\n🪩 *Antitop Bot System*`,
    'zombie': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *zombie* 🧟\n😴 *vive con sueño*\n🪩 *Antitop Bot System*`,
    'tóxica': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *toxica* ☠️\n💔 *revisa celular*\n🪩 *Antitop Bot System*`,
    'tóxico': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *toxico* ☠️\n💔 *celoso nivel dios*\n🪩 *Antitop Bot System*`,
    'simp': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *simp* 🥺\n💌 *manda 50 audios*\n🪩 *Antitop Bot System*`,
    'vago': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *vago* 🛌\n😴 *trabaja 2 horas al año*\n🪩 *Antitop Bot System*`,
    'vaga': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *vaga* 🛌\n📺 *maraton de netflix*\n🪩 *Antitop Bot System*`,
    'loquito': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *loquito* 🤪\n🌀 *habla solo*\n🪩 *Antitop Bot System*`,

    // NUEVOS PEDIDOS ⚡
    'fiel': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *fiel* 💍\n❤️ *ni con 10 cervezas engancha*\n🪩 *Antitop Bot System*`,
    'infiel': `🥥 *Antitop Dice: scanner* 🐆\n\n💿 *${userTarget}* *es* *${porcentaje}%* *infiel* 💔\n😏 *tiene 3 y ninguna sabe*\n🪩 *Antitop Bot System*`
  }

  let respuestaFinal = respuestas[command.toLowerCase()];

  if (respuestaFinal) {
    await conn.sendMessage(m.chat, {
      text: respuestaFinal,
      mentions: [who]
    }, { quoted: m });
  }
}

handler.help = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'burro', 'burra', 'kbro', 'chivo', 'kchera', 'choro', 'cachero', 'cauchera', 'cabezón', 'jinetero', 'sangre', 'tragón', 'fresa', 'pipero', 'muerto', 'bamba', 'yapa', 'caña', 'pata', 'floro', 'miserable', 'gil', 'gilasa', 'lenteja', 'chibolo', 'chibola', 'viejo', 'vieja', 'grasa', 'graso', 'pituco', 'pituca', 'sapa', 'sapo', 'pavo', 'pava', 'trome', 'reina', 'king', 'zombie', 'tóxica', 'tóxico', 'simp', 'vago', 'vaga', 'loquito', 'manco', 'manca', 'rata', 'prostituta', 'prostituto', 'fiel', 'infiel'].map((v) => v + " *@user*")
handler.tags = ['fun']
handler.command = /^(gay|lesbiana|pajero|pajera|puto|puta|burro|burra|kbro|chivo|kchera|choro|cachero|cauchera|cabezón|jinetero|sangre|tragón|fresa|pipero|muerto|bamba|yapa|caña|pata|floro|miserable|gil|gilasa|lenteja|chibolo|chibola|viejo|vieja|grasa|graso|pituco|pituca|sapa|sapo|pavo|pava|trome|reina|king|zombie|tóxica|tóxico|simp|vago|vaga|loquito|manco|manca|rata|prostituta|prostituto|fiel|infiel)$/i

export default handler