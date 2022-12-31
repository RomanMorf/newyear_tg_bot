module.exports = {
  gameOptions: {
    reply_markup: JSON.stringify({
        inline_keyboard: [
        [{text: 'Почати гру 🎮', callback_data: '/game'}],
        [{text: 'Ознайомитись з правилами 📖', callback_data: '/rules'}],
      ]
    })
  },  
  alcoholOptions: {
    reply_markup: JSON.stringify({
        inline_keyboard: [
        [{text: '🍺', callback_data: '/beer'},{text: '🍾', callback_data: '/champane'},{text: '🍸', callback_data: '/matrini'}],
        [{text: '🍩', callback_data: '/beer'},{text: '🍧', callback_data: '/champane'},{text: '🍔', callback_data: '/matrini'}],
      ]
    })
  },
}