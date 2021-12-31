module.exports = {
  gameOptions: {
    reply_markup: JSON.stringify({
        inline_keyboard: [
        [{text: 'Начать игру', callback_data: '/game'}],
        [{text: 'Прочитать правила игры', callback_data: '/rules'}],
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